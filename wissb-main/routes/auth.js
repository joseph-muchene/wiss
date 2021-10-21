const express = require("express");
const router = express.Router();
const { signin, signout } = require("../controller/auth");
const { createUser } = require("../controller/user");
router.post("/register", createUser);
router.post("/login", signin);
router.get("/signout", signout);
module.exports = router;
