const express = require('express');
const router = express.Router();


const {
    show_signup,
    signup_seller,
    show_dashboard,
    send_products,
    update_product,
    show_add_product,
    add_product,
    delete_product,
    verify_mail,
    show_seller_order,
    send_seller_order,
    approve_order,
    show_report,
    send_report,
    total_products,
} = require('../controllers/seller_controller');

router.route('/signup')
.get(show_signup)
.post(signup_seller)

router.route('/dashboard')
.get(show_dashboard)
.post(send_products)

router.post('/update_product',update_product)

router.get('/total_products',total_products)

router.route('/add_product')
.get(show_add_product)
.post(add_product)


router.delete('/delete',delete_product);

router.get('/verify/:id',verify_mail);

router.route('/orders')
.get(show_seller_order)
.post(send_seller_order)

router.post('/approve_order',approve_order)

router.route('/report')
.get(show_report)
.post(send_report)


module.exports = router;