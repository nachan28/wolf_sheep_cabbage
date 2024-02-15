import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BoatLocation } from "../App";

type Props = {
    boatLocation: BoatLocation
}

type DraggableItem = {
    type: "wolf" | "sheep" | "cabbage";
    src: string;
}



export const Boat = (props: Props) => {
    const { boatLocation } = props;
    // useEffect(() => {
    //     console.log("Updated locations in Boat:", boatLocation);
    // }, [boatLocation]);
    const [boatItem, setBoatItem] = useState<DraggableItem | null>(null)
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ["wolf", "sheep", "cabbage"],
            // canDrop: (item) => locations[item.type] === locations.boat,
            drop: (item: DraggableItem) => handleItemDropped(item),
            collect: monitor => ({
                isOver: !!monitor.isOver()
            })
        })
    )

    const handleItemDropped = (item: DraggableItem) => {
        setBoatItem({ ...item })
    }

    const variants = {
        left: { x: 0 },
        right: { x: 700 },
    };

    return (
        <motion.div
            initial={boatLocation}
            animate={boatLocation}
            variants={variants}
            transition={{ duration: 0.5 }}
            style={{
                position: 'relative',
                width: '200px',
            }}
        >
            <div
                ref={drop}
                style={{
                    position: 'relative',
                }}
            >
                {boatItem && (
                    <img src={boatItem.src} alt={boatItem.type} width="150px" style={{
                        position: "absolute",
                        zIndex: -1,
                    }} />
                )}
                <img src="/boat.png" alt="boat" width="200px" />
            </div>
        </motion.div>
    )
}