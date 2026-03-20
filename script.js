// ==========================================
//  PAGE FADE-IN / FADE-OUT TRANSITIONS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Initial fade-in
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.7s ease";

  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });

  // Handle browser back/forward (better UX)
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      document.body.style.opacity = "1";
    }
  });
});

document
  .querySelectorAll('a[href^="/"], a[href^="."], a[href^="#"]')
  .forEach((link) => {
    // Only internal navigation
    if (
      link.hostname === window.location.hostname &&
      !link.hasAttribute("data-no-transition")
    ) {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href === "#" || href === "#0") return; // skip anchors

        e.preventDefault();
        document.body.style.opacity = "0";

        setTimeout(() => {
          window.location.href = href;
        }, 600);
      });
    }
  });

// ==========================================
//  SCROLL REVEAL (staggered, more polished)
// ==========================================
const revealItems = document.querySelectorAll(
  ".glass, h1, h2, h3, .project-card, section > *",
);

const observerOptions = {
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.1,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      const delay = index * 80; // stagger effect
      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add("revealed");
      revealObserver.unobserve(entry.target); // one-time reveal
    }
  });
}, observerOptions);

revealItems.forEach((el) => {
  el.classList.add("reveal-item");
  revealObserver.observe(el);
});

// Add this to your CSS (you can move it there)
const revealCSS = `
  .reveal-item {
    opacity: 0;
    transform: translateY(35px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .reveal-item.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
const styleSheet = document.createElement("style");
styleSheet.textContent = revealCSS;
document.head.appendChild(styleSheet);

// ==========================================
//  CURSOR GLOW – desktop only + lighter
// ==========================================
let cursorGlow = null;

if (window.matchMedia("(pointer: fine)").matches) {
  // mouse, not touch
  cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  let rafPending = false;
  document.addEventListener("mousemove", (e) => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(() => {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
        rafPending = false;
      });
    }
  });
}

// Add to CSS (recommended – cleaner than inline)
const glowCSS = `
  .cursor-glow {
    position: fixed;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    pointer-events: none;
    background: radial-gradient(circle at center, rgba(34, 211, 238, 0.12) 0%, transparent 60%);
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: opacity 0.4s ease;
  }
  @media (max-width: 768px) {
    .cursor-glow { display: none; }
  }
`;
const glowStyle = document.createElement("style");
glowStyle.textContent = glowCSS;
document.head.appendChild(glowStyle);

// ==========================================
//  SELECTIVE HOVER SCALE (safer)
// ==========================================
document
  .querySelectorAll(
    ".btn-hover-scale, button:not([data-no-scale]), a:not(.nav-link):not([data-no-scale])",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.transform = "scale(1.04)";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "scale(1)";
    });
  });

// Optional: disable during scroll/touch on mobile
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device");
}
