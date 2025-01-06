import { auth } from "../_lib/auth";

export const metadata = {
  title: "Gust area ",
};


export default async function Page() {

    const session  = await auth()

    const firstName = session.user.name.split(" ").at(0)



    return (
      <div className="">
        <h1 className="text-accent-500 text-xl" > Welcome {firstName}  </h1>
      </div>
    );
  }
  