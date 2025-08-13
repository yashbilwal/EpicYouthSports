import { useRef } from "react";
import { Link } from "react-router-dom";
import { Activity, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubscribe = async () => {
    if (!emailRef.current) return;
    const email = emailRef.current.value.trim();
    if (!email) {
      alert("Please enter a valid email");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert("Subscribed successfully! 🎉");
        emailRef.current.value = "";
      } else {
        alert("Subscription failed ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server ❌");
    }
  };

  return (
    <footer className="bg-slate-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-epic-blue p-2 rounded-lg">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg text-white">EPIC SPORTS</span>
                <span className="font-heading text-sm text-gray-300">ACADEMY</span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering young athletes through professional basketball and volleyball training.
              Building skills, character, and confidence one game at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/about" className="text-gray-300 hover:text-energy-yellow transition-colors duration-200">About Us</Link>
              <Link to="/programs" className="text-gray-300 hover:text-energy-yellow transition-colors duration-200">Programs</Link>
              <Link to="/blog" className="text-gray-300 hover:text-energy-yellow transition-colors duration-200">Blog</Link>
              <Link to="/faqs" className="text-gray-300 hover:text-energy-yellow transition-colors duration-200">FAQs</Link>
              <Link to="/contact" className="text-gray-300 hover:text-energy-yellow transition-colors duration-200">Contact</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-energy-yellow" />
                <span className="text-gray-300 text-sm">+1 516 729 1403</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-energy-yellow" />
                <span className="text-gray-300 text-sm">info@epicsportsacademy.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-energy-yellow mt-1" />
                <a
                  href="https://maps.app.goo.gl/7G2sK2ooFVhFHu6i7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm"
                >
                  SportsPlex at Metuchen, <br />
                  215 Durham Avenue, Metuchen, <br />
                  NJ, 08840, United States
                </a>
              </div>
            </div>
          </div>

          {/* Social Media and Subscribe */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-epic-blue p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-epic-blue p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-epic-blue p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div>
              <h4 className="font-body font-semibold text-sm mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm mb-3">Get news, offers, and session updates</p>
              <div className="flex">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-white text-slate-gray rounded-l-lg focus:outline-none focus:ring-2 focus:ring-energy-yellow"
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-energy-yellow text-slate-gray px-4 py-2 text-sm font-semibold rounded-r-lg hover:bg-yellow-500 transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Epic Sports Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-energy-yellow text-sm transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-energy-yellow text-sm transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-400 hover:text-energy-yellow text-sm transition-colors duration-200">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
