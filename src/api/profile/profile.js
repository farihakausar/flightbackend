const express = require("express");
const router = express.Router();

const { getAllMsgs } = require("./controllers/getAllMsgs");

const { getFavAds } = require("./controllers/getFavAds");
const { getPayment } = require("./controllers/getPayment");
const { getSavedSearch } = require("./controllers/getSavedSearch");
const { paymentMethods } = require("./controllers/paymentMethods");

router.get("/bookRoom", getAllMsgs);
router.get("/bookRoom", getFavAds);
router.get("/bookRoom", getPayment);
router.get("/bookRoom", getSavedSearch);
router.post("/bookRoom", paymentMethods);

module.exports = router;
