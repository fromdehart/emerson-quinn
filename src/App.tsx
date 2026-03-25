import { useEffect } from "react";
import { ConvexProvider } from "convex/react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { convex } from "./lib/convexClient";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import BeforeWeMeet from "./pages/BeforeWeMeet";

function HashScroll() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.pathname, location.hash]);
  return null;
}

const App = () => {
  return (
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <HashScroll />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/before-we-meet" element={<BeforeWeMeet />} />
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
  );
};

export default App;
