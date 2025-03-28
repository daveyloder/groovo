import { useState } from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";
import Footer from "./components/footer/FooterComponent";

function App() {
  return (
    <>
      <NavbarComponent />

      <div>
        <h1>Welcome to Groovo!</h1>
      </div>

      <Footer />
    </>
  );
}

export default App;
