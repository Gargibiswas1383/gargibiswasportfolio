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
    image: "https://www.figma.com/api/mcp/asset/51c8f9b3-179c-4fa8-8708-e8c0c7e5e65a",
    link: "https://www.behance.net/gallery/245873601/Reimagining-the-TrueDeal-Travel-Platform",
    reverse: false
  },
  {
    number: "02",
    title: "Designing Cravings — where purpose meets flavor! 💜",
    description:
      "Designed a visually engaging food platform that blends branding, UI, and storytelling to create a delightful user experience. Focused on promoting fresh meals and attractive deals while reducing food waste, using warm visuals and appetizing design elements to evoke instant craving and connection.",
    tags: ["Branding", "UI Design", "Storytelling"],
    image: "https://www.figma.com/api/mcp/asset/4102bdba-eff6-4873-86b4-f0a9bec36d09",
    link: "https://www.behance.net/gallery/237711449/Designing-Cravings-where-purpose-meets-flavor-",
    reverse: true
  },
  {
    number: "03",
    title: "SEASON: A touch of green, a world of peace",
    description:
      "Created a visually calming, nature-inspired experience that reflects the essence of greenery, sustainability, and inner peace. Focused on building a harmonious connection between users and nature through minimal layouts, soft visuals, and a soothing color palette that evokes balance and tranquility.",
    tags: ["UX Design", "Sustainability", "Branding"],
    image: "https://www.figma.com/api/mcp/asset/1597d073-b512-44d0-9f10-1ebbd5409988",
    link: "https://www.behance.net/gallery/237335551/SEASON-A-touch-of-green-a-world-of-peace",
    reverse: false
  },
  {
    number: "04",
    title: "MEETOO: You're Not Alone Anymore",
    description:
      "Created an impactful and emotionally driven experience aimed at raising awareness and offering support to individuals affected by harassment and abuse. The project focuses on empathy, safe expression, and empowerment, using thoughtful visuals and a sensitive design approach to communicate that no one is alone.",
    tags: ["Social Impact", "UX Design", "Empathy"],
    image: "https://www.figma.com/api/mcp/asset/3e26bb5d-5d40-452e-af5a-dcf7f5d5d2c5",
    link: "https://www.behance.net/gallery/242537013/MEETOO-Youre-Not-Alone-Anymore",
    reverse: true
  },
  {
    number: "05",
    title: "Dashboard Design for Scheduling Meetings and Daily Work",
    description:
      "Developed a user-friendly dashboard experience that streamlines meeting scheduling and daily task management. Prioritized intuitive navigation, structured layouts, and clear information hierarchy to enhance productivity and reduce complexity in managing workflows.",
    tags: ["Dashboard", "Productivity", "UI Design"],
    image: "https://www.figma.com/api/mcp/asset/443f0f5c-2d2f-4ca2-9b62-73b0acebf864",
    link: "https://www.behance.net/gallery/231679061/Dashboard-Design-for-Scheduling-Meetings-and-Daily-Work",
    reverse: false
  },
  {
    number: "06",
    title: "Lavanya — A Celebration of Timeless Jewels",
    description:
      "Crafted a premium and elegant jewelry brand experience that celebrates timeless beauty and cultural richness. Designed with a focus on storytelling, refinement, and luxury aesthetics — every detail reflects the artistry and grace of fine jewellery.",
    tags: ["Luxury Branding", "E-commerce", "UI Design"],
    image: "https://www.figma.com/api/mcp/asset/3d723888-e009-41f2-bff3-af4e382629c2",
    link: "https://www.behance.net/gallery/244698927/Lavanya-A-Celebration-of-Timeless-Jewels",
    reverse: true
  }
];

const projectList = document.getElementById("project-list");
const siteHeader = document.querySelector(".site-header");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sectionTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const revealTargets = Array.from(document.querySelectorAll(".reveal-on-scroll"));

projectList.innerHTML = projects
  .map(
    (project) => `
      <article class="project-row${project.reverse ? " reverse" : ""}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}" />
          <span class="project-num">${project.number}</span>
        </div>
        <div class="project-copy">
          <div class="chips">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <h4>${project.title}</h4>
          <div class="rule"></div>
          <p>${project.description}</p>
          <a class="cta cta-dark" href="${project.link}"${project.link !== "#" ? ' target="_blank" rel="noopener noreferrer"' : ""}>
            <span>View Project</span>
            ${iconMarkup.arrowUpRight}
          </a>
        </div>
      </article>
    `
  )
  .join("");

const tiltTargets = Array.from(
  document.querySelectorAll(
    ".timeline-card, .skill-card, .project-image, .image-card, .contact-pill, .availability-card"
  )
);

const updateHeaderState = () => {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const canUsePointerEffects =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUsePointerEffects) {
  tiltTargets.forEach((target) => {
    target.classList.add("tilt-surface");

    target.addEventListener("mousemove", (event) => {
      const rect = target.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * 5;
      const rotateX = (0.5 - py) * 5;

      target.style.setProperty("--tilt-rotate-x", `${rotateX.toFixed(2)}deg`);
      target.style.setProperty("--tilt-rotate-y", `${rotateY.toFixed(2)}deg`);
      target.style.setProperty("--tilt-glow-x", `${(px * 100).toFixed(2)}%`);
      target.style.setProperty("--tilt-glow-y", `${(py * 100).toFixed(2)}%`);
    });

    target.addEventListener("mouseleave", () => {
      target.style.removeProperty("--tilt-rotate-x");
      target.style.removeProperty("--tilt-rotate-y");
      target.style.removeProperty("--tilt-glow-x");
      target.style.removeProperty("--tilt-glow-y");
    });
  });
}

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("active", isActive);
    });
  },
  {
    rootMargin: "-20% 0px -55% 0px",
    threshold: [0.2, 0.35, 0.5]
  }
);

sectionTargets.forEach((section) => observer.observe(section));

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
