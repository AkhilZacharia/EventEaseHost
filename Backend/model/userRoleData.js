const mongoose = require('mongoose');
const userRoleSchema = mongoose.Schema({
    RoleId: String,
    User: String
    
})
const userRoleData = mongoose.model('userrole',userRoleSchema);
module.exports = userRoleData;