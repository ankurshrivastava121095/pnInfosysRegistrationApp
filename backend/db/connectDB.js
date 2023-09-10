const mongoose = require('mongoose');

 
const connectDB = ()=>{
    // return mongoose.connect(process.env.DB_URL_LOCAL) 
    return mongoose.connect(process.env.DB_URL) 
    .then((data)=>{
        console.log(`Mongodb connected with server:${data.connection.host}`);
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports  =  connectDB