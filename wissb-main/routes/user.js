const express = require("express");
const router = express.Router();

const {
  userById,
  read,
  list,
  update,
  remove,
  photo,
} = require("../controller/user");

router.get("/users", list);
router.get("/user/photo/:userId", photo);

router.get("/users/read/:userId", read);
router.put("/user/update/:userId", update);
router.delete("/user/delete/:userId", remove);
router.param("userId", userById);
module.exports = router;
