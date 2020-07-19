const jwt=require('jsonwebtoken')

module.exports = (req,res ,next)=>{
    try{
        console.log("Auth MiddleWare : "+ req.headers.authorization)
        let token = req.headers.authorization.split(" ")[1]


        const decodedToken = jwt.verify(token, 'MU_Secret')
        console.log("DecodedToken: "+ JSON.stringify(decodedToken));

        req.userData = decodedToken;

        next();
    }
    catch(erorr){
        res.status(401).json({
            message:"Invalid Token"
        })
    }
}
