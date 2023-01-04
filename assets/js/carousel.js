//identify carousel elements
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

//arrange slides next to one another
const setSlidePosition = (slide, index) => {
  var slideWidth = slides[0].getBoundingClientRect().width;
  slide.style.left = slideWidth * index + 'px';
}

function loopPositionSet(){
  slides.forEach(setSlidePosition);
  setTimeout(loopPositionSet, 0);
}; loopPositionSet();

const removeSlide = () => {
  track.classList.remove('transition-active');
}

const moveToSlide = (track, currentSlide, targetSlide, hasTransition) => {
  if (hasTransition === 1) {
    track.classList.add('transition-active');
  }
  console.log(track.classList);
  track.style.transform = 'translateX(calc(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  setTimeout(removeSlide, 500);
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const currentIndex = slides.findIndex(slide => slide === currentSlide);
  var nextIndex = null;
  if (currentIndex === slides.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = currentIndex + 1;
  }
  const nextSlide = slides[nextIndex];
  const nextDot = dots[nextIndex];
  moveToSlide(track, currentSlide, nextSlide, 1);
  updateDots(currentDot, nextDot);
});

prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const currentIndex = slides.findIndex(slide => slide === currentSlide);
  var prevIndex = null;
  if (currentIndex === 0) {
    prevIndex = slides.length - 1;
  } else {
    prevIndex = currentIndex - 1;
  }
  const prevSlide = slides[prevIndex];
  const prevDot = dots[prevIndex];

  moveToSlide(track, currentSlide, prevSlide, 1);
  updateDots(currentDot, prevDot);
});

dotsNav.addEventListener('click', e => {
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide, 1);
  updateDots(currentDot, targetDot);
});

window.addEventListener("resize", (event) => {
  const currentSlide = track.querySelector('.current-slide');
  moveToSlide(track, currentSlide, currentSlide, 0);
});

function loopCarousel(){
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const currentIndex = slides.findIndex(slide => slide === currentSlide);
  var nextIndex = null;
  if (currentIndex === slides.length - 1) {
    nextIndex = 0;
  } else {
    nextIndex = currentIndex + 1;
  }
  const nextSlide = slides[nextIndex];
  const nextDot = dots[nextIndex];

  moveToSlide(track, currentSlide, nextSlide, 1);
  updateDots(currentDot, nextDot);
  setTimeout(loopCarousel, 5000);
}; loopCarousel();

moveToSlide(track, slides[1], slides[0], 0);
updateDots(dots[1], dots[0]);