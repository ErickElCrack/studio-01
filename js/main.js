
/* =========================================
   STUDIO 01 — MAIN JAVASCRIPT
   Navegación e interacciones generales
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       MENÚ MÓVIL
    ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("is-open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Cerrar menú" : "Abrir menú"
            );

            document.body.classList.toggle("menu-open", isOpen);
        });

        // Cerrar al seleccionar una sección
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        // Cerrar con Escape
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });

        // Cerrar cuando volvemos a escritorio
        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }


    /* =====================================
       CONTACTO
    ===================================== */

    const whatsappLink = document.getElementById("whatsappLink");
    const emailLink = document.getElementById("emailLink");

    // Datos pendientes de configurar
    const CONTACT = {
        whatsapp: "526677710140", // Tu número con 52, sin +, espacios ni guiones
        email: "erickstudio.01@gmail.com"     // Tu futuro correo profesional
    };


    if (whatsappLink) {
        if (CONTACT.whatsapp) {
            whatsappLink.removeAttribute("aria-disabled");
            whatsappLink.classList.remove("contact-disabled");
            const message = encodeURIComponent(
                "Hola, vi tu página de STUDIO 01 y me interesa conocer más sobre tus servicios de diseño y desarrollo web. Me gustaría platicar sobre un proyecto."
            );


            whatsappLink.href =
                `https://wa.me/${CONTACT.whatsapp}?text=${message}`;

            whatsappLink.target = "_blank";
            whatsappLink.rel = "noopener noreferrer";
        } else {
            whatsappLink.removeAttribute("href");
            whatsappLink.setAttribute("aria-disabled", "true");
            whatsappLink.classList.add("contact-disabled");
        }
    }

    if (emailLink) {
        if (CONTACT.email) {
            emailLink.removeAttribute("aria-disabled");
            emailLink.classList.remove("contact-disabled");
            
const subject = encodeURIComponent(
    "Consulta de proyecto — STUDIO 01"
);

const body = encodeURIComponent(
    "Hola Erick,\n\nVi tu página de STUDIO 01 y me gustaría conocer más sobre tus servicios.\n\n"
);

emailLink.href =
    `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT.email)}&su=${subject}&body=${body}`;

emailLink.target = "_blank";
emailLink.rel = "noopener noreferrer";

        } else {
            emailLink.removeAttribute("href");
            emailLink.setAttribute("aria-disabled", "true");
            emailLink.classList.add("contact-disabled");
        }
    }

    console.log("STUDIO 01 — Main JS inicializado.");
});
