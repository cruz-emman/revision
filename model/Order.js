import  mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: [
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId, ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1,
            },
            sellerId: { 
                type: mongoose.Schema.Types.ObjectId, ref: 'User'            
            },

        }
    ],
    amount: {type: Number,required: true},
    location:{type: Object, required:true},
    time: {type: String, required: true},
    status: {type:String, default: "pending"},
    boughtItem: {type: Number, default: 0},

}, {timestamps: true}
)

export default mongoose.model('Order', OrderSchema)