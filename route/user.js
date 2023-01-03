import express from 'express'
import User from '../model/User.js'
import CryptoJS from 'crypto-js'

const router = express.Router()
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from './verifyToken.js'



//UPDATE USER
router.put('/:id',  async (req,res) =>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            'admin1223')
            .toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
       res.status(500).json({message:error.message})
    }
})



//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json("Delete failed")
    }
})

//GET ALL USERS
router.get('/', async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
        ? await User.find().sort({ _id: -1 }).limit(5).exect()
        : await User.find().exec();
       
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json("Search Failed")
    }   
})

//GET SINGLE USER
router.get('/find/:id',  async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(400).json("Search Failed")
    }
})

//Search User

router.get('/search', async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}) 

//GET USER STATS

router.get('/stats', verifyTokenAndAdmin, async(req,res) =>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    //This "_id": 10 belongs to the month
    //      "total": 2 belongs kung ilan ang users
    // [
    //     {
    //         "_id": 10,
    //         "total": 2
    //     },
    //     {
    //         "_id": 9,
    //         "total": 2
    //     }
    // ]

    try {
        
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lastYear}}},
            {$project: {
                month: {$month: "$createdAt"}
            }},
            {
                $group:{
                    _id: '$month',
                    total: {$sum:1},
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default router