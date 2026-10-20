export const ASSETS = {
  moises: "/assets/images/moics-portrait.png",
  busyman: "/assets/images/busy-rawr.jpg",
  cbum: "/assets/images/cbum-photo.webp",
  stonks: "https://i.postimg.cc/r04g4zfL/Stonks.png",
  eula: "https://i.postimg.cc/bZvTTmmR/Eula.png",
  church: "https://i.postimg.cc/tZFtTwgC/Church.png",
  humanoLogo: "/assets/images/humano-logo.svg",
};

export const PROJECTS_DATA = {
  busy: {
    id: "busy",
    title: "BUSY",
    tagline: "Moics’ illustration portfolio",
    image: ASSETS.busyman,
    otherImages: [ASSETS.stonks, ASSETS.cbum],
    summary:
      "An interactive portfolio featuring original character design, fan illustrations, and chapters from my independent manga",
    about: [
      "Finance app to track goals and expenses.",
      "To showcase the importance of saving and",
      "It features fanarts from the artist´s favorite works and original characters from the upcoming manga Milky Way.",
    ],
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
    tagline: "Finance for everyone",
    image: ASSETS.stonks,
    otherImages: [ASSETS.busyman, ASSETS.cbum],
    summary:
      "Finance app to track goals and expenses. Quartos helps to raise awareness about the importance of saving and investing money the right way.",
    about: [
      "Finance app to track goals and expenses.",
      "Quartos helps to raise awareness about the importance of saving and investing money the right way.",
    ],
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
    tagline: "Fitness app for young people",
    image: ASSETS.cbum,
    otherImages: [ASSETS.busyman, ASSETS.stonks],
    summary:
      "Fitness Mobile app for young people to get jacked. People need a platform to track their workout and meals so Fortissimo comes up to provide the tools needed to make it happen.",
    about: [
      "Fitness Mobile app for young people to get jacked.",
      "People need a platform to track their workout and meals so Fortissimo comes up to provide the tools needed to make it happen.",
    ],
    previews: [
      "/assets/images/modal-quartos-dashboard.png",
      "/assets/images/modal-quartos-expenses.png",
    ],
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
  gallery: [ASSETS.eula, ASSETS.cbum, ASSETS.church],
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
