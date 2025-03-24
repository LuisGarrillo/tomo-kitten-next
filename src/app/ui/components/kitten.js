// components/MyListenerComponent.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import moodChange from '@/app/events/moodChange';
import { catData } from './timer';

export default function Kitten() {
  let [mood, setMood] = useState(catData["mood"]);
  
  useEffect(() => {
    mood = catData["mood"];
    setMood(mood);
    
    const handleMoodChange = (receivedMood) => {
        setMood(receivedMood);
        mood = receivedMood;
    };

    moodChange.on('moodChanged', handleMoodChange);

    return () => {
        moodChange.off('moodChanged', handleMoodChange);
    };
  }, []);

  return (
    <Image
        src={`/kitten/${mood}.gif`}
        width={370}
        height={370}
        alt="Your kitten"
    />
  );
}