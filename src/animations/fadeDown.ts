import { AnimationProps } from "framer-motion";

export const fadeDown: AnimationProps = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: 200,
    },
  };
