import { Bloom, DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing';

/** Subtle post: bloom mostly from the screens, a vignette, and very light depth of field. */
export function Effects() {
  return (
    <EffectComposer multisampling={4}>
      <DepthOfField focusDistance={11.5} focusRange={14} bokehScale={1.4} resolutionScale={0.5} />
      <Bloom mipmapBlur intensity={0.7} luminanceThreshold={0.62} luminanceSmoothing={0.25} radius={0.72} />
      <Vignette offset={0.28} darkness={0.72} />
    </EffectComposer>
  );
}
