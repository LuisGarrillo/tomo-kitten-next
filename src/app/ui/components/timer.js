'use client'; // Importante para usar useEffect en componentes de cliente

import { useEffect, useState } from 'react';
import moodChange from '@/app/events/moodChange';
import { saveData, getData } from '@/app/cache';
import { defaultCatValues } from '@/app/cache';
let d = new Date();
let currentSeconds = d.getSeconds();

import StatIcon from './statIcon';

export let catData = defaultCatValues;

export let history = {"cats": []};

let secondsData = {
    "hygiene": currentSeconds,
    "hunger": currentSeconds,
    "happiness": currentSeconds,
};

export default function Timer() {
  let [hygiene, setHygiene] = useState(catData["stats"]["hygiene"]);
  let [hunger, setHunger] = useState(catData["stats"]["hunger"]);
  let [happiness, setHappiness] = useState(catData["stats"]["happiness"]);

  function updateValues() {
    currentSeconds += 1;

    if (currentSeconds - secondsData["hygiene"] >= 1) {
        secondsData["hygiene"] = currentSeconds;
        catData["stats"]["hygiene"] -= (catData["stats"]["hygiene"] > 0) ? 1 : 0;
        sendStat("hygiene", catData["stats"]["hygiene"]);
    }
    if (currentSeconds - secondsData["hunger"] >= 2) {
        secondsData["hunger"] = currentSeconds;
        catData["stats"]["hunger"] -= (catData["stats"]["hunger"] > 0) ? 1 : 0;
        sendStat("hunger", catData["stats"]["hunger"]);
    }
    if (currentSeconds - secondsData["happiness"] >= 3) {
        secondsData["happiness"] = currentSeconds;
        catData["stats"]["happiness"] -= (catData["stats"]["happiness"] > 0) ? 1 : 0;
        sendStat("happiness", catData["stats"]["happiness"]);
    }
    saveData(JSON.stringify(catData), "catData");
    checkStats();
  }

  function checkStats() {
    let total = catData["stats"]["hygiene"] + catData["stats"]["hunger"] + catData["stats"]["happiness"];
    let newState;
    if (total > 250) {
        newState = "happy";
    }
    else if (total > 150) {
        newState = "regular";
    }
    else if (total > 0) {
        newState = "mad";
    }
    else {
      newState = "dead"
    }
    
    if (newState != catData["mood"]) {
      catData["mood"] = newState;
      moodChange.emit("moodChanged", newState);
    }
  }

  function sendStat(stat, value) {
    moodChange.emit("updateStat", {
      "stat": stat,
      "value": value
    })
  }

  useEffect(() => {
      let storedData = getData("catData", defaultCatValues);
      storedData = typeof storedData == "string" ? JSON.parse(storedData) : storedData; 
      catData = storedData;
      catData["name"] = getData("name", "");
      setHygiene(catData["stats"]["hygiene"]);
      setHunger(catData["stats"]["hunger"]);
      setHappiness(catData["stats"]["happiness"])

      const interval = setInterval(updateValues, 1000);

      return () => clearInterval(interval); // Limpieza del intervalo
    }, []
  );
  
  useEffect(() => {
    function raiseStats(stat) {
      if (catData["mood"] == "dead") 
        return; 

      catData["stats"][stat] += (catData["stats"][stat] + 5 < 100) ? 5 : 100 - catData["stats"][stat];
      sendStat(stat, catData["stats"][stat])
      saveData(catData, "catData");
      checkStats();
    }
    
    moodChange.on('moodRaised', raiseStats);

    return () => {
        moodChange.off('moodRaised', raiseStats);
      };
    }, []);

    return (
      <div className='timer-component'>
        <div className='timer'>
          <StatIcon
            stat={"hygiene"}
            propStatus={"empty"}
          />
          <StatIcon
            stat={"hunger"}
            propStatus={"empty"}
          />
          <StatIcon
            stat={"happiness"}
            propStatus={"empty"}
          />
        </div>
      </div>
    );

}