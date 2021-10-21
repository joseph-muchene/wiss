const express = require("express");
const router = express.Router();
const {
  createpost,
  postedById,
  listByuser,
  listNewFeed,
  removePost,
  likePost,
  unlikePost,
  Addcomment,
  getAllposts,
  photo,
  removeComment,
  getPost,
  updatePost,
} = require("../controller/post");
const { userById } = require("../controller/user");
const { requireSignin, isAuth } = require("../controller/auth");
router.post("/create/new/post/:userId", createpost, requireSignin, isAuth);
router.get("/posts/photo/:postId", photo);
router.get("/posts/by/:userId", listByuser);
router.get("/post/:postId", getPost);
router.get("/posts/feed/:userId", requireSignin, isAuth, listNewFeed);
router.get("/posts/", getAllposts);
router.put("/posts/like/:userId", likePost);
router.put("/posts/unlike/:userId", unlikePost);
router.put("/posts/comment/:userId", Addcomment, requireSignin, isAuth);
router.put("/posts/uncomment/:userId", removeComment);
router.delete("/remove/post/:postId", removePost);
router.put("/update/post/:postId", updatePost);
router.param("userId", userById);
router.param("postId", postedById);
module.exports = router;
