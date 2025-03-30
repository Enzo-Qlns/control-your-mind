import { JSX } from "react";
import {
    HTMLMotionProps,
    motion
} from "motion/react";

const ContentLayout = ({
    children,
    ...props
}: {
    children: React.ReactNode;
} & HTMLMotionProps<"div">): JSX.Element => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                ease: "easeInOut",
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export default ContentLayout;