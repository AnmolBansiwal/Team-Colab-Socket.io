const bcrypt= require("bcrypt");

const jwt= require("jsonwebtoken");
const user= require("../users/user.model");
class AuthService{
    static async register(data){
        const existingUser= await User.findOne({
            email: data.email
        });
        if(existingUser){
            throw new Error("User already exists:",data.email);
        }
        const hashedPassword= await bcrypt.hash(data.password, 10);
        const user= await User.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        });
        return user;
    }
    static async login(data){
        const user= await user.findOne({
            email: data.email
        });
        if(!user){
            throw new Error("Invalid credentials"); 
        }
        const isPasswordCorrect= await bcrypt.compare(
            data.password,
            user.password
        );
        if(!isPasswordCorrect){
            throw Error("invalid credentials");
        }
        const token = jwt.sign({
            id:user._id,
            email: user.email
        },
    process.env.JWT_SECRET,
{
    expiresIn:"7D"
}
);
return {
    token,
    user
};
    }
}
module.export= AuthService;