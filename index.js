const express = require('express')
const app = express()
const mongose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Import Router

const tourRouter = require('./router/tour')
const customerRouter = require('./router/customer')
//Connect databse
mongose.connect("mongodb+srv://c2star07:hiennguyen123@cluster0.n0rogqq.mongodb.net/Travel?retryWrites=true&w=majority")
    .then(() => {
        console.log('Success connected database')
    })
    .catch(() => {
        console.log("Something went wrong")
    })


//Use router
app.use('/api/tour', tourRouter)
app.use('/api/customer', customerRouter)
app.get('/', (req, res) => {
    res.send("Hello This Is Api By Nguyen")
})


const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Starting with port ${PORT}`)
})