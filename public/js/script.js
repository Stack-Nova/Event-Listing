const inputs = ['title', 'organizer', 'date', 'time', 'location', 'link', 'description'];

    inputs.forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        const val = document.getElementById(id).value || '-';
        document.getElementById('preview-' + id).textContent = val;
      });
    });

// document.getElementById('eventForm').addEventListener('submit', function (e) {
//       Swal.fire({
//         title: 'Event Submitted 🎊',
//         text: 'Your event has been successfully submitted!',
//         icon: 'success',
//         confirmButtonColor: '#4e54c8'
//       });
//       this.reset();
//       inputs.forEach(id => {
//         document.getElementById('preview-' + id).textContent =
//           id === "title" ? "Event Title" :
//           id === "description" ? "Event description will appear here." :
//           id === "time" ? "--:--" : "-";
//       });
// app.post("/", (req, res) => {
//         const listing = new Listing({
//             title: req.body.title,
//             organizer: req.body.organizer,
//             date: req.body.date,
//             time: req.body.time,
//             location: req.body.location,
//             link: req.body.link,
//             description: req.body.description
//         });
//         listing.save().then(() => {
//             console.log("Data saved!");
//             res.send("Data saved!");
//         }).catch((err) => {
//             console.error("Error saving data:", err);
//             res.status(500).send("Error saving data");
//         });
//     });
//     });

    