const express = require("express");
const router = express.Router();
const { getKOL, getKOLpnl, getKOLsentiment, getKOLoverall, searchKOL, getPnLrank, getSentimentRank } = require("../controllers/getKOLcontroller");


// get the overall sorted KOL list
router.get("/getKOLoverall", getKOLoverall);

// get the KOL list by pnl
router.get("/getKOLpnl", getKOLpnl);

// get the KOL list by sentiment
router.get("/getKOLsentiment", getKOLsentiment);

// get a specific KOL by id
router.get("/:id", getKOL);

// search for a KOL by twitterName or walletAddress or IRLname
router.get("/search/:query", searchKOL);

// get the PnL based rank
router.get("/getPnLRank", getPnLrank);

// get the sentiment based rank
router.get("/getSentimentRank", getSentimentRank);

module.exports = router;