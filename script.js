/* =====================================================
   1. ELEMENTS
   ===================================================== */

const body = document.body;
const root = document.documentElement;

const switcher = document.querySelector(".switcher");
const switchButtons = document.querySelectorAll(".switch-btn");
const panels = document.querySelectorAll(".panel");


/* =====================================================
   2. SKILL BARS
   Bar width is 0 in CSS. Here we fill it from data-value.
   ===================================================== */

function fillBars(panel) {

  const bars = panel.querySelectorAll(".bar-fill");

  bars.forEach(function (bar) {
    bar.style.width = "0";
  });

  /* Force the browser to apply width 0 first, so the animation can play */
  void panel.offsetWidth;

  bars.forEach(function (bar) {
    bar.style.width = bar.dataset.value + "%";
  });
}


/* =====================================================
   3. SWITCH BETWEEN FRONTEND AND TOOLS
   ===================================================== */

function showPanel(targetId, index) {

  /* Hide every panel */
  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });

  /* Show the chosen panel */
  const targetPanel = document.getElementById(targetId);
  targetPanel.hidden = false;
  targetPanel.classList.add("is-active");

  /* Update the buttons */
  switchButtons.forEach(function (button, buttonIndex) {
    const isActive = buttonIndex === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive);
  });

  /* Move the sliding pill (CSS reads --index) */
  switcher.style.setProperty("--index", index);

  /* Blue theme for Frontend, green theme for Tools */
  body.classList.toggle("theme-tools", index === 1);

  /* Fill the bars of the new panel */
  fillBars(targetPanel);
}

switchButtons.forEach(function (button, index) {

  button.addEventListener("click", function () {
    showPanel(button.dataset.target, index);
  });

});

/* Fill the bars of the first panel when the page opens */
fillBars(document.getElementById("panel-frontend"));


/* =====================================================
   4. MOUSE GRID AND FOOTER YEAR
   ===================================================== */

/* Grid lines show near the mouse (CSS reads --mx and --my) */
document.addEventListener("mousemove", function (event) {
  root.style.setProperty("--mx", event.clientX + "px");
  root.style.setProperty("--my", event.clientY + "px");
});

/* Current year in the footer */
document.getElementById("year").textContent = new Date().getFullYear();