const jwt =  require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('././user');

//User registration
let register = (req, res) => {
    let userName = req.body.userName;
    let email = req.body.email;
    let password = bcrypt.hashSync(req.body.password, 8);

    const user = new User({
        userName: userName,
        email: email,
        password: password
    });

    user.save().then((data) => {
        res.status(200).send("User registered successfully!");
    }).catch((err) => {
        res.status(500).send("Error occured, couldn't register user!");
    });
};

//User login
let login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        email: email
    }).then((user) => {
        let passwordIsValid = bcrypt.compareSync(password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password!"
            });
        }
        let token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });

        return res.status(200).send({
            user: {
                user: user._id,
                email: user.email,
                userName: user.userName
            },
            message: "Login successful",
            accessToken: token
        });
    }).catch((err) => {
        return res.status(500).send({
            message: err
        });
    });
};

module.exports = {register, login};