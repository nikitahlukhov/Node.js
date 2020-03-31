const express = require('express');
const router = express.Router();
const Load = require('../models/loads');
const checkLoadStatus = require('../middleware/checkLoadStatus');

router.post('/loads', async (req, res) => {
  try {
    await Load.create(req.body)
        .then((load) => {
          res.json(load);
        });
  } catch (err) {
    console.log(err);
  };
});

router.get('/loads/:userId', async (req, res) => {
  try {
    const result = await Load.find({created_by: req.params.userId});
    res.json(result);
  } catch (err) {
    console.log(err);
  };
});

router.delete('/loads/:userId/:loadId',
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findByIdAndDelete(req.params.loadId);
        res.json('load has been deleted');
      } catch (err) {
        console.log(err);
      };
    });

// change info load(will take info from front)
router.put('/loads/update/:userId/:loadId',
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findById(req.params.loadId)
            .then((load) => {
              let LD = load.dimensions;
              load.name = req.body.name || load.name;
              LD.width = req.body.dimensions.width || LD.width;
              LD.height = req.body.dimensions.height || LD.height;
              LD.length = req.body.dimensions.length || LD.length;
              load.save();
            });
      } catch (err) {
        console.log(err);
      };
    });

// change info load(will take info from front)
router.put('/loads/post/:userId/:loadId',
    checkLoadStatus,
    async (req, res) => {
      try {
        await Load.findById(req.params.loadId)
            .then((load) => {
              load.status = req.body.status;
              load.save();
            });
      } catch (err) {
        console.log(err);
      };
    });

module.exports = router;
