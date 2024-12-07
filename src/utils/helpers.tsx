import { useState, useEffect } from "react";

// Define the movement type
type Movement = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
};

// Player Controls hook
export const usePlayerControls = (): Movement => {


  
  // Define key mappings
  const keys: { [key: string]: keyof Movement } = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump",
  };

  // Function to get the movement field by key
  const moveFieldByKey = (key: string): keyof Movement | undefined => keys[key];

  // Movement state
  const [movement, setMovement] = useState<Movement>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  // Effect to handle key events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const movementKey = moveFieldByKey(e.code);
      if (movementKey) {
        setMovement((m) => ({ ...m, [movementKey]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const movementKey = moveFieldByKey(e.code);
      if (movementKey) {
        setMovement((m) => ({ ...m, [movementKey]: false }));
      }
    };

    // Attach event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};
