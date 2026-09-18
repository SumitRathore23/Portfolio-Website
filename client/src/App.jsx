import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";

import "./App.css";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";


function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
     <AnimatePresence>
  {loading && (
    <Loader onComplete={() => setLoading(false)} />
  )}
</AnimatePresence>

{!loading && (
  <>
    <CustomCursor />

    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Education />
        <Contact />
      </main>

      <Footer />
    </div>
  </>
)}
    </>
  );
}

export default App;