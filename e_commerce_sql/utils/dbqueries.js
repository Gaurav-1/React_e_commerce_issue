const { TIMESTAMP, DATE } = require('mysql/lib/protocol/constants/types');
const {v4:uuid} = require('uuid');

// mysql =  require('mysql')
// conn = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'e_commerce'
// });

// conn.connect();

function findUser(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM user WHERE mail="${qry.mail}"`,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

function findUserById(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM user WHERE user_id="${qry.user_id}"`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

function insertSeller(qry){
    return new Promise((resolve,reject)=>{
        const insQry = `INSERT INTO seller VALUES("${qry.seller_id}",${qry.isApproved},${qry.contact},"${qry.business_name}","${qry.business_address}","${qry.store_image}","${qry.profile_image}","${qry.gst_number}","${qry.aadhar_id}","${qry.aadhar_image}","${qry.pan_id}","${qry.pan_image}");`
        conn.query(insQry,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function findSellerById(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT isApproved FROM seller WHERE seller_id="${qry.user_id}"`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

function findNewSeller(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM seller CROSS JOIN user ON seller.seller_id = user.user_id WHERE seller_id IN (SELECT seller_id FROM seller WHERE isApproved=${0});`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function approveSeller(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE seller SET isApproved=${1} WHERE seller_id='${qry.id}';`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function rejectSeller(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`DELETE FROM user WHERE user_id='${qry.id}';`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function findAllProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM product LIMIT ${qry.limit} OFFSET ${qry.start};`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

function findProductById(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM product WHERE product_id="${qry.product_id}"`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

function findSellerProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM product WHERE seller_id="${qry.seller_id}"`,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

function findAllCart(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT product.product_id, product.name, cart.bill, product.image, cart.quantity FROM product CROSS JOIN cart ON cart.product_id = product.product_id WHERE cart.user_id='${qry.user_id}';`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

function findCartById(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM cart WHERE user_id='${qry.user_id}' AND product_id='${qry.product_id}';`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

function updateCartQuantity(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE cart SET quantity=${qry.quantity}, bill=${qry.quantity*qry.price} WHERE user_id='${qry.user_id}' AND product_id='${qry.product_id}';`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function deleteCartByID(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`DELETE FROM cart Where user_id='${qry.userid}' AND product_id='${qry.id}';`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function updateProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE product SET name='${qry.product_name}',description='${qry.desc}',price=${qry.price},quantity=${qry.quantity} WHERE product_id='${qry.product_id}'`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function seller_total_products(qry){
    console.log(`SELECT COUNT(*) AS total FROM product WHERE seller_id="${qry.seller_id}"`);
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT COUNT(*) AS total FROM product WHERE seller_id="${qry.seller_id}"`,(err,result)=>{
            console.log('Error: ',err,'\nResult: ',result);
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function addProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO product VALUES("${uuid()}","${qry.seller_id}","${qry.name}","${qry.description}",${qry.price},${qry.quantity},"${qry.image}")`,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

function addSellerProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO producttoapprove VALUES("${uuid()}","${qry.seller_id}","${qry.name}","${qry.description}",${qry.price},${qry.quantity},"${qry.image}","","");`,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result);
        })
    })
}

async function approveProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE producttoapprove SET ApprovedBy='${qry.id}' WHERE product_id='${qry.product_id}';`,(err,result)=>{
            if(err)
                reject(err)
            else{
                resolve(result)
            }
        })
    })
}

function rejectProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`DELETE FROM producttoapprove WHERE product_id='${qry.id}';`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function findSellerProducts(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT * FROM producttoapprove WHERE ApprovedBy="" LIMIT ${qry.limit} OFFSET ${qry.start}`,(err,result)=>{
            if(err){
                reject(err);
            }
            resolve(result);
        })
    })
}

function deleteProduct(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`DELETE FROM product WHERE product_id='${qry.product_id}'`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function getOrder(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT product.product_id, product.seller_id, cart.bill, cart.quantity FROM product CROSS JOIN cart ON cart.product_id = product.product_id WHERE cart.user_id='${qry.user_id}';`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function placeOrder(qry,sel){
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO orders VALUE('${uuid()}','${qry.user_id}','${qry.reciver}',${qry.contact},'${sel.product_id}','${sel.seller_id}','${sel.seller_id}','${new Date().toISOString()}',${sel.quantity},'${qry.address}','${qry.landmark}','${new Date(new Date().getTime() + 168 * 60 * 60 * 1000).toISOString()}', '','','waiting',${sel.bill},'${qry.payment}',${true});`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function showSellerOrder(qry){
    console.log(qry);
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT p.product_id, p.name, p.description, p.image, o.order_id, o.order_date, o.order_quantity, o.shipping_address, o.landmark, o.order_bill, o.payment_mode, o.payment_status FROM product AS p CROSS JOIN orders AS o ON o.product_id = p.product_id WHERE o.seller_id = '${qry.id}' AND order_status IN (${qry.status});`,async (err,result)=>{
            if(result.length<1){
                resolve(result);
                return;
            }
            if(err)
                reject(err)
            else if(qry.status == "'approve'"){
                console.log("skjdlkajsdalksjdl");
                conn.query(`SELECT e.expoter_id, u.name, e.expoter_state FROM user AS u JOIN stateexpoter AS e ON u.user_id = e.expoter_id;`,(errr,response)=>{
                    if(errr){
                        reject(errr)
                    }
                    else{
                        result.push(response)
                        resolve(result)
                    }
                })
                return;
            } else {
                resolve(result)
            }
        })
    })
}

function updateOrderStatus(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE orders SET order_status = '${qry.status}', expoter_id = '${qry.expoter_id}' WHERE order_id = '${qry.order_id}';`,(err,result)=>{
            if(err)
                reject(err);
            else
                resolve(result)
        })
    })
}

function userOrders(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT p.product_id, p.name, p.description, p.image, o.order_id, o.order_date, o.order_quantity, o.delivery_date, o.order_bill, o.order_status FROM product AS p CROSS JOIN orders AS o ON o.product_id = p.product_id WHERE o.user_id = '${qry.id}' order by o.order_date desc;`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result);
        })
    })
}

function cancelOrder(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`UPDATE orders SET cancel_date='${new Date().toISOString()}', cancel_reason='${qry.reason}', order_status='cancel' WHERE order_id='${qry.order_id}';`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function cityExpoter(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO cityexpoter VALUES('${qry.expoter_id}','${qry.city}',${qry.pincode},'${qry.state}','${qry.warehouse}');`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function stateExpoter(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO stateexpoter VALUES('${qry.expoter_id}','${qry.state}','${qry.warehouse}');`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function deliveryPerson(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`INSERT INTO deliverypersons VALUES('${qry.expoter_id}','${qry.city}',${qry.pincode},'${qry.state}','${qry.warehouse}');`,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}

function showExpoterOrder(qry){
    return new Promise((resolve,reject)=>{
        conn.query(`SELECT p.product_id, p.name, p.description, p.image, o.order_id, o.order_date, o.order_quantity, o.shipping_address, o.landmark, o.order_bill, o.payment_mode, o.payment_status FROM product AS p CROSS JOIN orders AS o ON o.product_id = p.product_id WHERE o.expoter_id = '${qry.id}' AND order_status = '${qry.status}';`,async (err,result)=>{
            if(result.length<1){
                resolve(result);
                return;
            }
            if(err)
                reject(err)
            else{
                if(qry.status == 'InState'){
                    await conn.query(`SELECT DISTINCT e.expoter_id, u.name, e.expoter_state FROM user AS u JOIN stateexpoter AS s CROSS JOIN cityexpoter AS e ON u.user_id = e.expoter_id WHERE e.expoter_state = e.expoter_state`,(errr,response)=>{
                        if(errr){
                            reject(errr)
                        }
                        else{
                            result.push(response)
                            // console.log(result);
                            resolve(result)
                        }
                    })
                    return;
                }
                else if(qry.status == 'InCity'){
                    await conn.query(`SELECT DISTINCT e.expoter_id, u.name, e.expoter_state FROM user AS u CROSS JOIN deliverypersons AS e ON u.user_id = e.expoter_id WHERE e.expoter_warehouse = (SELECT expoter_warehouse FROM cityexpoter WHERE expoter_id = '${qry.id}');`,(errr,response)=>{
                        if(errr){
                            reject(errr)
                        }
                        else{
                            result.push(response)
                            resolve(result)
                        }
                    })
                    return;
                }
                    resolve(result)
            }
        })
    })
}

//addBulk({id: '106def38-905e-4864-b9d6-8d8cec1a6630'})

function addBulk(qry){
        fetch('https://fakestoreapi.com/products')
        .then(res=>{ return res.json(); })
        .then(response=>{
            for(let i=0;i<10;i++){
                response.forEach(ele=>{
                    let ob ={
                        seller_id: qry.id,
                        name: ele.title,
                        description: ele.description,
                        price: ele.price,
                        quantity: 20,
                        image: ele.image
                    }
                    addSellerProduct(ob)
                    .then(res=>{
                        if(res.affectedRows!=0){
                            console.log('A product added');
                        }
                    })
                    .catch(err=>{ console.log(err); })
                })
            }
        })
        .catch(err=>{ console.log(err); })

}

function getSellerReport(qry){
    console.log(`SELECT count(o.order_id) as orderCount, sum(o.order_quantity) as orderQuantity, o.order_status, DATE(o.order_date) as orderDate, DATE(o.cancel_date) as cancelDate, p.name, p.quantity as productQuantity from orders as o join product as p on o.product_id = p.product_id where o.seller_id = '${qry.id}' GROUP BY o.${qry.col} ORDER BY o.${qry.col};`);
    return new Promise((resolve, reject)=>{
        conn.query(`SELECT DISTINCT count(o.order_id) as orderCount, sum(o.order_quantity) as orderQuantity, o.order_status, o.order_date as orderDate, o.cancel_date as cancelDate, p.name, p.quantity as productQuantity from orders as o join product as p on o.product_id = p.product_id where o.seller_id = '${qry.id}' GROUP BY o.${qry.col} ORDER BY o.${qry.col};`,(err,result)=>{
            console.log(result);
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}


module.exports = {
    findUser,
    findUserById,
    findSellerById,
    findNewSeller,
    approveSeller,
    rejectSeller,
    findAllProduct,
    findProductById,
    findSellerProduct,
    findSellerProducts,
    findAllCart,
    findCartById,
    updateCartQuantity,
    deleteCartByID,
    updateProduct,
    addProduct,
    addSellerProduct,
    deleteProduct,
    insertSeller,
    approveProduct,
    rejectProduct,
    getOrder,
    placeOrder,
    showSellerOrder,
    updateOrderStatus,
    userOrders,
    cancelOrder,
    cityExpoter,
    stateExpoter,
    showExpoterOrder,
    deliveryPerson,
    addBulk,
    getSellerReport,
    seller_total_products,
}