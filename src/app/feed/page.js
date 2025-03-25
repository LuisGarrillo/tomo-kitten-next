'use client'

import Kitten from "../ui/components/kitten";
import moodChange from "../events/moodChange";
import TimerLayout from "../ui/components/layout";
import { useState, useEffect } from "react";
import { catData } from "../ui/components/timer";

export default function Feed() {
    const [hunger, setHunger] = useState(catData.stats.hunger);

    useEffect(() => {
        function updateHunger(stat) {
            if (stat === "hunger") {
                setHunger(catData.stats.hunger);
            }
        }

        moodChange.on("moodRaised", updateHunger);

        return () => {
            moodChange.off("moodRaised", updateHunger);
        };
    }, []);

    function increaseHunger(e) {
        moodChange.emit("moodRaised", "hunger"); // Emitimos el evento para aumentar la hambre
    }

    return (
        <TimerLayout>
            <Kitten />
            <div>
                <button onClick={increaseHunger} value={10}>Comida 1</button>
                <button onClick={increaseHunger} value={20}>Comida 2</button>
                <button onClick={increaseHunger} value={30}>Comida 3</button>
            </div>
        </TimerLayout>
    );
}
