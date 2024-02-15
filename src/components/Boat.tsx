import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BoatLocation, Locations } from "../App";

type Props = {
    boatLocation: BoatLocation
    selectedItem: DraggableItem | null
    setSelectedItem: (item: DraggableItem) => void
    onMoveComplete: () => void
    locations: Locations
    setLocations: (locations: Locations) => void
}

export type DraggableItem = {
    type: "wolf" | "sheep" | "cabbage";
    src: string;
}



export const Boat = (props: Props) => {
    const { boatLocation, selectedItem, setSelectedItem, onMoveComplete, setLocations, locations } = props;

    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: ["wolf", "sheep", "cabbage"],
            canDrop: (item) => locations[item.type] === boatLocation,
            drop: (item: DraggableItem) => handleItemDropped(item),
            collect: monitor => ({
                isOver: !!monitor.isOver()
            })
        })
    )


    const handleItemDropped = (item: DraggableItem) => {
        // setSelectedItem(item)
        console.log(item.type);
        if (selectedItem) {
            console.log("if")
            // const originalLocation = locations[selectedItem.type];
            setLocations({...locations, [selectedItem.type]: locations[item.type], [item.type]: "onboat"})
            setSelectedItem(item);
        }else {
            console.log("else")
            console.log(locations)
            setLocations({...locations, [item.type]: "onboat"})
            setSelectedItem(item);
        }
    }

    const variants = {
        left: { x: 200 },
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
            onAnimationComplete={onMoveComplete}
        >
            <div
                ref={drop}
                style={{
                }}
            >
                {selectedItem && (
                    <img src={selectedItem.src} alt={selectedItem.type} width="150px" style={{
                        position: "absolute",
                        zIndex: -1,
                    }} />
                )}
                <img src="/boat.png" alt="boat" width="200px" />
            </div>
        </motion.div>
    )
}
