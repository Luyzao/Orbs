import type { AppProps } from "next/app";
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../src/styles/globals.css";
import { Sidebar } from "lucide-react";
import { Card } from 'primereact/card';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="flex">
        <Card /> 
      </div>
    </>
  );
}

export default MyApp;
