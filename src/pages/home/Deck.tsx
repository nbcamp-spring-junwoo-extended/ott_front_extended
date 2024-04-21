import { animated, to as interpolate, useSprings } from '@react-spring/web';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-use-gesture';

import { VideoSearchDto } from '../../core/types/video.ts';
import styles from './Deck.module.css';

const to = (i: number) => ({
  delay: i * 100,
  rot: -10 + Math.random() * 20,
  scale: 1,
  x: 0,
  y: i * -4,
});

const from = (_i: number) => ({ rot: 0, scale: 1.5, x: 0, y: -1000 });

const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

type DeckProps = {
  reFetch: () => Promise<void>;
  videos: VideoSearchDto[];
};

const Deck: React.FC<DeckProps> = ({ reFetch, videos }) => {
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(videos.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  const navigate = useNavigate();

  const bind = useDrag(({ args: [index], direction: [xDir], down, movement: [mx], velocity }) => {
    const trigger = velocity > 0.5;
    const dir = xDir < 0 ? -1 : 1;
    if (!down && trigger) gone.add(index);
    api.start((i) => {
      if (index !== i) return {};
      const isGone = gone.has(index);
      const whenNotGone = down ? mx : 0;
      const x = isGone ? (200 + window.innerWidth) * dir : whenNotGone;
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      const whenNotDown = isGone ? 200 : 500;
      return {
        config: { friction: 50, tension: down ? 800 : whenNotDown },
        delay: undefined,
        rot,
        scale,
        x,
      };
    });

    if (!down && gone.size === videos.length) {
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
        reFetch().then();
      }, 600);
    }
  });

  const handleOnclick = (e: React.MouseEvent) => {
    navigate(`/videos/${e.currentTarget.id}`);
  };

  return (
    <>
      {props.map(({ rot, scale, x, y }, i) => (
        <animated.div
          className={styles.deck}
          id={videos[i].video_id.toString()}
          key={videos[i].video_id}
          onDoubleClickCapture={handleOnclick}
          style={{ x, y }}
        >
          <animated.div
            {...bind(i)}
            style={{
              backgroundImage: `url(${videos[i].poster_url})`,
              transform: interpolate([rot, scale], trans),
            }}
          />
        </animated.div>
      ))}
    </>
  );
};

export default Deck;
