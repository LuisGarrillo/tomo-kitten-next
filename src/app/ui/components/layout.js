import Timer from "./timer";

export default function TimerLayout({ children }) {
    return (
        <div className="timer-wrapper">
            <Timer/>
            {children}
        </div>
    )
};