'use client'
import { useState, useEffect } from "react";
import BaseButton from "./baseButton";
import { getData, saveData } from "@/app/cache";
import { defaultCatValues } from "@/app/cache";

const base = (
    <div></div>
);
let catData;

export default function Index() {
    let [page, setPage] = useState(base);
    function nameKitten(_default) {

    }

    function revive(_default) {
        let history = getData("history", {"mascots": []});
        history["mascots"].push(catData);
        saveData(history, "history");

        saveData(defaultCatValues, "catData");
        setPage(alive);
    }

    const alive = (
        <div>
            <h1>Bienvenido a tomo kitten!</h1>
            <p>Cuida a tu gato virtual limpiandolo, acariciandolo, alimentandolo y vistiendolo!</p>
            <div>
                <input placeholder="Dale un nombre a tu mascota!"></input>
                <BaseButton event={nameKitten} text={"Crear"}></BaseButton>
            </div>
        </div>
    )
    const dead = (
        <div>
            <h1>Bienvenido a tomo kitten!</h1>
            <p>Parece que tu mascota a perecido... No te preocupes, adopta y una nueva y trata de ser una buena persona esta vez!</p>
            <div>
                <BaseButton event={revive} text = {"Revivir"}></BaseButton>
            </div>
        </div>
    )


    useEffect(() => {
        let storedData = getData("catData", defaultCatValues);
        storedData = typeof storedData == "string" ? JSON.parse(storedData) : storedData; 
        catData = storedData;
        if (catData["mood"] == "dead") {
            setPage(dead);
        }
        else {
            setPage(alive);
        }
    }, [])


    return page;
}