import { useRef, useState } from "react";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [comment, setComment] = useState("");
  const [ok, setOk] = useState(false);
  const [errors, setErrors] = useState({});

  const dateRef = useRef(null);

  const openDatePicker = () => {
    if (dateRef.current?.showPicker) {
      dateRef.current.showPicker();
      return;
    }
    dateRef.current?.focus();
    dateRef.current?.click();
  };

  const validate = () => {
    const e = {};

    if (name.trim().length < 2) {
      e.name = "Please enter your name";
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      e.phone = "Please enter a valid phone number";
    }

    if (!date) {
      e.date = "Please select a booking date";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(date);
      if (selected < today) {
        e.date = "Date cannot be in the past";
      }
    }

    return e;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setOk(true);
    setTimeout(() => setOk(false), 2500);

    setName("");
    setPhone("");
    setDate("");
    setComment("");
  };

  const prettyDate = date ? new Date(date).toLocaleDateString("uk-UA") : "";

  return (
    <div className={css.box}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.after_title}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={onSubmit} noValidate>
        {/* Name */}
        <input
          className={`${css.input} ${errors.name ? css.invalid : ""}`}
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className={css.error}>{errors.name}</p>}

        {/* Phone */}
        <input
          className={`${css.input} ${errors.phone ? css.invalid : ""}`}
          placeholder="Phone*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className={css.error}>{errors.phone}</p>}

        {/* Date */}
        <div
          className={css.dateField}
          role="button"
          tabIndex={0}
          onClick={openDatePicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") openDatePicker();
          }}
        >
          <input
            className={`${css.input} ${errors.date ? css.invalid : ""}`}
            type="text"
            placeholder="Booking date*"
            value={prettyDate}
            readOnly
          />

          <input
            ref={dateRef}
            className={css.dateNative}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Booking date"
          />
        </div>
        {errors.date && <p className={css.error}>{errors.date}</p>}

        {/* Comment */}
        <textarea
          className={css.textarea}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />

        {ok && <div className={css.toast}>Booking successful ✅</div>}

        <button className={css.btn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
