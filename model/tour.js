const mongoose = require('mongoose')
const yup = require('yup')
const tourSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    numberOfDay: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
})

//Validate

const validateTour = (tour) => {
    const schema = yup.object().shape({
        title: yup.string().required(),
        price: yup.string().required(),
        numberOfDay: yup.string().required(),
        description: yup.string().required(),
        img: yup.string().required()

    })

    return schema.validate(tour).then(tour => tour)
        .catch((err) => {
            return { message: err.message }
        })
}
exports.Tour = new mongoose.model("Tour", tourSchema)
exports.validateTour = validateTour