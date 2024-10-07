const express = require("express");
const router = express.Router();

const { contactUs } = require("./controllers/contactUs");
const {
  createBusinessProfile,
} = require("./controllers/createBusinessProfile");
const { createTestimonial } = require("./controllers/createTestimonial");
const { getAllTestimonial } = require("./controllers/getAllTestimonial");
const { getAllThings } = require("./controllers/getAllThings");
const { getThingByid } = require("./controllers/getThingByid");

router.post("/create/:id", createTestimonial);
router.get("/getAll", getAllTestimonial);
router.post("/contact", contactUs);

router.post("/createProfile", createBusinessProfile);
router.get("/getSaleItems", getAllThings);
router.get("/specific/:id", getThingByid);
module.exports = router;
