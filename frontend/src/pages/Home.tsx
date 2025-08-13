import { Link } from 'react-router-dom';
import { Star, Shield, Users, Trophy, ArrowRight, Play, CheckCircle } from 'lucide-react';
//import Heroimg from '../Assets/Hero.png';
import basketballimg from '../Assets/BasketballPlaying.jpg';
import volleyballimg from '../Assets/VolleyballPlaying.jpg';
import React, { useState, useEffect } from "react";


import HeroImg1 from '../Assets/Hero_Basketball.png';
import HeroImg2 from '../Assets/Hero_Basketball1.png';
import HeroImg3 from '../Assets/Hero_volleyball.png';
import HeroImg4 from '../Assets/Hero_volleyball1.png';


const Home = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ message: string, isError: boolean } | null>(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroImages = [
    HeroImg1,
    HeroImg2,
    HeroImg3,
    HeroImg4
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus({ message: "Sending...", isError: false });

    try {
      const res = await fetch("https://epicyouthsports.onrender.com/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ message: "Subscribed successfully! 🎉", isError: false });
        setEmail("");
      } else {
        setStatus({ message: data.error || "Failed to subscribe", isError: true });
      }
    } catch (err) {
      console.error(err);
      setStatus({ message: "Error connecting to server", isError: true });
    }
  };
  const testimonials = [
    {
      name: "Sarah Johnson",
      childAge: "Age 12, 7th Grade",
      text: "My daughter's confidence has skyrocketed since joining Epic Sports Academy. The coaches are amazing and really care about each child's development.",
      rating: 5
    },
    {
      name: "Mike Chen",
      childAge: "Age 10, 5th Grade",
      text: "Best investment we've made! My son went from barely dribbling to making his school team. The structured program really works.",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      childAge: "Age 9, 4th Grade",
      text: "The volleyball program is fantastic. My daughter learned proper technique and made great friends. Can't wait for the next session!",
      rating: 5
    }
  ];

  const whyChooseUs = [
    {
      icon: <Shield className="h-8 w-8 text-epic-blue" />,
      title: "Certified Coaches",
      description: "Our coaching team combines professional training with genuine enthusiasm for youth development"
    },
    {
      icon: <Users className="h-8 w-8 text-epic-blue" />,
      title: "Small Group Training",
      description: "With limited spots per session, every athlete gets the personalized coaching they deserve"
    },
    {
      icon: <Trophy className="h-8 w-8 text-epic-blue" />,
      title: "Proven Results",
      description: "Our curriculum is designed by experts to deliver measurable improvement at every level"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-epic-blue" />,
      title: "Safety First",
      description: "Comprehensive safety protocols, first aid trained staff, and age-appropriate equipment"
    }
  ];

  return (
    <div>
      {/* Updated Hero Section with slideshow */}
      <section className="relative text-white min-h-screen flex items-center overflow-hidden">
        {/* Background images container */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                width: '100%',
                height: '100%'
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 z-10 w-full">
          <div className="max-w-3xl">
            <div className="animate-fade-in">
              <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
                Where Young Athletes
                <span className="text-energy-yellow block mt-4">BECOME CHAMPIONS</span>
              </h1>
              <p className="font-body text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
                Professional basketball and volleyball training programs designed to build skills, confidence, and character in young athletes aged 8-16.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center bg-energy-yellow text-slate-gray px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105"
                >
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/programs"
                  className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-white hover:text-epic-blue transition-all duration-200"
                >
                  <Play className="mr-2 h-5 w-5" />
                  View Programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year-Round Program Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-slate-gray mb-4">
              Our <span className="text-epic-blue">Elite Programs</span>
            </h2>
            <p className="font-body text-lg text-light-gray max-w-3xl mx-auto">
              Choose from our professionally designed basketball and volleyball programs,
              each crafted to develop fundamental skills and competitive edge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Basketball Program */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={basketballimg}
                  alt="Kids playing basketball"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-alert-red text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce-gentle">
                  Limited Offer - Save $40!
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-slate-gray mb-3">
                  Basketball Excellence
                </h3>
                <p className="font-body text-light-gray mb-4 text-sm leading-relaxed">
                  Master dribbling, shooting, passing, and defensive skills through fun,
                  structured training sessions.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-heading font-bold text-epic-blue">
                    $209
                    <span className="text-base text-gray-500 line-through ml-2">$249</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">8 Sessions</div>
                    <div className="text-xs text-gray-600">Ages 8-16</div>
                  </div>
                </div>
                <Link
                  to="/program/basketball"
                  className="block w-full bg-epic-blue text-white text-center px-4 py-2 rounded-lg font-heading font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Volleyball Program */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img
                  src={volleyballimg}
                  alt="Kids playing volleyball"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-alert-red text-white px-2 py-1 rounded-full text-xs font-bold animate-bounce-gentle">
                  Limited Offer - Save $40!
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-xl text-slate-gray mb-3">
                  Volleyball Mastery
                </h3>
                <p className="font-body text-light-gray mb-4 text-sm leading-relaxed">
                  Learn proper serving, spiking, setting, and teamwork skills in a supportive
                  environment.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-heading font-bold text-epic-blue">
                    $209
                    <span className="text-base text-gray-500 line-through ml-2">$249</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">8 Sessions</div>
                    <div className="text-xs text-gray-600">Ages 8-16</div>
                  </div>
                </div>
                <Link
                  to="/program/volleyball"
                  className="block w-full bg-epic-blue text-white text-center px-4 py-2 rounded-lg font-heading font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Choose Epic Adventure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
              Why Parents Choose <span className="text-epic-blue">Epic Sports Academy</span>
            </h2>
            <p className="font-body text-xl text-light-gray max-w-3xl mx-auto">
              We're more than just a sports academy - we're a community dedicated to nurturing
              young athletes and building character that lasts a lifetime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-epic-blue group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-gray mb-4">{item.title}</h3>
                <p className="font-body text-light-gray leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Parents Are Saying */}
      <section className="py-20 bg-gradient-to-br from-epic-blue to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              What Parents Are Saying
            </h2>
            <p className="font-body text-xl text-gray-100 max-w-3xl mx-auto">
              Don't just take our word for it - hear from the families who have experienced
              the Epic Sports Academy difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white text-slate-gray rounded-2xl p-8 shadow-xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-energy-yellow fill-current" />
                  ))}
                </div>
                <p className="font-body text-light-gray mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <div className="font-heading font-bold text-slate-gray">{testimonial.name}</div>
                  <div className="font-body text-sm text-gray-600">{testimonial.childAge}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="home-subscribe" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
            Stay in the Game
          </h2>
          <p className="font-body text-xl text-light-gray mb-8 max-w-2xl mx-auto">
            Get exclusive updates, early access to new programs, special offers, and tips
            to help your young athlete succeed.
          </p>

          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent text-slate-gray"
                />
                <button
                  type="submit"
                  className="bg-epic-blue text-white px-8 py-4 rounded-lg font-heading font-bold hover:bg-blue-700 transition-colors duration-200 whitespace-nowrap"
                  disabled={status?.message === "Sending..."}
                >
                  {status?.message === "Sending..." ? "Sending..." : "Subscribe Now"}
                </button>
              </div>
              {status && (
                <p className={`mt-4 text-sm ${status.isError ? 'text-red-500' : 'text-green-600'}`}>
                  {status.message}
                </p>
              )}
              <p className="text-sm text-gray-600 mt-4">
                No spam, just the good stuff. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;