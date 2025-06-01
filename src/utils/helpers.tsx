import { useState, useEffect } from "react";
import footsteps from "../components/footsteps.mp3"

// Define the movement type
type Movement = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  jump: boolean;
  crouch: boolean;
};

// Player Controls hook
export const usePlayerControls = (): Movement =>{

  
  // Define key mappings
  const keys: { [key: string]: keyof Movement } = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "jump",
    Ctrl: "crouch"
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
    crouch: false,
  });


  let footstepsSoundEffects = new Audio(footsteps)
  // Effect to handle key events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const movementKey = moveFieldByKey(e.code);
      if (movementKey) {
        setMovement((m) => ({ ...m, [movementKey]: true }));
        footstepsSoundEffects.play()
      }
      console.log('testing ctrl')
      console.log(e.code)
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const movementKey = moveFieldByKey(e.code);
      if (movementKey) {
        setMovement((m) => ({ ...m, [movementKey]: false }));
        footstepsSoundEffects.pause()
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
