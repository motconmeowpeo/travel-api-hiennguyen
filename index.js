const express = require('express')
const app = express()
const mongose = require('mongoose')
let cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

//Import Router

const tourRouter = require('./router/tour')
const customerRouter = require('./router/customer')
const orderRouter = require('./router/order')
const orderDetailRouter = require('./router/order_detail')
const { orderDetail } = require('./model/order_detail')
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
app.use('/api/order', orderRouter)
app.use('/api/orderDetail', orderDetailRouter)
app.get('/', (req, res) => {
    res.send("Chin chào !! This is api design and coding by Nguyên :3 .If you see this message. Have a good day moaz moaz :3")
})


const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Starting with port ${PORT}`)
})