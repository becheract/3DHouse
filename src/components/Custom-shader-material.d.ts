// src/custom-shader-material.d.ts

import { CustomShaderMaterial } from "../../shaders/CustomShaderMaterial";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      customShaderMaterial: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        // Add any custom props you might need for your shader material here
        uniforms?: any; // Replace `any` with the specific type if you have defined uniforms
      };
    }
  }
}
