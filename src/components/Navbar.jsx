import logo from "../assets/hoodiny.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-black flex justify-between items-center px-6 py-2">
      <a href="/">
        <img src={logo} className="md:w-52 w-44" alt="hoodiny logo" />
      </a>

      <div className="flex space-x-16 sm:block hidden">
        <a href="/about" className="text-sm fontCol1 myFont">
          About us
        </a>
        <a href="/privacy" className="text-sm fontCol1 myFont">
          Privacy
        </a>
      </div>
    </div>
  );
};
export default Header;
