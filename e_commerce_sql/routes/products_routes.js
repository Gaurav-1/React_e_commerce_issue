const express = require('express');
const router = express.Router();

const {
    show_dashboard,
    send_products,
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
} = require('../controllers/product_controller')


router.get('/dashboard',show_dashboard)

router.get('/get_products',send_products)

router.post('/add_cart',add_to_cart)

router.get('/cart',send_cart)

router.post('/update_quantity',update_quantity);
// router.post('/increase',inc_cart_product);
// router.post('/decrease',dec_cart_product);
router.post('/delete',delete_cart_product);

router.route('/order')
.get(show_order)
.post(place_order)

router.route('/my_order')
.get(send_my_order)
router.post('/cancel_my_order',cancel_order);

module.exports = router