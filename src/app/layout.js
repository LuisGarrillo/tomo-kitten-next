import { monogram} from "@/app/ui/fonts";
import "./globals.css";
import Link from "next/link";
import Timer from "@/app/ui/components/timer"
import NavButton from "./ui/components/navButton";

export const metadata = {
  title: "Tomo Kitten",
  description: "Play with your kitten!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body
        className={`${monogram.className}`}
      >
        <nav>
            <NavButton
              propPage={"home"}
            />
            <NavButton
              propPage={"play"}
            />
            <NavButton
              propPage={"feed"}
            />
            <NavButton
              propPage={"customize"}
            />
            <NavButton
              propPage={"cementery"}
            />
        </nav>
        <main>
          {children}
        <footer>
          <Link href="">Sobre Nosotros</Link>
        </footer>
        </main>
      </body>
    </html>
  );
}


