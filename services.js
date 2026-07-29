// ================================
// HAMBURGER MENU
// ================================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".hamburger i");

hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {

        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");

    }

    else {

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    }

});



// ================================
// CLOSE MENU WHEN LINK IS CLICKED
// ================================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});



// ================================
// NAVBAR SCROLL EFFECT
// ================================

const header = document.querySelector("header");

// The header background remains permanently white, so the scroll effect is disabled.
// window.addEventListener("scroll", () => {
//     if (window.scrollY > 80) {
//         header.style.background = "#0f172a";
//         header.style.boxShadow = "0 8px 25px rgba(0,0,0,.15)";
//     } else {
//         header.style.background = "rgba(15,23,42,.82)";
//         header.style.boxShadow = "none";
//     }
// });



// ================================
// RUNNING COUNTERS
// ================================

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const increment = target / 180;

        function updateCounter() {

            if (count < target) {

                count += increment;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(updateCounter);

            }

            else {

                counter.innerText = target;

                if (target == 5000) {

                    counter.innerText = "5000+";

                }

                if (target == 350) {

                    counter.innerText = "350+";

                }

                if (target == 98) {

                    counter.innerText = "98%";

                }

                if (target == 15) {

                    counter.innerText = "15+";

                }

            }

        }

        updateCounter();

    });

}

window.addEventListener("scroll", () => {

    const stats = document.querySelector(".statistics");

    const position = stats.getBoundingClientRect().top;

    const screen = window.innerHeight;

    if (position < screen - 100 && !counterStarted) {

        startCounters();

        counterStarted = true;

    }

});




// ================================
// SCROLL REVEAL
// ================================

const revealItems = document.querySelectorAll(

".service-card,.testimonial-card,.stat-card,.company,.feature,.step"

);

function reveal() {

    revealItems.forEach(item => {

        const windowHeight = window.innerHeight;

        const revealTop = item.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";

        }

    });

}

revealItems.forEach(item => {

    item.style.opacity = "0";

    item.style.transform = "translateY(60px)";

    item.style.transition = "all .8s ease";

});

window.addEventListener("scroll", reveal);

window.addEventListener("load", reveal);



// ================================
// BUTTON RIPPLE EFFECT
// ================================

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-5px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});



// ================================
// FLOATING HERO CARDS
// ================================

const cards = document.querySelectorAll(".floating-card");

window.addEventListener("mousemove", (e) => {

    let x = e.clientX / window.innerWidth;

    let y = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {

        let speed = (index + 1) * 8;

        card.style.transform =
            `translate(${x * speed}px, ${y * speed}px)`;

    });

});



// ================================
// ACTIVE NAV LINK
// ================================

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(item => {

    item.addEventListener("click", function () {

        navItems.forEach(nav => nav.classList.remove("active"));

        this.classList.add("active");

    });

});