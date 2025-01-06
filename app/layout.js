
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import "@/app/_styles/globals.css"
import { ReservationProvider } from "@/app/_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});


export const metadata = {
  // title: "Hotel ",
  title : {
    template : "%s | Cabins Hotel ",
    default : "Welcome | Cabins Hotel"
  },
  
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={ ` ${josefin.className} bg-primary-950  text-purple-100  min-h-screen flex flex-col `} >

       
        <Header/>

        <div className="flex-1 px-8 py-12 grid">

        <main className="max-w-7xl mx-auto w-full" >
          <ReservationProvider>

          { children }

          </ReservationProvider>

        </main>

        </div>

{/* 
        <footer>Created By Odai AlAlwan</footer> */}
      </body>
    </html>
  );
}
