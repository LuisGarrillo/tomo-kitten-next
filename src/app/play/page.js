'use client'

import Kitten from "../ui/components/kitten";
import moodChange from "../events/moodChange";
import TimerLayout from "../ui/components/layout";
import { statsData } from "../ui/components/timer";

export default function Play() {
    function raiseMood(e) {
      moodChange.emit("moodRaised", e.target.value);
    }

    return (
      <TimerLayout>
        <Kitten/>
        <div>
          <button onClick={raiseMood} value={"hygiene"}>Peinar</button>
          <button onClick={raiseMood} value={"happiness"}>Acariciar</button>
        </div>
      
      </TimerLayout>
    );
  }