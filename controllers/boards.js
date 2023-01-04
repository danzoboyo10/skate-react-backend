///////// DEPENDENCIES //////////
const express = require('express');
const Board = require('../models/board');
const finishedBoards = require('../boards.json');
const Trucks = require('../models/truck');
const Wheels = require('../models/wheel');
const Bearings = require('../models/bearing');
const Build = require('../models/build');
const Custom = require('../models/custom');
const Cart = require('../models/cart');

const router = express.Router();



/////////////ROUTES/////////////

// INDEX

router.get('/', (req, res) => {
    res.send('hello world')
})


router.get("/presets", (req, res) => {
    res.json(finishedBoards);
});

router.get("/all", async (req, res) => {
    try {

        const builds = await Build.find({}).populate('boardId bearingId truckId wheelId');
        res.json(builds);
    } catch (error) {
        res.status(400).json(error);
    }
});


router.get("/create", async (req, res) => {
    try {
        const boards = await Board.find({});
        const trucks = await Trucks.find({});
        const wheels = await Wheels.find({});
        const bearings = await Bearings.find({});
        const allPieces = [trucks, boards, wheels, bearings]
        res.json(allPieces); 
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/create', async (req, res) => {
    try {
        const boardChoice = await Board.findById(req.body.boardId);
        const boardWidth = boardChoice.width[req.body.boardWidth];
        const truckChoice = await Trucks.findById(req.body.truckId);
        const wheelChoice = await Wheels.findById(req.body.wheelId);
        const bearChoice = await Bearings.findById(req.body.bearingId);
        res.json([boardChoice, boardWidth, truckChoice, wheelChoice, bearChoice]);
    }
    catch (error) {
        res.status(400).json(error);
    }
});

// get route for basic custom

router.get("/custom", async (req, res) => {
    try {
        const customs = await Custom.find({});
    res.json(customs);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/bearings', async (req, res) => {
    try {
      const formData = req.body;
  
      const bearing = await Bearing.create(formData);
  
      res.status(201).send(bearing);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

// create basic custom

router.post('/custom', async (req, res) => {
    try {
        res.json(await Custom.create(req.body));
    } catch (error) {
        res.status(400).json(error);
    }
});


// Update basic custom

router.put('/custom/:id', async (req, res) => {
    try {
        res.json(await Custom.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        ));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'});
    }
});

// Deletes basic custom

router.delete("/custom/:id", async (req, res) => {
    try {
      res.json(await Custom.findByIdAndRemove(req.params.id));
    } catch (error) {
      res.status(400).json(error);
    }
  });








module.exports = router;