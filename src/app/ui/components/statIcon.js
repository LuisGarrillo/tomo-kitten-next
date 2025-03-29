'use client'
import Image from "next/image"
import { useEffect, useState } from "react";
import moodChange from "@/app/events/moodChange";
import { catData } from "./timer";
const resolutions = {
    "hygiene": [130, 100],
    "hunger": [180, 100],
    "happiness": [120, 100],
};

export default function StatIcon({stat, propStatus}) {
    let iconStat = stat;
    let [status, setStatus] = useState(propStatus);

    function updateStatus(data) {
        if(data["stat"] !== iconStat) {
            return;
        }

        let newStatus = "";
        if (data["value"] > 66) {
            newStatus = "full";
        }
        else if (data["value"] > 0) {
            newStatus = "half";
        }
        else {
            newStatus = "empty";
        }

        console.log(newStatus)
        setStatus(newStatus);
    }

    useEffect(() => {
        updateStatus({
            "stat": stat,
            "value": catData["stats"][stat]
        })
        
        moodChange.on("updateStat", updateStatus);
        return () => {
            moodChange.off("updateStat", updateStatus);
        }
    }, [])

    return (
        <Image
        className="stat-icon"
            src={`/${stat}/${status}.png`}
            width={resolutions[iconStat][0]}
            height={resolutions[iconStat][1]}
            alt="Stat icon"
        />
    );
}