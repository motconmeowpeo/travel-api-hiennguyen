const mongoose = require('mongoose')
const yup = require('yup')
const orderDetailSchema = new mongoose.Schema({
    order_id: {
        type: String,
        require: true
    },
    driver_id: {
        type: String,
        require: true
    },
    vehicle_id: {
        type: String,
        require: true
    },
    tourguide_id: {
        type: String,
        require: true
    },
    merge_tour: {
        type: Boolean,
        require: true
    },
    numberOfPeople: {
        type: String,
        require: true
    },
    note: {
        type: String,
        require: false

    }

})

//Validate

const validateOrderDetail = (orderDetail) => {
    const schema = yup.object().shape({
        order_id: yup.string().required(),
        driver_id: yup.string().required(),
        vehicle_id: yup.string().required(),
        tourguide_id: yup.string().required(),
        merge_tour: yup.boolean().required(),
        numberOfPeople: yup.string().required(),

    })

    return schema.validate(orderDetail).then(orderDetail => orderDetail)
        .catch((err) => {
            return { message: err.message }
        })
}
exports.OrderDetail = new mongoose.model("OrderDetail", orderDetailSchema)
exports.validateOrderDetail = validateOrderDetail