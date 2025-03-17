'use client'

import Kitten from "../ui/components/kitten";
import moodChange from "../events/moodChange";
import { statsData } from "../ui/components/timer";

export default function Play() {
    function raiseMood(e) {
      moodChange.emit("moodRaised", e.target.value);
    }

    return (
      <div>
        <Kitten/>
        <div>
          <button onClick={raiseMood} value={"hygiene"}>Peinar</button>
          <button onClick={raiseMood} value={"happiness"}>Acariciar</button>
        </div>
      </div>
    );
  }