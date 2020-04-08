// core
const express = require('express');
const router = express.Router();
// models
const Load = require('../models/loads');
const Truck = require('../models/trucks');
const User = require('../models/user');
// middleware
const checkLoadStatus = require('../middleware/checkLoadStatus');
const findTruckSize = require('../middleware/findTruckSize');
const checkToken = require('../middleware/checkToken');
const isDriver = require('../middleware/isDriver');
const isShipper = require('../middleware/isShipper');
const isActiveLoad = require('../middleware/isActiveLoad');
// validation
const validation = require('../reqValidation/validation');

// create loads
router.post('/loads',
    validation.createLoad,
    checkToken,
    isShipper,
    async (req, res) => {
      try {
        req.body.created_by = req.userId;
        await Load.create(req.body)
            .then(() => {
              res.status(200).json({'status': 'Load created successfully'});
            });
      } catch (err) {
        console.log(err);
      };
    });

// show created loads for shipper or assigned loads for driver
router.get('/loads', checkToken, async (req, res) => {
  try {
    if (req.userRole === 'shipper') {
      const result = await Load.find({created_by: req.userId});
      res.status(200).json({
        'status': 'Success',
        'loads': result,
      });
    } else if (req.userRole === 'driver') {
      await Load.findOne({assigned_to: req.userId}, (err, load) => {
        res.status(200).json({'status': 'Success',
          'load': load});
      });
    }
  } catch (err) {
    res.send(err);
    console.log(err);
  };
});

// change load info
router.patch('/loads/:id/update',
    validation.updateLoad,
    checkToken,
    isShipper,
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findById(req.params.id)
            .then((load) => {
              const LD = load.dimensions;
              const RBD = req.body.dimensions;
              load.name = req.body.name;
              LD.width = RBD.width;
              LD.height = RBD.height;
              LD.length = RBD.length;
              load.payload = req.body.payload;
              load.logs.push({
                message: `load updated`,
                time: `${new Date()}`,
              });
              load.save();
              res.status(200).json({'status': 'load updated successfully'});
            });
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

router.delete('/loads/:id',
    checkLoadStatus,
    checkToken,
    isShipper,
    async (req, res) => {
      try {
        await Load.findByIdAndDelete(req.params.id);
        res.status(200).json({'status': 'load has been deleted'});
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

// post a load
router.patch('/loads/:id/post',
    checkToken,
    isShipper,
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findById(req.params.id)
            .then((load) => {
              load.status = 'POSTED';
              load.logs.push({
                message: 'load is POSTED',
                time: `${new Date()}`,
              });
              load.save()
                  .then((load) => {
                    const truckSize = findTruckSize(load.dimensions.width,
                        load.dimensions.length,
                        load.dimensions.height,
                        load.payload);
                    if (truckSize === null) {
                      load.status = 'NEW';
                      load.logs.push({
                        message: 'load is too big change status to NEW',
                        time: `${new Date()}`,
                      });
                      load.save();
                      return res.status(400).json('load is too big');
                    }
                    Truck.findOne({status: 'IS',
                      isAssigned: true,
                      type: {$in: truckSize}}).exec()
                        .then((truck) => {
                          if (!truck) {
                            load.status = 'NEW';
                            load.logs.push({
                              message: 'truck not found change status to NEW',
                              time: `${new Date()}`,
                            });
                            load.save();
                            return res.status(500).json({'status':
                            'No drivers found'});
                          }
                          load.status = 'ASSIGNED';
                          load.state = 'En route to pick up';
                          load.assigned_to = truck.assigned_to;
                          load.logs.push({
                            message: 'load is ASSIGNED',
                            time: `${new Date()}`,
                          });
                          load.save();
                          truck.status = 'OL';
                          truck.save();
                          User.findById(truck.assigned_to)
                              .then((user) => {
                                user.status = 'OL';
                                user.save(() => {
                                  res.status(200).json({'status':
                                  'Load posted successfully',
                                  'assigned_to': user._id});
                                });
                              });
                        });
                  });
            });
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

// shipping details about load
router.get('/loads/:id/shippingDetails', checkToken, async (req, res) => {
  try {
    await Load.findById(req.params.id)
        .then((result) => {
          res.status(200).json({
            'state of the shipping': result.state,
          });
        });
  } catch (err) {
    res.send(err);
    console.log(err);
  };
});

// change status of load after delivery DRIVER only
router.patch('/loads/:id/state', checkToken, isDriver, isActiveLoad,
    async (req, res) => {
      try {
        await Load.findById(req.params.id)
            .then((load) => {
              load.state = 'Arrived to delivery';
              load.status = 'SHIPPED';
              load.logs.push({
                message: `load delivered status changed to SHIPPED`,
                time: `${new Date()}`,
              });
              load.save()
                  .then((load) => {
                    User.findById(load.assigned_to)
                        .then((user) => {
                          load.assigned_to = null;
                          load.save();
                          user.status = 'IS';
                          user.save();
                          Truck.findOne({created_by: user._id,
                            status: 'OL'}).exec()
                              .then((truck) => {
                                truck.status = 'IS';
                                truck.save();
                                res.status(200).json({'status':
                                'Load status changed successfully'});
                              });
                        });
                  });
            });
      } catch (err) {
        res.send(err);
        console.log(err);
      };
    });

module.exports = router;
