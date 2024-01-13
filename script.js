const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const themeSelects = document.querySelectorAll("[data-theme]");
const html = document.documentElement;
let output = "";

const calculate = (btnValue) => {
  display.focus();
  if (btnValue === "=" && output !== "") {
    output = eval(output);
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.toString().slice(0, -1);
  } else {
    if (output === "" && ["+", "-", "*", "/"].includes(btnValue)) return;
    output += btnValue;
  }
  display.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

themeSelects.forEach((select) => {
  select.addEventListener("change", () => {
    const theme = select.value;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme-calc", theme);
  });
});

const getThemePreference = () => {
  const theme = localStorage.getItem("theme-calc") ?? "default";
  const toggle = document.querySelector(`input[data-theme=${theme}]`);
  const media = matchMedia("(prefers-color-scheme: dark)");

  if (theme) {
    html.setAttribute("data-theme", theme);
    toggle.checked = true;
    return;
  }

  if (media.matches) {
    html.setAttribute("data-theme", "dark");
    toggle.checked = true;
  } else {
    html.setAttribute("data-theme", theme);
    toggle.checked = true;
  }
};

getThemePreference();
