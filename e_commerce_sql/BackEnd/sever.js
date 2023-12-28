const express = require('express');
const session = require('express-session');
const userRouter = require('../routes/user_routes')
const productRouter = require('../routes/products_routes')
const adminRouter = require('../routes/admin_routes')
const sellerRouter = require('../routes/seller_routes')
const expoterRouter = require('../routes/expoter_routes')
const deliveryPersonRouter = require('../routes/deliveryperson_routes')
// const queriesRouter = require('../routes/create_querys.js');
// const db = require('./connection')
const cors = require('cors');
mysql = require('mysql')
const path = require('path')
const multer = require('multer')

const app = express();

const config = {
    origin: ['http://localhost:5173'],
    credentials: true,
}

app.use(cors(config))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log("Body" + req.body);
    console.log("path" + req.path);
    next();
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (file.fieldname == 'store_image')
            cb(null, path.join(__dirname, '..', '/public/uploads/store_images'))
        else if (file.fieldname == 'profile_image')
            cb(null, path.join(__dirname, '..', '/public/uploads/profile_images'))
        else if (file.fieldname == 'aadhar_image')
            cb(null, path.join(__dirname, '..', '/public/uploads/aadhar_images'))
        else if (file.fieldname == 'pan_image')
            cb(null, path.join(__dirname, '..', '/public/uploads/pan_images'))
        else
            cb(null, path.join(__dirname, '..', '/public/uploads/product_images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage });
app.use(upload.any());


conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e_commerce'
});

conn.connect();


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '..', '/public')))

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))


app.listen(3000, (req, res) => {
    console.log('Hearing PORT 3000')
})

//user page requests -------
app.get('/', main)
app.get('/user', main)
app.get('/login', main)
app.use('/user', userRouter)
//---------------------------

//products requests ---------
app.get('/dashboard', (req, res) => {
    res.redirect('/product/dashboard');
})
app.use('/product', productRouter)
//---------------------------

//admin requests ------------
app.use('/admin', upload.any(), adminRouter)
//---------------------------

//seller requests ---------------
app.use('/seller', upload.any(), sellerRouter)
//-------------------------------

// expoter requests -------------
app.use('/expoter', expoterRouter)
//-------------------------------

// expoter requests -------------
app.use('/deliveryperson', deliveryPersonRouter)
//-------------------------------

//queries request ----------------
// app.use('/create',queriesRouter)
//--------------------------------

function main(req, res) {
    res.redirect('/user/login');
}
