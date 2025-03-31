// components/MyListenerComponent.js
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import moodChange from '@/app/events/moodChange';
import { catData } from './timer';

export default function Kitten() {
  let [mood, setMood] = useState(catData["mood"]);
  let [accesory, setAccesory] = useState(catData["accesory"]);
  let [name, setName] = useState("");
  
  useEffect(() => {

  }, []);

  useEffect(() => {
    mood = catData["mood"];
    setMood(mood);
    setName(catData["name"]);
    setAccesory(catData["accessory"]);
    
    const handleMoodChange = (receivedMood) => {
      setMood(receivedMood);
      mood = receivedMood;
    };

    const handleAccesoryChange = (receivedAccesory) => {
      setAccesory(receivedAccesory);
    };

    moodChange.on('moodChanged', handleMoodChange);
    moodChange.on('accesoryChanged', handleAccesoryChange);

    return () => {
        moodChange.off('moodChanged', handleMoodChange);
        moodChange.off('accesoryChanged', handleAccesoryChange);
    };
  }, []);

  return (
    <div className='kitten-wrapper'>
        <Image
          className='accesory'
          src={`/clothes/${accesory}.png`}
          width={370}
          height={190}
          alt="Your kitten accesory"
        />
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