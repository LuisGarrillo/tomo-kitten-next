'use client'
import Image from "next/image"
import { useEffect, useState } from "react";
import moodChange from "@/app/events/moodChange";
import Link from "next/link";



export default function NavButton({propPage}) {
    let [status, setStatus] = useState("unselected");
    let [page, setPage] = useState(propPage);
    let link = (propPage == "home") ? "" : propPage;

    function select() {
        moodChange.emit("clicked");
        status = "selected";
        setStatus(status);
    }
    
    function unselect() {
        status = "unselected";
        setStatus(status);
    }

    useEffect(() => {
        moodChange.on("clicked", unselect)

        return () => {
            moodChange.off("clicked", unselect);
        }
    }, [])

    return (
        <Link href={`/${link}`}>
            <Image
                src={`/buttons/${page}/${status}.png`}
                width={120}
                height={120}
                alt="icon button"
                onClick={select}
            />
        </Link>
    );
}