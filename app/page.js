
import Link from 'next/link';
import Image from 'next/image';
import bg from '@/public/bg.png';
import "@/app/_styles/globals.css";

export default function Home() {
  return (
    <main className='mt-24'>
      <Image
        src={bg}
        fill
        placeholder='blur'
        quality={80}
        className='object-cover object-top'
        alt='Mountains and forests with two cabins'
      />
      <div className='relative z-10 text-center'>
        <h1 className='lg:text-8xl md:text-2xl sm:text-xl text-primary-50 mb-10 tracking-tight font-normal'>
          Welcome to another world.
        </h1>
        <Link
          href='/cabins'
          className='bg-accent-500 px-4  md:px-8  py-3  md:py-6 text-primary-800 sm:text-sm  md:text-lg  font-semibold hover:bg-accent-600 transition-all'
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}