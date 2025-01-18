import BookingForm from "@/components/booking-form";

export default function Booking() {
  return (
    <div className="container py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Book an Appointment
        </h1>
        <p className="mt-6 text-center text-lg text-gray-600">
          Schedule your next nail care session with us
        </p>
        <div className="mt-16">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
