"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import EnquiryForm from "./EnquiryForm";
import styles from "./EnquiryModal.module.css";

const dismissalKey = "grace-enquiry-dismissed";

export default function EnquiryModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;
    startTransition(() => {
      try {
        setIsOpen(window.sessionStorage.getItem(dismissalKey) !== "yes");
      } catch {
        setIsOpen(true);
      }
    });
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function dismiss() {
      try {
        window.sessionStorage.setItem(dismissalKey, "yes");
      } catch {
        // The dialog still closes when session storage is unavailable.
      }
      setIsOpen(false);
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    function openFromTrigger() {
      setIsOpen(true);
    }

    window.addEventListener("grace:open-enquiry-modal", openFromTrigger);
    return () => window.removeEventListener("grace:open-enquiry-modal", openFromTrigger);
  }, []);

  function dismiss() {
    try {
      window.sessionStorage.setItem(dismissalKey, "yes");
    } catch {
      // The dialog still closes when session storage is unavailable.
    }
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onMouseDown={(event) => {
      if (event.target === event.currentTarget) dismiss();
    }}>
      <section
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        ref={dialogRef}
        data-enquiry-dialog
      >
        <header className={styles.header}>
          <h2 id="enquiry-title">Enquiry Form</h2>
          <button
            className={styles.close}
            ref={closeButtonRef}
            type="button"
            aria-label="Close enquiry form"
            onClick={dismiss}
          >
            <X aria-hidden="true" size={20} />
          </button>
        </header>
        <div className={styles.content}>
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
