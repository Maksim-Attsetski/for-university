import { AnimationProps } from "framer-motion";

export const selectAnim: AnimationProps = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      height: 'max-content',
      opacity: 1,
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    transition: {
      duration: 0.45,
    },
  };