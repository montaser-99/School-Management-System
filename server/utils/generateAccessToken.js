import jwt from "jsonwebtoken"

const generateAccessToken=(user)=>{
    const token=jwt.sign({id:user._id,role:user.role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1h"})
    return token
}


export default generateAccessToken