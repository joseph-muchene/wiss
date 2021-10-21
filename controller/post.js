const formidable = require("formidable");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");
const Post = require("../models/post.model");
const User = require("../models/user.model");
const _ = require("lodash");
exports.createpost = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let post = new Post(fields);
    post.postedBy = req.profile;

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should  be less than 1mb in size",
        });
      }
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if (err) {
        console.log("POST CREATE ERROR ", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.postedById = async (req, res, next, id) => {
  try {
    let post = await Post.findById(id).populate("postedBy", "_id name").exec();
    if (!post)
      return res.status(400).json({
        error: "Post not found",
      });
    req.post = post;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve the post",
    });
  }
};

exports.photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType);
  next();
  return res.send(req.post.photo.data);
};
exports.listByuser = async (req, res) => {
  try {
    let posts = await Post.find({ postedBy: req.profile._id })
      .select("-photo")
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .sort("-created")
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.listNewFeed = async (req, res) => {
  let following = req.profile.following;
  following.push(req.profile._id);
  try {
    let posts = await Post.find({ postedBy: { $in: req.profile.following } })
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name")
      .select("-photo")
      .sort("-created")
      .exec();
    res.json(posts);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.removePost = async (req, res) => {
  let post = req.post;
  try {
    let deletedPost = await post.remove();
    res.json(deletedPost);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.profile.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.profile.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.profile.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.profile.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.Addcomment = async (req, res) => {
  try {
    const user = await User.findById(req.profile.id)
      .select("-hashed_password")
      .select("-salt");
    const post = await Post.findById(req.body.postId);

    const newComment = {
      text: req.body.text,
      name: user.name,
      user: req.profile.id,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    if (err.message) {
      return res.status(400).json({
        error: "Text is required",
      });
    }

    res.status(500).send("Server Error");
  }
};

exports.removeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.body.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.profile.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.body.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

exports.getAllposts = async (req, res) => {
  const PAGE_SIZE = 6;
  const page = parseInt(req.query.page || "0");
  const total = await Post.countDocuments({});
  const posts = await Post.find({})
    .select("-photo")
    .populate("postedBy", " name")
    .limit(PAGE_SIZE)
    .sort("-created")
    .skip(PAGE_SIZE * page);
  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    posts,
  });
};

exports.getPost = (req, res) => {
  Post.findById(req.post._id)
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err || !result) {
        return res.status(400).json({
          msg: "Post not found",
        });
      }
      res.json(result);
    });
};

exports.updatePost = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    let post = req.post;
    post = _.extend(post, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb in size",
        });
      }
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }

    post.save((err, result) => {
      if (err) {
        console.log("POST UPDATE ERROR", err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};
