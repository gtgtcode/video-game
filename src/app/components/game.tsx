"use client";
import { useEffect, useState } from "react";

export default function Game() {
  const [gameState, setGameState] = useState("game");
  const [playerPosition, setPlayerPosition] = useState([0, 0]); // [x, y]
  const [movementAvailable, setMovementAvailable] = useState(true); // Whether or not the player can move
  const [movementTimer, setMovementTimer] = useState(-1); // Whether or not the player can move
  const mapWidth = 2000;
  const mapHeight = 2000;

  // Movement timer
  function movementTimerFunction() {
    setMovementAvailable(false);
    setMovementTimer(500);
  }

  // Update movement timer
  useEffect(() => {
    if (movementTimer >= 0) {
      const timeout = setTimeout(() => {
        setMovementTimer(movementTimer - 1);
      }, 1);
      return () => clearTimeout(timeout);
    }
    if (movementTimer === 0) {
      setMovementAvailable(true);
    }
  }, [movementTimer]);

  // Move player in the specified direction
  function movePlayer(direction: string) {
    console.log(movementAvailable);
    if (movementAvailable) {
      switch (direction) {
        case "up":
          setPlayerPosition([playerPosition[0], playerPosition[1] - 1]);
          break;
        case "left":
          setPlayerPosition([playerPosition[0] - 1, playerPosition[1]]);
          break;
        case "down":
          setPlayerPosition([playerPosition[0], playerPosition[1] + 1]);
          break;
        case "right":
          setPlayerPosition([playerPosition[0] + 1, playerPosition[1]]);
          break;
      }
    }
  }

  // Handle keyboard input for movement
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "w":
          movePlayer("up");
          break;
        case "a":
          movePlayer("left");
          break;
        case "s":
          movePlayer("down");
          break;
        case "d":
          movePlayer("right");
          break;
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerPosition]);

  // Update player position in DOM
  useEffect(() => {
    const playerElement = document.getElementById("player");
    if (playerElement) {
      playerElement.style.left = `${playerPosition[0] * 20}px`;
      playerElement.style.top = `${playerPosition[1] * 20}px`;
    }
  }, [playerPosition]);

  return (
    <div className="text-center text-black">
      <div className="mx-auto mt-10 md:w-[600px] bg-white md:h-[600px] w-full h-full min-h-[600px] relative overflow-hidden">
        <div>
          <p>
            Player position: [{playerPosition[0]}, {playerPosition[1]}]
          </p>
          <p>Use WASD keys to move the player.</p>
        </div>

        <div
          id="player"
          className={
            `w-[20px] h-[20px] bg-orange-600 absolute ` +
            (playerPosition[0]
              ? `left-[${playerPosition[0] * 20}px] `
              : `left-0 `) +
            (playerPosition[1] ? `top-[${playerPosition[1] * 20}px]` : `top-0`)
          }
        ></div>

        {gameState === "menu" && <h1 className="pt-20">HELLO</h1>}
        {gameState === "game" && <h1 className="pt-20">GAME</h1>}
      </div>
    </div>
  );
}
