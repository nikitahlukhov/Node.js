const express = require('express');
const router = express.Router();
const Load = require('../models/loads');
const checkLoadStatus = require('../middleware/checkLoadStatus');
const Truck = require('../models/trucks');
const User = require('../models/user');
const findTruckSize = require('../middleware/findTruckSize');
const checkToken = require('../middleware/checkToken');
const validation = require('../reqValidation/validation');


// SHIPPER

// create loads
router.post('/loads', validation.createLoad, checkToken, async (req, res) => {
  try {
    req.body.created_by = req.userId;
    await Load.create(req.body)
        .then((load) => {
          res.json(load);
        });
  } catch (err) {
    console.log(err);
  };
});

// show created loads for shipper
router.get('/loads/createdLoads', checkToken, async (req, res) => {
  try {
    const result = await Load.find({created_by: req.userId});
    res.json(result);
  } catch (err) {
    console.log(err);
  };
});

// change info load(will take info from front)
router.put('/loads/update/:loadId',
    validation.updateLoad,
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findById(req.params.loadId)
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
            });
      } catch (err) {
        console.log(err);
      };
    });

router.delete('/loads/:loadId',
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findByIdAndDelete(req.params.loadId);
        res.json('load has been deleted');
      } catch (err) {
        console.log(err);
      };
    });

// post a load
router.put('/loads/post/:loadId',
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findById(req.params.loadId)
            .then((load) => {
              load.status = req.body.status;
              load.logs.push({
                message: 'load is POSTED',
                time: `${new Date()}`,
              });
              load.save(() => {
                const truckSize = findTruckSize(load.dimensions.width,
                    load.dimensions.length,
                    load.dimensions.height,
                    load.payload);
                if (truckSize == null) {
                  load.status = 'NEW';
                  load.logs.push({
                    message: 'load is too big change status to NEW',
                    time: `${new Date()}`,
                  });
                  load.save();
                  return res.json('load is too big');
                }
                Truck.findOne({status: 'IS',
                  isAssigned: true,
                  type: {$in: truckSize}},
                (err, truck) => {
                  if (!truck) {
                    load.status = 'NEW';
                    load.logs.push({
                      message: 'truck not found change status to NEW',
                      time: `${new Date()}`,
                    });
                    load.save();
                    return res.json('truck not found');
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
                          res.json({user});
                        });
                      });
                });
              });
            });
      } catch (err) {
        console.log(err);
      };
    });

// shipping details about load
router.get('/loads/shippingDetails/:loadId', async (req, res) => {
  try {
    await Load.findById(req.params.loadId)
        .then((result) => {
          res.json({
            state: result.state,
          });
        });
  } catch (err) {
    console.log(err);
  };
});

module.exports = router;
