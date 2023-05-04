const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Jassiisagoodb$oy";

//Create a user using : Post "/api/auth/createuser". Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);

    //if there is no error create user with the data else show error
    if (errors.isEmpty()) {
      try {
        //check wether same email user exist already or not
        let user = await User.findOne({ email: req.body.email });
        if (user) { 
          return res.status(400).json({ error: "Sorry the user with same email already exists" });
        }
        
        const salt = await   bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //create user 
        user = await User.create({
          name: req.body.name,
          password: secPass,
          email: req.body.email,
        });

        /*
        .then(user => res.json(user))  function is set to await so .then not needed
        .catch(err => {res.json({error: 'Please Enter a unique value'})} );
         return res.send(req.body && user);
        */

        //sending json web token in response to user rather sending username and pass
        const data = {
          user:{
            id: user.id
          }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({authToken});

      } 
      catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
      }
    }

    // res.send({ errors: errors.array() }); // req.status(400).json({errors:errors.array()});
  }
);

module.exports = router;
