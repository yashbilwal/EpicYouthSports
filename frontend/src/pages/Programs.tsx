import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, MapPin, Star, ArrowRight } from 'lucide-react';
import basketballimg from '../Assets/BasketballPlaying.jpg';
import volleyballimg from '../Assets/VolleyballPlaying.jpg';

const Programs = () => {
  const programs = [
    {
      type: 'basketball',
      title: 'Basketball Excellence Program',
      image: basketballimg,
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
      image: volleyballimg,
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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-epic-blue to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Our <span className="text-energy-yellow">Training Programs</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Choose from our expertly designed basketball and volleyball programs.
              Each program is structured to build skills progressively while keeping training fun and engaging.
            </p>
          </div>
        </div>
      </section>

      {/* Limited Offer Banner */}
      <section className="bg-alert-red text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-heading font-bold text-lg">
              🔥 LIMITED TIME OFFER: Save $40 on All Programs - Only $209 for 8 Sessions! 🔥
            </p>
            <p className="font-body text-sm mt-1">Offer valid until September 30th, 2025</p>
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-6 right-6 bg-alert-red text-white px-4 py-2 rounded-full font-bold animate-bounce-gentle">
                    Save $40!
                  </div>
                  <div className="absolute bottom-6 left-6 bg-black/70 text-white px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {program.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {program.groupSize}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-heading font-bold text-3xl text-slate-gray mb-4">
                    {program.title}
                  </h3>

                  <p className="font-body text-light-gray mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-heading font-semibold text-lg text-slate-gray mb-3">What Your Child Will Learn:</h4>
                    <ul className="space-y-2">
                      {program.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center text-sm text-light-gray">
                          <Star className="h-4 w-4 text-energy-yellow mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-heading font-bold text-2xl text-epic-blue">{program.ageRange}</div>
                        <div className="text-sm text-gray-600">Age Range</div>
                      </div>
                      <div>
                        <div className="font-heading font-bold text-2xl text-epic-blue">{program.groupSize}</div>
                        <div className="text-sm text-gray-600">Group Size</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-bold text-4xl text-epic-blue">${program.price}</span>
                        <span className="font-body text-lg text-gray-500 line-through">${program.originalPrice}</span>
                      </div>
                      <div className="text-sm text-gray-600">for 8 training sessions</div>
                    </div>
                    <div className="text-right">
                      <div className="bg-energy-yellow text-slate-gray px-3 py-1 rounded-full text-sm font-bold">
                        16% OFF
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      to={`/program/${program.type}`}
                      className="block w-full bg-epic-blue text-white text-center px-6 py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Learn More & See Schedule
                    </Link>
                    <Link
                      to={`/register/${program.type}`}
                      className="block w-full border-2 border-epic-blue text-epic-blue text-center px-6 py-4 rounded-lg font-heading font-bold text-lg hover:bg-epic-blue hover:text-white transition-all duration-200"
                    >
                      Register Now - Pay Only $49 Deposit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-epic-blue to-blue-800 text-white rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Simple & Flexible Payment Process
              </h2>
              <p className="font-body text-xl text-gray-100">
                We make it easy to secure your child's spot with our convenient payment options.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-heading font-bold text-2xl mb-4 text-energy-yellow">
                  Step 1: Secure Your Spot
                </h3>
                <ul className="space-y-3 text-gray-100">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-energy-yellow" />
                    Pay only $49 deposit online
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-energy-yellow" />
                    Secure payment via Stripe
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-energy-yellow" />
                    Instant confirmation email
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="font-heading font-bold text-2xl mb-4 text-energy-yellow">
                  Step 2: Complete Payment
                </h3>
                <ul className="space-y-3 text-gray-100">
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-energy-yellow" />
                    Pay remaining $160 on first day
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-energy-yellow" />
                    Cash, check, or card accepted
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-energy-yellow" />
                    No additional fees
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8 p-6 bg-white/10 rounded-xl">
              <p className="font-body text-gray-100 mb-2">
                <strong>Total Program Cost:</strong> $209 (Save $40 from regular $249 price)
              </p>
              <p className="font-body text-sm text-gray-200">
                Small processing fee applies to online deposit (approximately 2.9% + $0.30)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-body text-xl text-light-gray mb-8 max-w-2xl mx-auto">
            Limited spots available for our next session. Secure your child's place today
            and watch them develop skills, confidence, and a love for the game.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-epic-blue text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <MapPin className="mr-2 h-5 w-5" />
              Visit Our Facility
            </Link>
            <Link
              to="/faqs"
              className="inline-flex items-center justify-center border-2 border-epic-blue text-epic-blue px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-epic-blue hover:text-white transition-all duration-200"
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