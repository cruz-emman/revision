import  mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    seller_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    title: {type: String, required: true},
    description: {type: String, required: true },
    img: {type: String, required:true},
    status: {
        type: String, default: 'available',
    },
    isDeleted: {type: Boolean, default: false},
    category: {type: String, required: true},
    productCategory: {type: String, required: true},
    price: {type: String, required:true},
    quantity: {type: Number, default: 0}

}, {timestamps: true}
)

export default mongoose.model('Product', ProductSchema)