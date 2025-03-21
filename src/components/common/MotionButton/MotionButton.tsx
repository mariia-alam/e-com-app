import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button } from "react-bootstrap";

const MotionButton = motion.create(
  forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
    (props, ref) => <Button ref={ref} {...props} />
  )
);

export default MotionButton;
