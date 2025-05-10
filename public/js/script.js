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
//     });

