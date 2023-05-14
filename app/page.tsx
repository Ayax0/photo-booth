/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

import Countdown from "./components/Countdown";
import Flash from "./components/Flash";

export default function Home() {
    const router = useRouter();
    const video = useRef<HTMLVideoElement>(null);

    const [countdown, setCountdown] = useState(false);
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        const media_devices = navigator.mediaDevices;

        media_devices
            .getUserMedia({
                audio: false,
                video: true,
            })
            .then((stream) => {
                if (!video.current) return;
                video.current.srcObject = stream;
            });
    }, []);

    useEffect(() => {
        if (!flash) return;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = 1920;
        canvas.height = 1080;

        if (!ctx || !video.current) return;
        ctx.drawImage(video.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
            const response = await fetch("/api/image", { body: blob, method: "POST" });
            const body = await response.json();
            setTimeout(() => {
                setFlash(false);
                router.push(`/gallery/${body.uid}`);
            }, 1000);
        }, "image/jpeg");
    }, [flash, router]);

    function startCountdown() {
        setCountdown(true);
    }

    function stopCountdown() {
        setCountdown(false);
        setFlash(true);
    }

    return (
        <div className={styles.main}>
            <video autoPlay ref={video} onClick={startCountdown}></video>
            {countdown && <Countdown duration={3} onFinished={stopCountdown} />}
            {flash && <Flash />}
        </div>
    );
}
