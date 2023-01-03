import express from 'express'
import mongoose from 'mongoose';
import Order from '../model/Order.js'
const router = express.Router()


router.post("/", async (req, res) => {
    const newOrder = new Order(req.body);

    try {
      const savedOrder = await newOrder.save();
      
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });
  
  //UPDATE
  router.put("/:id", async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get("/find/:id", async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET USER ORDERS
  router.get("/find/:userId", async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // //GET ALL
  
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find().populate(
        [
          {path: 'userId', select: 'studentId'},
          {path: 'products.productId', select: 'title img status category productCategory price'},
          {path: 'products.sellerId', select: 'studentId'}
        ]).exec();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  //GET MONTHLY INCOME
  
  router.get("/totalSales", async (req, res) => {
    const productId  = req.query.orderId;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 11));
  
    try {
      const income = await Order.aggregate([
        {$match: {status: 'complete'}},
        {
          $project: {amount: 1}
        },
        {
          $group: {_id: null, total: {$sum: "$amount"}}
        }
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  router.get("/income", async (req, res) => {
    const productId  = req.query.orderId;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 11));
  
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.get('/previousSales/:id', async (req,res) => {
    const {id} = req.params
    const sellerId = mongoose.Types.ObjectId(id)

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 11)); 


    try {
      const order = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: previousMonth
            },
            products: {
              $elemMatch: {
                sellerId: sellerId
              }
            },
            status: 'complete'
            
          }
        },
        {
          $project: {
            month: {
              $month: "$createdAt"
            },
            sales: "$amount"
          }
        },
        {$sort: {createdAt: 1}},
        {
          $group: {
            _id: "$month",
            total: {
              $sum: "$sales"
            }
          }
        }
      ]);
      res.status(200).json(order)
    } catch (error) {
      res.status(400).json({message: error.message})
    }

  })


  
  
  //GET GROSS INCOME
  router.get("/total/:id", async (req, res) => {
    const { id } = req.params;
    const sellerId = mongoose.Types.ObjectId(id)
  
    try {
      const income = await Order.aggregate([ 
      {
        $match: {"products.sellerId": sellerId, status: "complete"}
      },
      {$group: {_id: "$products.sellerId", total: {$sum: "$amount"}}}
      

      ])
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json({err: err.message});
    }
  });
  
  //GET GROSS INCOME
  router.get("/totalbuy/:id", async (req, res) => {
    const { id } = req.params;
    const buyerId = mongoose.Types.ObjectId(id)
  
    try {
      const income = await Order.aggregate([ 
      {
        $match: {userId: buyerId, status: "complete"}
      },
      {$group: {_id: "$buyerId", total: {$sum: "$amount"}}}
      

      ])
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json({err: err.message});
    }
  });



//GET RECENT CATEGORY
  router.get('/recent/:id', async (req,res) => {
    const { id } = req.params;

    try {
      const orders = await Order.find({'products.sellerId': id }).sort({createdAt: -1})
                    .populate([
                      {path: 'userId', select: 'firstname lastname studentId' },
                      {path: 'products.productId', select: 'title img status quantity' },
                      {path: 'products.sellerId', select: 'firstname lastname studentId department' }
                    ]).exec()
                                    
      res.status(200).json(orders);     
    }
       catch (error) {
      res.status(500).json({message: error.message});
      console.log({message: error.message});
    }

  })


//GET RECENT BUYER
  router.get('/recentBuy/:id', async (req,res) => {
    const { id } = req.params;

    try {
      const orders = await Order.find({userId: id }).sort({createdAt: -1})
                    .populate([
                      {path: 'userId', select: 'firstname lastname studentId' },
                      {path: 'products.productId', select: 'title img status quantity' },
                      {path: 'products.sellerId', select: 'firstname lastname studentId department' }
                    ]).exec()
                                    
      res.status(200).json(orders);     
    }
       catch (error) {
      res.status(500).json({message: error.message});
      console.log({message: error.message});
    }

  })



  //TOP DEPARTMENT AND CATEGORY
  router.get('/topDepartment', async (req, res) => {
    
    try {
      const order = await Order.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'products.productId',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
            $group: {
                _id: "$product.category",
                total: {$sum: 1}
              }
        },
        {
          $sort: {'total': -1}
        }
        

      ])
      res.status(200).json(order);     

    } catch (error) {
      res.status(500).json({error: error.message})
    }
  })

// ALL DEPARTMENT

router.get('/departments', async (req, res) => {
    
  try {
    const order = await Order.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: "$product"
      },
      {
        $group: {
          _id: "$product.category",
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {total: -1}
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },

    ])
    res.status(200).json(order);     

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

//All merch
router.get('/categories', async (req, res) => {
    
  try {
    const order = await Order.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'products.productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: "$product"
      },
      {
        $group: {
          _id: "$product.productCategory",
          total: {
            $sum: 1
          }
        }
      },
      {
        $sort: {total: -1}
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          total: 1
        }
      },

    ])
    res.status(200).json(order);     

  } catch (error) {
    res.status(500).json({error: error.message})
  }
})


  //TOP MERCH
  router.get('/topCategory', async (req, res) => {
    
    try {
      const order = await Order.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'products.productId',
            foreignField: '_id',
            as: 'product'
          }
        },
        {
            $group: {
                _id: "$product.productCategory",
                total: {$sum: 1}
              }
        },
        {
          $sort: {'total': -1}
        }
        

      ])
      res.status(200).json(order);     

    } catch (error) {
      res.status(500).json({error: error.message})
    }
  })


  export default router
  
  // from: 'products',
  // localField: 'products.productId',
  // foreignField: '_id',
  // as: 'product'
  // {
  //   $group: {
  //       _id: "$product.category",
  //       total: {$sum: 1}
  //     }
  //   }