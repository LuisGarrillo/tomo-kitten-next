import { monogram} from "@/app/ui/fonts";
import "./globals.css";
import Link from "next/link";
import Timer from "@/app/ui/components/timer"

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
            <Link href="/"> Inicio </Link>
            <Link href="/play"> Jugar </Link>
            <Link href="/feed"> Alimentar </Link>
            <Link href="/customize"> Personalizar </Link>
            <Link href="/cementery"> Cementerio </Link>
        </nav>
        <main>
          <Timer/>
          {children}
        <footer>
          <Link href="">Sobre Nosotros</Link>
        </footer>
        </main>
      </body>
    </html>
  );
}


