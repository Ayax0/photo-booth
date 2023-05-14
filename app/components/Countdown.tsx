import React, { useEffect, useState } from "react";
import styles from "./Countdown.module.scss";

interface ICountdownProps {
    duration: number;
    onFinished?: () => void;
}

export default function Countdown(props: ICountdownProps) {
    const [counter, setCounter] = useState(props.duration);

    useEffect(() => {
        if (counter > 0) setTimeout(() => setCounter((value) => value - 1), 1000);
        else if (props.onFinished) props.onFinished();
    }, [counter, props]);

    return <div className={styles.countdown}>{counter}</div>;
}
