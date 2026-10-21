export const ASSETS = {
  moises: "/assets/images/moics-portrait.png",
  busyman: "/assets/images/busy-rawr.jpg",
  cbum: "/assets/images/cbum-photo.webp",
  stonks: "https://i.postimg.cc/r04g4zfL/Stonks.png",
  eula: "https://i.postimg.cc/bZvTTmmR/Eula.png",
  church: "https://i.postimg.cc/tZFtTwgC/Church.png",
  humanoLogo: "/assets/images/humano-logo.svg",
};

export const PROJECT_IDS = ["busy", "quartos", "fortissimo"];

export const PROJECTS_DATA = {
  busy: {
    id: "busy",
    title: "BUSY",
    actionLabel: "Visit site",
    url: "https://busymoics.figma.site/",
    tagline: "Moics' illustration portfolio & original universe",
    image: ASSETS.busyman,
    otherImages: [ASSETS.stonks, ASSETS.cbum],
    description:
      "An interactive visual showcase exploring character design, fan illustrations, and worldbuilding. Features original characters and visual development from the upcoming independent manga project, Milky Way.",
    previews: [
      "/assets/images/modal-busy-gallery.png",
      "/assets/images/modal-busy-characters.png",
    ],
    modalColor: "#FFD000",
    aboutColor: "#FFD000",
    previewColor: "#000000",
    previewHeadingColor: "#FFFFFF",
  },
  quartos: {
    id: "quartos",
    title: "QUARTOS",
    actionLabel: "Visit site",
    url: "https://moics-quartos.vercel.app/",
    tagline: "Finance for everyone",
    image: ASSETS.stonks,
    otherImages: [ASSETS.busyman, ASSETS.cbum],
    description:
      "A personal finance platform designed to simplify expense tracking, financial goals, and cash flow habits. Built to make money management intuitive, actionable, and accessible for everyday users.",
    previews: [
      "/assets/images/modal-quartos-dashboard.png",
      "/assets/images/modal-quartos-expenses.png",
    ],
    modalColor: "#0EAD69",
    aboutColor: "#2FD78F",
    previewColor: "#00D2AA",
    previewHeadingColor: "#000000",
  },
  fortissimo: {
    id: "fortissimo",
    title: "FORTISSIMO",
    actionLabel: "Open case study",
    url: "https://www.figma.com/slides/JcTS46Kqxey0VLidqczSG9/Fortissimo?t=RzGjX4zKK4qswteF-6",
    tagline: "Strength & progressive overload tracker",
    image: ASSETS.cbum,
    otherImages: [ASSETS.busyman, ASSETS.stonks],
    description:
      "A mobile fitness companion tailored for progressive overload, routine adherence, and nutrition tracking. Designed with friction-free workout logging to keep training momentum consistent and focused.",
    previews: [],
    previewPlaceholder: "Fortissimo preview coming soon",
    modalColor: "#00D2AA",
    aboutColor: "#2FD78F",
    previewColor: "#027D65",
    previewHeadingColor: "#FFFFFF",
  },
  overview:
    "Projects I have worked on that have challenged me in different ways and have helped me perfect my craft.",
};

export const ABOUT_DATA = {
  fullBio:
    "I’m Moises, but some people call me Moi or Moics. I like to think out of the box, cube, sphere—it don’t matter, I just like to find ways to bring ideas into existence. I’m the best designer of my family (don’t ask me how many there are though).",
  expandedBio:
    "I’m Moises, but some people call me Moi or Moics. I like to think out of the box, cube, sphere—it don’t matter, I just like to find ways to bring ideas into existence.",
  hobbies:
    "When I’m not designing I’m usually serving at church, drawing my manga Milky Way or working out at the gym.",
  gallery: [
    { image: ASSETS.eula, label: "Manga illustration" },
    { image: ASSETS.church, label: "Serving at church" },
    { image: ASSETS.cbum, label: "Working out" },
  ],
};

export const EXPERIENCE_DATA = {
  achievements: [
    {
      title: "App Intermediarios",
      description:
        "I boosted intermediary productivity by simplifying critical internal tools, directly translating better UX into faster policy management.",
    },
    {
      title: "Closing the gap",
      description:
        "I optimized the bridge between design and engineering by delivering pixel-perfect, documented components in Figma, ensuring 100% visual accuracy and faster implementation.",
    },
  ],
};
