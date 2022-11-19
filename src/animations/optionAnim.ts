import { AnimationProps } from "framer-motion";

export const optionAnim: AnimationProps = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.25,
        delay: 0
      },
    },
    transition: {
      duration: 0.45,
    },
  };