import { motion } from "framer-motion";

const variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

export function Reveal({ children, delay = 0, className, as: As = "div" }) {
    const MotionTag = motion[As];
    return (
        <MotionTag
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={variants}
            transition={{ delay }}
        >
            {children}
        </MotionTag>
    );
}

export function Stagger({ children, className, stagger = 0.12 }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: stagger } },
            }}
        >
            {children}
        </motion.div>
    );
}

export const itemVariants = variants;

// i do not understand this but oh well
