// core
const express = require('express');
const router = express.Router();
// model
const Truck = require('../models/trucks');
// middleware
const isOnLoad = require('../middleware/isOnLoad');
const dropAssign = require('../middleware/dropAssign');
const isAssigned = require('../middleware/isAssigned');
const checkToken = require('../middleware/checkToken');
const isDriver = require('../middleware/isDriver');
// validation
const validation = require('../reqValidation/validation');

// create truck
router.post('/trucks',
    validation.createTruck,
    checkToken,
    isDriver,
    async (req, res) => {
      try {
        req.body.created_by = req.userId;
        await Truck.create(req.body)
            .then(() => {
              res.status(200).json({'status': 'Truck created successfully'});
            });
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

// show created trucks
router.get('/trucks', checkToken, async (req, res) => {
  try {
    const result = await Truck.find({created_by: req.userId});
    res.status(200).json({'status': 'Truck created successfully',
      'trucks': result});
  } catch (err) {
    res.send(err);
    console.log(err);
  };
});

// assign truck
router.patch('/trucks/:id/assign',
    checkToken,
    isOnLoad,
    dropAssign,
    isDriver,
    async (req, res) => {
      try {
        await Truck.findById(req.params.id)
            .then((truck) => {
              truck.assigned_to = req.userId;
              truck.isAssigned = true;
              truck.save();
              res.status(200).json({'status': 'Truck assigned successfully'});
            });
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

// change truck info
router.patch('/trucks/:id/update',
    validation.updateTruck,
    checkToken,
    isOnLoad,
    isAssigned,
    isDriver,
    async (req, res) => {
      try {
        await Truck.findById(req.params.id)
            .then((truck) => {
              truck.name = req.body.name || truck.name;
              truck.type = req.body.type || truck.type;
              truck.save();
              res.status(200).json({'status': 'truck updated successfully'});
            });
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

router.delete('/trucks/:id',
    checkToken,
    isOnLoad,
    isAssigned,
    isDriver,
    async (req, res) => {
      try {
        await Truck.findByIdAndDelete(req.params.id);
        res.status(200).json({'status': 'truck has been deleted'});
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

module.exports = router;
