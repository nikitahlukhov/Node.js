const express = require('express');
const router = express.Router();
const Truck = require('../models/trucks');
const isOnLoad = require('../middleware/isOnLoad');
const dropAssign = require('../middleware/dropAssign');
const isAssigned = require('../middleware/isAssigned');
const checkToken = require('../middleware/checkToken');
const validation = require('../reqValidation/validation');

// create truck
router.post('/trucks', validation.createTruck, checkToken, async (req, res) => {
  try {
    req.body.created_by = req.userId;
    await Truck.create(req.body)
        .then((truck) => {
          res.json(truck);
        });
  } catch (err) {
    console.log(err);
  };
});

// show created trucks
router.get('/trucks', checkToken, async (req, res) => {
  try {
    const result = await Truck.find({created_by: req.userId});
    res.json(result);
  } catch (err) {
    console.log(err);
  };
});

router.put('/trucks/assign/:truckId',
    checkToken,
    isOnLoad,
    dropAssign,
    async (req, res) => {
      try {
        await Truck.findById(req.params.truckId)
            .then((truck) => {
              truck.assigned_to = req.userId;
              truck.isAssigned = true;
              truck.save();
              res.json(truck);
            });
      } catch (err) {
        console.log(err);
      };
    });

// change info truck(will take info from front)
router.put('/trucks/update/:truckId',
    validation.updateTruck,
    checkToken,
    isOnLoad,
    isAssigned,
    async (req, res) => {
      try {
        await Truck.findById(req.params.truckId)
            .then((truck) => {
              truck.name = req.body.name || truck.name;
              truck.type = req.body.type || truck.type;
              truck.save();
            });
      } catch (err) {
        console.log(err);
      };
    });

router.delete('/trucks/:truckId',
    checkToken,
    isOnLoad,
    isAssigned,
    async (req, res) => {
      try {
        await Truck.findByIdAndDelete(req.params.truckId);
        res.json('truck has been deleted');
      } catch (err) {
        console.log(err);
      };
    });

module.exports = router;
