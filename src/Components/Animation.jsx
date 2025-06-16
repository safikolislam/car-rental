export const fadeIn = (direction, delay) => {
  return {
    hidden: {
      opacity: 0,
      x: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
      y: direction === 'right' ? 100 : direction === 'right' ? -100 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
};
