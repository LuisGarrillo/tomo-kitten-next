'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "./baseButton";
import { getData, saveData } from "@/app/cache";
import { defaultCatValues } from "@/app/cache";


const base = (
    <div></div>
);
let catData;

export default function Index() {
    let [page, setPage] = useState(base);
    const router = useRouter();

    function nameKitten(_default) {
        const field = document.getElementById("name-field");
        console.log(field.value);
        saveData(field.value, "name");
        router.push("/play");
    }

    function revive(_default) {
        let history = getData("history", {"mascots": []});
        history["mascots"].push(catData);
        saveData(history, "history");

        saveData(defaultCatValues, "catData");
        setPage(alive);
    }

    const alive = (
        <div className="index-wrapper">
            <h1>Bienvenido a tomo kitten!</h1>
            <p>Cuida a tu gato virtual limpiandolo, acariciandolo, alimentandolo y vistiendolo!</p>
            <div className="naming-wrapper">
                <input id="name-field" placeholder="Nombre"></input>
                <BaseButton event={nameKitten} text={"Crear"}></BaseButton>
            </div>
        </div>
    )
    const dead = (
        <div className="index-wrapper">
            <h1>Bienvenido a tomo kitten!</h1>
            <p>Parece que tu mascota ha perecido... No te preocupes, adopta una nueva y trata de ser un buen cuidador esta vez!</p>
            <div>
                <BaseButton event={revive} text = {"Adoptar"}></BaseButton>
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