import ImageButton from "./imageButton";
import { useState } from "react";

export default function InvisibilityButton() {
    let [status, setStatus] =  useState("show");

    function toggleVisibility() {
        const timer = document.querySelector(".timer");
        timer.classList.toggle("visible")
        status = (status == "show") ? "hide" : "show";
        setStatus(status);
      }

    return (
        <ImageButton
            width={90}
            height={60}
            listener={toggleVisibility}
            source={`/UI/${status}.png`}
        />
    );
}