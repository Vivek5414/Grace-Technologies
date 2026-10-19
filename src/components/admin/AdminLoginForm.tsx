"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { signInAdmin } from "@/app/admin/actions";
import styles from "./AdminLoginForm.module.css";

type AdminLoginFormProps = {
  initialError: string | null;
};

export default function AdminLoginForm({ initialError }: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, pending] = useActionState(signInAdmin, { error: initialError });

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="admin-heading">
        <Link className={styles.logoLink} href="/" aria-label="Grace Technologies home">
            <Image
              className={styles.logo}
              src="/logo.svg"
              alt="Grace Technologies"
              width={800}
              height={330}
              sizes="160px"
            />
        </Link>

        <div className={styles.formColumn}>
          <div className={styles.formHeading}>
            <h1 id="admin-heading">Admin Login</h1>
            <p>Welcome back! Please login to continue.</p>
          </div>

          <form className={styles.form} action={formAction}>
            <label className={styles.field} htmlFor="admin-email">
              <span>Email</span>
              <span className={styles.inputWrap}>
                <UserRound className={styles.fieldIcon} size={18} aria-hidden="true" />
                <input
                  autoComplete="username"
                  id="admin-email"
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  maxLength={254}
                  required
                />
              </span>
            </label>
            <div className={styles.field}>
              <label htmlFor="admin-password">Password</label>
              <span className={styles.passwordWrap}>
                <LockKeyhole className={styles.fieldIcon} size={18} aria-hidden="true" />
                <input
                  autoComplete="current-password"
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  maxLength={1024}
                  minLength={8}
                  placeholder="Enter your password"
                  required
                />
                <button
                  className={styles.visibilityButton}
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                </button>
              </span>
            </div>
            <button className={styles.submit} type="submit" disabled={pending}>
              {pending ? <><LoaderCircle className={styles.spinner} size={17} aria-hidden="true" /> Logging in…</> : "Login"}
            </button>
          </form>
          {state.error && <p className={styles.authNotice} role="alert">{state.error}</p>}
          <div className={styles.demoAccess}>
            <div>
              <strong>Just exploring?</strong>
              <p>Preview the Admin Panel with fictional sample data. No sign-in required; changes are not saved.</p>
            </div>
            <Link className={styles.demoButton} href="/admin/demo">
              View demo panel <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <Link className={styles.backLink} href="/">
            <ArrowLeft size={15} aria-hidden="true" /> Back to website
          </Link>
        </div>
      </section>
    </main>
  );
}
