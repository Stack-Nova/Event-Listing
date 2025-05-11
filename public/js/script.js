    // const inputs = ['title', 'organizer', 'date', 'time', 'location', 'link', 'description'];

    // inputs.forEach(id => {
    //   document.getElementById(id).addEventListener('input', () => {
    //     const val = document.getElementById(id).value || '-';
    //     document.getElementById('preview-' + id).textContent = val;
    //   });
    // });

    // document.getElementById('eventForm').addEventListener('submit', function (e) {
    //   e.preventDefault();
    //   Swal.fire({
    //     title: 'Event Submitted 🎊',
    //     text: 'Your event has been successfully submitted!',
    //     icon: 'success',
    //     confirmButtonColor: '#4e54c8'
    //   });
    //   this.reset();
    //   inputs.forEach(id => {
    //     document.getElementById('preview-' + id).textContent =
    //       id === "title" ? "Event Title" :
    //       id === "description" ? "Event description will appear here." :
    //       id === "time" ? "--:--" : "-";
    //   });
    // });

  const cursor = document.getElementById("cursor");
  const formContainer = document.querySelector(".form-container");
  const prevcontainer= document.querySelector(".preview-container");
  const btn=document.querySelector("button");

  // Move cursor with mouse
  document.addEventListener("mousemove", function (dets) {
    gsap.to(cursor, {
      x: dets.x-700,
      y: dets.y-40,
      duration: 0.2,
      ease: "power2.out"
    });
  });

  // On hover over form-container
  formContainer.addEventListener("mouseenter",function(){
    cursor.innerHTML="HEY!"
    gsap.to(cursor, {
      scale: 4,
      backgroundColor:"#00ffff4d",
      duration: 0.3,

    });
  });

    //On mouse leave from form-container
 formContainer.addEventListener("mouseleave",function(){
    cursor.innerHTML=""
    gsap.to(cursor, {
      scale: 1,
      backgroundColor: "transparent",
      duration: 0.3,

    });
  });

// formContainer.addEventListener("mouseover", function(e) {
//   if (!btn.contains(e.target)) {
//     cursor.innerHTML = "HEY!";
//     gsap.to(cursor, {
//       scale: 4,
//       backgroundColor: "transparent",
//       duration: 0.3,
//     });
//   }
// });

  // On hover over Prev-container
  prevcontainer.addEventListener("mouseenter",function(){
    cursor.innerHTML="Check"
    gsap.to(cursor, {
      scale: 4,
      backgroundColor:"#00ffff4d",
      duration: 0.3,

    });
  });

  // On mouse leave from Prev-container
  prevcontainer.addEventListener("mouseleave",function(){
    cursor.innerHTML=""
    gsap.to(cursor, {
      scale: 1,
      backgroundColor: "transparent",
      duration: 0.3,

    });
  });

    // On hover over Button
  btn.addEventListener("mouseenter",function(e){
    e.stopPropagation();
    cursor.innerHTML="CLICK"
    gsap.to(cursor, {
      scale: 4,
      backgroundColor:"#00ffff4d",
      duration: 0.3,

    });
  });

  // On mouse leave from Button
  btn.addEventListener("mouseleave",function(){
    cursor.innerHTML=""
    gsap.to(cursor, {
      scale: 1,
      backgroundColor: "transparent",
      duration: 0.3,

    });
  });


