import  mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    sellerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    productId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    time: {type: Object },
    location: {type: String },
    TotalAmount: {type: Number},
    quantity: {type: Number },
    status: {type:String, default: "pending"},
    ordered: {type: String, default: false}


}, {timestamps: true}
)

export default mongoose.model('Cart', CartSchema)