const express = require('express')

const { Count, validateCount } = require('../model/count')
const router = express.Router()

//Post

router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const err = await validateCount(req.body)
    if (err.message)
        res.status(400).send(err.message)
    count = new Count(
        {
            visitCount: req.body.visitCount,
            orderCount: req.body.orderCount,

        }
    )

    count.save().then((tour) => {
        res.send(tour)
    })
        .catch((err) => {
            res.status(500).send(err)
        })

})

//Get all

router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Count.find().then((tour) => res.send(tour)).catch((err) => {
        res.status(500).send('ERR')
    })

})



//delete
router.post("/delete", async (req, res) => {
    let id = req.body.id;
    res.setHeader('Access-Control-Allow-Origin', '*');
    const tour = await Count.findByIdAndRemove(id)
    if (!tour)
        res.status(404).send("Not found")
    else
        res.send(tour)

})
module.exports = router