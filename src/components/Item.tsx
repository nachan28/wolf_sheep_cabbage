import { motion } from "framer-motion";

type Props = {
    src: string;
    type: string;
    onClick: () => void;
    location: "right" | "left"
    onMoveComplete: () => void
}

export const Item = (props: Props) => {
    const { src, type, onClick, location, onMoveComplete } = props


    // アニメーション
    const variants = {
        left: { x: 0 },
        right: { x: 500 },
    };

    return (
        <motion.div
            initial={location}
            animate={location}
            variants={variants}
            transition={{ duration: 0.5 }}
            onAnimationComplete={onMoveComplete}
        >
            <img src={src} alt={type} onClick={onClick} width="100px" />
        </motion.div>
    )
}
