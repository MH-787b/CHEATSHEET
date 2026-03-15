// ─── Hero particle canvas ──────────────────────────────────────────────
(function() {
  var canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var particles = [];
  var count = 60;
  var connectDist = 140;
  var mouse = { x: -999, y: -999 };

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  document.addEventListener("mousemove", function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  for (var i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(212, 160, 23, 0.25)";
      ctx.fill();
    }

    // Draw connections
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectDist) {
          var alpha = (1 - dist / connectDist) * 0.08;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = "rgba(212, 160, 23, " + alpha + ")";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Mouse proximity glow
      var mdx = particles[i].x - mouse.x;
      var mdy = particles[i].y - mouse.y;
      var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 180) {
        var malpha = (1 - mdist / 180) * 0.4;
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].r * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 160, 23, " + malpha + ")";
        ctx.fill();
      }
    }

    requestAnimationFrame(draw);
  }

  draw();
})();

// Typewriter effect for demo
(function() {
  var target = document.getElementById("typewriter");
  var correct = document.querySelector(".demo-correct");
  var text = "0.760";
  var i = 0;

  function type() {
    if (i < text.length) {
      target.textContent += text[i];
      i++;
      setTimeout(type, 150 + Math.random() * 100);
    } else {
      // Show correct banner after typing
      setTimeout(function() {
        correct.classList.add("show");
      }, 400);
    }
  }

  // Start after a short delay
  setTimeout(type, 1500);
})();

// ─── Robot eye tracking ──────────────────────────────────────────────────
(function() {
  var leftPupil = document.getElementById("pupil-left");
  var rightPupil = document.getElementById("pupil-right");
  var statusEl = document.getElementById("robot-status");
  if (!leftPupil || !rightPupil) return;

  var messages = ["hi :)", "alt+l", "do it", "ez W", "lol", "bruh", ":3", "slay"];
  var msgIndex = 0;

  // Cycle through status messages
  setInterval(function() {
    msgIndex = (msgIndex + 1) % messages.length;
    if (statusEl) statusEl.textContent = messages[msgIndex];
  }, 3000);

  // Track mouse with eyes
  document.addEventListener("mousemove", function(e) {
    var eyes = [leftPupil, rightPupil];
    for (var i = 0; i < eyes.length; i++) {
      var eye = eyes[i].parentElement;
      var rect = eye.getBoundingClientRect();
      var eyeCx = rect.left + rect.width / 2;
      var eyeCy = rect.top + rect.height / 2;
      var dx = e.clientX - eyeCx;
      var dy = e.clientY - eyeCy;
      var angle = Math.atan2(dy, dx);
      var dist = Math.min(Math.sqrt(dx * dx + dy * dy), 200);
      var maxMove = 4;
      var move = (dist / 200) * maxMove;
      var tx = Math.cos(angle) * move;
      var ty = Math.sin(angle) * move;
      eyes[i].style.transform = "translate(" + tx + "px, " + ty + "px)";
    }
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
