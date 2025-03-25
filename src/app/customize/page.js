'use client';

import TimerLayout from "../ui/components/layout";
import Kitten from "../ui/components/kitten";
import { useState } from "react";
import { catData } from "../ui/components/timer";

export default function Customize() {
    const [selectedAccessory, setSelectedAccessory] = useState(catData.accessory);

    function selectAccessory(accessory) {
        setSelectedAccessory(accessory);
        catData.accessory = accessory;  // Se guarda en los datos actuales del gato
    }

    return (
        <TimerLayout>
            <h2>Personalizar</h2>
            <Kitten accessory={selectedAccessory} />
            <div className="accessory-buttons">
                <button onClick={() => selectAccessory("accessory1")}>Accesorio 1</button>
                <button onClick={() => selectAccessory("accessory2")}>Accesorio 2</button>
                <button onClick={() => selectAccessory("accessory3")}>Accesorio 3</button>
                <button onClick={() => selectAccessory("accessory4")}>Accesorio 4</button>
            </div>
        </TimerLayout>
    );
}
