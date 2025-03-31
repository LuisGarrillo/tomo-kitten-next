// components/MyListenerComponent.js
'use client';

import Image from 'next/image';

export default function MiniKitten({accesory}) {
  return (
    <div className='kitten-wrapper'>
        <Image
          className='accesory'
          src={`/clothes/${accesory}.png`}
          width={185}
          height={95}
          alt="Your kitten accesory"
        />
        <Image
          src={`/kitten/dead.gif`}
          width={185}
          height={185}
          alt="Your kitten"
        />
    </div>
  );
}