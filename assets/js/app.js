let carousel = document.querySelector('[data-carousel]');
let prev = carousel.querySelectorAll('[data-prev]');
let next = carousel.querySelectorAll('[data-next]');
let items = carousel.querySelectorAll('[data-item]');
const itemWidth = items[0].clientWidth;

const clone = (isClone, current, after) => {
  const clone = items[isClone].cloneNode(true);
  if (after) items[current].after(clone);
  else items[current].before(clone);
  carousel = document.querySelector('[data-carousel]');
  prev = carousel.querySelectorAll('[data-prev]');
  next = carousel.querySelectorAll('[data-next]');
  items = carousel.querySelectorAll('[data-item]');
  translated = false;
}


const toPrev = () => {
  carousel.style.transitionDuration = '0.5s';
  carousel.style.transform = 'translateX(0)';
  setTimeout(() =>{
    carousel.style.transitionDuration = '0s';
    carousel.style.transform = `translateX(-${itemWidth}px)`;
    items[2].remove();
    clone(1, 0, false);
    items[0].querySelector('[data-next]').addEventListener('click', () => toNext());
    items[0].querySelector('[data-prev]').addEventListener('click', () => toPrev());
  }, 500)
}

const toNext = () => {
  carousel.style.transitionDuration = '0.5s';
  carousel.style.transform = `translateX(-${itemWidth * 2}px)`;
  setTimeout(() =>{
    carousel.style.transitionDuration = '0s';
    carousel.style.transform = `translateX(-${itemWidth}px)`;
    items[0].remove();
    clone(1, 2, true);
    items[2].querySelector('[data-next]').addEventListener('click', () => toNext());
    items[2].querySelector('[data-prev]').addEventListener('click', () => toPrev());
  }, 500)
}

const carouselActions = (pressPrev, pressNext) => {
  pressPrev.forEach(btn => btn.addEventListener('click', () => toPrev()));
  pressNext.forEach(btn => btn.addEventListener('click', () => toNext()));
  window.onkeyup = e => {
    if (e.keyCode == '37') toPrev();
    else if (e.keyCode == '39') toNext();
  }
}

const init = () => {
  clone(1,0,false);
  carouselActions(prev, next);
}

init();