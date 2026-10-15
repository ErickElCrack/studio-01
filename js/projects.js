
/* =========================================
   STUDIO 01 — DATA & PROJECT RENDERING
========================================= */

// Rutas de nuestros archivos de datos
const DATA_PATHS = {
    services: "./data/services.json",
    projects: "./data/projects.json"
};

// Obtener información desde un archivo JSON
async function loadJSON(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(
            `No se pudo cargar ${path}: ${response.status}`
        );
    }

    return await response.json();
}

// Evitar que textos externos se interpreten como HTML
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[char];
    });
}

/* =========================================
   SERVICIOS
========================================= */

async function renderServices() {
    const container = document.getElementById("servicesList");

    if (!container) return;

    try {
        const services = await loadJSON(DATA_PATHS.services);

        if (!Array.isArray(services)) {
            throw new Error("El archivo de servicios no contiene una lista.");
        }

        container.innerHTML = services.map((service, index) => {
            const number = String(index + 1).padStart(2, "0");

            
return `
    <article class="service-item">

        <span class="service-number">
            ${number}
        </span>

        <div class="service-content">

            <h3 class="service-name">
                ${escapeHTML(service.name)}
            </h3>

            <p class="service-description">
                ${escapeHTML(service.description)}
            </p>

        </div>

        <span class="service-arrow" aria-hidden="true">
            ↗
        </span>

    </article>
`;

        }).join("");

        console.log("Servicios cargados correctamente.");

    } catch (error) {
        console.error("Error al cargar servicios:", error);

        container.innerHTML = `
            <p>No fue posible cargar los servicios.</p>
        `;
    }
}

/* =========================================
   PROYECTOS
========================================= */

async function renderProjects() {
    const container = document.getElementById("projectsGrid");

    if (!container) return;

    try {
        const projects = await loadJSON(DATA_PATHS.projects);

        if (!Array.isArray(projects)) {
            throw new Error("El archivo de proyectos no contiene una lista.");
        }

        const featuredProjects = projects.filter(
            project => project.featured === true
        );

        if (featuredProjects.length === 0) {
            container.innerHTML = `
                <p>Próximamente nuevos conceptos digitales.</p>
            `;
            return;
        }

        container.innerHTML = featuredProjects.map(project => {

            const title = escapeHTML(project.title);
            const category = escapeHTML(project.category);
            const type = escapeHTML(project.type);
            const status = escapeHTML(project.status);
            const theme = ["coffee", "automotive", "nature"].includes(
                project.theme
            ) ? project.theme : "nature";

            
            // Vista previa del proyecto:
            // imagen real si existe, o portada editorial si es concepto.

            const conceptVisuals = {
                coffee: {
                    eyebrow: "SPECIALTY COFFEE",
                    headline: "Slow mornings.",
                    subline: "Better coffee.",
                    label: "BRAND & DIGITAL EXPERIENCE"
                },
                automotive: {
                    eyebrow: "AUTOMOTIVE DETAILING",
                    headline: "BEYOND",
                    subline: "THE FINISH.",
                    label: "PRECISION IN EVERY DETAIL"
                },
                nature: {
                    eyebrow: "NATURAL LIFESTYLE",
                    headline: "A little closer",
                    subline: "to nature.",
                    label: "ROOTED IN NATURE"
                }
            };

            const visual = conceptVisuals[theme];

            const imageHTML = project.image
                ? `<img
                       src="${escapeHTML(project.image)}"
                       alt="Vista previa de ${title}"
                       loading="lazy"
                   >`
                : `
                    <div class="project-concept-preview project-${theme}">

                        <div class="project-preview-top">
                            <span>${title}</span>
                            <span>CONCEPT / 2026</span>
                        </div>

                        <div class="project-preview-content">
                            <span class="project-preview-eyebrow">
                                ${visual.eyebrow}
                            </span>

                            <div class="project-preview-headline">
                                <strong>${visual.headline}</strong>
                                <em>${visual.subline}</em>
                            </div>
                        </div>

                        <div class="project-preview-bottom">
                            <span>${visual.label}</span>
                            <span>↗</span>
                        </div>

                    </div>
                `;


            const projectURL = String(project.url || "").trim();
            const hasValidURL =
                /^https?:\/\//i.test(projectURL) ||
                /^\.?\/?[\w-]+(?:\/[\w.-]+)*\.html(?:[?#].*)?$/i.test(projectURL);

            const projectLink = hasValidURL
                ? `<a href="${escapeHTML(projectURL)}"
                       class="text-link"
                       target="_blank"
                       rel="noopener noreferrer">
                       Ver proyecto ↗
                   </a>`
                : `<span class="project-status">${status}</span>`;

            return `
                <article class="project-card">

                    <div class="project-image">
                        ${imageHTML}
                    </div>

                    <div class="project-info">
                        <div>
                            <h3>${title}</h3>
                            <p>${category} · ${type}</p>
                            <p class="project-description">
                                ${escapeHTML(project.description)}
                            </p>
                            ${projectLink}
                        </div>
                    </div>

                </article>
            `;
        }).join("");

        console.log("Proyectos cargados correctamente.");

    } catch (error) {
        console.error("Error al cargar proyectos:", error);

        container.innerHTML = `
            <p>No fue posible cargar los proyectos.</p>
        `;
    }
}

/* =========================================
   INICIALIZACIÓN
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    renderServices();
    renderProjects();
});
