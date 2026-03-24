import { ConvexProvider } from "convex/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { convex } from "./lib/convexClient";
import Index from "./pages/Index";
import BeforeWeMeet from "./pages/BeforeWeMeet";

const App = () => {
  return (
    <ConvexProvider client={convex}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/before-we-meet" element={<BeforeWeMeet />} />
        </Routes>
      </BrowserRouter>
    </ConvexProvider>
  );
};

export default App;
