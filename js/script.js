function toggleMenu() {
    var navLinks = document.getElementById('navLinks');
    var btn = document.querySelector('.menu-button');
    if (!navLinks) return;
    navLinks.classList.toggle('active');
    btn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    document.body.style.overflowY = navLinks.classList.contains('active') ? 'scroll' : '';
}

document.addEventListener('DOMContentLoaded', function () {
    // course filter
    document.querySelectorAll('.jobs-filter .filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.jobs-filter .filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            var filter = btn.dataset.filter;
            document.querySelectorAll('#courseGrid .course-card').forEach(function (card) {
                card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
            });
        });
    });
});

(function () {
    var wrap = document.getElementById('sliderWrap');
    var track = document.getElementById('sliderTrack');
    if (!wrap || !track) return;
    var max = 0;

    function calc() {
        max = track.scrollWidth - wrap.offsetWidth;
        if (max < 0) max = 0;
    }

    function update() {
        var rect = wrap.getBoundingClientRect();
        var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        progress = Math.max(0, Math.min(1, progress));
        track.style.transform = 'translateX(' + (-progress * max) + 'px)';
    }

    calc(); update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', function () { calc(); update(); });
})();

document.addEventListener('DOMContentLoaded', function () {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    //navbar
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        });
    }

    // slider
    var slides = document.querySelectorAll('.hero-bg img');
    var dots = document.querySelectorAll('.hero-dot');
    var current = 0;

    function goToSlide(n) {
        slides[current].classList.remove('active');
        if (dots[current]) dots[current].classList.remove('active');
        current = (n + slides.length) % slides.length;
        slides[current].classList.add('active');
        if (dots[current]) dots[current].classList.add('active');
    }

    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots[0]) dots[0].classList.add('active');

        var slideInterval = setInterval(function () {
            goToSlide(current + 1);
        }, 4500);

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                clearInterval(slideInterval);
                goToSlide(i);
                slideInterval = setInterval(function () {
                    goToSlide(current + 1);
                }, 4500);
            });
        });
    }

    // fade in
    var revealEls = document.querySelectorAll('.reveal');
    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
        var revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        revealEls.forEach(function (el) { revealObs.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('visible'); });
    }

    const faqs = document.querySelectorAll(".faq");
    faqs.forEach((faq) => {
        faq.addEventListener("click", () => {
            faq.classList.toggle("active");
        });
    });

    //slider
    let onSlide = false;

    window.addEventListener("load", () => {
        autoSlide();

        const dots = document.querySelectorAll(".carousel_dot");
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener("click", () => slide(i));
        }

        const buttonPrev = document.querySelector(".carousel_button__prev");
        const buttonNext = document.querySelector(".carousel_button__next");
        buttonPrev.addEventListener("click", () => slide(getItemActiveIndex() - 1));
        buttonNext.addEventListener("click", () => slide(getItemActiveIndex() + 1));
    })

    function autoSlide() {
        setInterval(() => {
            slide(getItemActiveIndex() + 1);
        }, 3000);
    }

    function slide(toIndex) {
        if (onSlide)
            return;
        onSlide = true;

        const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
        const itemActive = document.querySelector(".carousel_item__active");
        const itemActiveIndex = itemsArray.indexOf(itemActive);
        let newItemActive = null;

        if (toIndex > itemActiveIndex) {
            if (toIndex >= itemsArray.length) {
                toIndex = 0;
            }

            newItemActive = itemsArray[toIndex];

            newItemActive.classList.add("carousel_item__pos_next");
            setTimeout(() => {
                newItemActive.classList.add("carousel_item__next");
                itemActive.classList.add("carousel_item__next");
            }, 20);
        } else {
            
            if (toIndex < 0) {
                toIndex = itemsArray.length - 1;
            }

            newItemActive = itemsArray[toIndex];

            newItemActive.classList.add("carousel_item__pos_prev");
            setTimeout(() => {
                newItemActive.classList.add("carousel_item__prev");
                itemActive.classList.add("carousel_item__prev");
            }, 20);
        }

        newItemActive.addEventListener("transitionend", () => {
            itemActive.className = "carousel_item";
            newItemActive.className = "carousel_item carousel_item__active";
            onSlide = false;
        }, {
            once: true
        });

        slideIndicator(toIndex);
    }

    function getItemActiveIndex() {
        const itemsArray = Array.from(document.querySelectorAll(".carousel_item"));
        const itemActive = document.querySelector(".carousel_item__active");
        const itemActiveIndex = itemsArray.indexOf(itemActive);
        return itemActiveIndex;
    }

    function slideIndicator(toIndex) {
        const dots = document.querySelectorAll(".carousel_dot");
        const dotActive = document.querySelector(".carousel_dot__active");
        const newDotActive = dots[toIndex];

        dotActive.classList.remove("carousel_dot__active");
        newDotActive.classList.add("carousel_dot__active");
    }

    //filter career
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filter = btn.dataset.filter;
            document.querySelectorAll('.job-item').forEach(function (job) {
                job.style.display = (filter === 'all' || job.dataset.dept === filter) ? '' : 'none';
            });
        });
    });

    //filter course
    document.querySelectorAll('.course-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.course-filter-btn').forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            var filter = btn.dataset.filter;
            document.querySelectorAll('.course-card').forEach(function (card) {
                card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
            });
        });
    });

    // register validation
    var form = document.getElementById('form_register');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var fullname = document.getElementById('fullname');
            var username = document.getElementById('username');
            var email = document.getElementById('email');
            var dob = document.getElementById('dob');
            var gender = document.getElementsByName('gender');
            var password = document.getElementById('password');
            var confirmPassword = document.getElementById('confirm_password');
            var terms = document.getElementById('terms');
            var error = document.getElementById('error');
            var msg = [];

            if (!fullname.value) msg.push('Full name is required');

            if (!username.value) {
                msg.push('Username is required');
            } else if (username.value.length < 4) {
                msg.push('Username must be at least 4 characters');
            } else if (username.value.includes(' ')) {
                msg.push('Username must not contain spaces');
            }

            if (!email.value || !email.value.includes('@') || !email.value.includes('.'))
                msg.push('Email is not valid');

            var today = new Date();
            var userDOB = new Date(dob.value);
            if (!dob.value) {
                msg.push('Date of birth is required');
            } else if (userDOB.getFullYear() >= today.getFullYear()) {
                msg.push('Year of birth must be less than current year');
            }

            var genderChecked = Array.from(gender).some(function (r) { return r.checked; });
            if (!genderChecked) msg.push('Gender is required');

            if (!password.value) {
                msg.push('Password is required');
            } else if (password.value.length < 8) {
                msg.push('Password must be at least 8 characters');
            } else {
                let hasUppercase = false;
                let hasNumber = false;

                for (let i = 0; i < password.value.length; i++) {
                    let char = password.value[i];

                    if (char >= 'A' && char <= 'Z') {
                        hasUppercase = true;
                    }

                    if (char >= '0' && char <= '9') {
                        hasNumber = true;
                    }
                }

                if (!hasUppercase) {
                    msg.push('Password must have at least 1 uppercase letter');
                }

                if (!hasNumber) {
                    msg.push('Password must have at least 1 number');
                }
            }

            if (!confirmPassword.value) {
                msg.push('Please confirm your password');
            } else if (confirmPassword.value !== password.value) {
                msg.push('Passwords do not match');
            }

            if (!terms.checked) msg.push('You must agree to the Terms of Service');

            if (msg.length > 0) {
                error.innerText = msg.join('\n');
                error.classList.add('show');
            } else {
                error.classList.remove('show');
                form.style.display = 'none';
                document.getElementById('registerSuccess').classList.add('show');
            }
        });
    }

});


// number animation
document.addEventListener("DOMContentLoaded", () => {
    const statsSection = document.querySelector(".stats-section");

    if (!statsSection) return;

    const statsNumbers = statsSection.querySelectorAll(".stats-number");
    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                runStatsAnimation();
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px"
    });

    observer.observe(statsSection);

    function runStatsAnimation() {
        statsNumbers.forEach((el) => {
            const finalText = el.textContent.trim();
            let numberOnly = '';

            for (let i = 0; i < finalText.length; i++) {
                let char = finalText[i];

                if (char >= '0' && char <= '9') {
                    numberOnly += char;
                }
            }

            const finalNumber = parseInt(numberOnly);

            const suffix = finalText.includes("%")
                ? "%"
                : finalText.includes("+")
                    ? "+"
                    : "";

            let current = 0;
            let duration = 1800;
            let intervalTime = 40;
            let totalSteps = duration / intervalTime;
            let step = 0;

            const randomize = setInterval(() => {
                step++;
                const progress = step / totalSteps;
                const randomValue = Math.floor(
                    Math.random() * finalNumber * (1 - progress)
                );
                current = Math.floor(progress * finalNumber);

                const displayValue = progress < 0.85
                    ? current + randomValue
                    : current;

                el.textContent = displayValue + suffix;

                if (step >= totalSteps) {
                    clearInterval(randomize);
                    el.textContent = finalText;
                }
            }, intervalTime);
        });
    }
});


//typing effect
const words = ['learning', 'education', 'knowledge', 'growth', 'discovery', 'innovation'];
const typingElement = document.getElementById('typing');
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

const TYPE_SPEED = 120;
const DELETE_SPEED = 60;
const PAUSE_DURATION = 2000;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isPaused) return;

    if (!isDeleting) {
        // ketikan
        if (charIndex < currentWord.length) {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, TYPE_SPEED);
        } else {
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                isDeleting = true;
                typeEffect();
            }, PAUSE_DURATION);
        }
    } else {
        // hapus
        if (charIndex > 0) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, DELETE_SPEED);
        } else {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, TYPE_SPEED);
            //buat lanjut kata selanjutnyaa
        }
    }
}

typeEffect();