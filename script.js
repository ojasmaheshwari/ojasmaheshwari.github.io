const typewriteSpan = document.querySelector(".typewrite");

const typewriteArray = [
  "C++ Developer",
  "Web Developer",
  "Logician",
  "CS Enthusiast",
];

// let i = 0;
// let txt = typewriteArray[0];
// const speed = 100;

// function typeWriter() {
//   if (i < txt.length) {
//     typewriteSpan.innerText += txt.charAt(i);
//     i++;
//     setTimeout(typeWriter, speed);
//   }
// }

function typeWriter(
  strings,
  elementId,
  typingSpeed = 100,
  pauseDuration = 2000,
) {
  const element = document.getElementById(elementId);
  let arrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentString = strings[arrayIndex];
    if (!isDeleting) {
      element.textContent = currentString.slice(0, charIndex);
      charIndex++;
      if (charIndex === currentString.length + 1) {
        isDeleting = true;
        setTimeout(type, pauseDuration); // Pause after typing the full string
      } else {
        setTimeout(type, typingSpeed);
      }
    } else {
      element.textContent = currentString.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        arrayIndex = (arrayIndex + 1) % strings.length; // Move to the next string
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, typingSpeed / 2); // Faster deleting speed
      }
    }
  }

  type();
}

typeWriter(typewriteArray, "typewrite");

const aboutNav = document.querySelector(".about-nav-content");

const aboutSectionItem =
  "<div class='about-item'><span class='lead'>HEADING</span><p>DESCRIPTION</p></div>";

const aboutSectionsData = {
  Skills: [
    ["UI/UX", "Designing Web Interfaces"],
    ["Web Developement", "Full Stack Developement using MERN, MENS Stack"],
    ["C++ Developement", "Utility tools and OpenGL Game Developement"],
  ],
  Experience: [
    [
      "Frontend",
      "Creating simple and aesthetic UI's with React, TailwindCSS, RadixUI, ShadCN",
    ],
    [
      "Backend",
      "Functional applications utilising NodeJS, Express JS and MongoDB in the backend",
    ],
    ["C++", "Creating games and utility applications in C++"],
  ],
  Education: [
    ["Undergraduate", "1st year at Scaler School of Technology, Bangalore"],
    [
      "High School",
      "Passed 12th with 95% from Seth M.R. Jaipuria School, Kasganj",
    ],
    ["Early Bird", "Intrested in computers and programming since 13 yrs old"],
  ],
};

let currentSelectedItem = Object.keys(aboutSectionsData)[0];

const renderAboutItems = () => {
  for (const [type, data] of Object.entries(aboutSectionsData)) {
    let parentElem = `<div class='${type}-sub-section about-sub-section'>`;
    data.forEach((item) => {
      if (type !== currentSelectedItem) {
        return;
      }
      const replWith = aboutSectionItem
        .replace("HEADING", item[0])
        .replace("DESCRIPTION", item[1]);

      parentElem += replWith;
    });

    parentElem += "</div>";
    aboutNav.innerHTML += parentElem;
  }
};

renderAboutItems();

const updateAboutNav = (id) => {
  if (currentSelectedItem === id) {
    return;
  }
  currentSelectedItem = id;
  aboutNav.innerHTML = "";
  renderAboutItems();
};

const serviceItems = [
  {
    icon: "./images/code_icon.svg",
    heading: "Web Developement",
    description:
      "I develope web-based applications using HTML, CSS, JS, MERN and MENS Stack.",
    link: "https://ojasmaheshwari.netlify.app",
  },
  {
    icon: "./images/binary-svgrepo-com.svg",
    heading: "C++ Developement",
    description:
      "I can help you with projects requiring knowledge of low level architecture using C++",
    link: "#",
  },
  {
    icon: "./images/equation-svgrepo-com(2).svg",
    heading: "Linear Algebra",
    description:
      "Currently learning Linear Algebra, linear transformations, vectors, linear independence etc.",
    link: "#",
  },
];
const servicesWrapper = document.querySelector(".services-wrapper");
const service_contentFormat =
  "<div class='services-card'><img src='ICON' alt='' /><h2>HEADING</h2><p>DESCRIPTION</p><a href='LINK' target='_blank'>Learn more</a></div>";

const renderServiceItems = () => {
  serviceItems.forEach((item) => {
    const replBy = service_contentFormat
      .replace("ICON", item.icon)
      .replace("HEADING", item.heading)
      .replace("DESCRIPTION", item.description)
      .replace("LINK", item.link);
    servicesWrapper.innerHTML += replBy;
  });
};

renderServiceItems();

const portfolioItems = [
  {
		imageLink: "./images/blog_image.webp",
    heading: "Blogging Website",
    description: "Full Stack Blogging site made using MERN Stack",
    link: "https://ojasmaheshwari.netlify.app",
  },
	{
		imageLink: "./images/code_editor_img.jpg",
    heading: "Web-based Code Editor",
    description: "A web based code editor which allows you to write and run code online.",
    link: "https://ojasmaheshwari.github.io/projects/OjasEditor",
	},
	{
		imageLink: "./images/game_image.png",
    heading: "HTML Canvas Game",
    description: "A HTML Canvas game about crossing duplex roads",
    link: "https://ojasmaheshwari.github.io/projects/CrossTheRoad",
	}
];

const portfolioWrapper = document.querySelector(".portfolio-wrapper");
const portfolio_contentFormat =
  "<div class='portfolio-card'><img src='IMAGE_LINK' alt=''><div class='hover-up-card'><h4>HEADING</h4><p>DESCRIPTION</p><a class='portfolio_more-icon' href='LINK' target='_blank'><img src='./images/open_icon.svg' alt=''></a></div></div>";

const renderPortfolioItems = () => {
  portfolioItems.forEach((item) => {
    const replBy = portfolio_contentFormat.replace("IMAGE_LINK", item.imageLink).replace("HEADING", item.heading)
		.replace("DESCRIPTION", item.description).replace("LINK", item.link);
		portfolioWrapper.innerHTML += replBy;
  });
};

renderPortfolioItems();

const prevDefLinks = document.querySelectorAll('.prevent-default');
prevDefLinks.forEach((link) => {
	link.addEventListener('click', (e) => e.preventDefault())
})

const hamburgerBtn = document.getElementById("hamburger-btn");
const navbar = document.getElementById("navbar");
const closeBtn = document.getElementById("nav-close");
const closeNav = () => {
	navbar.style.width = "0";
}
hamburgerBtn.addEventListener('click', (e) => {
	navbar.style.width = "15rem";
});
closeBtn.addEventListener('click', (e) => {
	closeNav();
})

