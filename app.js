const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");
const permission = require("./models/permission.js");
const path = require("path");
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URL = "mongodb://127.0.0.1:27017/Event";
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', async (req, res) => {
  const events = await Listing.find(); 
  res.render("listing/calender.ejs", { events });
});

// Form Page
app.get("/form", (req, res) => {
  res.render("listing/form.ejs");
});

// POST to submit form data
app.post("/submit", (req, res) => {
  const listing = new Listing({
    title: req.body.title,
    organizer: req.body.organizer,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    link: req.body.link,
    description: req.body.description,
  });
  listing
    .save()
    .then(() => {
      console.log("Data saved!");
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error saving data:", err);
      res.status(500).send("Error saving data");
    });
});

// Login page
app.get("/login", (req, res) => {
  res.render("listing/login.ejs");
});

// Signup page
app.get("/signup", (req, res) => {
  res.render("listing/signup.ejs");
});

// Signup POST route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const found = await permission.findOne({ email: email });
    if (found) {
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.redirect("/login");
    } else {
      return res.status(403).render("listing/signup.ejs", {
        error: "Permission denied",
      });
    }
  } catch (err) {
    return res.status(500).render("listing/signup.ejs", {
      error: "Server error, please try again",
    });
  }
});

// Login POST route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      // Login successful
      res.redirect("/form");
    } else {
      res.status(403).render("listing/login.ejs", { error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).render("listing/login.ejs", { error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
