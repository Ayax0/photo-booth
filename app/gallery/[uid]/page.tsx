/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";

interface IGalleryPageProps {
    params: {
        uid: string;
    };
}

export default function GalleryPage(props: IGalleryPageProps) {
    return (
        <div className={styles.gallery}>
            <label>Zufrieden?</label>
            <div className={styles.filmstrip}>
                <img src={`/${props.params.uid}.jpeg`} alt="image not found" />
            </div>
            <div className={styles.action}>
                <Link href={"/"}>Neues Bild</Link>
                <button>Drucken</button>
            </div>
        </div>
    );
}
