var db = require("../config/connection");
var collections = require("../config/collections");
const bcrypt = require("bcrypt");
const objectId = require("mongodb").ObjectID;
const Razorpay = require("razorpay");
const { resolve } = require("path");

var instance = new Razorpay({
  key_id: "rzp_test_8NokNgt8cA3Hdv",
  key_secret: "xPzG53EXxT8PKr34qT7CTFm9",
});

module.exports = {
  getAllProducts: (email) => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCTS_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },


  getSignedUserProducts:(email)=>{
    console.log('mail is',email);
    return new Promise(async(resolve,reject)=>{
      let items= await db.get().collection(collections.PRODUCTS_COLLECTION).find({CreatedBy:!email}).toArray()
      resolve("items",items);

    })
   
  
    
  },

  doSignup: (userData) => {
    console.log("Data is ",userData);
    return new Promise(async (resolve, reject) => {
      userData.Password = await bcrypt.hash(userData.Password, 10);
      db.get()
        .collection(collections.USERS_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data.ops[0]);
        });
    });
  },

  doSignin: (userData) => {
    console.log("login det",userData);
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ Email: userData.Email });
      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((status) => {
          if (status) {
            console.log("Login Success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("wrong password");
            resolve({ status: false });
          }
        });
      } else {
        console.log("Login Failed");
        resolve({ status: false });
      }
    });
  },

  addToCart: (productId, userId) => {
    console.log(userId);
    let productObject = {
      item: objectId(productId),
      quantity: 1,
    };
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collections.CART_COLLECTION)
        .findOne({ user: objectId(userId) });
      if (userCart) {
        let productExist = userCart.products.findIndex(
          (products) => products.item == productId
        );
        console.log(productExist);
        if (productExist != -1) {
          db.get()
            .collection(collections.CART_COLLECTION)
            .updateOne(
              { user: objectId(userId), "products.item": objectId(productId) },
              {
                $inc: { "products.$.quantity": 1 },
              }
            )
            .then(() => {
              resolve();
            });
        } else {
          db.get()
            .collection(collections.CART_COLLECTION)
            .updateOne(
              { user: objectId(userId) },
              {
                $push: { products: productObject },
              }
            )
            .then((response) => {
              resolve();
            });
        }
      } else {
        let cartObject = {
          user: objectId(userId),
          products: [productObject],
        };
        db.get()
          .collection(collections.CART_COLLECTION)
          .insertOne(cartObject)
          .then((response) => {
            resolve();
          });
      }
    });
  },
  addProduct: (product,user, callback) => {
    return new Promise((resolve,reject)=>{
      // console.log("my",user);
      // console.log(product);
      product.input.price = parseInt(product.input.price);
      const products={
        Name:product.input.name,
        Category:product.input.category,
        Price: product.input.price,
        Description:product.input. description,
        url:product.url,
        CreatedBy:user. Email,
        reviews:[]
      }
      
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .insertOne(products)
        .then((data) => {
          // console.log(data);
          resolve(data.ops[0]._id);
        });

    })
   
  },

  getCartProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cartItems = await db
        .get()
        .collection(collections.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: objectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collections.PRODUCTS_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
        ])
        .toArray();
      // console.log(cartItems);
      resolve(cartItems);
    });
  },

  getCartCount: (userId) => {
    console.log("set id is ",userId);
    return new Promise(async (resolve, reject) => {
      let count = 0;
      let cart = await db
        .get()
        .collection(collections.CART_COLLECTION)
        .findOne({ user: objectId(userId) });
      if (cart) {
        var sumQuantity = 0;
        for (let i = 0; i < cart.products.length; i++) {
          sumQuantity += cart.products[i].quantity;
        }
        count = sumQuantity;
      }
      resolve(count);
    });
  },

  changeProductQuantity: (details) => {
    details.count = parseInt(details.count);
    details.quantity = parseInt(details.quantity);

    return new Promise((resolve, reject) => {
      if (details.count == -1 && details.quantity == 1) {
        db.get()
          .collection(collections.CART_COLLECTION)
          .updateOne(
            { _id: objectId(details.cart) },
            {
              $pull: { products: { item: objectId(details.product) } },
            }
          )
          .then((response) => {
            resolve({ removeProduct: true });
          });
      } else {
        db.get()
          .collection(collections.CART_COLLECTION)
          .updateOne(
            {
              _id: objectId(details.cart),
              "products.item": objectId(details.product),
            },
            {
              $inc: { "products.$.quantity": details.count },
            }
          )
          .then((response) => {
            resolve({ status: true });
          });
      }
    });
  },

  removeCartProduct: (details) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CART_COLLECTION)
        .updateOne(
          { _id: objectId(details.cartid) },
          {
            $pull: { products: { item: objectId(details.proId) } },
          }
        )
        .then(() => {
          resolve({ status: true });
        });
    });
  },

  getTotalAmount: (userId) => {
    return new Promise(async (resolve, reject) => {
      let total = await db
        .get()
        .collection(collections.CART_COLLECTION)
        .aggregate([
          {
            $match: { user: objectId(userId) },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collections.PRODUCTS_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $multiply: ["$quantity", "$product.Price"] } },
            },
          },
        ])
        .toArray();
      console.log(total[0].total);
      resolve(total[0].total);
    });
  },

  getCartProductList: (userId) => {
    return new Promise(async (resolve, reject) => {
      let cart = await db
        .get()
        .collection(collections.CART_COLLECTION)
        .findOne({ user: objectId(userId) });
      resolve(cart.products);
    });
  },

  placeOrder: (order, products, total, user,userId) => {
    return new Promise(async (resolve, reject) => {
      console.log(order, products, total);
      let status = order.meth === "COD" ? "placed" : "pending";
      let orderObject = {
        deliveryDetails: {
          mobile: order.mobile,
          address: order.address,
          pincode: order.pincode,
        },
        userId: objectId(userId),
        user: user,
        paymentMethod: order.meth,
        products: products,
        totalAmount: total,
        status: status,
        date: new Date().toISOString(),
      };
      db.get()
        .collection(collections.ORDER_COLLECTION)
        .insertOne({ orderObject })
        .then((response) => {
          db.get()
            .collection(collections.CART_COLLECTION)
            .removeOne({ user: objectId(userId) });
          resolve(response.ops[0]._id);
        });
    });
  },

  getUserOrder: (userId) => {
    return new Promise(async (resolve, reject) => {
      let orders = await db
        .get()
        .collection(collections.ORDER_COLLECTION)
        .find({ "orderObject.userId": objectId(userId) })
        .toArray();
      resolve(orders);
    });
  },

  getOrderProducts: (orderId) => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.ORDER_COLLECTION)
        .aggregate([
          {
            $match: { _id: objectId(orderId) },
          },
          {
            $unwind: "$orderObject.products",
          },
          {
            $project: {
              item: "$orderObject.products.item",
              quantity: "$orderObject.products.quantity",
            },
          },
          {
            $lookup: {
              from: collections.PRODUCTS_COLLECTION,
              localField: "item",
              foreignField: "_id",
              as: "product",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              product: { $arrayElemAt: ["$product", 0] },
            },
          },
        ])
        .toArray();
      resolve(products);
    });
  },

  generateRazorpay: (orderId, totalPrice) => {
    return new Promise((resolve, reject) => {
      var options = {
        amount: totalPrice * 100, // amount in the smallest currency unit
        currency: "INR",
        receipt: "" + orderId,
      };
      instance.orders.create(options, function (err, order) {
        console.log("New Order : ", order);
        resolve(order);
      });
    });
  },

  verifyPayment: (details) => {
    return new Promise((resolve, reject) => {
      const crypto = require("crypto");
      let hmac = crypto.createHmac("sha256", "xPzG53EXxT8PKr34qT7CTFm9");

      hmac.update(
        details["payment[razorpay_order_id]"] +
          "|" +
          details["payment[razorpay_payment_id]"]
      );
      hmac = hmac.digest("hex");

      if (hmac == details["payment[razorpay_signature]"]) {
        resolve();
      } else {
        reject();
      }
    });
  },

  changePaymentStatus: (orderId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ORDER_COLLECTION)
        .updateOne(
          { _id: objectId(orderId) },
          {
            $set: {
              "orderObject.status": "placed",
            },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },

  cancelOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.ORDER_COLLECTION)
        .removeOne({ _id: objectId(orderId) })
        .then(() => {
          resolve();
        });
    });
  },

  searchProduct: (details) => {
    console.log(details);
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .createIndex({ Name : "text" }).then(async()=>{
          let result = await db
            .get()
            .collection(collections.PRODUCTS_COLLECTION)
            .find({
              $text: {
                $search: details.search,
              },
            })
            .toArray();
          resolve(result);
        })

    });
  },
  getUserDetails: (id) => {
    return new Promise((resolve, reject) => {
      db.get().collection(collections.USERS_COLLECTION).findOne({ _id: objectId(id) }).then((response) => {
        resolve(response)
      })
    })
  
  },

  addToWishlist :(proId,userId)=>{
    return new Promise(async(resolve,reject)=>{
      
    const wishlistExist= await db.get().collection('wishlist').findOne({id:objectId(userId) })
     const  recivedProdDetails = await db.get().collection(collections.PRODUCTS_COLLECTION).findOne({_id:objectId(proId)})
     console.log('recivedProdDetails',recivedProdDetails);
    let items ={
      id:userId,
       favs: [recivedProdDetails]
    }
      if(wishlistExist){
        console.log('pId',proId);
       console.log('w List is',wishlistExist);
       const promatch =  wishlistExist.favs.find((i)=> i._id == proId )
       console.log('promatch is' ,promatch);
       if (promatch) {
         resolve('already inthe wish list')
         
       }else{
        db.get().collection('wishlist').updateOne(
          {id:objectId(userId)},
          {
            $push:{favs:recivedProdDetails}
          }
          ).then((res)=>{
            resolve('added to wishlist')
          })
       }
        // promatch ? resolve('already in list') : db.get().collection('wishlist').updateOne(
        //   {id:objectId(userId)},
        //   {
        //     $push:{favs:recivedProdDetails}
        //   }
        //   ).then((res)=>{
        //     resolve(res)
        //   })
        
        

      }else{

        await db.
         get().collection('wishlist').insertOne(items).then(()=>{
           resolve('item added to wishlist')
         })
             
      }
    })
  },
  getWishListItems :(userId)=>{
     return new Promise(async(resolve,reject)=>{
      const wishlist=await db.get().collection('wishlist').find({id:objectId(userId)}).toArray()
         
      resolve(wishlist)
      
     })
  },
  sendChat: (user, items) => {
    return new Promise(async (resolve, reject) => {
      const data = {
        sender: user.Email,
        reciver: items.reciver,
        text: items.message,
        isReaded: true,
        time: Date.now()
      }
      await db.get().collection('chat').insertOne(data).then((result) => {
        resolve(result)
      })
    })
  },
  getall: (user, id) => {
    console.log("reciver is ", user.Email);
    console.log("id", id);
    return new Promise(async (resolve, reject) => {
      const messages= await db.get().collection('chat').find({reciver:user.Email,sender:id} ).toArray()
      console.log("messages are",messages);
      // const messages = await db.get().collection('chat').find().toArray();
      // const aar = [];
      // messages.map((i) => {
      //   var isMe = false;
      //   if (i.reciver == user.Email) {
      //     isMe = true;
      //   }
      //   i.isMe = isMe;
      //   // console.log("i is ",i);
      //   aar.push(i);
      // })
      // resolve(aar)
      resolve(messages)
    })
  },
  // userOrderItems :()=>{
  //   return new Promise((resolve,reject)=>{
  //     db.get().collection('order').find({})
  //   })
  // }
};
