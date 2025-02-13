const mongoose = require('mongoose');
const userKeySchema = mongoose.Schema({
    Password:String,
    User: String
    
})
const userKeyData = mongoose.model('userkey',userKeySchema);
module.exports = userKeyData;