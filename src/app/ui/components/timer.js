'use client'; // Importante para usar useEffect en componentes de cliente

import { useEffect, useState } from 'react';
import moodChange from '@/app/events/moodChange';
import { saveData, getData } from '@/app/cache';
let d = new Date();
let currentSeconds = d.getSeconds();

export let catData = {
  "name": "",
  "mood": "regular",
  "stats": {
    "hygiene": 75,
    "hunger": 75,
    "happiness": 75,
  },
  "accessory": "none",
  "fav-food": "milk",
  "history": [],
}

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
        setHygiene(catData["stats"]["hygiene"]);
    }
    if (currentSeconds - secondsData["hunger"] >= 2) {
        secondsData["hunger"] = currentSeconds;
        catData["stats"]["hunger"] -= (catData["stats"]["hunger"] > 0) ? 1 : 0;
        setHunger(catData["stats"]["hunger"]);
    }
    if (currentSeconds - secondsData["happiness"] >= 3) {
        secondsData["happiness"] = currentSeconds;
        catData["stats"]["happiness"] -= (catData["stats"]["happiness"] > 0) ? 1 : 0;
        setHappiness(catData["stats"]["happiness"]);
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
    else {
        newState = "mad";
    }
    if (newState != catData["mood"]) {
      catData["mood"] = newState;
      moodChange.emit("moodChanged", newState);
    }
  }

  useEffect(() => {
      let storedData = getData("catData", {
        "name": "",
        "mood": "regular",
        "stats": {
          "hygiene": 75,
          "hunger": 75,
          "happiness": 75,
        },
        "accessory": "none",
        "fav-food": "milk",
        "history": [],
      });
      storedData = typeof storedData == "string" ? JSON.parse(storedData) : storedData; 
      catData = storedData;
      setHygiene(catData["stats"]["hygiene"]);
      setHunger(catData["stats"]["hunger"]);
      setHappiness(catData["stats"]["happiness"])

      const interval = setInterval(updateValues, 1000);

      return () => clearInterval(interval); // Limpieza del intervalo
    }, []
  );
  
  useEffect(() => {
    function raiseStats(stat) {
      catData["stats"][stat] += (catData["stats"][stat] + 5 < 100) ? 5 : 100 - catData["stats"][stat];
      if (stat == "hygiene") {
        setHygiene(catData["stats"]["hygiene"]);
      }
      else if (stat == "hunger") {
        setHunger(catData["stats"]["hunger"]);
      }
      else {
        setHappiness(catData["stats"]["happiness"]);
      }
      saveData(catData, "catData");
      checkStats();
    }
    
    moodChange.on('moodRaised', raiseStats);

    return () => {
        moodChange.off('moodRaised', raiseStats);
      };
    }, []);

    return (
      <div>
        <p>Higiene: {catData["stats"]["hygiene"]}</p>
        <p>Hambre: {catData["stats"]["hunger"]}</p>
        <p>Felicidad: {catData["stats"]["happiness"]}</p>
      </div>
    );

}