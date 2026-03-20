/* ===========================
   PAGE FADE TRANSITIONS
=========================== */

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = 0;
  document.body.style.transition = "opacity 0.6s ease";

  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 100);
});

document.querySelectorAll("a").forEach((link) => {
  if (link.href && link.hostname === window.location.hostname) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.href;
      document.body.style.opacity = 0;
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  }
});

/* ===========================
   SCROLL REVEAL ANIMATION
=========================== */

const revealElements = document.querySelectorAll(".glass, h1, h2, p");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

revealElements.forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.8s ease";
  observer.observe(el);
});

/* ===========================
   DYNAMIC GRADIENT SHIFT
=========================== */

const colors = [
  ["#a855f7", "#7c3aed", "#c084fc"],
  ["#9333ea", "#6d28d9", "#a78bfa"],
  ["#7e22ce", "#a855f7", "#d8b4fe"],
];

let current = 0;

setInterval(() => {
  current = (current + 1) % colors.length;
  document.documentElement.style.setProperty(
    "--gradient",
    `linear-gradient(90deg, ${colors[current][0]}, ${colors[current][1]}, ${colors[current][2]})`,
  );
}, 6000);

/* ===========================
   CURSOR GLOW EFFECT
=========================== */

const glow = document.createElement("div");
glow.style.position = "fixed";
glow.style.width = "400px";
glow.style.height = "400px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.background =
  "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 60%)";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "-1";
document.body.appendChild(glow);

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ===========================
   BUTTON HOVER SCALE
=========================== */

document.querySelectorAll("button, a").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.style.transform = "scale(1.05)";
    el.style.transition = "all 0.3s ease";
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "scale(1)";
  });
});
