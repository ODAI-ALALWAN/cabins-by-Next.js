import Image from "next/image";
import { Suspense } from "react";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { getCabin, getCabins } from "@/app/_lib/data-servers";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import ReservationReminder from "@/app/_components/ReservationReminder";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="max-w-6xl mx-auto mt-4 md:mt-8 px-4 sm:px-6">
    <div className="grid md:grid-cols-[3fr_4fr] gap-8 md:gap-20 border border-primary-800 py-3 px-4 md:px-10 mb-12 md:mb-24">
      {/* Image Container */}
      <div className="relative md:scale-[1.15] md:-translate-x-3 aspect-square md:aspect-auto">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>
  
      {/* Content */}
      <div className="relative overflow-hidden">
        <h3 className="text-accent-100 font-black text-4xl md:text-7xl mb-5 md:translate-x-[-254px] bg-primary-950 p-4 md:p-6 pb-1 w-full md:w-[150%]">
          Cabin {name}
        </h3>
  
        <p className="text-base md:text-lg text-primary-300 mb-6 md:mb-10">
          {description}
        </p>
  
        <ul className="flex flex-col gap-3 md:gap-4 mb-5 md:mb-7">
          {/* List items remain the same */}
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-base md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          {/* ... other list items ... */}
        </ul>
      </div>
    </div>
  
    {/* Reservation Section */}
    <div className="px-2 md:px-0">
      <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 md:mb-10 text-accent-400">
        Reserve today {name} . Pay on arrival.
      </h2>
  
      <Suspense fallback={<Spinner />}>
        <Reservation cabin={cabin} />
        <ReservationReminder/>
      </Suspense>
    </div>
  </div>
  );
}
