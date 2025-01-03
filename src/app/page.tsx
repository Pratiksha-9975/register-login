import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-2 row-start-2 items-center sm:items-start">
        <h1>Register Page</h1>
        <button className="text-xl border border-black p-2 rounded-md hover:bg-white hover:text-black">
          {" "}
          <a href="/register">Go to register page </a>{" "}
        </button>
       
      </main>
    </div>
  );

}
