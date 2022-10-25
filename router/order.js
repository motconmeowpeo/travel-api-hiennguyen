const express = require('express')

const { Order, validateOrder } = require('../model/order')
const router = express.Router()

//Post

router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const err = await validateOrder(req.body)
    if (err.message)
        res.status(400).send(err.message)
    order = new Order(
        {
            customer_id: req.body.customer_id,
            customer_name: req.body.customer_name,
            hotel_id: req.body.hotel_id,
            tour_id: req.body.tour_id,
            tour_name: req.body.tour_name,
            date: req.body.date,
            phonenumber: req.body.phonenumber,
            status: req.body.status
        }
    )

    order.save().then((order) => {
        res.send(order)
    })
        .catch((err) => {
            res.status(500).send(err)
        })

})

//Get all

router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Order.find().then((order) => res.send(order)).catch((err) => {
        res.status(500).send('ERR')
    })

})


//Get by id

router.get("/:id", async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const order = await Order.findById(req.params.id)
    if (!order)
        res.status(404).send('Not found')
    else
        res.send(order)

})

//UPdate

router.put("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
        customer_id: req.body.customer_id,
        customer_name: req.body.customer_name,
        hotel_id: req.body.hotel_id,
        tour_id: req.body.tour_id,
        tour_name: req.body.tour_name,
        date: req.body.date,
        phonenumber: req.body.phonenumber,
        status: req.body.status
    }, { new: true })
    if (!updateOrder)
        res.status(404).send("Not found")
    else
        res.send(updateOrder)

})

//delete
router.post("/delete", async (req, res) => {
    let id = req.body.id;
    res.setHeader('Access-Control-Allow-Origin', '*');
    const order = await Order.findByIdAndRemove(id)
    if (!order)
        res.status(404).send("Not found")
    else
        res.send(order)

})
module.exports = router