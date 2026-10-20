import { Quote } from "lucide-react";
import { sampleTestimonials } from "@/lib/testimonial-data";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section className={styles.section} id="testimonials" aria-labelledby="testimonials-heading">
      <div className={styles.inner}>
        <header className={styles.heading}>
          <span className={styles.eyebrow}>FICTIONAL EXAMPLES</span>
          <h2 id="testimonials-heading">What Our Clients Say</h2>
        </header>

        <p className={styles.sampleNotice}>
          These fictional examples are for illustration only. They are not client testimonials or real customer feedback.
        </p>
        <div className={styles.grid}>
          {sampleTestimonials.map((testimonial) => (
            <article className={styles.card} key={testimonial.quote}>
              <Quote className={styles.quoteIcon} size={30} aria-hidden="true" />
              <blockquote>{testimonial.quote}</blockquote>
              <div className={styles.divider} />
              <p className={styles.attribution}>{testimonial.attribution}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
