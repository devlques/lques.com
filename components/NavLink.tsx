import Link from "next/link";

type NavLinkProps = {
  name: string;
  path: string;
}

export default function NavLink({name, path}:NavLinkProps){

  return(
    <Link href={path}
      className="bg-white text-black font-bold rounded-full px-4 py-2 border
      hover:bg-black hover:text-white hover:border-white
      hover:outline hover:outline-offset-2 hover:outline-white"
    >
      {name}
    </Link>)
}
