const mongoose = require('mongoose');
mongoose.connect(process.env.mongoDB_URL).then(()=>{
    console.log('Connection established to Mongo DB');
}).catch(()=>{
    console.log('Mongo DB No Connetion');
})