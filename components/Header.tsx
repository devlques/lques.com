import Link from "next/link";
import NavLink from "./NavLink";

export default function Header(){
  return (
    <div className="">
      <div className="bg-transparent flex flex-row justify-between mx-4 py-4">
       <div className="">
        <Link href="/" className="">lques.com</Link>
      </div>
       <div className="flex gap-4"> 
          {/*<NavLink path="/projects" name="Projects"/> */}
          <NavLink path="/contact" name="Contact"/>
          <NavLink path="/career" name="Career"/>
       </div>
    </div>
    </div>
  )
}

