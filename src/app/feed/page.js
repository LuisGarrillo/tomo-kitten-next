'use client'

import Kitten from "../ui/components/kitten";
import moodChange from "../events/moodChange";
import TimerLayout from "../ui/components/layout";
import ImageButton from "../ui/components/imageButton";
import { useState, useEffect } from "react";
import { catData } from "../ui/components/timer";
import { base } from "../ui/defaults/defaultPage";

export default function Feed() {
    const [hunger, setHunger] = useState(catData.stats.hunger);
    let [page, setPage] = useState(base);

    const feed = (
        <TimerLayout>
            <div className="page-wrapper">
                <Kitten />
                <div className="button-wrapper">
                    <ImageButton
                        source={"/dishes/milk.png"}
                        width={120}
                        height={120}
                        listener={increaseHunger}
                        data={10}
                    />
                    <ImageButton
                        source={"/dishes/chicken.png"}
                        width={120}
                        height={120}
                        listener={increaseHunger}
                        data={30}
                    />
                    <ImageButton
                        source={"/dishes/fish.png"}
                        width={120}
                        height={120}
                        listener={increaseHunger}
                        data={20}
                    />
                </div>
            </div>
        </TimerLayout>
    );

    useEffect(() => {
        function updateHunger(stat) {
            if (stat === "hunger") {
                setHunger(catData.stats.hunger);
            }
        }

        moodChange.on("moodRaised", updateHunger);
        moodChange.emit("loaded", "feed");
        setPage(feed);
        return () => {
            moodChange.off("moodRaised", updateHunger);
        };
    }, []);

    function increaseHunger(e) {
        moodChange.emit("moodRaised", "hunger"); // Emitimos el evento para aumentar la hambre
    }

    return page
}
