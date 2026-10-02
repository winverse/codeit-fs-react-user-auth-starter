"use client";

import ToasterProvider from "@/contexts/ToasterProvider";

function Providers({ children }) {
  return <ToasterProvider>{children}</ToasterProvider>;
}

export default Providers;
