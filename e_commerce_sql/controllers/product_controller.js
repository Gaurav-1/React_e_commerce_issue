const {
    findAllProduct,
    findProductById,
    findAllCart,
    findCartById,
    updateCartQuantity,
    deleteCartByID,
    getOrder,
    placeOrder,
    userOrders,
    cancelOrder,
} = require("../utils/dbqueries")

function show_dashboard(req,res){
    if(!req.session.userid || req.session.role!='user')
        res.redirect('/user')
    else
        res.render('dashboard',{username: req.session.username})
}

async function send_products(req,res){
    const {pages} = req.query;

    findAllProduct({limit: 8, start: pages*8})
    .then((products)=>{
        if(products.length<1){
            res.status(301).json({message:'No more products to show'})
        }
        else{
            res.status(200).json(products);
        }
    })
}

function add_to_cart(req,res){
    if(req.session.userid){
        findProductById({product_id: req.body.id})
        .then((products)=>{
            if(products.length<1){
                res.json({message: 'Unable to add the item'});
                return;
            }
            findCartById({user_id: req.session.userid, product_id: req.body.id})
            .then((response)=>{
                if(response.length>0){
                    response[0].quantity++;
                    if(response[0].quantity>products.quantity){
                        res.json({message: "You have reached the limit for this product"})
                        return;
                    }
                    updateCartQuantity({quantity: response[0].quantity, user_id: req.session.userid, product_id: req.body.id, price: products[0].price})
                    .then((response)=>{
                        if(response.affectedRows==0)
                            res.json({message: 'Unable to add the product'})
                        else
                            res.json({message: 'Item updated sucessfully'})
                    })
                return;
                }
                const values = {
                    user_id: req.session.userid,
                    product_id: req.body.id,
                    quantity: 1,
                    bill: products[0].price
                }
                conn.query(`INSERT INTO cart SET ?`,values,(err,result)=>{
                    if(err)
                        res.json({message: 'Failed to add product'});
                    else
                        res.json({message: 'Item added Sucessfully'})
                })
            })
        })
    }
}


function send_cart(req,res){
    findAllCart({user_id: req.session.userid})
    .then((cart)=>{
        if(cart && cart.length>0){
            res.status(200).json(cart);
        }
        else{
            res.json({message:'Cart is empty'})
        }
    })
    
 }

async function update_quantity(req,res){
    if(req.session.userid){
        findProductById({product_id: req.body.id})
        .then((products)=>{
            if(products.length>0){
                findCartById({user_id: req.session.userid, product_id: req.body.id})
                .then((cart)=>{
                    if(cart.length>0){
                        if(req.body.op === '+'){
                            cart[0].quantity++;
                            if(cart[0].quantity>10){
                                res.json({message: 'Maximum limit reached', quantity: 10, price: (cart[0].quantity*products[0].price)})
                                return;
                            }
                        }
                        else if(req.body.op === '-'){
                            cart[0].quantity--;
                            if(cart[0].quantity<1){
                                res.json({message: 'Minimum limit reached', quantity: 1, price: (1*products[0].price)})
                                return;
                            }
                        }
                        updateCartQuantity({quantity: cart[0].quantity,price: products[0].price, user_id: req.session.userid, product_id: req.body.id})
                        .then((response)=>{
                            if(response.affectedRows==0)
                                res.json({message: 'Unable to add the product', quantity: cart[0].quantity--, price: (cart[0].quantity-- * products[0].price)})
                            else
                                res.json({message: 'updated',quantity: cart[0].quantity, price: (cart[0].quantity-- * products[0].price)});
                        }) 
                    }
                })
            }
        })
    }
}

async function delete_cart_product(req,res){
    if (req.session.userid) {
        deleteCartByID({userid: req.session.userid,id: req.body.id})
        .then(result=>{
            if(result.affectedRows!=0)
                res.json({message: 'deleted'})
            else
                res.json({message: 'Failed to delete the item'})
        })
    }
}

function show_order(req,res){
    if(req.session.userid && req.session.role === 'user')
        res.render('order',{username: req.session.user_id})
    else
        res.redirect('/')
}

async function place_order(req,res){
    getOrder({user_id: req.session.userid})
    .then(response=>{
        if(response.length<1){
            res.status(403).json({message: "Failed to place order"})
            return;
        }
        response.forEach(element => {
            const sel={
                product_id: element.product_id,
                seller_id: element.seller_id,
                bill: element.bill,
                quantity: element.quantity
            }
            const address = req.body.house_no+','+req.body.city+','+req.body.state;
            const qry = {
                user_id: req.session.userid,
                reciver: req.body.user_name,
                contact: req.body.contact_no,
                address: address,
                landmark: req.body.landmark || '',
                payment: req.body.payment_option
            }
            placeOrder(qry,sel)
            .then(response=>{
                if(response.length<0){
                    res.status(403).json({message: 'Order Placing Failed'})
                    return;
                }
                deleteCartByID({userid: req.session.userid,id: element.product_id});
            })
            .catch(err=>{
                console.log({message: err})
                return;
            })
        });
        res.json({message: 'Order Placed sucessfully'})
    })
}

function show_my_order(req,res){
    if(!req.session.userid || req.session.role!='user')
        res.redirect('/')
    else
        res.render('myorders',{username: req.session.username})
}

function send_my_order(req,res){
    userOrders({id: req.session.userid})
    .then(response=>{
        if(response.length<1){
            res.json({message: 'No order details to show',orders: null})
            return;
        }
        res.json({message: null,orders: response})
    })
}

function cancel_order(req,res){
    cancelOrder({order_id: req.body.id, reason: req.body.reason})
    .then(response=>{
        if(response.affectedRows==0){
            res.json({message: 'Unable to delete the order',status: 'failed'})
            return;
        }
        res.json({message: 'Order Canceled',status: 'canceled'})
    })
}

module.exports = {
    show_dashboard,
    send_products,
    // show_cart,
    send_cart,
    add_to_cart,
    // inc_cart_product,
    // dec_cart_product,
    update_quantity,
    delete_cart_product,
    show_order,
    place_order,
    show_my_order,
    send_my_order,
    cancel_order,
}