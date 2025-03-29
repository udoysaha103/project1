const userModel = require("../models/userModel.js");
const unverifiedKOLModel = require("../models/unverifiedKOLmodel.js");
const verifiedKOLModel = require("../models/verifiedKOLmodel.js");
const reviewModel = require("../models/reviewModel");

const verifyAdmin = async (req, res) => {
    userModel.findById(req.user._id)
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "You need to sign in to access!" });
            }
            if (user._doc.isAdmin) {
                return res.status(200).json({ message: "You are an admin" });
            } else {
                return res.status(403).json({ message: "You are not authorized to access this resource" });
            }
        }
        ).catch((error) => {
            console.error("Error fetching user:", error);
            return res.status(500).json({ message: "Internal server error" });
        });
}

const getUnverifiedKOLs = async (req, res) => {
    if(!req.user || req.user._doc.isAdmin === false) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    try {
        const unverifiedKOLs = await unverifiedKOLModel.find({});
        res.status(200).json(unverifiedKOLs);
    }
    catch (error) {
        console.error("Error fetching unverified KOLs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getVerifiedKOLs = async (req, res) => {
    if(!req.user || req.user._doc.isAdmin === false) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    try {
        const verifiedKOLs = await verifiedKOLModel.find({});
        res.status(200).json(verifiedKOLs);
    }
    catch (error) {
        console.error("Error fetching verified KOLs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const editUnverifiedKOL = async (req, res) => {
    if(!req.user || req.user._doc.isAdmin === false) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }

    const { _id, twitterName, IRLname, country, walletAddress, showAddress, photoPath, twitterLink, discordLink, telegramLink, youtubeLink, streamLink } = req.body;

    // edit the unverified KOL
    try {
        const unverifiedKOL = await unverifiedKOLModel.findByIdAndUpdate(_id, { twitterName, IRLname, country, walletAddress, showAddress, photoPath, twitterLink, discordLink, telegramLink, youtubeLink, streamLink }, { new: true });
        if (!unverifiedKOL) {
            return res.status(404).json({ message: "Unverified KOL not found" });
        }
        res.status(200).json(unverifiedKOL);
    } catch (error) {
        console.error("Error verifying KOL:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const editVerifiedKOL = async (req, res) => {
    if(!req.user || req.user._doc.isAdmin === false) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    
    const { _id, twitterName, IRLname, country, walletAddress, showAddress, photoPath, twitterLink, discordLink, telegramLink, youtubeLink, streamLink, blueTick } = req.body;

    // edit the verified KOL
    try{
        const verifiedKOL = await verifiedKOLModel.findByIdAndUpdate(_id, { twitterName, IRLname, country, walletAddress, showAddress, photoPath, twitterLink, discordLink, telegramLink, youtubeLink, streamLink, verifiedByAdmin: blueTick }, { new: true });
        if (!verifiedKOL) {
            return res.status(404).json({ message: "Verified KOL not found" });
        }
        res.status(200).json(verifiedKOL);
    }
    catch (error) {
        console.error("Error verifying KOL:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteVerifiedKOL = async (req, res) => {
    if(!req.user || req.user._doc.isAdmin === false) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    
    const { _id } = req.body;

    // delete the verified KOL
    try{
        const verifiedKOL = await verifiedKOLModel.findByIdAndDelete(_id);
        if (!verifiedKOL) {
            return res.status(404).json({ message: "Verified KOL not found" });
        }
        res.status(200).json(verifiedKOL);
    }
    catch (error) {
        console.error("Error verifying KOL:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getReviews = async (req, res) => {
    if(!req.user || req.user._doc.isAdmin === false) {
        return res.status(403).json({ message: "You are not authorized to access this resource" });
    }
    
    // fetch all reviews and join the review giver and receiver data
    // _id
    // 67e413c0cfd916e12b9a1603
    // reviewDescription
    // ""
    // reviewType
    // true
    // reviewGiver
    // 67e413accfd916e12b9a15cd
    // reviewReceiver
    // 67e3d717e311df947fd249f9

    // likedBy
    // Array (empty)

    // dislikedBy
    // Array (empty)
    // datePosted
    // 2025-03-26T14:48:32.838+00:00

    try{
        const reviews = await reviewModel.find({}).populate("reviewGiver").populate("reviewReceiver");
        if (!reviews) {
            return res.status(404).json({ message: "Reviews not found" });
        }
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error("Error verifying KOL:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { verifyAdmin, getUnverifiedKOLs, getVerifiedKOLs, editUnverifiedKOL, editVerifiedKOL, deleteVerifiedKOL, getReviews };