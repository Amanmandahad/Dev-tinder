const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema(
    {
      fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,        
      },
      
      toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,        
      },

       status : {
        type : String,
        required : true,
        
        enum : {
            values : ["ignored","interested","accepted","rejected"],
            message : `{value} is incorrect status type}`
        }
       }
    },
    { timestamps: true }
)


connectionRequestSchema.index({fromUserId : 1,toUserId: 1})

connectionRequestSchema.pre("save",function(next){
  const connectionrequest = this;
  if(connectionrequest.fromUserId.equals(connectionrequest.toUserId)){
    throw new Error("Request cannot be sent to yourself")
  }
  next();
})










const ConnectionRequestmodel = mongoose.model("ConnectionRequestSchema",connectionRequestSchema)
 module.exports = ConnectionRequestmodel;


//In the above code, we are defining a schema for connection requests.