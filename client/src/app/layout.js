import "@/styles/globals.css.js";
import { Noto_Sans_KR } from "next/font/google";
import Providers from "@/components/Providers";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "link",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={notoSansKr.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
