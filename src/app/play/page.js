'use client'

import Kitten from "../ui/components/kitten";
import moodChange from "../events/moodChange";
import TimerLayout from "../ui/components/layout";
import { useEffect, useState } from "react";
import { statsData } from "../ui/components/timer";
import BaseButton from "../ui/components/baseButton";
import { base } from "../ui/defaults/defaultPage";

export default function Play() {
    let [page, setPage] = useState(base);
    const play = (
      <TimerLayout>
        <div className="page-wrapper">
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
        </div>
      </TimerLayout>
    );

    function raiseMood(value) {
      moodChange.emit("moodRaised", value);
    }
    useEffect(() => {
      setPage(play);
      moodChange.emit("loaded", "play");
    }, []);

    return page;
  }