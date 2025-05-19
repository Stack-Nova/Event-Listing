    const inputs = ['title', 'organizer', 'date', 'time', 'location', 'link', 'description'];

    inputs.forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        const val = document.getElementById(id).value || '-';
        document.getElementById('preview-' + id).textContent = val;
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