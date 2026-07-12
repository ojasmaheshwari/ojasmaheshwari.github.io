const root = document.querySelector(":root");
const btnSwitchMode = document.querySelector("#btn-switch-mode");

function setLight() {
    root.style.setProperty("--col-text", "var(--col-text-light)");
    root.style.setProperty("--col-bg", "var(--col-bg-light)");
    btnSwitchMode.textContent = "Dark mode";
    localStorage.setItem("mode", "light");
}

function setDark() {
    root.style.setProperty("--col-text", "var(--col-text-dark)");
    root.style.setProperty("--col-bg", "var(--col-bg-dark)");
    btnSwitchMode.textContent = "Light mode";
    localStorage.setItem("mode", "dark");
}

function pageContainsDisqus() {
    const disqus = document.querySelector("#disqus_thread");
    if (disqus) {
        return true;
    } else {
        return false;
    }
}

let mode = localStorage.getItem("mode");
if (!mode) {
    mode = "light";
}

if (mode == "light") {
    setLight();
} else {
    setDark();
}

btnSwitchMode.addEventListener("click", () => {
    mode = localStorage.getItem("mode");

    // This for sure is retarded
    // But it's required so Disqus doesn't fuck the styling up
    if (pageContainsDisqus()) {
        if (mode === "light") {
            localStorage.setItem("mode", "dark");
        } else {
            localStorage.setItem("mode", "light");
        }
        window.location.reload();
    } else {
        if (mode === "light") {
            setDark();
        } else {
            setLight();
        }
    }
});
