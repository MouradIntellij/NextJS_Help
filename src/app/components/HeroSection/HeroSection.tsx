import React from "react";
import styles from "./heroSection.module.css";

interface SectionProps {
    heading: string;
    black?: boolean | false;
    h1Adjust?: boolean | false;
    imageName: string;
}

export default function HeroSection({ heading, black, h1Adjust, imageName }: SectionProps) {
    const backgroundUrl = `/imgs/${imageName}`;

    console.log("Background image prop:", imageName);


    return (
        <div className={styles.section} style={{backgroundImage:`url(${backgroundUrl})`}}>
            <h1 className={`${styles.heading} ${black ? styles.dark : ''} ${h1Adjust ? styles.h1Adjust : ''}`}>{heading}</h1>
        </div>
    );
}