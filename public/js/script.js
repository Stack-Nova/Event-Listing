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
    background: 'rgba(78, 84, 200, 0.05)', // semi-transparent for glass effect
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
    cursor.style.fontSize="8px";
    gsap.to(cursor, {
      scale: 3,
      rotate: 0,
      backgroundColor:"#00ffff4d",
      duration: 0.3,
      
    });
  });

    //On mouse leave from form-container
 formContainer.addEventListener("mouseleave",function(){
    cursor.innerHTML=""
    gsap.to(cursor, {
      scale: 1,
      rotate:0,
      backgroundColor: "transparent",
      duration: 0.3,
      
    });
  });

if (prevcontainer) {
  prevcontainer.addEventListener("mouseenter", () => {
    cursor.innerHTML = "Check";
    cursor.style.fontSize = "6px"; 
    gsap.to(cursor, {
      scale: 2.5, 
      rotate: 0,
      backgroundColor: "#00ffff4d",
      duration: 0.3,
    });
  });
  

  prevcontainer.addEventListener("mouseleave", () => {
    cursor.innerHTML = "";
    gsap.to(cursor, {
      scale: 1,
      rotate: 0,
      backgroundColor: "transparent",
      duration: 0.3,
    });
  });
}


// === Button Hover + Re-entry Fix ===
if (btn) {
  btn.addEventListener("mouseenter", (e) => {
    e.stopPropagation();
    cursor.innerHTML = "CLICK";
    cursor.style.fontSize = "8px"; 
    gsap.to(cursor, {
      scale: 3.5, 
      rotate: 5,
      backgroundColor: "#00ffff4d",
      duration: 0.3,
    });
  });
  

  btn.addEventListener("mouseleave", (e) => {
    const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
    if (formContainer && formContainer.contains(elementUnderCursor)) {
      cursor.innerHTML = "HEY!";
      cursor.style.fontSize = "8px"; 
      gsap.to(cursor, {
        scale: 3, 
        rotate: 0,
        backgroundColor: "#00ffff4d",
        duration: 0.3,
      });
    }
     else {
      cursor.innerHTML = "";
      gsap.to(cursor, {
        scale: 1,
        rotate: 0,
        backgroundColor: "transparent",
        duration: 0.3,
      });
    }
    
  

  });

  particlesJS.load('particles-js', 'particlesjs-config.json', function () {
      console.log('particles.js config loaded');
    });
  
}
