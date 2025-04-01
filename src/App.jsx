import { useState } from "react";
import NavbarComponent from "./components/navbar/NavbarComponent";
import Footer from './components/footer/FooterComponent';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavbarComponent />
      <div>
        <h1>Welcome to Groovo!</h1>
      </div>
      <Footer/>
    </>
  );
}

export default App;
