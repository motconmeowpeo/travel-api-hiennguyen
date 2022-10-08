const express = require('express')

const { Customer, validateCustomer } = require('../model/customer')
const router = express.Router()

//Post

router.post('/', async (req, res) => {
    const err = await validateCustomer(req.body)
    if (err.message)
        res.status(400).send(err.message)
    customer = new Customer(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            block: req.body.block,

        }
    )

    customer.save().then((customer) => {
        res.send(customer)
    })
        .catch((err) => {
            res.status(500).send(err)
        })
    res.setHeader('Access-Control-Allow-Origin', '*');
})

//Get all

router.get("/", (req, res) => {
    Customer.find().then((customer) => res.send(customer)).catch((err) => {
        res.status(500).send('ERR')
    })
    res.setHeader('Access-Control-Allow-Origin', '*');
})


//Get by id

router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if (!customer)
        res.status(404).send('Not found')
    else
        res.send(customer)
    res.setHeader('Access-Control-Allow-Origin', '*');
})

//UPdate

router.put("/:id", async (req, res) => {
    const updateCustomer = await Customer.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        block: req.body.block,

    }, { new: true })
    if (!updateCustomer)
        res.status(404).send("Not found")
    else {

        res.send(updateCustomer)
    }
    // res.setHeader('Access-Control-Allow-Origin', '*');
})

//delete
router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer)
        res.status(404).send("Not found")
    else {
        res.send(customer)

    }
    // res.setHeader('Access-Control-Allow-Origin', '*');
})
module.exports = router