"use client";

import Image from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";
import styles from "./Services.module.css";

type ServiceCardImageProps = {
  src: string;
  alt: string;
};

export default function ServiceCardImage({ src, alt }: ServiceCardImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={styles.imageFrame}>
      {hasError ? (
        <div className={styles.imageFallback} role="img" aria-label={`${alt} unavailable`}>
          <ImageOff size={28} aria-hidden="true" />
          <span>Image unavailable</span>
        </div>
      ) : (
        <Image
          className={styles.serviceImage}
          src={src}
          alt={alt}
          width={512}
          height={512}
          sizes="(max-width: 700px) calc(100vw - 4rem), (max-width: 1024px) 50vw, 25vw"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
