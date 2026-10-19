import styles from "./PageIntro.module.css";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className={styles.intro}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  );
}
