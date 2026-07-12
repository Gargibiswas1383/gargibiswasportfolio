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
    reverse: false
  },
  {
    number: "02",
    title: "Designing Cravings — where purpose meets flavor!",
    description:
      "Designed a visually engaging food platform that blends branding, UI, and storytelling to create a delightful user experience. Focused on promoting fresh meals and attractive deals while reducing food waste, using warm visuals and appetizing design elements to evoke instant craving and connection.",
    tags: ["Branding", "UI Design", "Storytelling"],
    image: "./assets/figma-cravings.png",
    link: "https://www.behance.net/gallery/237711449/Designing-Cravings-where-purpose-meets-flavor-",
    reverse: true
  },
  {
    number: "03",
    title: "SEASON: A touch of green, a world of peace",
    description:
      "Created a visually calming, nature-inspired experience that reflects the essence of greenery, sustainability, and inner peace. Focused on building a harmonious connection between users and nature through minimal layouts, soft visuals, and a soothing color palette that evokes balance and tranquility.",
    tags: ["UX Design", "Sustainability", "Branding"],
    image: "./assets/figma-season.png",
    link: "https://www.behance.net/gallery/237335551/SEASON-A-touch-of-green-a-world-of-peace",
    reverse: false
  },
  {
    number: "04",
    title: "MEETOO: You're Not Alone Anymore",
    description:
      "Created an impactful and emotionally driven experience aimed at raising awareness and offering support to individuals affected by harassment and abuse. The project focuses on empathy, safe expression, and empowerment, using thoughtful visuals and a sensitive design approach to communicate that no one is alone.",
    tags: ["Social Impact", "UX Design", "Empathy"],
    image: "./assets/figma-meetoo.png",
    link: "https://www.behance.net/gallery/242537013/MEETOO-Youre-Not-Alone-Anymore",
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
    reverse: true
  }
];

const projectList = document.getElementById("project-list");
const siteHeader = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const themeButtons = Array.from(document.querySelectorAll(".theme-pill"));
const menuButton = document.querySelector(".mobile-menu-button");
const mobileDrawer = document.querySelector(".mobile-drawer");
const drawerCloseTriggers = Array.from(document.querySelectorAll("[data-drawer-close]"));
const statNumbers = Array.from(document.querySelectorAll(".stat-number[data-count]"));
const revealTargets = Array.from(document.querySelectorAll(".reveal-on-scroll"));
const sectionHashes = [...new Set(navLinks.map((link) => link.getAttribute("href")))];
const sectionTargets = sectionHashes
  .map((href) => document.querySelector(href))
  .filter(Boolean);

if (projectList) {
  projectList.innerHTML = projects
    .map(
      (project) => `
        <article class="project-row${project.reverse ? " reverse" : ""}">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy" decoding="async" />
            <span class="project-num">${project.number}</span>
          </div>
          <div class="project-copy">
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
    .join("");
}

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

  counter.textContent = formatCounterValue(target, suffix);
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
