(() => {
  "use strict";

  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;
  const STORAGE_KEY = "site-theme";

  const applyTheme = (theme) => {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
  };

  const savedTheme = sessionStorage.getItem(STORAGE_KEY);
  if (savedTheme) applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    applyTheme(next);
    sessionStorage.setItem(STORAGE_KEY, next);
  });
})();
