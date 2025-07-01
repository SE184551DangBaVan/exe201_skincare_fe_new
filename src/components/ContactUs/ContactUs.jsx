import { useState } from "react";
import axios from "axios";

import './ContactUs.css'

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    // Prevent page refresh
    e.preventDefault();

    axios
      .post(
        "https://",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          message: message
        },
        {
          headers: {
            Accept: "application/json"
          }
        }
      )
      .then((res) => {
        // success http code
        if (res.data.code === 200) {
          setSubmitted(true);
        } else {
          setError(res.data.message);
        }
      });
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (submitted) {
    return <p>Chúng tôi đã nhận được tin nhắn của bạn, cảm ơn bạn đã liên hệ!</p>;
  }

  return (
    <form onSubmit={submit} className="contactUsForm">
      <div className="contactUsTitle">Liên hệ với chúng tôi</div>
      <label htmlFor="firstName">Tên</label>
      <input
        id="firstName"
        value={firstName}
        placeholder="Nhập tên của bạn"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <label htmlFor="lastName">Họ</label>
      <input
        id="lastName"
        value={lastName}
        placeholder="Nhập họ của bạn"
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <label htmlFor="email">Địa chỉ email</label>
      <input
        id="email"
        type="email"
        value={email}
        placeholder="email@skincaredomain.com"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="message">Tin nhắn của bạn</label>
      <textarea
        id="message"
        value={message}
        placeholder="Nhập câu hỏi hoặc tin nhắn của bạn"
        onChange={(e) => setMessage(e.target.value)}
      />

      <button type="submit">Gửi</button>
    </form>
  );
}
