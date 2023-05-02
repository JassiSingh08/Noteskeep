const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

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

      //check wether same email user exist already or not
      let user = User.findOne({ email: req.body.email });
      if(user) {
        return res.status(400).json({error: "Sorry the user with same email already exists"})
      }
      user = await User.create({ 
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      })
        // .then(user => res.json(user))
        // .catch(err => {res.json({error: 'Please Enter a unique value'})} ); 

      return res.send(req.body);
    }

    res.send({ errors: errors.array() }); // req.status(400).json({errors:errors.array()});
  }
);

module.exports = router;




