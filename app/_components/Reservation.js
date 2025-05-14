import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-servers";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { auth } from "../_lib/auth";
import LoginMessagg from './LoginMessage'

async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  const session = await auth();

  return (
    <div className="grid md:grid-cols-2 gap-y-8 md:gap-0 border border-primary-800 rounded-lg overflow-hidden min-h-[300px] md:min-h-[400px] px-4 md:px-0">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      <div className="md:border-l border-primary-800">
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session.user} />
        ) : (
          <LoginMessagg />
        )}
      </div>
    </div>
  );
}

export default Reservation;