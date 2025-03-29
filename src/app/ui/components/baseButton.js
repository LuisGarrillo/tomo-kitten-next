'use client'
import Image from "next/image"
import { useEffect, useState } from "react";
import moodChange from "@/app/events/moodChange";
import Link from "next/link";



export default function BaseButton({event, text, value}) {
    let given_listener = event;
    function select() {
        given_listener(value);
    }

    return (
        <div className="base-button">
            <Image
                src={`/buttons/empty/botones_vacios.png`}
                width={350}
                height={100}
                alt="button"
                onClick={select}
            >
            </Image>
            <p className="base-button-text" onClick={select}>
                {text}
            </p>
        </div>  
    );
}