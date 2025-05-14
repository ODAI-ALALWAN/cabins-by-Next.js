import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    Cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800">
    
      <div className="relative h-48 md:h-32 w-full md:aspect-square">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover md:border-r border-primary-800"
        />
      </div>


      <div className="flex-grow px-4 py-3 md:px-6 flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
          <h3 className="text-lg md:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 px-3 py-1 md:h-7 uppercase text-xs font-bold flex items-center rounded-sm self-start md:self-auto">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 px-3 py-1 md:h-7 uppercase text-xs font-bold flex items-center rounded-sm self-start md:self-auto">
              upcoming
            </span>
          )}
        </div>

        <p className="text-base md:text-lg text-primary-300 mb-3">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-col md:flex-row gap-3 mt-auto items-baseline">
          <div className="flex gap-3 items-baseline">
            <p className="text-lg md:text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300 hidden md:block">&bull;</p>
            <p className="text-base md:text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
          </div>
          <p className="text-xs md:text-sm text-primary-400 md:ml-auto">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

 
      <div className="flex flex-row md:flex-col border-t md:border-l border-primary-800 w-full md:w-[100px]">
        {!isPast(startDate) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex items-center justify-center gap-1 md:gap-2 w-1/2 md:w-auto text-xs md:text-xs font-bold text-primary-300 md:border-b border-primary-800 md:flex-grow px-2 py-3 md:px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-4 w-4 md:h-5 md:w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-0.5">Edit</span>
            </Link>
            <DeleteReservation 
              bookingId={id} 
              onDelete={onDelete}
              className="w-1/2 md:w-auto border-l md:border-t border-primary-800"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;