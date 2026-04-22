import { NavLink } from "react-router-dom";
import assets from "../assets/Hajjima.png";
import Button from "./Button";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Articles", to: "/articles" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] transition",
    isActive
      ? "border-orange-600 bg-orange-600 text-white"
      : "border-transparent text-zinc-400 hover:border-orange-600 hover:text-white",
  ].join(" ");

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-orange-600 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="h-16 w-40 rounded-full border-2 border-orange-600 bg-zinc-900 overflow-hidden">
            <img
              src={assets}
              alt="Logo"
              className="w-full h-full object-contain scale-125"
            />
          </div>
        </NavLink>

        <nav className="flex items-center gap-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClassName}>
              {link.label}
            </NavLink>
          ))}
          
          <div className="mx-2 h-6 w-[2px] bg-zinc-800" />
        </nav>
      </div>
    </header>
  );
};

export default NavBar;