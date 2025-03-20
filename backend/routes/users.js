const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getVerificationMail, verifyUser} = require("../controllers/userControllers");

// signup route
router.post("/register", registerUser);

// login route
router.post("/login", loginUser);

// get verification mail
router.post("/getVerificationMail", getVerificationMail);
// get number of tires
// router.get("/getNumberOfTries/:email", getNumberOfTries);

// verify user
router.get("/verify/:token", verifyUser);



module.exports = router;