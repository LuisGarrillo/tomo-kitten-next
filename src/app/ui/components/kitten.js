// components/MyListenerComponent.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import moodChange from '@/app/events/moodChange';
import { saveData, getData } from '@/app/cache';

export default function Kitten() {
  let [mood, setMood] = useState("");
  
  useEffect(() => {
    let cachedMood = getData("mood", "regular");
    mood = cachedMood;
    setMood(mood);
    const handleMoodChange = (receivedMood) => {
      console.log("received: " + receivedMood)
      console.log("current: " + mood)
      if (receivedMood != mood) {
        setMood(receivedMood);
        mood = receivedMood;
        saveData(mood, "mood");
      }
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