"use client";
import { useEffect } from "react";
import Head from "next/head";
import styles from "./LP.module.css";
import { qualy, helveticaCompressed } from "@/app/fonts";

export default function LP() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const titleContainer = document.querySelector(
        `.${styles.titleContainer}`
      );
      if (titleContainer) {
        const { left, top, width, height } =
          titleContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        const mainTitle = document.querySelector(
          `.${styles.mainTitle} h1`
        ) as HTMLElement;
        const secondTitle = document.querySelector(
          `.${styles.secondTitle} h1`
        ) as HTMLElement;

        if (mainTitle && secondTitle) {
          mainTitle.style.transform = `scaleX(1.2) perspective(500px) rotateX(${
            10 - y * 10
          }deg) rotateY(${x * 10}deg)`;
          secondTitle.style.transform = `scaleX(1.2) perspective(500px) rotateX(${
            10 - y * 10
          }deg) rotateY(${x * 10}deg)`;
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title className={`${qualy.className}`}>
          XCELERATE IDEATHON | E-CELL
        </title>
        <meta name="description" content="E-CELL presents XCELERATE IDEATHON" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h2 className={styles.presents}>
            <span className={helveticaCompressed.className}>
              E-CELL PRESENTS
            </span>
          </h2>

          <div className={styles.titleWrapper}>
            {/* Title with 3D effect */}
            <div className={styles.title3dContainer}>
              <div className={`${styles.mainTitle} ${qualy.className}`}>
                <h1 data-text="XCELERATE" className={`${qualy.className}`}>
                  <span className={` ${styles.xLetter} ${qualy.className}`}>
                    X
                  </span>
                  <span className={qualy.className}>CELERATE</span>
                </h1>
              </div>
              <div className={styles.secondTitle}>
                <h1>
                  <span className={`${qualy.className}`}>IDEATHON</span>
                </h1>
              </div>
            </div>
          </div>

          <p className={styles.prizes}>
            <span className={helveticaCompressed.className}>
              5L+ WORTH PRIZES
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
