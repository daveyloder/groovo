import { useState } from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";
import Header from "./components/headers/HeaderComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarComponent />

      <Header />
    </>
  );
}

export default App;
