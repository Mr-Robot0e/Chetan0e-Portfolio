import { Component, useRef, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function PandaWarrior({ reducedMotion }: { reducedMotion: boolean }) {
  type MotionGroup = { position: { y: number }; rotation: { x: number; y: number } };
  const body = useRef<MotionGroup | null>(null);
  useFrame((state) => {
    if (!body.current || reducedMotion) return;
    const time = state.clock.elapsedTime;
    body.current.position.y = Math.sin(time * 1.25) * 0.035;
    body.current.rotation.y += (state.pointer.x * 0.16 + Math.sin(time * 0.42) * 0.025 - body.current.rotation.y) * 0.035;
    body.current.rotation.x += (-state.pointer.y * 0.045 - body.current.rotation.x) * 0.035;
  });

  return (
    <group ref={(node: MotionGroup | null) => { body.current = node; }} position={[0, -0.05, 0]} rotation={[0, 0.025, 0]}>
      {/* Original procedural panda warrior: rounded charcoal fur, ivory face, and a jade training wrap. */}
      <mesh position={[0, 1.36, 0]} castShadow>
        <sphereGeometry args={[1, 32, 24]} />
        <meshStandardMaterial color="#202822" roughness={0.92} />
      </mesh>
      <mesh position={[0, 1.41, 0.73]} scale={[0.58, 0.73, 0.22]} castShadow>
        <sphereGeometry args={[1, 28, 20]} />
        <meshStandardMaterial color="#efe9d9" roughness={0.86} />
      </mesh>
      <mesh position={[0, 1.89, 0.79]} scale={[0.54, 0.13, 0.12]}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshStandardMaterial color="#4c8766" roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.04, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.09, 10, 36]} />
        <meshStandardMaterial color="#b94a37" roughness={0.72} />
      </mesh>
      <mesh position={[0.16, 1.12, 0.47]} rotation={[0, 0, -0.35]} scale={[0.11, 0.34, 0.07]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#d9b45e" roughness={0.62} />
      </mesh>
      <mesh position={[0, 1.97, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.10, 10, 32]} />
        <meshStandardMaterial color="#b94a37" roughness={0.72} />
      </mesh>
      <mesh position={[-0.39, 1.92, 0.27]} rotation={[0, 0, 0.4]} scale={[0.16, 0.3, 0.1]}>
        <sphereGeometry args={[1, 18, 14]} />
        <meshStandardMaterial color="#d9b45e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.57, 0.02]} scale={[0.78, 0.72, 0.67]} castShadow>
        <sphereGeometry args={[1, 36, 28]} />
        <meshStandardMaterial color="#f0eadb" roughness={0.88} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.58, 3.12, 0.02]} rotation={[0, 0, side * -0.16]} scale={[0.27, 0.3, 0.22]} castShadow>
            <sphereGeometry args={[1, 24, 18]} />
            <meshStandardMaterial color="#202822" roughness={0.94} />
          </mesh>
          <mesh position={[side * 0.31, 2.61, 0.58]} rotation={[0, 0, side * -0.28]} scale={[0.23, 0.32, 0.12]}>
            <sphereGeometry args={[1, 24, 18]} />
            <meshStandardMaterial color="#202822" roughness={0.92} />
          </mesh>
          <mesh position={[side * 0.28, 2.62, 0.69]} scale={[0.092, 0.105, 0.055]}>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#fff9ec" roughness={0.34} />
          </mesh>
          <mesh position={[side * 0.27, 2.61, 0.735]} scale={[0.041, 0.06, 0.035]}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshStandardMaterial color="#171b18" roughness={0.28} />
          </mesh>
          <mesh position={[side * 0.7, 0.43, 0.08]} rotation={[0, 0, side * -0.08]} scale={[0.24, 0.48, 0.25]} castShadow>
            <sphereGeometry args={[1, 20, 16]} />
            <meshStandardMaterial color="#202822" roughness={0.96} />
          </mesh>
          <mesh position={[side * 0.7, 0.13, 0.2]} scale={[0.31, 0.16, 0.38]} castShadow>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#202822" roughness={0.96} />
          </mesh>
          <mesh position={[side * 0.68, 1.48, 0.02]} rotation={[0, 0, side * -0.18]} scale={[0.23, 0.52, 0.24]} castShadow>
            <sphereGeometry args={[1, 20, 16]} />
            <meshStandardMaterial color="#202822" roughness={0.94} />
          </mesh>
          <mesh position={[side * 0.68, 1.1, 0.1]} scale={[0.2, 0.23, 0.23]}>
            <sphereGeometry args={[1, 20, 14]} />
            <meshStandardMaterial color="#202822" roughness={0.94} />
          </mesh>
        </group>
      ))}
      <mesh position={[-0.13, 2.27, 0.63]} scale={[0.22, 0.17, 0.15]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color="#f7f2e8" roughness={0.82} />
      </mesh>
      <mesh position={[0.13, 2.27, 0.63]} scale={[0.22, 0.17, 0.15]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color="#f7f2e8" roughness={0.82} />
      </mesh>
      <mesh position={[0, 2.36, 0.77]} scale={[0.12, 0.085, 0.085]}>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color="#171b18" roughness={0.3} />
      </mesh>
      <mesh position={[0, 2.19, 0.745]} scale={[0.025, 0.075, 0.025]}>
        <sphereGeometry args={[1, 14, 10]} />
        <meshStandardMaterial color="#343a34" roughness={0.8} />
      </mesh>
      <group position={[-1.03, 1.25, -0.05]} rotation={[0, 0, -0.06]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.045, 2.58, 12]} />
          <meshStandardMaterial color="#754d32" roughness={0.85} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.06, 12, 10]} />
          <meshStandardMaterial color="#d9b45e" roughness={0.64} />
        </mesh>
        <mesh position={[0, -1.25, 0]}>
          <sphereGeometry args={[0.06, 12, 10]} />
          <meshStandardMaterial color="#d9b45e" roughness={0.64} />
        </mesh>
      </group>
    </group>
  );
}

export default function HeroPanda({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="hero-panda" aria-label="Original 3D panda warrior, calmly holding a wooden staff" role="img">
      <SceneBoundary>
        <Canvas
          camera={{ position: [0, 1.72, 6.7], fov: 31 }}
          dpr={[1, 1.45]}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          frameloop={reducedMotion ? 'demand' : 'always'}
          fallback={null}
          aria-hidden="true"
        >
          <ambientLight intensity={1.45} />
          <directionalLight position={[-3, 6, 5]} intensity={2.2} color="#fff2d9" />
          <directionalLight position={[4, 3, -2]} intensity={1.05} color="#9bbd9d" />
          <PandaWarrior reducedMotion={reducedMotion} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
