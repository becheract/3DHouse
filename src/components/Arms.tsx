import { useRef, useEffect, useMemo, useState } from "react";
import { useGraph, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";
import { TextureLoader, NearestFilter, LinearMipMapLinearFilter } from "three";
import { usePlayerControls } from "../utils/helpers";

// Debounce utility function for cooldowns
const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("Arms/Arms.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const [firstLoad, setFirstLoad] = useState(true);
  const { actions, names, mixer } = useAnimations(animations, group);
  const [combat, setCombat] = useState(false);
  const { camera } = useThree(); // Access the scene's camera
  const armRef = useRef<THREE.Group>(null!);
  const [combatCooldown, setCombatCooldown] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (armRef.current && camera) {
      // Set arms as a child of the camera, so they move with it
      camera.add(armRef.current);
  
      if (armRef.current !== undefined) {
        // Position the arms in front of the camera (adjust as needed)
        armRef.current.position.set(0, -0.5, -1); // Fine-tune position to make it look realistic
  

      }
    }
  
    return () => {
      camera.remove(armRef.current); // Cleanup: remove from camera on unmount
    };
  }, [camera]);
  
  
  
  
  // Handle first load animation
  useEffect(() => {
    if (actions.Relax_hands_idle_start !== null && firstLoad && actions.Relax_hands_idle_loop !== null) {
      actions.Relax_hands_idle_start.play();
      actions.Relax_hands_idle_start.repetitions = 1;
      mixer.stopAllAction();
      actions.Relax_hands_idle_start.reset().play();
      setFirstLoad(false);
    }
  }, [actions, firstLoad, mixer]);

  // Play idle animation
  const playIdle = () => {
    mixer.stopAllAction();
    if (actions.Relax_hands_idle_loop) {
      actions.Relax_hands_idle_loop.play();
      setCombatCooldown(false);
    }
  };

  // Listen for animation finish and transition to idle
  useEffect(() => {
    mixer.addEventListener('finished', playIdle);
    return () => {
      mixer.removeEventListener('finished', playIdle);
    };
  }, [mixer]);

  // Handle keyboard input (e.g., "f" for action)
  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") {
        if (actions.Collect_something && actions.Relax_hands_idle_loop) {
          actions.Collect_something.play();
          actions.Collect_something.repetitions = 1;
          mixer.stopAllAction();
          actions.Collect_something.crossFadeTo(actions.Relax_hands_idle_loop, 0.5, true);
          actions.Collect_something.reset().play();
        }
      }
    };

    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [actions, mixer]);

  // Handle mouse click for combat actions
  useEffect(() => {
    const mouseListener = debounce((e: MouseEvent) => {
      const random = Math.random();
      console.log('Mouse clicked. Random number:', random);
      if (e.button === 0) { // 0 is for left mouse button
        setCombat(true);
        if (random < 0.5) {
          if (actions.Combat_punch_right && actions.Relax_hands_idle_loop) {
            console.log('Playing right punch');
            actions.Combat_punch_right.play();
            actions.Combat_punch_right.repetitions = 1;
            mixer.stopAllAction();
            actions.Combat_punch_right.crossFadeTo(actions.Relax_hands_idle_loop, 0.5, true);
            actions.Combat_punch_right.reset().play();
          }
        } else {
          if (actions.Combat_punch_left && actions.Relax_hands_idle_loop) {
            console.log('Playing left punch');
            actions.Combat_punch_left.play();
            actions.Combat_punch_left.repetitions = 1;
            mixer.stopAllAction();
            actions.Combat_punch_left.crossFadeTo(actions.Relax_hands_idle_loop, 0.5, true);
            actions.Combat_punch_left.reset().play();
          }
        }
      }
    }, 500);

    document.addEventListener("click", mouseListener);
    return () => {
      document.removeEventListener("click", mouseListener);
    };
  }, [actions, mixer]);

  // Combat idle logic and cooldown
  useEffect(() => {
    const playCombatIdle = () => {
      if (actions.Combat_idle_loop !== null && combat === true) {
        console.log('Entering combat');
        actions.Combat_idle_loop.play();

        if (!combatCooldown) {
          setTimeout(() => {
            playIdle();
            setCombat(false);
          }, 3000);
          setCombatCooldown(true);
        }
      }
    };

    mixer.addEventListener('finished', playCombatIdle);
    return () => {
      mixer.removeEventListener('finished', playCombatIdle);
    };
  }, [combat, actions, mixer, combatCooldown]);

  // Set texture filters
  useEffect(() => {
    Object.values(materials).forEach((material: THREE.Material) => {
      if (material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshStandardMaterial) {
        if (material.map) {
          material.map.magFilter = THREE.LinearFilter;
          material.map.minFilter = THREE.LinearMipMapLinearFilter;
          material.map.needsUpdate = true;
        }
      }
    });
  }, [materials]);

  return (
    <>
      {actionFeedback && <div className="feedback">{actionFeedback}</div>}
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <group name="arms_armature">
            <primitive object={nodes.spine002} />
            <primitive object={nodes.ik_handL} />
            <primitive object={nodes.ik_handR} />
            <skinnedMesh
              name="arms"
              geometry={(nodes.arms as THREE.Mesh).geometry}
              material={materials.arms}
              skeleton={(nodes.arms as THREE.SkinnedMesh).skeleton}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("Arms/Arms.glb");
