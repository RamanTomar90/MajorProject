const express = require("express");
const router = express.Router(); 
const Listing = require("../models/listing.js");  
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");

const upload = multer({ storage });

// index or create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(
  isLoggedIn,
  upload.single("listing[image]"),  // FIXED: multer must run BEFORE validateListing
  validateListing,
  wrapAsync(listingController.createListing)
);

// NEW
router.get("/new", isLoggedIn, listingController.renderNewForm);

// show / update / delete
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),  // FIXED: multer must run BEFORE validateListing
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// EDIT
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;