const express = require('express')

const { OrderDetail, validateOrderDetail } = require('../model/order_detail')

const router = express.Router()

//Post

router.post('/', async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const err = await validateOrderDetail(req.body)
    if (err.message)
        res.status(400).send(err.message)
    orderDetail = new OrderDetail(
        {
            order_id: req.body.order_id,
            driver_id: req.body.driver_id,
            vehicle_id: req.body.vehicle_id,
            tourguide_id: req.body.tourguide_id,
            merge_tour: req.body.merge_tour,
            numberOfPeople: req.body.numberOfPeople
        }
    )

    orderDetail.save().then((orderDetail) => {
        res.send(orderDetail)
    })
        .catch((err) => {
            res.status(500).send(err)
        })

})

//Get all

router.get("/", (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    OrderDetail.find().then((orderDetail) => res.send(orderDetail)).catch((err) => {
        res.status(500).send('ERR')
    })

})


//Get by id

router.get("/:id", async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const order = await OrderDetail.findById(req.params.id)
    if (!order)
        res.status(404).send('Not found')
    else
        res.send(order)

})

//UPdate

router.put("/:id", async (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const updateOrder = await OrderDetail.findByIdAndUpdate(req.params.id, {
        order_id: req.body.order_id,
        driver_id: req.body.driver_id,
        vehicle_id: req.body.vehicle_id,
        tourguide_id: req.body.tourguide_id,
        merge_tour: req.body.merge_tour,
        numberOfPeople: req.body.numberOfPeople

    }, { new: true })
    if (!updateOrder)
        res.status(404).send("Not found")
    else
        res.send(updateOrder)

})

//delete
router.post("/delete", async (req, res) => {
    let id = req.body.id;
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const order = await OrderDetail.findByIdAndRemove(id)
    if (!order)
        res.status(404).send("Not found")
    else
        res.send(order)

})
module.exports = router