import type { AppProps } from "next/app";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../src/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="bg-purple-300">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
