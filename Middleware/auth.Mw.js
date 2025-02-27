const jwt =require('jsonwebtoken');

const authmiddleware=(...allowedRole)=>{
    return(rea,res,next)=>{
        let token=req.headers.authorisation.split("")[1];
        if(!token){
            res.status(403).json({msg:"token not found"})
        }else{
            var decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
            if(decoded){
                if(allowedRole.includes(decoded.role)){
                    req.body.userId=decoded.userId;
                    next()
                }
                else{
                    res.status(403).json({msg:"unauthorised"})
                }
            }
            else{
                res.status(403).json({msg:"please login again"})
            }
        }
    }
}

module.exports=authmiddleware;