import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type SceneKind = 'village' | 'training' | 'disciplines' | 'archive' | 'ascent' | 'peach' | 'challenge' | 'education' | 'festival';

function MountainLayers({ night = false }: { night?: boolean }) {
  return (
    <>
      <path d="M0 430 125 245 212 336 342 162 465 330 602 190 800 417V760H0Z" fill={night ? '#17231f' : '#9eb1a0'} opacity=".55" />
      <path d="m0 493 159-167 114 102 141-185 155 183 110-128 121 122v340H0Z" fill={night ? '#25342d' : '#778f7e'} opacity=".54" />
      <path d="M0 533q175-95 330 4t470-33v256H0Z" fill={night ? '#1d3028' : '#667e6c'} opacity=".72" />
    </>
  );
}

function VillageArt() {
  return (
    <>
      <MountainLayers />
      <path d="M0 580q165-72 326-8t474-14v202H0Z" fill="#455c49" />
      <path d="M0 655q172-50 367 10t433-24v119H0Z" fill="#a4aa8d" opacity=".55" />
      <g className="art-houses" stroke="#594a37" strokeWidth="5" strokeLinejoin="round">
        <path d="M126 499h150v107H126z" fill="#c0a982" /><path d="m110 501 89-82 93 82-20 8-73-59-71 60Z" fill="#4a6651" />
        <path d="M347 465h185v136H347z" fill="#d0bd98" /><path d="m328 469 108-104 113 104-24 8-89-75-86 75Z" fill="#a3543e" />
        <path d="M563 522h135v91H563z" fill="#ac9b79" /><path d="m546 526 84-72 84 72-19 7-65-48-64 47Z" fill="#536b52" />
        <path d="M390 520h39v81h-39z" fill="#544735" stroke="none" />
        <path d="M466 497h38v29h-38z" fill="#d5aa62" stroke="none" opacity=".8" />
      </g>
      <path d="M407 760q-33-74 8-132t-6-86" fill="none" stroke="#d2c7a9" strokeWidth="13" opacity=".55" />
      <g className="art-bamboo" stroke="#3c5945" strokeLinecap="round">
        <path d="M75 760 52 342M91 760 122 300M733 760l27-412M700 760l-28-358" strokeWidth="12" />
        <path d="m56 415-45-42m105 12 51-50m-75 189 54-46m586 30-58-43m84 131 54-51" strokeWidth="7" />
      </g>
    </>
  );
}

function TrainingArt() {
  return (
    <>
      <MountainLayers />
      <path d="M160 520V345h480v175" fill="none" stroke="#d2b879" strokeWidth="13" opacity=".65" />
      <path d="M125 352 400 192l278 160" fill="none" stroke="#b85b3f" strokeWidth="19" strokeLinejoin="round" />
      <path d="M185 357 400 235l220 122" fill="none" stroke="#e1c98f" strokeWidth="7" />
      <path d="M215 530V390m185 140V390m185 140V390" stroke="#c7ad77" strokeWidth="9" />
      <path d="M130 566h545M172 587h472" stroke="#d5c49e" strokeWidth="5" opacity=".7" />
      <g className="art-training-stations">
        {[212, 303, 400, 497, 588].map((x, index) => (
          <g key={x} className={index === 0 ? 'art-station active' : 'art-station'} transform={`translate(${x} 560)`}>
            <ellipse rx="36" ry="13" fill="#324c3a" /><path d="M-25-8h50l-5-22h-40z" fill="#af9c75" />
            <circle cy="-43" r="13" fill={index === 0 ? '#d9b45e' : '#779277'} />
          </g>
        ))}
      </g>
      <g stroke="#876f4c" strokeWidth="8" strokeLinecap="round">
        <path d="M280 490v-102m-37 34h75m-64 0-25 33m53-33 25 33M524 490v-102m-37 34h75m-64 0-25 33m53-33 25 33" />
      </g>
    </>
  );
}

function DisciplinesArt() {
  return (
    <>
      <MountainLayers />
      <ellipse cx="420" cy="550" rx="245" ry="80" fill="none" stroke="#d5b469" strokeWidth="4" opacity=".72" />
      <ellipse cx="420" cy="550" rx="162" ry="52" fill="none" stroke="#68866c" strokeWidth="2" />
      {[0, 1, 2, 3, 4].map((index) => {
        const angle = -Math.PI / 2 + index * Math.PI * 2 / 5;
        const x = 420 + Math.cos(angle) * 225;
        const y = 550 + Math.sin(angle) * 68;
        return <g key={index} className={`discipline-seal seal-${index}`} transform={`translate(${x} ${y})`}><ellipse cy="17" rx="46" ry="19" fill="#50664e" /><path d="m-38 2 11-26h54L39 2Z" fill="#bdad84" /><circle cy="-18" r="16" fill={index === 0 ? '#ba6247' : '#d9b45e'} /></g>;
      })}
      <path d="M218 550h405" stroke="#f3e4ba" strokeWidth="1" strokeDasharray="4 12" opacity=".75" />
    </>
  );
}

function ArchiveArt() {
  return (
    <>
      <path d="M55 690V185h145v505M620 690V185h145v505" fill="#463c30" opacity=".82" />
      <path d="M73 277h109m-109 109h109m-109 109h109m-109 109h109M638 277h109m-109 109h109m-109 109h109m-109 109h109" stroke="#b39464" strokeWidth="8" />
      <path d="M40 188h176M608 188h176" stroke="#d0b271" strokeWidth="14" />
      <path d="M263 680V346h295v334" fill="#806549" opacity=".62" />
      <path d="M237 349h348l-48-49H287z" fill="#a45b40" />
      <path d="M287 347v-155m48 155V171m48 176V188m48 159V168m48 179V194m48 153V172" stroke="#d7c498" strokeWidth="3" opacity=".5" />
      <g className="scroll-glow">
        {[0, 1, 2, 3, 4].map((index) => <g key={index} transform={`translate(${254 + index * 72} ${485 + (index % 2) * 64}) rotate(${index % 2 ? -8 : 7})`}><rect width="48" height="95" rx="18" fill={['#b0b990', '#c9ae74', '#719083', '#c28769', '#8caa8d'][index]} /><ellipse cx="24" cy="5" rx="27" ry="9" fill="#e1cc9c" /><ellipse cx="24" cy="94" rx="27" ry="9" fill="#9c7951" /><path d="M12 40h24m-24 12h24m-24 12h17" stroke="#69583e" strokeWidth="2" opacity=".55" /></g>)}
      </g>
      <path d="M399 760V640" stroke="#d9b45e" strokeWidth="2" opacity=".7" />
    </>
  );
}

function AscentArt() {
  return (
    <>
      <MountainLayers />
      <path d="M250 760 340 415h160l130 345Z" fill="#887f68" opacity=".88" />
      {Array.from({ length: 11 }, (_, index) => {
        const y = 720 - index * 28;
        const spread = 180 - index * 7;
        return <path key={index} d={`M${400 - spread} ${y}h${spread * 2}l-9 11H${409 - spread}Z`} fill={index % 2 ? '#d4c7a4' : '#a99d81'} opacity=".92" />;
      })}
      <path d="M292 440q-15-55 1-111m216 111q15-55-1-111" stroke="#4b624f" strokeWidth="16" />
      <path d="m256 331 146-98 146 98m-121 0v-67m-55 67v-46m111 46v-46" fill="none" stroke="#bd6948" strokeWidth="13" strokeLinejoin="round" />
      <g className="ascent-seals">{[0, 1, 2].map((i) => <g key={i} transform={`translate(${310 + i * 92} ${622 - i * 69})`}><circle r="15" fill="#d9b45e" /><circle r="6" fill="#334c3a" /></g>)}</g>
    </>
  );
}

function PeachArt() {
  return (
    <>
      <MountainLayers />
      <ellipse cx="430" cy="690" rx="230" ry="54" fill="#82775d" />
      <path d="M412 673q26-145-12-265t22-185m-3 118q-95-20-134-112m142 108q95-20 142-110m-130 146q-97-5-164-61m159 77q96-9 156-69" fill="none" stroke="#72533a" strokeWidth="28" strokeLinecap="round" />
      <g className="peach-canopy">
        {[[263, 242], [329, 185], [412, 175], [500, 187], [583, 231], [333, 291], [497, 292], [414, 258]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx={76 + i % 3 * 12} ry={49 + i % 2 * 8} fill={i % 2 ? '#aab391' : '#c89085'} opacity=".85" />)}
      </g>
      <g className="blossom-drift" fill="#f2d6bd">
        {[[235, 362], [324, 411], [581, 364], [642, 489], [295, 535], [530, 566], [682, 288], [195, 472]].map(([x, y], index) => <path key={index} transform={`translate(${x} ${y}) rotate(${index * 21})`} d="M0-8q7-8 10 0q-3 8-10 8q-7 0-10-8q3-8 10 0m0 0v16" />)}
      </g>
      <path d="M405 675q-97-23-152-11m155 8q82-35 147-26" stroke="#d7b887" strokeWidth="5" fill="none" />
    </>
  );
}

function ChallengeArt() {
  return (
    <>
      <MountainLayers night />
      <path d="M0 634q140-90 279-10t270 0 251-18v154H0Z" fill="#202b25" />
      <path d="M70 700 266 617l36 12-132 76m149-30 139-87 38 14-100 93m125-71 179-83 42 14-122 83m122-48 116-57 35 10-73 78" fill="#95896e" />
      <path d="M410 575q28-94 110-143t152-55" fill="none" stroke="#d9b45e" strokeWidth="5" strokeDasharray="2 17" />
      <circle cx="675" cy="377" r="55" fill="none" stroke="#d9b45e" strokeWidth="3" opacity=".72" />
      <circle cx="675" cy="377" r="22" fill="#e9c980" opacity=".78" />
    </>
  );
}

function EducationArt() {
  return (
    <>
      <MountainLayers />
      <path d="M85 632V260h126v372m426 0V260h126v372" fill="#635440" />
      <path d="M67 267h164m389 0h164m-700 112h175m361 0h175m-710 112h175m361 0h175m-710 112h175m361 0h175" stroke="#c4ac78" strokeWidth="10" />
      {[0, 1, 2].map((index) => <g key={index} transform={`translate(${307 + index * 117} ${538 - (index % 2) * 62}) rotate(${index % 2 ? -8 : 5})`}><rect width="88" height="124" rx="8" fill={index === 1 ? '#a9553c' : '#d5c398'} /><path d="M12 21h64m-64 12h64m-64 12h42" stroke="#7b6849" strokeWidth="3" opacity=".6" /><circle cx="44" cy="87" r="18" fill="none" stroke="#9e7e4c" strokeWidth="3" /></g>)}
      <path d="m330 268 135-80 140 80m-222 0v-58m86 58v-71m84 71v-58" fill="none" stroke="#a95740" strokeWidth="12" strokeLinejoin="round" />
    </>
  );
}

function FestivalArt() {
  return (
    <>
      <MountainLayers night />
      <path d="M0 574q182-73 358-9t442-27v222H0Z" fill="#192a23" />
      <path d="M0 667q180-25 345 16t455-17" fill="none" stroke="#d7ad61" strokeWidth="3" opacity=".42" />
      <path d="M97 521h178v98H97m-25-97 113-97 113 97m270 97h151v-86H568m-28 0 103-89 104 89" fill="#344a3b" stroke="#b98953" strokeWidth="7" strokeLinejoin="round" />
      <g className="lantern-drift">
        {[[205, 187], [319, 274], [445, 160], [565, 245], [695, 168], [385, 364], [615, 401]].map(([x, y], index) => <g key={index} transform={`translate(${x} ${y})`}><path d="M0-46v22" stroke="#d8b56b" strokeWidth="2" /><path d="M-18-22q18-10 36 0v42q-18 10-36 0Z" fill={index % 2 ? '#b64c3a' : '#d7ad61'} /><path d="M-15-9h30M-14 8h28" stroke="#f5dca5" strokeWidth="2" opacity=".65" /><path d="M0 20v13" stroke="#d8b56b" strokeWidth="2" /></g>)}
      </g>
      <path d="M360 697q82-26 161 4m-129 25q53-17 112 1" stroke="#d9b45e" strokeWidth="2" opacity=".55" />
    </>
  );
}

const sceneDrawers: Record<SceneKind, () => JSX.Element> = {
  village: VillageArt,
  training: TrainingArt,
  disciplines: DisciplinesArt,
  archive: ArchiveArt,
  ascent: AscentArt,
  peach: PeachArt,
  challenge: ChallengeArt,
  education: EducationArt,
  festival: FestivalArt,
};

export default function ChapterBackdrop({ kind, reducedMotion }: { kind: SceneKind; reducedMotion: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ['start end', 'end start'] });
  const farY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [18, -18]);
  const nearY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [38, -38]);
  const Drawer = sceneDrawers[kind];

  return (
    <div className={`chapter-world chapter-world-${kind}`} ref={sceneRef} aria-hidden="true">
      <motion.div className="chapter-world-far" style={{ y: farY }}>
        <svg viewBox="0 0 800 760" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id={`sky-${kind}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={kind === 'festival' || kind === 'challenge' ? '#28382f' : '#d5ded0'} />
              <stop offset="1" stopColor={kind === 'festival' || kind === 'challenge' ? '#685044' : '#b8c6b1'} />
            </linearGradient>
          </defs>
          <rect width="800" height="760" fill={`url(#sky-${kind})`} />
          <motion.g animate={reducedMotion ? undefined : { x: [-4, 6, -4] }} transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }} opacity=".9">
            <Drawer />
          </motion.g>
        </svg>
      </motion.div>
      <motion.div className="chapter-world-near" style={{ y: nearY }}>
        <svg viewBox="0 0 800 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M0 700q132-28 258-8t290 1 252-20v87H0Z" fill={kind === 'festival' || kind === 'challenge' || kind === 'archive' ? '#17251e' : '#526a52'} opacity=".55" />
          {kind === 'village' || kind === 'training' ? <g fill="none" stroke="#2d4936" strokeWidth="8" opacity=".66"><path d="M18 760 30 410m48 350L56 350m704 410-21-372m-36 372 18-330" /><path d="m25 468-48-36m59 83 61-49m-69 140 53-27m652-118 45-39m-50 111-62-32m72 101-48-22" strokeWidth="6" /></g> : null}
          {kind === 'festival' ? <g className="festival-reflections" stroke="#d8b56b" strokeWidth="3" opacity=".5"><path d="M210 572v93m112-15v94m123-123v88m128-104v76m-296 21h83m-39 25h66m-9-63h112" /></g> : null}
          {kind === 'peach' ? <g className="falling-petals" fill="#f0d7c2"><circle cx="165" cy="538" r="5" /><circle cx="642" cy="469" r="4" /><circle cx="273" cy="624" r="4" /><circle cx="558" cy="596" r="5" /></g> : null}
        </svg>
      </motion.div>
      <div className="chapter-atmosphere" />
    </div>
  );
}
