import { useEffect, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { Invitation } from './components/Invitation';
import { Curtain } from './components/Curtain';
import { FallingPetals } from './components/FallingPetals';
import { BackgroundMusic } from './components/BackgroundMusic';
import { useYouTubeAudio } from './hooks/useYouTubeAudio';

// https://youtu.be/3rSHpD88s9k — plays from 2:13 and loops back to 2:13
const SONG_VIDEO_ID = '3rSHpD88s9k';
const SONG_START_SECONDS = 2 * 60 + 13;

type Stage = 'closed' | 'opening' | 'open';

export function App() {
  const [stage, setStage] = useState<Stage>('closed');
  const music = useYouTubeAudio(SONG_VIDEO_ID, SONG_START_SECONDS);
  const reduce = useReducedMotion();

  // Keep the page still while the curtain is drawn
  useEffect(() => {
    document.body.style.overflow = stage === 'open' ? '' : 'hidden';
  }, [stage]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      {/* Positioned layers paint in DOM order, so the invitation (relative) sits above this */}
      <div aria-hidden="true" className="parchment fixed inset-0" />

      {SONG_VIDEO_ID && (
        <BackgroundMusic
          containerRef={music.containerRef}
          playing={music.playing}
          error={music.error}
          showToggle={stage === 'open'}
          onToggle={music.toggle}
        />
      )}

      <Invitation revealed={stage !== 'closed'} />

      {/* Petals are released as the curtains part */}
      {stage !== 'closed' && !reduce && <FallingPetals />}

      <AnimatePresence>
        {stage !== 'open' && (
          <Curtain
            onOpenStart={() => {
              music.play();
              setStage('opening');
            }}
            onOpened={() => setStage('open')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
