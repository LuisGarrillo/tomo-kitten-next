import Timer from "./timer";
import ImageButton from "./imageButton";
import InvisibilityButton from "./visibilityButton";

export default function TimerLayout({ children }) {
    return (
        <div className="interaction-page">
            <div className="timer-wrapper">
            <Timer/>
            {children}
            </div>
            <InvisibilityButton/>
        </div>
    )
};