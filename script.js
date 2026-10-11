const iconMarkup = {
  arrowUpRight: `
    <svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.25 16.75a.75.75 0 0 1 0-1.06L15.19 7.75H9a.75.75 0 0 1 0-1.5h8a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-1.5 0V8.81l-7.94 7.94a.75.75 0 0 1-1.06 0Z" fill="currentColor" />
    </svg>
  `
};

const projects = [
  {
    number: "01",
    title: "Reimagining the TrueDeal Travel Platform",
    description:
      "Focused on improving usability and streamlining booking flows to create a more intuitive travel experience. Designed responsive interfaces for both web and mobile, ensuring consistency and seamless interactions across devices.",
    tags: ["UX Research", "UI Design", "Responsive"],
    image: "./assets/figma-truedeal.png",
    link: "https://www.behance.net/gallery/245873601/Reimagining-the-TrueDeal-Travel-Platform",
    accent: "#ef7d44",
    tint: "#fff0e8",
    reverse: false,
    featured: true
  },
  {
    number: "02",
    title: "Designing Cravings — where purpose meets flavor!",
    description:
      "Designed a visually engaging food platform that blends branding, UI, and storytelling to create a delightful user experience. Focused on promoting fresh meals and attractive deals while reducing food waste, using warm visuals and appetizing design elements to evoke instant craving and connection.",
    tags: ["Branding", "UI Design", "Storytelling"],
    image: "./assets/figma-cravings.png",
    link: "https://www.behance.net/gallery/237711449/Designing-Cravings-where-purpose-meets-flavor-",
    accent: "#d9532d",
    tint: "#fff0e8",
    reverse: true,
    featured: true
  },
  {
    number: "03",
    title: "SEASON: A touch of green, a world of peace",
    description:
      "Created a visually calming, nature-inspired experience that reflects the essence of greenery, sustainability, and inner peace. Focused on building a harmonious connection between users and nature through minimal layouts, soft visuals, and a soothing color palette that evokes balance and tranquility.",
    tags: ["UX Design", "Sustainability", "Branding"],
    image: "./assets/figma-season.png",
    link: "https://www.behance.net/gallery/237335551/SEASON-A-touch-of-green-a-world-of-peace",
    accent: "#56816a",
    tint: "#edf5ed",
    reverse: false,
    featured: true
  },
  {
    number: "04",
    title: "MEETOO: You're Not Alone Anymore",
    description:
      "Created an impactful and emotionally driven experience aimed at raising awareness and offering support to individuals affected by harassment and abuse. The project focuses on empathy, safe expression, and empowerment, using thoughtful visuals and a sensitive design approach to communicate that no one is alone.",
    tags: ["Social Impact", "UX Design", "Empathy"],
    image: "./assets/figma-meetoo.png",
    link: "https://www.behance.net/gallery/242537013/MEETOO-Youre-Not-Alone-Anymore",
    accent: "#8756a8",
    tint: "#f3ecfb",
    reverse: true
  },
  {
    number: "05",
    title: "Dashboard Design for Scheduling Meetings and Daily Work",
    description:
      "Developed a user-friendly dashboard experience that streamlines meeting scheduling and daily task management. Prioritized intuitive navigation, structured layouts, and clear information hierarchy to enhance productivity and reduce complexity in managing workflows.",
    tags: ["Dashboard", "Productivity", "UI Design"],
    image: "./assets/figma-dashboard.png",
    link: "https://www.behance.net/gallery/231679061/Dashboard-Design-for-Scheduling-Meetings-and-Daily-Work",
    accent: "#3768a5",
    tint: "#eaf1fb",
    reverse: false
  },
  {
    number: "06",
    title: "Lavanya — A Celebration of Timeless Jewels",
    description:
      "Crafted a premium and elegant jewelry brand experience that celebrates timeless beauty and cultural richness. Designed with a focus on storytelling, refinement, and luxury aesthetics — every detail reflects the artistry and grace of fine jewellery.",
    tags: ["Luxury Branding", "E-commerce", "UI Design"],
    image: "./assets/figma-lavanya.png",
    link: "https://www.behance.net/gallery/244698927/Lavanya-A-Celebration-of-Timeless-Jewels",
    accent: "#a86f43",
    tint: "#faf0e6",
    reverse: true
  }
];

const projectList = document.getElementById("project-list");
const workToggle = document.getElementById("work-toggle");
const projectPrevious = document.getElementById("project-prev");
const projectNext = document.getElementById("project-next");
const carouselDots = document.getElementById("carousel-dots");
const siteHeader = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const themeButtons = Array.from(document.querySelectorAll(".theme-pill"));
const heroStage = document.querySelector(".hero-stage");
const liveLayout = document.querySelector(".live-layout");
const liveFocusButtons = Array.from(document.querySelectorAll(".live-focus-button"));
const intentChips = Array.from(document.querySelectorAll(".intent-chip"));
const contactEmail = document.querySelector('.contact-pill[href^="mailto:"]');
const menuButton = document.querySelector(".mobile-menu-button");
const mobileDrawer = document.querySelector(".mobile-drawer");
const backHomeButton = document.querySelector(".back-home-button");
const drawerCloseTriggers = Array.from(document.querySelectorAll("[data-drawer-close]"));
const statNumbers = Array.from(document.querySelectorAll(".stat-number[data-count]"));
const revealTargets = Array.from(
  document.querySelectorAll(".reveal-on-scroll, .section-motion")
);
const sectionHashes = [...new Set(navLinks.map((link) => link.getAttribute("href")))];
const sectionTargets = sectionHashes
  .map((href) => document.querySelector(href))
  .filter(Boolean);

let showingAllProjects = false;
let activeProjectIndex = 0;
let projectAutoplay;
let touchStartX = 0;
const renderProjects = () => {
  if (!projectList) return;

  const visibleProjects = showingAllProjects
    ? projects
    : projects.filter((project) => project.featured);

  projectList.innerHTML = `<div class="project-track">${visibleProjects
    .map(
      (project) => `
        <article class="project-row${project.reverse ? " reverse" : ""}" style="--project-accent: ${project.accent}; --project-tint: ${project.tint};">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
            <span class="project-num">${project.number}</span>
          </div>
          <div class="project-copy">
            <p class="project-kicker">Case study · ${project.number}</p>
            <div class="chips project-tags">
              ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
            </div>
            <h3>${project.title}</h3>
            <div class="rule"></div>
            <p>${project.description}</p>
            <a class="cta cta-dark" href="${project.link}" target="_blank" rel="noopener noreferrer">
              <span>View Project</span>
              ${iconMarkup.arrowUpRight}
            </a>
          </div>
        </article>
      `
    )
    .join("")}</div>`;

  activeProjectIndex = 0;
  carouselDots.innerHTML = visibleProjects
    .map((project, index) => `<button class="carousel-dot" type="button" aria-label="Show project ${index + 1}: ${project.title}"></button>`)
    .join("");

  workToggle?.setAttribute("aria-expanded", String(showingAllProjects));
  if (workToggle) {
    workToggle.textContent = showingAllProjects ? "Show selected work" : "View all projects";
  }

  updateProjectCarousel();
  startProjectAutoplay();
};

const visibleProjectCount = () => projectList?.querySelectorAll(".project-row").length || 0;

const updateProjectCarousel = () => {
  const track = projectList?.querySelector(".project-track");
  const dots = Array.from(carouselDots?.querySelectorAll(".carousel-dot") || []);
  if (!track) return;

  track.style.transform = `translateX(-${activeProjectIndex * 100}%)`;
  dots.forEach((dot, index) => {
    const isActive = index === activeProjectIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });
};

const changeProject = (direction) => {
  const count = visibleProjectCount();
  if (count < 2) return;
  activeProjectIndex = (activeProjectIndex + direction + count) % count;
  updateProjectCarousel();
};

const stopProjectAutoplay = () => window.clearInterval(projectAutoplay);

const startProjectAutoplay = () => {
  stopProjectAutoplay();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || visibleProjectCount() < 2) return;
  projectAutoplay = window.setInterval(() => changeProject(1), 4600);
};

renderProjects();

heroStage?.addEventListener("pointermove", (event) => {
  const bounds = heroStage.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;
  heroStage.style.setProperty("--pointer-x", `${x}%`);
  heroStage.style.setProperty("--pointer-y", `${y}%`);
});

heroStage?.addEventListener("pointerleave", () => {
  heroStage.style.removeProperty("--pointer-x");
  heroStage.style.removeProperty("--pointer-y");
});

liveFocusButtons.forEach((button) => {
  button.addEventListener("click", () => {
    liveFocusButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    liveLayout?.setAttribute("data-focus", button.dataset.liveFocus || "research");
  });
});

intentChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    intentChips.forEach((item) => item.classList.toggle("is-active", item === chip));
    if (contactEmail) {
      const subject = `Let's talk about ${chip.dataset.intent || "a project"}`;
      contactEmail.href = `mailto:gargibiswas1382003@gmail.com?subject=${encodeURIComponent(subject)}`;
    }
  });
});

projectPrevious?.addEventListener("click", () => {
  changeProject(-1);
  startProjectAutoplay();
});

projectNext?.addEventListener("click", () => {
  changeProject(1);
  startProjectAutoplay();
});

carouselDots?.addEventListener("click", (event) => {
  const dot = event.target.closest(".carousel-dot");
  if (!dot) return;
  activeProjectIndex = Array.from(carouselDots.children).indexOf(dot);
  updateProjectCarousel();
  startProjectAutoplay();
});

projectList?.addEventListener("pointerdown", (event) => {
  touchStartX = event.clientX;
  stopProjectAutoplay();
});

projectList?.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse") return;
  const card = event.target.closest(".project-row");
  if (!card) return;
  const bounds = card.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;
  card.style.setProperty("--card-tilt-x", `${x * 5}deg`);
  card.style.setProperty("--card-tilt-y", `${-y * 5}deg`);
  card.style.setProperty("--card-shift-x", `${x * -18}px`);
  card.style.setProperty("--card-shift-y", `${y * -18}px`);
});

projectList?.addEventListener("pointerout", (event) => {
  const card = event.target.closest(".project-row");
  if (!card || card.contains(event.relatedTarget)) return;
  card.style.removeProperty("--card-tilt-x");
  card.style.removeProperty("--card-tilt-y");
  card.style.removeProperty("--card-shift-x");
  card.style.removeProperty("--card-shift-y");
});

projectList?.addEventListener("pointerup", (event) => {
  const swipeDistance = event.clientX - touchStartX;
  if (Math.abs(swipeDistance) > 42) changeProject(swipeDistance > 0 ? -1 : 1);
  startProjectAutoplay();
});

projectList?.addEventListener("pointercancel", startProjectAutoplay);
projectList?.addEventListener("mouseenter", stopProjectAutoplay);
projectList?.addEventListener("mouseleave", startProjectAutoplay);
projectList?.addEventListener("focusin", stopProjectAutoplay);
projectList?.addEventListener("focusout", startProjectAutoplay);
projectList?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") changeProject(-1);
  if (event.key === "ArrowRight") changeProject(1);
});

workToggle?.addEventListener("click", () => {
  showingAllProjects = !showingAllProjects;
  renderProjects();
  workToggle.focus();
});

const updateHeaderState = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const setActiveNav = (activeHref) => {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === activeHref);
  });
};

const updateActiveNav = () => {
  const headerOffset = siteHeader?.getBoundingClientRect().height || 88;
  const marker = window.scrollY + headerOffset + 56;
  let activeHref = "#top";

  sectionTargets.forEach((section) => {
    if (section.id !== "top" && section.offsetTop <= marker) {
      activeHref = `#${section.id}`;
    }
  });

  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6;
  if (nearBottom && document.querySelector("#contact")) {
    activeHref = "#contact";
  }

  setActiveNav(activeHref);
  document.body.classList.toggle("show-back-home", activeHref !== "#top" && window.scrollY > 220);
};

updateActiveNav();
window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("resize", updateActiveNav);

const setDrawerOpen = (isOpen) => {
  document.body.classList.toggle("drawer-open", isOpen);
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  mobileDrawer?.setAttribute("aria-hidden", String(!isOpen));
};

menuButton?.addEventListener("click", () => {
  setDrawerOpen(!document.body.classList.contains("drawer-open"));
});

drawerCloseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => setDrawerOpen(false));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setActiveNav(link.getAttribute("href"));
    setDrawerOpen(false);
  });
});

backHomeButton?.addEventListener("click", () => {
  setActiveNav("#top");
  setDrawerOpen(false);
  document.body.classList.remove("show-back-home");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setDrawerOpen(false);
  }
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === "dark" ? "" : "dark";
    if (nextTheme) {
      root.dataset.theme = nextTheme;
      localStorage.setItem("portfolio-theme", nextTheme);
    } else {
      delete root.dataset.theme;
      localStorage.removeItem("portfolio-theme");
    }
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observerInstance.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.15
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const formatCounterValue = (value, suffix) => `${Math.round(value)}${suffix}`;

const animateCounter = (counter) => {
  if (counter.dataset.counted === "true") return;

  const target = Number(counter.dataset.count);
  const suffix = counter.dataset.suffix || "";

  if (!Number.isFinite(target)) return;

  counter.dataset.counted = "true";

  const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (motionReduced) {
    counter.textContent = formatCounterValue(target, suffix);
    return;
  }

  const duration = 900;
  const startTime = performance.now();
  counter.textContent = formatCounterValue(0, suffix);

  const tick = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = formatCounterValue(target * eased, suffix);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observerInstance.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -18% 0px",
      threshold: 0.35
    }
  );

  statNumbers.forEach((counter) => counterObserver.observe(counter));
} else {
  statNumbers.forEach(animateCounter);
}
