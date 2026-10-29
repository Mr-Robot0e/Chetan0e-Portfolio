import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

type Props = {
  chapter: string;
  reducedMotion: boolean;
  selectedSkill: number;
  selectedDiscipline: number;
  selectedExperience: number;
  selectedProject: number;
  onSkillSelect: (index: number) => void;
  onDisciplineSelect: (index: number) => void;
  onExperienceSelect: (index: number) => void;
  onProjectSelect: (index: number) => void;
};
type SceneGroup = { rotation: { x: number; y: number; z: number }; position: { x: number; y: number; z: number }; scale: { x: number; y: number; z: number } };
type ClickEvent = { stopPropagation: () => void };
type Position = [number, number, number];

function MountainRange() {
  return (
    <group position={[0, -1.2, -4]}>
      <mesh position={[-2.2, 1.2, -0.3]} scale={[1.8, 2.1, 0.4]}>
        <coneGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#899f8e" roughness={1} />
      </mesh>
      <mesh position={[0, 1.7, -0.8]} scale={[2.2, 2.7, 0.5]}>
        <coneGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#aebba9" roughness={1} />
      </mesh>
      <mesh position={[2.5, 1.1, -0.1]} scale={[1.7, 1.9, 0.45]}>
        <coneGeometry args={[1, 1, 5]} />
        <meshStandardMaterial color="#778d7c" roughness={1} />
      </mesh>
    </group>
  );
}

function Plinth({ position, tint = '#546c59', scale = 1 }: { position: Position; tint?: string; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, -0.24, 0]} receiveShadow>
        <cylinderGeometry args={[0.68, 0.82, 0.22, 8]} />
        <meshStandardMaterial color="#8e9681" roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <cylinderGeometry args={[0.52, 0.64, 0.14, 8]} />
        <meshStandardMaterial color={tint} roughness={0.78} />
      </mesh>
    </group>
  );
}

function BambooGrove() {
  return (
    <group>
      {[-3.3, -2.9, 2.8, 3.3].map((x, index) => (
        <group key={x} position={[x, -0.4, -1.8 + (index % 2) * 0.4]} rotation={[0, 0, x > 0 ? -0.04 : 0.05]}>
          <mesh>
            <cylinderGeometry args={[0.075, 0.11, 4.6, 9]} />
            <meshStandardMaterial color={index % 2 ? '#48674e' : '#627d59'} roughness={0.88} />
          </mesh>
          {[-1.6, -0.7, 0.4, 1.5].map((y) => (
            <mesh key={y} position={[0, y, 0]}>
              <torusGeometry args={[0.079, 0.018, 5, 9]} />
              <meshStandardMaterial color="#879768" roughness={0.75} />
            </mesh>
          ))}
          <mesh position={[x > 0 ? -0.42 : 0.42, 1.5, 0]} rotation={[0, 0, x > 0 ? -0.55 : 0.55]} scale={[0.38, 0.09, 0.12]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial color="#72865b" roughness={0.9} />
          </mesh>
          <mesh position={[x > 0 ? 0.38 : -0.38, 0.85, 0]} rotation={[0, 0, x > 0 ? 0.55 : -0.55]} scale={[0.34, 0.08, 0.11]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshStandardMaterial color="#809166" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function TempleHouse({ position, scale = 1 }: { position: Position; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.45, 0.75, 1.15]} />
        <meshStandardMaterial color="#9c9276" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.78, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1.05, 0.27, 0.76]}>
        <coneGeometry args={[1, 1, 4]} />
        <meshStandardMaterial color="#526b51" roughness={0.84} />
      </mesh>
      <mesh position={[0, 0.9, 0]} rotation={[0, Math.PI / 4, 0]} scale={[0.85, 0.18, 0.63]}>
        <coneGeometry args={[1, 1, 4]} />
        <meshStandardMaterial color="#a75f43" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.08, 0.59]}>
        <boxGeometry args={[0.28, 0.48, 0.06]} />
        <meshStandardMaterial color="#4a4233" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Village() {
  return (
    <>
      <MountainRange />
      <mesh position={[0, -0.72, -1.8]} scale={[4.5, 0.14, 1.6]}>
        <sphereGeometry args={[1, 28, 12]} />
        <meshStandardMaterial color="#687f6e" roughness={1} />
      </mesh>
      <TempleHouse position={[-1.25, -0.12, -1.3]} scale={0.86} />
      <TempleHouse position={[1.15, -0.14, -1.8]} scale={0.66} />
      <BambooGrove />
      <Plinth position={[0, -0.38, 0.2]} tint="#89937a" scale={1.45} />
      <mesh position={[0, -0.08, 0.2]} scale={[0.55, 0.82, 0.36]}>
        <sphereGeometry args={[1, 22, 18]} />
        <meshStandardMaterial color="#c8b998" roughness={0.96} />
      </mesh>
      <mesh position={[0, 0.7, 0.2]} scale={[0.72, 0.06, 0.46]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#657a5e" roughness={0.9} />
      </mesh>
    </>
  );
}

function TrainingGround({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const stations: Position[] = [[-2, -0.55, 0], [-1.2, -0.55, -0.65], [-0.4, -0.55, -0.95], [0.5, -0.55, -0.95], [1.35, -0.55, -0.65], [2.1, -0.55, 0]];
  return (
    <>
      <MountainRange />
      <TempleHouse position={[0, 0.65, -2.7]} scale={1.25} />
      <mesh position={[0, -0.9, 0]} scale={[3.4, 0.16, 2.1]}>
        <cylinderGeometry args={[1, 1, 0.28, 12]} />
        <meshStandardMaterial color="#a7a38f" roughness={0.95} />
      </mesh>
      {stations.map((position, index) => (
        <group key={index} position={position} onClick={(event: ClickEvent) => { event.stopPropagation(); onSelect(index); }}>
          <Plinth position={[0, 0, 0]} scale={index === active ? 1.12 : 0.88} tint={index === active ? '#c49e51' : '#526e58'} />
          <mesh position={[0, 0.22, 0]}>
            <dodecahedronGeometry args={[0.26, 0]} />
            <meshStandardMaterial color={index === active ? '#d9b45e' : '#80a084'} roughness={0.56} metalness={0.15} />
          </mesh>
        </group>
      ))}
      <BambooGrove />
    </>
  );
}

function DisciplineCircle({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <>
      <MountainRange />
      <mesh position={[0, -0.72, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.7, 0.025, 8, 64]} />
        <meshStandardMaterial color="#c79d52" roughness={0.56} metalness={0.18} />
      </mesh>
      {Array.from({ length: 5 }, (_, index) => {
        const angle = -Math.PI / 2 + index * (Math.PI * 2 / 5);
        const x = Math.cos(angle) * 1.7;
        const z = Math.sin(angle) * 1.45;
        return (
          <group key={index} position={[x, -0.38, z]} onClick={(event: ClickEvent) => { event.stopPropagation(); onSelect(index); }}>
            <Plinth position={[0, 0, 0]} scale={index === active ? 1.17 : 0.9} tint={index === active ? '#b94a37' : '#48674e'} />
            <mesh position={[0, 0.45, 0]} rotation={[0.3, index * 0.3, 0]}>
              <octahedronGeometry args={[0.36, 0]} />
              <meshStandardMaterial color={index === active ? '#d9b45e' : '#789879'} roughness={0.58} metalness={0.12} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function ProjectArchive({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <>
      <mesh position={[0, -0.65, -2]} scale={[4.6, 0.12, 1.9]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#554638" roughness={0.95} />
      </mesh>
      {[-2.35, -1.65, 1.65, 2.35].map((x) => (
        <group key={x} position={[x, 0.65, -2.2]}>
          <mesh>
            <boxGeometry args={[0.12, 2.65, 0.28]} />
            <meshStandardMaterial color="#544332" roughness={0.94} />
          </mesh>
          {[-0.82, -0.15, 0.52].map((y) => (
            <mesh key={y} position={[x > 0 ? -0.15 : 0.15, y, 0]}>
              <boxGeometry args={[0.58, 0.075, 0.48]} />
              <meshStandardMaterial color="#8a7151" roughness={0.88} />
            </mesh>
          ))}
        </group>
      ))}
      {Array.from({ length: 5 }, (_, index) => {
        const x = (index - 2) * 0.92;
        const activeScroll = active === index;
        return (
          <group key={index} position={[x, -0.23 + (activeScroll ? 0.13 : 0), 0.5]} rotation={[0.08, 0, index % 2 ? 0.12 : -0.1]} onClick={(event: ClickEvent) => { event.stopPropagation(); onSelect(index); }}>
            <Plinth position={[0, 0, 0]} tint={activeScroll ? '#c79e53' : '#536c56'} scale={0.67} />
            <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[0.52, 0.12, 0.24]}>
              <cylinderGeometry args={[0.5, 0.5, 0.48, 24]} />
              <meshStandardMaterial color={index === 0 ? '#92a88a' : index === 1 ? '#c1a56c' : index === 2 ? '#647d79' : index === 3 ? '#c58a68' : '#7c927e'} roughness={0.68} metalness={0.08} />
            </mesh>
            <mesh position={[0, 0.47, 0]}>
              <octahedronGeometry args={[activeScroll ? 0.14 : 0.09, 0]} />
              <meshStandardMaterial color="#d9b45e" roughness={0.46} metalness={0.3} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

function PalaceAscent({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  return (
    <>
      <MountainRange />
      {Array.from({ length: 8 }, (_, index) => (
        <mesh key={index} position={[0, -0.83 + index * 0.23, -1.4 - index * 0.32]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.8 - index * 0.11, 1, 1]}>
          <boxGeometry args={[1.8, 0.48, 0.15]} />
          <meshStandardMaterial color={index % 2 ? '#a9a18c' : '#8d8d7c'} roughness={0.96} />
        </mesh>
      ))}
      <TempleHouse position={[0, 1.1, -4.4]} scale={1.28} />
      {[-1.1, 0, 1.1].map((x, index) => (
        <group key={x} position={[x, -0.38 + index * 0.2, -0.5 - index * 0.8]} onClick={(event: ClickEvent) => { event.stopPropagation(); onSelect(index); }}>
          <mesh position={[0, 0.22, 0]}>
            <dodecahedronGeometry args={[active === index ? 0.22 : 0.15, 0]} />
            <meshStandardMaterial color={active === index ? '#d9b45e' : '#4c8766'} roughness={0.6} metalness={0.12} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function PeachTree() {
  return (
    <>
      <MountainRange />
      <Plinth position={[0, -0.54, 0]} scale={1.75} tint="#807761" />
      <mesh position={[0, 0.58, -0.25]} rotation={[0, 0, -0.12]}>
        <cylinderGeometry args={[0.19, 0.3, 2.05, 9]} />
        <meshStandardMaterial color="#6c4d36" roughness={0.94} />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.55, 1.35, -0.25]} rotation={[0, 0, side * -0.45]}>
          <mesh position={[side * 0.4, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.13, 1.1, 8]} />
            <meshStandardMaterial color="#74563b" roughness={0.95} />
          </mesh>
          <mesh position={[side * 0.85, 0.4, 0]}>
            <cylinderGeometry args={[0.035, 0.075, 0.8, 7]} />
            <meshStandardMaterial color="#74563b" roughness={0.95} />
          </mesh>
        </group>
      ))}
      {[
        [-1.2, 2, -0.45], [-0.45, 2.35, -0.5], [0.45, 2.2, -0.52], [1.12, 1.9, -0.46],
        [-0.95, 1.55, -0.3], [0.05, 1.85, -0.38], [0.95, 1.5, -0.28],
      ].map((position, index) => (
        <mesh key={index} position={position as Position} scale={index % 2 ? [0.45, 0.5, 0.4] : [0.5, 0.42, 0.43]}>
          <sphereGeometry args={[1, 14, 10]} />
          <meshStandardMaterial color={index % 2 ? '#a5ad85' : '#c98e82'} roughness={0.9} />
        </mesh>
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <mesh key={index} position={[-1.3 + index * 0.32, 0.3 + (index % 3) * 0.22, 0.35]}>
          <sphereGeometry args={[0.055, 8, 8]} />
          <meshStandardMaterial color="#e3ae9a" roughness={0.55} />
        </mesh>
      ))}
    </>
  );
}

function ChallengePath() {
  return (
    <>
      <MountainRange />
      <mesh position={[0, -0.63, 0]} scale={[3.6, 0.13, 1.4]}>
        <cylinderGeometry args={[1, 1, 0.18, 12]} />
        <meshStandardMaterial color="#524942" roughness={0.95} />
      </mesh>
      {[-1.35, 0, 1.35].map((x, index) => (
        <group key={x} position={[x, -0.15, index === 1 ? -0.2 : 0.1]}>
          <mesh position={[0, 0.4, 0]} scale={[0.48, 0.75, 0.4]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={index === 0 ? '#434541' : index === 1 ? '#8b7151' : '#789078'} roughness={0.9} />
          </mesh>
          <mesh position={[0, -0.08, 0.3]}>
            <torusGeometry args={[0.38, 0.025, 7, 32]} />
            <meshStandardMaterial color={index === 2 ? '#d9b45e' : '#87927f'} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function EducationArchive() {
  return (
    <>
      <mesh position={[0, -0.72, -1.3]} scale={[4.2, 0.1, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#77694f" roughness={0.93} />
      </mesh>
      <TempleHouse position={[0, 0.38, -2.8]} scale={1.12} />
      {[-1.5, 0, 1.5].map((x, index) => (
        <group key={x} position={[x, -0.35, 0]}>
          <Plinth position={[0, 0, 0]} tint="#526e58" scale={0.9} />
          <mesh position={[0, 0.48, 0]} rotation={[0, 0, index % 2 ? 0 : -0.08]}>
            <boxGeometry args={[0.62, 0.77, 0.16]} />
            <meshStandardMaterial color={index === 1 ? '#b94a37' : '#d2c39d'} roughness={0.76} />
          </mesh>
          <mesh position={[0, 0.48, 0.1]} scale={[0.34, 0.3, 0.08]}>
            <sphereGeometry args={[1, 12, 10]} />
            <meshStandardMaterial color={index === 1 ? '#d9b45e' : '#7e8d74'} roughness={0.62} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function LanternFestival() {
  return (
    <>
      <MountainRange />
      <mesh position={[0, -0.85, -1.1]} scale={[4.5, 0.12, 1.35]}>
        <sphereGeometry args={[1, 32, 12]} />
        <meshStandardMaterial color="#394c41" roughness={0.55} metalness={0.15} />
      </mesh>
      <TempleHouse position={[-1.95, -0.08, -1.6]} scale={0.64} />
      <TempleHouse position={[2, -0.08, -1.8]} scale={0.64} />
      {[-2.2, -1.1, 0.1, 1.25, 2.3].map((x, index) => (
        <group key={x} position={[x, 1.45 + (index % 2) * 0.55, -0.25 - (index % 3) * 0.6]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.7, 5]} />
            <meshStandardMaterial color="#d9b45e" roughness={0.45} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.2, 14, 12]} />
            <meshStandardMaterial color={index % 2 ? '#be684d' : '#e0bb6c'} emissive={index % 2 ? '#7f2e20' : '#8c6326'} emissiveIntensity={0.22} roughness={0.6} />
          </mesh>
        </group>
      ))}
      {[-1, 0, 1].map((x) => (
        <mesh key={x} position={[x, -0.62, 0.35]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.52, 1, 1]}>
          <torusGeometry args={[0.4, 0.018, 6, 28]} />
          <meshStandardMaterial color="#d9b45e" roughness={0.45} metalness={0.2} />
        </mesh>
      ))}
    </>
  );
}

function ChapterScene(props: Props) {
  const { chapter, selectedSkill, selectedDiscipline, selectedExperience, selectedProject, onSkillSelect, onDisciplineSelect, onExperienceSelect, onProjectSelect } = props;
  if (chapter === 'skills') return <TrainingGround active={selectedSkill} onSelect={onSkillSelect} />;
  if (chapter === 'disciplines') return <DisciplineCircle active={selectedDiscipline} onSelect={onDisciplineSelect} />;
  if (chapter === 'projects') return <ProjectArchive active={selectedProject} onSelect={onProjectSelect} />;
  if (chapter === 'experience') return <PalaceAscent active={selectedExperience} onSelect={onExperienceSelect} />;
  if (chapter === 'wisdom') return <PeachTree />;
  if (chapter === 'challenge') return <ChallengePath />;
  if (chapter === 'education') return <EducationArchive />;
  if (chapter === 'contact') return <LanternFestival />;
  return <Village />;
}

function World({ props }: { props: Props }) {
  const stage = useRef<SceneGroup | null>(null);
  useEffect(() => {
    if (!stage.current) return;
    if (props.reducedMotion) {
      stage.current.position.x = 0;
      stage.current.scale.x = 1;
      stage.current.scale.y = 1;
      stage.current.scale.z = 1;
    } else {
      stage.current.position.x = 0.48;
      stage.current.scale.x = 0.92;
      stage.current.scale.y = 0.92;
      stage.current.scale.z = 0.92;
    }
  }, [props.chapter, props.reducedMotion]);
  useFrame((state) => {
    if (!stage.current || props.reducedMotion) return;
    const time = state.clock.elapsedTime;
    const pointerTurn = state.pointer.x * 0.07;
    stage.current.rotation.y += (pointerTurn + Math.sin(time * 0.13) * 0.025 - stage.current.rotation.y) * 0.025;
    stage.current.rotation.x += (-state.pointer.y * 0.025 - stage.current.rotation.x) * 0.025;
    stage.current.position.x += (0 - stage.current.position.x) * 0.035;
    stage.current.position.y = Math.sin(time * 0.35) * 0.025;
    stage.current.scale.x += (1 - stage.current.scale.x) * 0.035;
    stage.current.scale.y += (1 - stage.current.scale.y) * 0.035;
    stage.current.scale.z += (1 - stage.current.scale.z) * 0.035;
  });
  return (
    <group ref={(node: SceneGroup | null) => { stage.current = node; }}>
      <ChapterScene {...props} />
    </group>
  );
}

export default function JourneyWorld(props: Props) {
  return (
    <div className="journey-world" aria-label="Interactive three-dimensional Valley of Peace chapter environment" role="img">
      <Canvas
        camera={{ position: [0, 0.8, 8.5], fov: 34 }}
        dpr={[1, 1.3]}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
        frameloop={props.reducedMotion ? 'demand' : 'always'}
        fallback={null}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[-4, 7, 5]} intensity={1.8} color="#fff1d2" />
        <directionalLight position={[3, 4, -4]} intensity={0.85} color="#96b696" />
        <World props={props} />
      </Canvas>
    </div>
  );
}
