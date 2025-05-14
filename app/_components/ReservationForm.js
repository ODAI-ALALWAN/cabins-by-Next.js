"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import SubmitButton from "./SubmitButton";
import { createBooking } from "../_lib/action";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="md:scale-[1.01]">

      <div className="bg-primary-800 text-primary-300 px-4 md:px-16 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-sm md:text-base">Logged in as</p>

        <div className="flex gap-2 md:gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-7 md:h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm md:text-base">{user.name}</p>
        </div>
      </div>

 
      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-6 md:py-10 px-4 md:px-16 text-base md:text-lg flex gap-3 md:gap-5 flex-col"
      >
     
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="numGuests" className="text-sm md:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-4 py-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm md:text-base"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x} className="text-sm md:text-base">
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 md:space-y-2">
          <label htmlFor="observations" className="text-sm md:text-base">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-4 py-2 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm md:text-base"
            placeholder="Any pets, allergies, special requirements, etc.?"
            rows="3"
          />
        </div>


        <div className="flex justify-end items-center gap-4 md:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-sm md:text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton 
              pendingLabel="Reserving..." 
              className="w-full md:w-auto text-sm md:text-base"
            >
              Reserve now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;