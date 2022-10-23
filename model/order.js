const mongoose = require('mongoose')
const yup = require('yup')
const orderSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        require: true
    },
    customer_name: {
        type: String,
        require: true
    },
    hotel_id: {
        type: String,
        require: true
    },
    tour_id: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    phonenumber: {
        type: String,
        require: true
    },

})

//Validate

const validateOrder = (order) => {
    const schema = yup.object().shape({
        customer_id: yup.string().required(),
        customer_name: yup.string().required(),
        hotel_id: yup.string().required(),
        tour_id: yup.string().required(),
        date: yup.string().required(),
        phonenumber: yup.string().required(),
    })

    return schema.validate(order).then(order => order)
        .catch((err) => {
            return { message: err.message }
        })
}
exports.Order = new mongoose.model("Order", orderSchema)
exports.validateOrder = validateOrder