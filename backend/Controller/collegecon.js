import College from '../models/college.js';

// GET all colleges
export const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single college by slug
export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.json(college);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new college
export const createCollege = async (req, res) => {
  const college = new College({
    name: req.body.name,
    state: req.body.state,
    city: req.body.city,
    courses: req.body.courses,
    photo: req.body.photo,
    url: req.body.url,
    nirfRank: req.body.nirfRank,
    type: req.body.type,
    ownership: req.body.ownership,
    branch: req.body.branch,
    address: req.body.address,
    nearestAirport: req.body.nearestAirport,
    nearestRailwayStation: req.body.nearestRailwayStation,
    overview: req.body.overview,
        overviewPara1: req.body.overviewPara1,
        overviewPara2: req.body.overviewPara2,
        overviewPara3: req.body.overviewPara3,
        contactEmail: req.body.contactEmail,
        contactNumber: req.body.contactNumber,
        officialWebsite: req.body.officialWebsite,
        googleMapsIframe: req.body.googleMapsIframe,
  });

  try {
    const newCollege = await college.save();
    res.status(201).json(newCollege);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request
  }
};

// PUT (update) an existing college
export const updateCollege = async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }

    college.name = req.body.name || college.name;
    college.state = req.body.state || college.state;
    college.city = req.body.city || college.city;
    college.courses = req.body.courses || college.courses;
    college.photo = req.body.photo || college.photo;
    college.url = req.body.url || college.url;
    college.nirfRank = req.body.nirfRank || college.nirfRank;
    college.type = req.body.type || college.type;
    college.ownership = req.body.ownership || college.ownership;
    college.branch = req.body.branch || college.branch;
    college.address = req.body.address || college.address;
    college.nearestAirport = req.body.nearestAirport || college.nearestAirport;
    college.nearestRailwayStation = req.body.nearestRailwayStation || college.nearestRailwayStation;
    college.overview = req.body.overview || college.overview;
        college.overviewPara1 = req.body.overviewPara1 || college.overviewPara1;
        college.overviewPara2 = req.body.overviewPara2 || college.overviewPara2;
        college.overviewPara3 = req.body.overviewPara3 || college.overviewPara3;
        college.contactEmail = req.body.contactEmail || college.contactEmail;
        college.contactNumber = req.body.contactNumber || college.contactNumber;
        college.officialWebsite = req.body.officialWebsite || college.officialWebsite;
        college.googleMapsIframe = req.body.googleMapsIframe || college.googleMapsIframe;

    const updatedCollege = await college.save();
    res.json(updatedCollege);
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request
  }
};

// DELETE a college
export const deleteCollege = async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    await college.deleteOne();
    res.json({ message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
