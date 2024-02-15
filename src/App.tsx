import React, { useEffect, useState } from 'react';
import './App.css';
// import { Item } from './components/Item';
import { Boat } from './components/Boat';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LeftSideItems } from './components/LeftSideItems';
import { RightSideItems } from './components/RightSideItems';
import { DraggableItem } from './components/Boat';

export type Location = "right" | "left" | "onboat"
export type BoatLocation = "right" | "left"

export type Locations = {
  wolf: Location
  sheep: Location
  cabbage: Location
}

function App() {
  const [locations, setLocations] = useState<Locations>({
    wolf: "right",
    sheep: "right",
    cabbage: "right",
  })

  const [boatLocation, setBoatLocation] = useState<BoatLocation>("right");
  const [selectedItem, setSelectedItem] = useState<DraggableItem | null>(null)
  const [count, setCount] = useState(0);

  const handleGo = () => {
    setBoatLocation(boatLocation === "right" ? "left" : "right")
    setCount(prev => prev + 1)
  }

  const onMoveComplete = () => {
    const gameOverMessage = isGameOver(locations)
    if (gameOverMessage) {
      alert(gameOverMessage)
    }
    if (isGameWon(locations)) {
      alert("Congratulations! You won!");
    }
    if (selectedItem) {
      setLocations({...locations, [selectedItem.type]: boatLocation});
    }
  setSelectedItem(null);
}



const handleReset = () => {
  setLocations({
    wolf: "right",
    sheep: "right",
    cabbage: "right",
  });
  setSelectedItem(null);
  setBoatLocation("right");
  setCount(0);
}

// const handleSelectItem = (item: "wolf" | "sheep" | "cabbage" | null) => {
//   if (item && boatLocation === locations[item]) {
//     // setSelectedItem(item)
//   }
// }

const isGameOver = (locations: Locations) => {
  if (locations.wolf === locations.sheep && boatLocation !== locations.wolf && locations.cabbage !== locations.wolf) {
    return "The wolf ate the sheep!";
  }
  if (locations.sheep === locations.cabbage && boatLocation !== locations.sheep && locations.wolf !== locations.sheep) {
    return "The sheep ate the cabbage!"
  }
  return null;
}

const isGameWon = (locations: Locations) => {
  if (locations.wolf === "left" && locations.sheep === "left" && locations.cabbage === "left") {
    return true
  }
  return false
}

// "left" と "right" のアイテムリストを生成
const leftItems = Object.entries(locations)
  .filter(([key, value]) => value === "left")
  .map(([key]) => key) as ("wolf" | "sheep" | "cabbage")[];

const rightItems = Object.entries(locations)
  .filter(([key, value]) => value === "right")
  .map(([key]) => key) as ("wolf" | "sheep" | "cabbage")[];

return (
  <DndProvider backend={HTML5Backend}>
    <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
      <LeftSideItems items={leftItems} locations={locations}></LeftSideItems>
      <RightSideItems items={rightItems} locations={locations}></RightSideItems>
      <Boat boatLocation={boatLocation} selectedItem={selectedItem} setSelectedItem={setSelectedItem} onMoveComplete={onMoveComplete} setLocations={setLocations} locations={locations}></Boat>
    </div>
    <p>{boatLocation}</p>
    {/* <p>selected: {selectedItem}</p> */}
    <p>{count}times</p>
    {/* <p>{selectedItem && locations[selectedItem.type]}</p> */}

    <p>{selectedItem && selectedItem.type}</p>
    <p>{rightItems}</p>
    <button onClick={() => handleGo()}>GO!</button>
    {/* <button onClick={() => setSelectedItem(null)}>Select None</button> */}
    <button onClick={() => handleReset()}>最初から</button>
  </DndProvider>
)
}

export default App;
