// Open hamburger menu
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  navList.classList.add("open");
});

// Close hamburger menu
const navList = document.getElementById("nav__list");
const closeIcon = document.getElementById("close");

closeIcon.addEventListener("click", () => {
  navList.classList.remove("open");
});

// Close hamburger menu on width gratjer than 1200px
window.addEventListener("resize", () => {
  if (window.innerWidth > 1200) {
    navList.classList.remove("open");
  }
});

// Form validation
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();

  let errorMessage = "";

  if (!name || !email || !subject || !message) {
    errorMessage = "Molimo popunite sva polja.";
  }

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorMessage = "Unesite validan email.";
  }

  if (errorMessage) {
    e.preventDefault();
    document.querySelector(".contact__msg").innerHTML = errorMessage;
  }
});

// Consultation BTN
const consultationBtn = document.querySelector(
  '[data-item="consultation-btn"]'
);

document.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    consultationBtn.classList.add("active");
  } else {
    consultationBtn.classList.remove("active");
  }
});

// Dynamic date
document.getElementById("date").textContent = new Date().getFullYear();
