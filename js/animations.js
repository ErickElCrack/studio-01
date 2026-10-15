
/* =========================================
   STUDIO 01 — ANIMATIONS
   Movimiento editorial y efectos de scroll
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");
    const showcase = document.querySelector(".hero-showcase");

    const cards = [
        ...document.querySelectorAll(".showcase-card")
    ];

    /* =====================================
       ANIMACIÓN DE ENTRADA
    ===================================== */

    if (!reducedMotion.matches) {

        if (heroContent) {
            heroContent.classList.add("hero-animate");

            requestAnimationFrame(() => {
                heroContent.classList.add("hero-visible");
            });
        }

        cards.forEach((card, index) => {

            card.classList.add("card-animate");

            card.style.setProperty(
                "--card-delay",
                `${0.2 + index * 0.15}s`
            );

            requestAnimationFrame(() => {
                card.classList.add("card-visible");
            });
        });
    }

    /* =====================================
       APARICIÓN DE SECCIONES
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".philosophy .container, " +
        ".services .section-heading, " +
        ".projects .section-heading, " +
        ".process .container, " +
        ".about-grid, " +
        ".contact .container"
    );

    if ("IntersectionObserver" in window && !reducedMotion.matches) {

        const observer = new IntersectionObserver(
            (entries, currentObserver) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("reveal-visible");

                    currentObserver.unobserve(entry.target);
                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });
    }

    /* =====================================
       MOVIMIENTO DEL HERO CON EL CURSOR
    ===================================== */

    const finePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    if (hero && showcase && cards.length && finePointer.matches) {

        let pointerX = 0;
        let pointerY = 0;

        let currentX = 0;
        let currentY = 0;

        let animationFrame = null;

        function animatePointer() {

            currentX += (pointerX - currentX) * 0.08;
            currentY += (pointerY - currentY) * 0.08;

            cards.forEach((card, index) => {

                const intensity = (index + 1) * 6;

                const moveX = currentX * intensity;
                const moveY = currentY * intensity;

                card.style.setProperty(
                    "--move-x",
                    `${moveX.toFixed(2)}px`
                );

                card.style.setProperty(
                    "--move-y",
                    `${moveY.toFixed(2)}px`
                );
            });

            if (
                Math.abs(pointerX - currentX) > 0.001 ||
                Math.abs(pointerY - currentY) > 0.001
            ) {
                animationFrame = requestAnimationFrame(animatePointer);
            } else {
                animationFrame = null;
            }
        }

        function updatePointer(event) {

            if (reducedMotion.matches) return;

            const rect = showcase.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            pointerX = Math.max(
                -1,
                Math.min(1, (event.clientX - centerX) / (rect.width / 2))
            );

            pointerY = Math.max(
                -1,
                Math.min(1, (event.clientY - centerY) / (rect.height / 2))
            );

            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animatePointer);
            }
        }

        showcase.addEventListener("pointermove", updatePointer);

        showcase.addEventListener("pointerleave", () => {
            pointerX = 0;
            pointerY = 0;

            if (animationFrame === null && !reducedMotion.matches) {
                animationFrame = requestAnimationFrame(animatePointer);
            }
        });
    }

    /* =====================================
       PARALLAX SUAVE AL HACER SCROLL
    ===================================== */

    if (hero && showcase && !reducedMotion.matches) {

        let ticking = false;

        function updateScroll() {

            const rect = hero.getBoundingClientRect();

            if (rect.bottom > 0 && rect.top < window.innerHeight) {

                const progress = Math.max(
                    0,
                    Math.min(1, -rect.top / Math.max(rect.height, 1))
                );

                showcase.style.setProperty(
                    "--scroll-offset",
                    `${(progress * 35).toFixed(2)}px`
                );
            }

            ticking = false;
        }

        window.addEventListener("scroll", () => {

            if (!ticking) {
                requestAnimationFrame(updateScroll);
                ticking = true;
            }

        }, { passive: true });

        updateScroll();
    }

    console.log("STUDIO 01 — Animaciones inicializadas.");
});
