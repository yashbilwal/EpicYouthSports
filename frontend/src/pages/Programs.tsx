import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, MapPin, Star, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const Programs = () => {
  const [expandedProgram, setExpandedProgram] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const programs = [
    {
      type: 'basketball',
      title: 'Basketball Excellence Program',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Master fundamental basketball skills including dribbling, shooting, passing, and defensive techniques through structured, fun training sessions.',
      price: 209,
      originalPrice: 249,
      duration: '8 Sessions',
      groupSize: '20-24 kids',
      ageRange: 'Ages 8-16',
      highlights: [
        'Proper shooting form and technique',
        'Ball handling and dribbling skills',
        'Defensive positioning and movement',
        'Teamwork and game strategy',
        'Physical fitness and conditioning'
      ]
    },
    {
      type: 'volleyball',
      title: 'Volleyball Mastery Program',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Learn essential volleyball skills including serving, spiking, setting, and teamwork in a supportive and encouraging environment.',
      price: 209,
      originalPrice: 249,
      duration: '8 Sessions',
      groupSize: '20-24 kids',
      ageRange: 'Ages 8-16',
      highlights: [
        'Proper serving techniques',
        'Spiking and attacking skills',
        'Setting and passing fundamentals',
        'Court positioning and movement',
        'Team communication and strategy'
      ]
    }
  ];

  const toggleProgram = (index) => {
    setExpandedProgram(expandedProgram === index ? null : index);
  };

  const toggleSection = (programIndex, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [`${programIndex}-${section}`]: !prev[`${programIndex}-${section}`]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-yellow-400">Training Programs</span>
            </h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Choose from our expertly designed basketball and volleyball programs.
              Each program is structured to build skills progressively while keeping training fun and engaging.
            </p>
          </div>
        </div>
      </section>

      {/* Limited Offer Banner */}
      <section className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-bold text-sm md:text-base">
            🔥 LIMITED TIME OFFER: Save $40 on All Programs - Only $209 for 8 Sessions! 🔥
          </p>
          <p className="text-xs mt-1">Offer valid until September 30th, 2025</p>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Save $40!
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-xs">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {program.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {program.groupSize}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {program.title}
                  </h3>

                  <p className="text-gray-600 mb-4">
                    {program.description}
                  </p>

                  {/* Expandable highlights section for mobile */}
                  <div className="mb-4">
                    <button 
                      onClick={() => toggleSection(index, 'highlights')}
                      className="flex items-center justify-between w-full font-semibold text-gray-800 mb-2 text-left"
                    >
                      <span>What Your Child Will Learn</span>
                      {expandedSections[`${index}-highlights`] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${expandedSections[`${index}-highlights`] ? 'max-h-96' : 'max-h-0'}`}>
                      <ul className="space-y-2 pl-2">
                        {program.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <Star className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-bold text-blue-700">{program.ageRange}</div>
                        <div className="text-xs text-gray-600">Age Range</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-700">{program.groupSize}</div>
                        <div className="text-xs text-gray-600">Group Size</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-2xl text-blue-700">${program.price}</span>
                        <span className="text-gray-500 line-through">${program.originalPrice}</span>
                      </div>
                      <div className="text-xs text-gray-600">for 8 training sessions</div>
                    </div>
                    <div className="text-right">
                      <div className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                        16% OFF
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      to={`/program/${program.type}`}
                      className="block w-full bg-blue-700 text-white text-center px-4 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors"
                    >
                      Learn More & See Schedule
                    </Link>
                    <Link
                      to={`/register/${program.type}`}
                      className="block w-full border-2 border-blue-700 text-blue-700 text-center px-4 py-3 rounded-lg font-bold hover:bg-blue-700 hover:text-white transition-all"
                    >
                      Register Now - $49 Deposit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl p-6 md:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-3">
                Simple & Flexible Payment Process
              </h2>
              <p className="text-blue-100">
                We make it easy to secure your child's spot with our convenient payment options.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 text-yellow-400">
                  Step 1: Secure Your Spot
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Pay only $49 deposit online
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Secure payment via Stripe
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Instant confirmation email
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="font-bold text-lg mb-3 text-yellow-400">
                  Step 2: Complete Payment
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Pay remaining $160 on first day
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Cash, check, or card accepted
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    No additional fees
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-sm mb-2">
                <strong>Total Program Cost:</strong> $209 (Save $40 from regular $249 price)
              </p>
              <p className="text-xs text-blue-200">
                Small processing fee applies to online deposit (approximately 2.9% + $0.30)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Limited spots available for our next session. Secure your child's place today
            and watch them develop skills, confidence, and a love for the game.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-blue-700 text-white px-5 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Visit Our Facility
            </Link>
            <Link
              to="/faqs"
              className="inline-flex items-center justify-center border-2 border-blue-700 text-blue-700 px-5 py-3 rounded-lg font-bold hover:bg-blue-700 hover:text-white transition-all"
            >
              Have Questions? Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;