import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

document.addEventListener('DOMContentLoaded', () => {
  const boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    const image = box.querySelector('.box__image');
    const defaultNameEl = box.querySelector('.box__body--name.default h2');
    const personNameEl = box.querySelector('.box__body--name:not(.default) p');

    const defaultChars = new SplitText(defaultNameEl, { type: 'chars' }).chars;
    const personChars = new SplitText(personNameEl, { type: 'chars' }).chars;

    gsap.set(defaultChars, { y: '0%', opacity: 1 });
    gsap.set(personChars, { y: '100%', opacity: 0 });

    const animateChars = (chars, y, opacity) =>
      gsap.to(chars, {
        y,
        opacity,
        ease: 'power4.out',
        duration: 0.75,
        stagger: { each: 0.03, from: 'center' },
      });

    const animateImageScale = (targetScale) =>
      gsap.to(image, {
        scale: targetScale,
        duration: 0.5,
        ease: 'power4.out',
      });

    image.addEventListener('mouseenter', () => {
      animateChars(defaultChars, '-100%', 0);
      animateChars(personChars, '0%', 1);
      animateImageScale(1.1);
    });

    image.addEventListener('mouseleave', () => {
      animateChars(defaultChars, '0%', 1);
      animateChars(personChars, '100%', 0);
      animateImageScale(1);
    });
  });
});
