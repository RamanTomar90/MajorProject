const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  // FIXED: handle search query from navbar search bar
  let query = {};
  if (req.query.q && req.query.q.trim() !== "") {
    const q = req.query.q.trim();
    query = {
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
      ],
    };
  }
  const allListings = await Listing.find(query);
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  res.render("listings/new");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  // FIXED: ensure geometry exists so map.js doesn't crash
  if (!listing.geometry) {
    listing.geometry = { type: "Point", coordinates: [0, 0] };
  }

  res.render("listings/show", { listing, mapToken: process.env.MAP_TOKEN });
};

module.exports.createListing = async (req, res) => {
  let response = await geoCodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
  }).send();

  if (!response.body.features.length) {
    req.flash("error", "Invalid location");
    return res.redirect("/listings/new");
  }

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // FIXED: only set image if a file was actually uploaded
  if (req.file) {
    newListing.image = { url: req.file.path, filename: req.file.filename };
  }

  
  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "New Listing Created");
  return res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  // FIXED: guard against missing image
  let originalImageUrl = (listing.image && listing.image.url) ? listing.image.url : "";
  if (originalImageUrl) {
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  }

  res.render("listings/edit", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  return res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted");
  return res.redirect("/listings");
};