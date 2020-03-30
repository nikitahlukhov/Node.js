const express = require('express');
const router = express.Router();
const Truck = require('../models/trucks');
const isOnLoad = require('../middleware/isOnLoad');
const dropAssign = require('../middleware/dropAssign');
const isAssigned = require('../middleware/isAssigned');

router.post('/trucks', async (req, res) => {
  try {
    await Truck.create(req.body)
        .then((truck) => {
          res.json(truck);
        });
  } catch (err) {
    console.log(err);
  };
});

router.get('/trucks/:userId', async (req, res) => {
  try {
    const result = await Truck.find({created_by: req.params.userId});
    res.json(result);
  } catch (err) {
    console.log(err);
  };
});

router.put('/trucks/assign/:userId/:truckId',
    isOnLoad,
    dropAssign,
    async (req, res) => {
      try {
        await Truck.findById(req.params.truckId)
            .then((truck) => {
              truck.assigned_to = req.params.userId;
              truck.save();
              res.json(truck);
            });
      } catch (err) {
        console.log(err);
      };
    });

router.delete('/trucks/:userId/:truckId',
    isOnLoad,
    isAssigned,
    async (req, res) => {
      try {
        await Truck.findByIdAndDelete(req.params.truckId);
      } catch (err) {
        console.log(err);
      };
    });

// change info truck(will take info from front)
router.put('/trucks/update/:userId/:truckId',
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

module.exports = router;
