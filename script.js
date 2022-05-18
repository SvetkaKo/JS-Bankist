'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////// OPEN ACCOUNT SECTION //////////
//Open account button function for event
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//Open account button event
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

// Close button
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
// Close account event
btnCloseModal.addEventListener('click', closeModal);
//close  by clicking on background
overlay.addEventListener('click', closeModal);
//close by clicking escape btn
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////SMOOTH SCROLLING

const btnScrollTo = document.querySelector('.btn--scroll-to'); //btn "learn more"
const section1 = document.querySelector('#section--1'); // Features
console.log(section1.getBoundingClientRect());

btnScrollTo.addEventListener('click', event => {
  event.preventDefault();

  //old-fashioned method
  //   window.scrollTo({
  //     top: section1.getBoundingClientRect().top + window.pageYOffset,
  //     left: section1.getBoundingClientRect().left + window.pageXOffset,
  //     behavior: 'smooth',
  //   });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Nav bar
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document
  .querySelector('.nav__links')
  .addEventListener('click', function (event) {
    event.preventDefault();
    if (event.target.classList.contains('nav__link')) {
      const id = event.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

////////New fade animation for navbar

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////Sticky navigation
/*
const initialCords = section1.getBoundingClientRect();

window.addEventListener('scroll', function () {
  if (window.scrollY > initialCords.top) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
});

//Sticky navigation: Intersection Observer API

const obsCallback = function (entries, observer) {
  entries.forEach(entry => console.log(entry));
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries; //entry = entries[0]

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////Reveal Sections
const revaelSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; //return fo avoiding bags
  entry.target.classList.remove('section--hidden');
  //stop observer
  observer.unobserve(entry.target);
};

const allSections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver(revaelSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////TAbbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsConten = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  //Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Active conten area
  tabsConten.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

////////lazy loading images
const imgTargetd = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //Replace src with data-srs
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargetd.forEach(function (img) {
  imgObserver.observe(img);
});

////////Slider

const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;

// slides.forEach(
//   (slide, index) => (slide.style.transform = `translateX(${100 * index}%)`)
// );

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

dotContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('dots__dot')) {
    const { slide } = event.target.dataset;
    goToSlide(slide);
    activeDot(slide);
  }
});

const goToSlide = function (s) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - s)}%)`)
  );
};
goToSlide(0); //load page
createDots();
activeDot(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activeDot(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') nextSlide();
  event.key === 'ArrowLeft' && prevSlide();
});

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';

/////////////////////////////////////////////////////////////////////
///////////SELECTING ELEMENTS
/*
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.querySelector('.header');
document.getElementById('section--1');
document.getElementsByTagName('button');
console.log(document.getElementsByTagName('button'));

///////////CREATING AND INSERTING ELEMENTS
const header = document.querySelector('.header');
const message = document.createElement('div'); //create an elemenet
message.classList.add('cookie-message'); //add some css
// message.textContent = 'we use cookies to improve your experience';
message.innerHTML =
  'we use cookies to improve your experience<button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); // first child of header
// header.append(message); // last child of header
// header.append(message.cloneNode(true));

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});


const h1 = document.querySelector('h1');
//Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

//Going upwards: parents
console.log(h1.parentElement);
console.log(h1.parentNode);
h1.closest('.header').style.background = 'var(--color-secondary-darker)';
h1.closest('h1').style.background = 'green';

//Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
