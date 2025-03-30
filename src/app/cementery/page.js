'use client'
import { useState, useEffect } from "react";
import { getData } from "../cache";
const base = (
  <div></div>
)

export default function Cementery() {
    let [page, setPage] = useState(base);

    function getHistory() {
      let history = getData("history", {"mascots": []});
      if (!history)
        return (
          <p>Parece que no has perdido a ninguna mascota, tu consciencia debe estar limpia!</p>
        );
      console.log(history);
      const elements = history["mascots"].map((mascot) => (
        <div className="cementery-entry" key={mascot}>
          <p>
            {mascot["name"]}
          </p>
        </div>
      ));
      return elements;
    }
    const history = getHistory();

    const cementery = (
      <div>
        <h1>Bienvenido al cementerio, aqui puedes ver las consecueincias de tus acciones</h1>
        <div>
          {history}
        </div>
      </div>
    );


    useEffect(() => {
      setPage(cementery);
    }, [])

    return page;
  }