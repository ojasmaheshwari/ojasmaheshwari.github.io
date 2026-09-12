const root = document.querySelector(":root");
const btnSwitchMode = document.querySelector("#btn-switch-mode");

function setMode(mode) {
    const textProp = `var(--col-text-${mode})`;
    const bgProp = `var(--col-bg-${mode})`;
    const linkProp = `var(--col-link-${mode})`;

    root.style.setProperty("--col-text", textProp);
    root.style.setProperty("--col-bg", bgProp);
    root.style.setProperty("--col-link", linkProp);

    localStorage.setItem("mode", mode);
}

function pageContainsDisqus() {
    const disqus = document.querySelector("#disqus_thread");
    return (disqus != null);
}

let mode = localStorage.getItem("mode");
setMode(mode);
btnSwitchMode.value = mode;

btnSwitchMode.addEventListener("input", () => {
    const selectedMode = btnSwitchMode.value;
    setMode(selectedMode);

    // This for sure is retarded
    // But it's required so Disqus doesn't fuck the styling up
    if (pageContainsDisqus()) {
        window.location.reload();
    }
});
