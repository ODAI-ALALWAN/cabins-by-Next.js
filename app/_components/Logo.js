import Image from "next/image";
import Link from "next/link";
import imgLogo from "@/public/logo.png"

export default function Logo() {
  return (
    <Link href='/'className='flex items-center gap-4 z-10' >
        <Image  src={imgLogo} alt='logo App' style={{ width : "60px" , height : "60px" , borderRadius : "50%" }}/>
        <span className='text-xl font-semibold text-primary-100'>
        Cabins Hotel
      </span>
    </Link>
  )
}

