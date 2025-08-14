import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../Assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Blog", href: "/blog" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const maxScroll = 200;
  const bgOpacity = isHome ? Math.min(scrollY / maxScroll, 1) : 1;
  const useLightTheme = isHome && bgOpacity < 0.5;

  return (
    <header
      className={`top-0 z-50 transition-all duration-300 ${isHome
          ? scrollY < 1
            ? "absolute w-full"
            : "fixed w-full"
          : "sticky bg-white shadow-lg"
        }`}
    >
      {/* Background fade layer */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          backgroundColor: "white",
          opacity: bgOpacity,
        }}
      />

      {/* Navbar content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with text */}
          <Link to="/" className="flex items-center gap-3">
            {/* Logo - constant appearance */}
            <img
              src={logo}
              alt="Epic Adventure Camp Logo"
              className="h-12 w-auto"  // No dynamic classes
            />

            {/* Text - keeps scroll effects */}
            <div className="flex flex-col">
              <span className={`font-heading font-bold text-xl ${useLightTheme ? "text-white" : "text-epic-blue"
                }`}>
                EPIC YOUTH
              </span>
              <span className={`font-heading text-sm ${useLightTheme ? "text-white" : "text-slate-gray"
                }`}>
                SPORT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - KEEPS SCROLL EFFECTS */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-body font-medium transition-colors duration-200 ${isActive(item.href)
                    ? `${useLightTheme ? "text-white" : "text-epic-blue"
                    } border-b-2 border-epic-blue pb-1`
                    : `${useLightTheme ? "text-white/80 hover:text-white" : "text-slate-gray hover:text-epic-blue"
                    }`
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button - KEEPS SCROLL EFFECTS */}
          <div className="hidden md:block">
            <Link
              to="/programs"
              className={`px-6 py-2 rounded-lg font-heading font-semibold transition-colors duration-200 transform hover:scale-105 ${useLightTheme
                  ? "bg-white text-epic-blue hover:bg-gray-200"
                  : "bg-epic-blue text-white hover:bg-blue-700"
                }`}
            >
              Join Now
            </Link>
          </div>

          {/* Mobile menu button - KEEPS SCROLL EFFECTS */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${useLightTheme
                ? "text-white hover:text-gray-300"
                : "text-slate-gray hover:text-epic-blue"
              }`}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white relative z-10">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-body font-medium transition-colors duration-200 ${isActive(item.href)
                      ? "text-epic-blue font-semibold"
                      : "text-slate-gray hover:text-epic-blue"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/programs"
                className="bg-epic-blue text-white px-6 py-2 rounded-lg font-heading font-semibold hover:bg-blue-700 transition-colors duration-200 w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;