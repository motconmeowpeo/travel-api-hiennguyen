const express = require('express')
const { model } = require('mongoose')
const { Tour, validateTour } = require('../model/tour')
const router = express.Router()

//Post

router.post('/', async (req, res) => {
    const err = await validateTour(req.body)
    if (err.message)
        res.status(400).send(err.message)
    tour = new Tour(
        {
            title: req.body.title,
            price: req.body.price,
            numberOfDay: req.body.numberOfDay,
            description: req.body.description,
            img: req.body.img
        }
    )

    tour.save().then((tour) => {
        res.send(tour)
    })
        .catch((err) => {
            res.status(500).send(err)
        })
    res.setHeader('Access-Control-Allow-Origin', '*');
})

//Get all

router.get("/", (req, res) => {
    Tour.find().then((tour) => res.send(tour)).catch((err) => {
        res.status(500).send('ERR')
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
})


//Get by id

router.get("/:id", async (req, res) => {
    const book = await Tour.findById(req.params.id)
    if (!book)
        res.status(404).send('Not found')
    else
        res.send(book)
    res.setHeader('Access-Control-Allow-Origin', '*');
})

//UPdate

router.put("/:id", async (req, res) => {
    const updateTour = await Tour.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        price: req.body.price,
        numberOfDay: req.body.numberOfDay,
        description: req.body.description,
        img: req.body.img

    }, { new: true })
    if (!updateTour)
        res.status(404).send("Not found")
    else
        res.send(updateTour)
    res.setHeader('Access-Control-Allow-Origin', '*');
})

//delete
router.delete("/:id", async (req, res) => {
    const book = await Tour.findByIdAndRemove(req.params.id)
    if (!book)
        res.status(404).send("Not found")
    else
        res.send(book)
    res.setHeader('Access-Control-Allow-Origin', '*');
})
module.exports = router