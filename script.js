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
