<<<<<<< HEAD
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const path=require("path");
const port=8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MongoDB connection
const MONGO_URL="mongodb://127.0.0.1:27017/Event"
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

//Home page
app.get("/",(req,res)=>{
    res.render("listing/start.ejs");
});

//POST request to submit form data
app.post("/submit", (req, res) => {
    const listing = new Listing({
        title: req.body.title,
        organizer: req.body.organizer,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        link: req.body.link,
        description: req.body.description
    });
    listing.save().then(() => {
        console.log("Data saved!");
        res.send("Data saved!");
    }).catch((err) => {
        console.error("Error saving data:", err);
        res.status(500).send("Error saving data");
    });
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
 
