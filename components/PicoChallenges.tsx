"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { picoChallenges, picoGallery, picoMeta, type PicoImage } from "../data/pico-challenges";
import styles from "./PicoChallenges.module.css";

export default function PicoChallenges() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<PicoImage | null>(null);

  const enlarge = (img: PicoImage) => {
    setOpen(img);
    dialogRef.current?.showModal();
  };

  const Shot = ({ img, sizes }: { img: PicoImage; sizes: string }) => (
    <button type="button" className={styles.shot} onClick={() => enlarge(img)} aria-label={`Enlarge: ${img.alt}`}>
      <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} />
    </button>
  );

  return (
    <div className={styles.root}>
      <section className={styles.overview} aria-labelledby="pico-overview">
        <div>
          <h2 id="pico-overview">What is this project?</h2>
          <p className={styles.course}>{picoMeta.course}</p>
          <p>{picoMeta.overview}</p>
          <ol className={styles.goals}>
            {picoChallenges.map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`}>
                  <span className={styles.num}>{c.number}</span>
                  <span>
                    <strong>{c.title}</strong>
                    {c.goal}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <Shot img={picoMeta.setup} sizes="(min-width: 900px) 45vw, 100vw" />
      </section>

      {picoChallenges.map((c) => (
        <section key={c.id} id={c.id} className={styles.challenge} aria-labelledby={`${c.id}-h`}>
          <p className={styles.kicker}>Challenge {c.number}</p>
          <h2 id={`${c.id}-h`}>{c.title}</h2>
          <p className={styles.goal}>{c.goal}</p>

          <div className={styles.how}>
            <div>
              <h3>How it works</h3>
              <p>{c.howItWorks}</p>
            </div>
            <Shot img={c.hero} sizes="(min-width: 900px) 45vw, 100vw" />
          </div>

          <h3>How it was made</h3>
          <ol className={styles.steps}>
            {c.steps.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <div>
                  <h4>
                    <span className={styles.stepNum}>Step {i + 1}</span>
                    {s.title}
                  </h4>
                  <p>{s.text}</p>
                </div>
                <div className={styles.imgs} data-count={s.images.length}>
                  {s.images.map((img) => (
                    <Shot key={img.src + img.alt} img={img} sizes="(min-width: 900px) 30vw, 100vw" />
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <section className={styles.challenge} aria-labelledby="pico-gallery">
        <h2 id="pico-gallery">Project gallery</h2>
        <div className={styles.gallery}>
          {picoGallery.map((g) => (
            <figure key={g.caption}>
              <Shot img={g.image} sizes="(min-width: 900px) 25vw, 50vw" />
              <figcaption>{g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label="Enlarged photo"
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()} aria-label="Close">
          ×
        </button>
        {open && (
          <>
            <Image src={open.src} alt={open.alt} width={open.width} height={open.height} sizes="95vw" />
            <p>{open.alt}</p>
          </>
        )}
      </dialog>
    </div>
  );
}
