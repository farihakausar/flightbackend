const express = require("express");
const router = express.Router();

const { getBlogById } = require("./controllers/getBlogById");
const { commentOnBlog } = require("./controllers/commentOnBlog");
const { blogMalke } = require("./controllers/blogMalke");
const { getAllBlogs } = require("./controllers/getAllBlogs");
router.get("/specific/:id", getBlogById);
router.post("/commentOnBlog", commentOnBlog);
router.post("/blogMake", blogMalke);
router.get("/getAllBlogs", getAllBlogs);
module.exports = router;
