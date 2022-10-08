const express = require('express')

const { Tour, validateTour } = require('../model/tour')
const router = express.Router()

//Post

router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

})

//Get all

router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Tour.find().then((tour) => res.send(tour)).catch((err) => {
        res.status(500).send('ERR')
    })

})


//Get by id

router.get("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const tour = await Tour.findById(req.params.id)
    if (!tour)
        res.status(404).send('Not found')
    else
        res.send(tour)

})

//UPdate

router.put("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

})

//delete
router.delete("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const tour = await Tour.findByIdAndRemove(req.params.id)
    if (!tour)
        res.status(404).send("Not found")
    else
        res.send(tour)

})
module.exports = router