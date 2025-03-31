'use client'
import { useState, useEffect } from "react";
import { getData } from "../cache";
import { base } from "../ui/defaults/defaultPage";
import MiniKitten from "../ui/components/miniKitten";
import moodChange from "../events/moodChange";

export default function Cementery() {
    let [page, setPage] = useState(base);

    function getHistory() {
      let history = getData("history", {"mascots": []});

      if (!history)
        return (
          <p>Parece que no has perdido a ninguna mascota, tu consciencia debe estar limpia!</p>
        );

      let counter = 0;
      const elements = history["mascots"].map((mascot) => {
        counter++;

        let accesory = (mascot["accessory"]) ? mascot["accessory"] : "none";
        let name = (mascot["name"]) ? mascot["name"] : "Mascota sin nombre";

        return (
        <div className="cementery-entry" key={counter}>
          <MiniKitten accesory={accesory} />
          <p>
            {name}
          </p>
        </div>
      )});

      return elements;
    }
    const history = getHistory();

    const cementery = (
      <div className="cementery-page">
        <div className="cementery-header">
          <h1>Cementerio</h1>
          <p>Aqui reposan nuestros viejos companeros.</p>
        </div>
        <div className="cementery-wrapper">
          {history}
        </div>
      </div>
    );


    useEffect(() => {
      setPage(cementery);
      moodChange.emit("loaded", "cementery");
    }, [])

    return page;
  }