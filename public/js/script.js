    const inputs = ['title', 'organizer', 'date', 'time', 'location', 'link', 'description'];

    inputs.forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        const val = document.getElementById(id).value || '-';
        document.getElementById('preview-' + id).textContent = val;
      });
    });

    document.getElementById('eventForm').addEventListener('submit', function (e) {
      e.preventDefault();

      Swal.fire({
    title: '<span style="color:#000; font-family:Poppins, sans-serif; font-size:2rem; text-shadow: 2px 2px 8px #4e54c8;">🎉 Event Submitted!</span>',
    html: `
      <div style="font-size:1.1rem; color:#000; font-family:Poppins, sans-serif; margin-bottom:10px;">
        Your event has been <b>successfully submitted!</b>
      </div>
      <img src="https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif" alt="Confetti" style="width:70px; margin:12px 0 0 0;"/>
    `,
    iconHtml: `
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#fff" opacity="0.15"/>
        <path d="M7 13l3 3 7-7" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,
    background: 'rgba(78, 84, 200, 0.05)', // semi-transparent for glass effect (transparency can be controlled by changing 4th parameter of rgba).
    showConfirmButton: true,
    confirmButtonColor: '#fff',
    confirmButtonText: '<span style="font-family:Poppins, sans-serif; font-weight:bold;">Okay</span>',
    customClass: {
      popup: 'swal2-glass-modal',
      confirmButton: 'swal2-glass-btn'
    },
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  });



      this.reset();
      inputs.forEach(id => {
        document.getElementById('preview-' + id).textContent =
          id === "title" ? "Event Title" :
          id === "description" ? "Event description will appear here." :
          id === "time" ? "--:--" : "-";
      });
    });



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


