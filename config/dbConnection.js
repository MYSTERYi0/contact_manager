const mongoose = require("mongoose")
const uri = 'mongodb+srv://admin:admin@aryancluster.l3ixnx0.mongodb.net/mycontacs-backend?retryWrites=true&w=majority'
const connectDb = async () =>{
    try{
        const connect = await mongoose.connect(uri);
        console.log("Database Connected", connect.connection.host, connect.connection.name);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;