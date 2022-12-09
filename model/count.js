const mongoose = require('mongoose')
const yup = require('yup')
const countSChema = new mongoose.Schema({
    visitCount: {
        type: Number,
        require: true
    },
    orderCount: {
        type: Number,
        require: true

    }
})

//Validate

const validateCount = (tour) => {
    const schema = yup.object().shape({
        visitCount: yup.number().required(),
        orderCount: yup.number().required(),

    })

    return schema.validate(tour).then(tour => tour)
        .catch((err) => {
            return { message: err.message }
        })
}
exports.Count = new mongoose.model("Count", countSChema)
exports.validateCount = validateCount