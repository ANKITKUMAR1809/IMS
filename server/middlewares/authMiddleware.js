const jwt =require('jsonwebtoken');
const User=require('../models/user-model')
const authMiddleware=async(req,res,next)=>{
    const token=req.header('authorization')

    if(!token){
        res.status(401).json({
            msg:"can't gett token and not loggedin"
        })
    }

    const jwtToken= token.replace("Bearer","").trim();

    try {
        const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
        const userData=await User.findOne({email:isVerified.email}).select({password:0,})
        req.user=userData;
        req.token=token;
        req.userId=userData._id.toString();
        next();
    } catch (error) {
        
    }

}

module.exports=authMiddleware;