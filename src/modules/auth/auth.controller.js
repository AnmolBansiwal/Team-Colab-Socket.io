const AuthService= require("./auth.service");
class AuthController{
    static async register(req,res){
 try{
    const user= await AuthService.register(req.body);
    res.status(201).json({
        success:true,
        data: user
    });

 }catch(error){
    res.status(400).json({
        success: false,
        message: error.message
    });
 }
    }
    static async login(req,res){
        try{
            const data= await AuthService.login(req.body);
            res.json({
                success: data,
                data
            });
        }catch(err){
            res.status(400).json({
                success: true,
                message: err.message
            });
        }
    }
}
module.exports= AuthController;