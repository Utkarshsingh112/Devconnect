'use client';
import { createBooking } from "@/lib/actions/booking.action";
import { useState } from "react";
import posthog from 'posthog-js'

const BookEvent = ({ eventId, slug }: { eventId?: string; slug?: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidEmail = email.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail || !eventId || !slug) return;
    setLoading(true);
    try {
      await createBooking({ eventId, slug, email });
      setSubmitted(true);
      posthog.capture('event_booked', { eventId, slug, email });
      setEmail("");
    } catch {
      console.error('Booking creation failed');
      posthog.captureException( 'Booking creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thank you for signing up!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <button
            type="submit"
            className="button-submit"
            disabled={!isValidEmail || loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookEvent;
