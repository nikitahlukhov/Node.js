const express = require('express');
const router = express.Router();
const Load = require('../models/loads');
const Truck = require('../models/trucks');
const User = require('../models/user');
const checkToken = require('../middleware/checkToken');

// DRIVER

// assigned loads for driver
router.get('/loads/assignedLoads', checkToken, async (req, res) => {
  try {
    await Load.findOne({assigned_to: req.userId}, (err, load) => {
      res.json({load});
    });
  } catch (err) {
    console.log(err);
  };
});

// change status of load after delivery
router.put('/loads/afterDeliver/:loadId',
    async (req, res) => {
      try {
        await Load.findById(req.params.loadId)
            .then((load) => {
              load.state = 'Arrived to delivery';
              load.status = 'SHIPPED';
              load.logs.push({
                message: `load delivered status changed to SHIPPED`,
                time: `${new Date()}`,
              });
              load.save(() => {
                User.findById(load.assigned_to)
                    .then((user) => {
                      load.assigned_to = null;
                      load.save();
                      user.status = 'IS';
                      user.save();
                      Truck.findOne({created_by: user._id, status: 'OL'},
                          (err, truck) => {
                            truck.status = 'IS';
                            truck.save();
                            res.json('load has been delivered');
                          });
                    });
              });
            });
      } catch (err) {
        console.log(err);
      };
    });

module.exports = router;
