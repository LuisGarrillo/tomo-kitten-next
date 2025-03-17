'use client'; // Importante para usar useEffect en componentes de cliente

import { useEffect, useState } from 'react';
import moodChange from '@/app/events/moodChange';
import { saveData, getData } from '@/app/cache';
let d = new Date();
let currentSeconds = d.getSeconds();

export let statsData = {
  "hygiene": "",
  "hunger": "",
  "happiness": "",
};

let secondsData = {
    "hygiene": currentSeconds,
    "hunger": currentSeconds,
    "happiness": currentSeconds,
};

export default function Timer() {
  let [hygiene, setHygiene] = useState(statsData["hygiene"]);
  let [hunger, setHunger] = useState(statsData["hunger"]);
  let [happiness, setHappiness] = useState(statsData["happiness"]);

  function updateValues() {
    currentSeconds += 1;

    if (currentSeconds - secondsData["hygiene"] >= 1) {
        secondsData["hygiene"] = currentSeconds;
        statsData["hygiene"] -= (statsData["hygiene"] > 0) ? 1 : 0;
        setHygiene(statsData["hygiene"]);
    }
    if (currentSeconds - secondsData["hunger"] >= 2) {
        secondsData["hunger"] = currentSeconds;
        statsData["hunger"] -= (statsData["hunger"] > 0) ? 1 : 0;
        setHunger(statsData["hunger"]);
    }
    if (currentSeconds - secondsData["happiness"] >= 3) {
        secondsData["happiness"] = currentSeconds;
        statsData["happiness"] -= (statsData["happiness"] > 0) ? 1 : 0;
        setHappiness(statsData["happiness"]);
    }
    saveData(JSON.stringify(statsData), "statsData");
    checkStats();
  }

  function checkStats() {
    let total = statsData["hygiene"] + statsData["hunger"] + statsData["happiness"];
    let newState;
    if (total > 250) {
        newState = "happy";
    }
    else if (total > 150) {
        newState = "regular";
    }
    else {
        newState = "mad";
    }
    console.log(total);
    moodChange.emit("moodChanged", newState);
  }

  useEffect(() => {
      let storedStats = getData("statsData", {
        "hygiene": 75,
        "hunger": 75,
        "happiness": 75,
      });
      storedStats = typeof storedStats == "string" ? JSON.parse(storedStats) : storedStats; 
      statsData = storedStats;
      setHygiene(statsData["hygiene"]);
      setHunger(statsData["hunger"]);
      setHappiness(statsData["happiness"])

      const interval = setInterval(updateValues, 1000);

      return () => clearInterval(interval); // Limpieza del intervalo
    }, []
  );
  
  useEffect(() => {
    function raiseStats(stat) {
      statsData[stat] += (statsData[stat] + 5 < 100) ? 5 : 100 - statsData[stat];
      if (stat == "hygiene") {
        setHygiene(statsData["hygiene"]);
      }
      else if (stat == "hunger") {
        setHunger(statsData["hunger"]);
      }
      else {
        setHappiness(statsData["happiness"]);
      }
      saveData(statsData, "statsData");
      checkStats();
    }
    
    moodChange.on('moodRaised', raiseStats);

    return () => {
        moodChange.off('moodRaised', raiseStats);
      };
    }, []);

    return (
      <div>
        <p>Higiene: {statsData["hygiene"]}</p>
        <p>Hambre: {statsData["hunger"]}</p>
        <p>Felicidad: {statsData["happiness"]}</p>
      </div>
    );

}