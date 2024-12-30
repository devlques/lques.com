import Link from "next/link";
import Image from "next/image";

export default function Footer(){
 return (
        <footer className="flex justify-center gap-2">
          <Link 
            target="_blank"
            href="https://x.com/devlques">
            <Image
              src="x-social-media-round-icon.svg" 
              alt="social-media-logo-x"
              width="50"
              height="50"
            />
          </Link>
          <Link 
            target="_blank"
            href="https://github.com/devlques">
            <Image
              className="bg-white rounded-full ring-2 ring-black ring-inset"
              src="github-mark.svg" 
              alt="social-media-github-logo"
              width="50"
              height="50"
            />
          </Link>
      </footer>
  )
}
