const mongoose = require("mongoose")

const iphoneSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Заголовок не заполнен!"],
        trim: true
            
    },
    description:{
        type: String,
        required: [true, "Описание не заполнен!"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Цена не указана!"],
        min: 0
    },
    brand: {
        type: String,
        required: [true, "Бренд не указан!"],
        trim: true,
    }
});

module.exports = mongoose.model("iPhone", iphoneSchema);