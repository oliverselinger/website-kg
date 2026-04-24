import "./style.css";

// Scroll-triggered fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Navbar scroll effect
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    nav.classList.add("shadow-md");
    nav.classList.remove("border-transparent");
    nav.classList.add("border-slate-200");
  } else {
    nav.classList.remove("shadow-md");
    nav.classList.add("border-transparent");
    nav.classList.remove("border-slate-200");
  }
});

// Mobile menu
const toggle = document.getElementById("mobile-menu-toggle");
const menu = document.getElementById("mobile-menu");
const icon = document.getElementById("mobile-menu-icon");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden");
    // Swap hamburger / X
    if (open) {
      icon.innerHTML = `<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>`;
    } else {
      icon.innerHTML = `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`;
    }
  });

  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      icon.innerHTML = `<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>`;
    })
  );
}

// Contact form – Web3Forms AJAX submission
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const btnText = submitBtn.innerHTML;
  const successEl = document.getElementById("form-success");
  const errorEl = document.getElementById("form-error");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    successEl.classList.add("hidden");
    errorEl.classList.add("hidden");

    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
      </svg>
      Sending...
    `;

    try {
      const res = await fetch(contactForm.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(contactForm))),
      });
      const data = await res.json();

      if (data.success) {
        successEl.classList.remove("hidden");
        contactForm.reset();
      } else {
        errorEl.classList.remove("hidden");
      }
    } catch {
      errorEl.classList.remove("hidden");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = btnText;
    }
  });
}
