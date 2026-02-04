import { useState } from "react";
import css from "./BookingForm.module.css";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [ok, setOk] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // тут бекенда бронювання нема, тому просто нотифікація як в ТЗ
    setOk(true);
    setTimeout(() => setOk(false), 2500);

    setName("");
    setPhone("");
    setDate("");
    setComment("");
  };

  return (
    <div className={css.box}>
      <h3 className={css.title}>Book your camper</h3>

      <form className={css.form} onSubmit={onSubmit}>
        <input
          className={css.input}
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={css.input}
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          className={css.input}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          className={css.textarea}
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
        />

        <button className={css.btn} type="submit">
          Send
        </button>

        {ok && <div className={css.toast}>Booking successful ✅</div>}
      </form>
    </div>
  );
}
