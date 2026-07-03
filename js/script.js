(() => {
  "use strict";

  /* -----------------------------------------------------------
     Loader
  ----------------------------------------------------------- */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    setTimeout(() => loader.classList.add("is-hidden"), 500);
  });

  /* -----------------------------------------------------------
     Custom cursor
  ----------------------------------------------------------- */
  const cursorDot = document.getElementById("cursorDot");
  if (window.matchMedia("(hover: hover)").matches) {
    let mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const interactive = "a, button, .link-card, .social-link";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(interactive)) cursorDot.classList.add("is-active");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(interactive)) cursorDot.classList.remove("is-active");
    });
  }

  /* -----------------------------------------------------------
     Scroll reveal
  ----------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* -----------------------------------------------------------
     Typing effect (status pill)
  ----------------------------------------------------------- */
  const typedEl = document.getElementById("typedStatus");
  const phrases = ["open to work", "building with AI", "shipping fast"];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  const typeLoop = () => {
    if (!typedEl) return;
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  };
  setTimeout(typeLoop, 900);

  /* -----------------------------------------------------------
     Footer year
  ----------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
