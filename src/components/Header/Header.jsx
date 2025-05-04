import { useEffect, useState } from "react";
import "./Header.css";
import Logo from "../../assets/furia_logo.png";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <img src={Logo} alt="Furia Logo" />
      <h1>GO FURIA</h1>
    </header>
  );
};

export default Header;
