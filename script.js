const menuItems = document.querySelector(".menu-items")
const menuItemsUl = document.querySelector(".menu-items > ul")
const menuItemsLinks = document.querySelectorAll(".menu-items-list > li")
const menuBtnLocal = document.querySelector(".menu-btn")

function toggleMenu(menuBtn) {
    if (menuBtn.dataset.shown == "false") {
        menuItems.style.display = "grid"
        menuItemsUl.classList.replace('menu-items-list', "mobile-menu")
        menuBtn.dataset.shown = "true"
    } else {
        menuItems.style.display = "none"
        menuItemsUl.classList.replace('mobile-menu', "menu-items-list")
        menuBtn.dataset.shown = "false"
    }
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener('scroll', reveal)
reveal()

menuItemsLinks.forEach((v, i) => {
    v.addEventListener('click', () => {
        toggleMenu(menuBtnLocal)
    })
})