import TypeWriter from "@/components/TypeWriter";

export default function Home() {


  return (
    <div className="flex flex-col 
      justify-center items-center h-full
      font-[family-name:var(--font-geist-sans)]
    ">
      <main className="">
        <TypeWriter text={"Welcome to lques.com"}/> 
      </main>
    </div>
  );
}