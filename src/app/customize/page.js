'use client';

import TimerLayout from "../ui/components/layout";
import Kitten from "../ui/components/kitten";
import { useState, useEffect } from "react";
import { catData } from "../ui/components/timer";
import ImageButton from "../ui/components/imageButton";
import moodChange from "../events/moodChange";
import { base } from "../ui/defaults/defaultPage";

export default function Customize() {
    const [selectedAccessory, setSelectedAccessory] = useState(catData.accessory);
    let [page, setPage] = useState(base);

    const customize = (
        <TimerLayout>
            <div className="page-wrapper">
                <Kitten accessory={selectedAccessory} />
                <div className="button-wrapper">
                    <ImageButton
                        source={"/clothes-icons/cap.png"}
                        width={105}
                        height={40}
                        listener={selectAccessory}
                        data={"cap"}
                    />
                    <ImageButton
                        source={"/clothes-icons/glasses.png"}
                        width={105}
                        height={40}
                        listener={selectAccessory}
                        data={"glasses"}
                    />
                    <ImageButton
                        source={"/clothes-icons/ribbon.png"}
                        width={105}
                        height={40}
                        listener={selectAccessory}
                        data={"ribbon"}
                    />
                    <ImageButton
                        source={"/clothes-icons/leaf.png"}
                        width={105}
                        height={40}
                        listener={selectAccessory}
                        data={"leaf"}
                    />
                    <ImageButton
                        source={"/clothes-icons/hcap.png"}
                        width={105}
                        height={40}
                        listener={selectAccessory}
                        data={"hcap"}
                    />
                </div>
            </div>
        </TimerLayout>
    );

    function selectAccessory(accessory) {
        moodChange.emit("accesoryChanged", accessory);
        catData.accessory = accessory;
    }
    useEffect(() => {
        setPage(customize);
        moodChange.emit("loaded", "customize");
    }, [])

    return page;
}
