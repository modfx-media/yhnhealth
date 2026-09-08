export default function JaneBooking() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-8 text-center">
      <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
        Your Next Step
      </p>
      <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
        Choose a time that works for you
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/70">
        Book your appointment online now to reserve a convenient time with our care team.
      </p>
      <a
        href="https://yourhealthnow.janeapp.com/locations/yhn/book#staff_member/2"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-7 flex w-fit items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-[0.16em] text-brand-dark shadow-card transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:text-white"
      >
        Book Your Appointment
      </a>
    </div>
  );
}
