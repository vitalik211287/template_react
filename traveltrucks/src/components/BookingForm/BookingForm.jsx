import { useRef, useState } from "react";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [comment, setComment] = useState("");
  const [ok, setOk] = useState(false);

  const dateRef = useRef(null);

  const openDatePicker = () => {
    // Chrome/Edge
    if (dateRef.current?.showPicker) {
      dateRef.current.showPicker();
      return;
    }
    // fallback (Firefox): фокус/клік по інпуту
    dateRef.current?.focus();
    dateRef.current?.click();
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
      <h3 className={css.title}>Book your camper</h3>
      <p className={css.after_title}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          placeholder="Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className={css.input}
          placeholder="Phone*"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {/* Date field: клік будь-де відкриває календар */}
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
            className={css.input}
            type="text"
            placeholder="Booking date*"
            value={prettyDate}
            readOnly
          />
{/* 
          <span className={css.dateIcon} aria-hidden="true">
            📅
          </span> */}

          {/* Справжнє поле дати (приховане) */}
          <input
            ref={dateRef}
            className={css.dateNative}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            aria-label="Booking date"
          />
        </div>

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
