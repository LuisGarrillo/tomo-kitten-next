'use client'

import Kitten from "../ui/components/kitten";
import moodChange from "../events/moodChange";
import TimerLayout from "../ui/components/layout";
import { statsData } from "../ui/components/timer";
import BaseButton from "../ui/components/baseButton";

export default function Play() {
    function raiseMood(value) {
      moodChange.emit("moodRaised", value);
    }

    return (
      <TimerLayout>
        <Kitten/>
        <div className="button-wrapper">
          <BaseButton
            event={raiseMood}
            text={"Limpiar"}
            value={"hygiene"}
          />
          <BaseButton
            event={raiseMood}
            text={"Acariciar"}
            value={"happiness"}
          />
        </div>
      
      </TimerLayout>
    );
  }