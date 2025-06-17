'use client';

import React, { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import styles from "./formSection.module.css";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function MentorshipFormSection() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null); // Referência do formulário

  useEffect(() => {
    if (!document.getElementById('recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    const token = window.grecaptcha?.getResponse();
    if (!token) {
      alert('Please confirm you are not a robot!');
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      profession: formData.get("profession"),
      professionOther: formData.get("professionOther"),
      experience: formData.get("experience"),
      goals: formData.getAll("goals"),
      goalOther: formData.get("goalOther"),
      description: formData.get("description"),
      format: formData.getAll("format"),
      availability: formData.get("availability"),
      referral: formData.get("referral"),
      comments: formData.get("comments"),
      token,
    };

    try {
      const res = await fetch("/api/contactMentorship", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
        window.grecaptcha.reset();
        if (formRef.current) formRef.current.reset(); // Limpar o formulário
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const t = useTranslations("Mentorship.FormSection");
  const select = t("select");

  const goals = t.raw("goals") as string[];
  const formats = t.raw("formats") as string[];
  const professions = t.raw("professions") as string[];
  const referralOptions = t.raw("referralOptions") as string[];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{t("basicInfoLegend")}</legend>

            {/* Full Name */}
            <div className={styles.field}>
              <label className={styles.label}>{t("fullName")}</label>
              <input type="text" name="fullName" required className={styles.input} />
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label className={styles.label}>{t("email")}</label>
              <input type="email" name="email" required className={styles.input} />
            </div>

            {/* Phone */}
            <div className={styles.field}>
              <label className={styles.label}>{t("phone")}</label>
              <input type="text" name="phone" className={styles.input} />
            </div>

            {/* Profession */}
            <div className={styles.field}>
              <label className={styles.label}>{t("profession")}</label>
              <select name="profession" required className={styles.select}>
                <option value="">{select}</option>
                {professions.map((p, i) => (
                  <option key={i} value={p}>{p}</option>
                ))}
              </select>
              <input type="text" name="professionOther" placeholder={t("professionOther")} className={`${styles.input} ${styles.optionalField}`} />
            </div>

            {/* Experience */}
            <div className={styles.field}>
              <label className={styles.label}>{t("experience")}</label>
              <select name="experience" required className={styles.select}>
                <option value="">{t("select")}</option>
                <option>0-2</option>
                <option>3-5</option>
                <option>6-10</option>
                <option>10+</option>
              </select>
            </div>

            {/* CV Upload */}
            <div className={styles.field}>
              <label className={styles.label}>{t("uploadCV")}</label>
              <input type="file" name="cv" className={styles.input} disabled />
              <small style={{ fontStyle: 'italic' }}>File upload not implemented.</small>
            </div>
          </fieldset>

          {/* Goals */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{t("goalsLegend")}</legend>
            {goals.map((goal, i) => (
              <label key={i} className={styles.checkbox}>
                <input type="checkbox" name="goals" value={goal} />
                {goal}
              </label>
            ))}
            <div className={styles.field}>
              <label className={styles.label}>{t("other")}</label>
              <input type="text" name="goalOther" placeholder={t("other")} className={styles.input} />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t("describe")}</label>
              <textarea name="description" required rows={5} className={styles.textarea}></textarea>
            </div>
          </fieldset>

          {/* Format */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{t("availabilityLegend")}</legend>
            {formats.map((format, i) => (
              <label key={i} className={styles.checkbox}>
                <input type="checkbox" name="format" value={format} />
                {format}
              </label>
            ))}
            <div className={styles.field}>
              <label className={styles.label}>{t("availability")}</label>
              <input type="text" name="availability" placeholder={t("availabilityPlaceholder")} className={styles.input} />
            </div>
          </fieldset>

          {/* Final Notes */}
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{t("finalLegend")}</legend>
            <div className={styles.field}>
              <label className={styles.label}>{t("referral")}</label>
              <select name="referral" className={styles.select}>
                <option value="">{select}</option>
                {referralOptions.map((option, i) => (
                  <option key={i}>{option}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t("comments")}</label>
              <textarea name="comments" rows={4} className={styles.textarea}></textarea>
            </div>
          </fieldset>

          <div
            className="g-recaptcha"
            data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          ></div>

          <button type="submit" className={styles.submitButton}>
            {t("submit")}
          </button>

          {success && <p className={styles.success}>Email sent successfully!</p>}
          {error && <p className={styles.error}>Failed to send email. Try again later.</p>}
        </form>
      </div>
    </section>
  );
}

