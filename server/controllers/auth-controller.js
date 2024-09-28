const User = require("../models/user-model")
const bcrypt = require("bcryptjs")

const home = async (req, res) => {
    try {
        res.status(200).send("Express Controller Home page is Ready")
    } catch (error) {
        console.log(error)
    }
}

const eshu = async (req, res) => {
    try {
        res.status(200).send("/eshu route is in controller")
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        console.log(req.body)
        const { shopname, email, password } = req.body;

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(401).json({ msg: "Email already exist" })
        }
        const capsShopName=shopname.toUpperCase()
        const userCreated = await User.create(
            {
                shopname:capsShopName,
                email,
                password

            });
        res.status(201).json(
            {
                msg: "User Registration Successful",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString()
            }
        )
    } catch (error) {
        console.log(error)
    }
}
// login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginUser = await User.findOne({ email })
        if (!loginUser) {
            console.log(loginUser)
            return res.status(400).json({
                msg: "Invalid Credential"
            })
        }
        const loginPassword = await bcrypt.compare(password, loginUser.password);
        if (loginPassword) {
            res.status(200).json(
                {
                    msg: "User Login Successfull",
                    token: await loginUser.generateToken(),
                    userId: loginUser._id.toString()

                }
            )
            console.log(loginUser)
        }
        else {
            res.status(401).json({
                msg: "Invalid Credentials"
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: error
        })
    }
}

const user =async (req,res)=>{
    try {
        const userData= req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log("error from the user route",error);
    }
    



}
module.exports = { home, eshu, register, login,user}