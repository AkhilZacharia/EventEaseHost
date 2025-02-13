const mongoose = require('mongoose');
const RoleSchema = mongoose.Schema({
    RoleId: String,
    Role: String
})
const RoleData = mongoose.model('roletable',RoleSchema);
module.exports = RoleData;