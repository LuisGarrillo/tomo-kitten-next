// components/MyListenerComponent.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import moodChange from '@/app/events/moodChange';
import { catData } from './timer';

export default function Kitten() {
  let [mood, setMood] = useState(catData["mood"]);
  let [name, setName] = useState("");
  useEffect(() => {
    mood = catData["mood"];
    setMood(mood);
    setName(catData["name"]);
    
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
    <div className='kitten-wrapper'>
        <Image
          src={`/kitten/${mood}.gif`}
          width={370}
          height={370}
          alt="Your kitten"
      />
      <p>
        {name}
      </p>
    </div>
  );
}