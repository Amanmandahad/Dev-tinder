const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema(
    {
      fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,        
      },
      
      toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,        
      },

       status : {
        required : true,
        enum : {
            values : ["ignore","interested","accepted","rejected"],
            message : `{value} is incorrect status type}`
        }
       }
    },
    { timestamps: true }
)

const ConnectionRequest = mongoose.model("ConnectionRequestSchema",connectionRequestSchema)
 module.exports = ConnectionRequest;


//In the above code, we are defining a schema for connection requests.