
const express = require('express');
const app = new express();
const morgan = require('morgan');

const routes= require('./routes/router');
const userRoutes= require('./routes/userRoute');
const organizerRoutes= require('./routes/organizerRoute');
const loginRoutes= require('./routes/loginRoute');
const paymentRoutes= require('./payment/paymentController');
const mailerRoute= require('./mailer/mailer');


const cors= require('cors');
app.use(cors());
require('dotenv').config();
require('./db/connectiondb');

app.use(morgan('dev'));
// app.use(express.static('public'));
app.use("/",routes);
app.use("/user",userRoutes);
app.use("/org",organizerRoutes);
app.use("/login",loginRoutes);
app.use("/payment",paymentRoutes);
app.use("/mail",mailerRoute);



app.listen(process.env.PORT, () => {
    console.log(`Server is active on Port ${process.env.PORT}`);
});