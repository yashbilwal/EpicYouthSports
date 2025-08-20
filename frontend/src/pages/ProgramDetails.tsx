import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, Star, ArrowRight, CheckCircle } from 'lucide-react';

const ProgramDetails = () => {
  const { type } = useParams();
  
  const programData = {
    basketball: {
      title: 'Basketball Excellence Program',
      //image: 'https://images.pexels.com/photos/2834009/pexels-photo-2834009.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Our comprehensive basketball program focuses on developing fundamental skills while building confidence and character. Perfect for beginners to intermediate players who want to take their game to the next level.',
      sessions: [
        'Week 1-2: Ball Handling & Dribbling Fundamentals',
        'Week 3-4: Shooting Form & Accuracy Training',
        'Week 5-6: Passing, Catching & Court Vision',
        'Week 7-8: Defense, Positioning & Game Situations'
      ],
      schedule: [
        { day: 'Every Saturday', time: '5:00 PM - 6:30 PM', dates: 'Sep 2, 2025 - Oct 21, 2025', ageGroup: '8-12' },
        { day: 'Every Saturday', time: '6:30 PM - 8:00 PM', dates: 'Sep 2, 2025 - Oct 21, 2025', ageGroup: '13-16' }
      ],
      requirements: [
        'Ages 8-16 (grouped by age/skill level)',
        'Basketball shoes with good ankle support',
        'Comfortable athletic clothing',
        'Water bottle and towel',
        'Positive attitude and willingness to learn!'
      ]
    },
    volleyball: {
      title: 'Volleyball Mastery Program',
      image: 'https://images.pexels.com/photos/8654092/pexels-photo-8654092.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: 'Our volleyball program teaches essential skills through progressive training and fun team activities. Students learn proper techniques while developing teamwork, communication, and competitive spirit.',
      sessions: [
        'Week 1-2: Serving Techniques & Ball Control',
        'Week 3-4: Passing & Setting Fundamentals',
        'Week 5-6: Spiking & Net Play Skills',
        'Week 7-8: Team Strategy & Game Play'
      ],
      schedule: [
        { day: 'Every Monday', time: '5:00 PM - 6:30 PM', dates: 'Sep 2, 2025 - Oct 21, 2025', ageGroup: '8-12' },
        { day: 'Every Monday', time: '6:30 PM - 8:00 PM', dates: 'Sep 1, 2025 - Oct 20, 2025', ageGroup: '13-16' }
      ],
      requirements: [
        'Ages 8-16 (grouped by age/skill level)',
        'Court shoes with good grip',
        'Knee pads (recommended)',
        'Comfortable athletic clothing',
        'Water bottle and towel',
        'Enthusiasm for teamwork!'
      ]
    }
  };

  const program = programData[type as keyof typeof programData];

  if (!program) {
    return <div>Program not found</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-epic-blue to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        {/* <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${program.image}')` }}
        ></div> */}
        <div className="absolute inset-0 bg-gradient-to-r from-epic-blue/90 to-epic-blue/70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <div className="bg-alert-red text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-6 animate-bounce-gentle">
              Limited Offer - Save $40!
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              {program.title}
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
              {program.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to={`/register/${type}`}
                className="inline-flex items-center justify-center bg-energy-yellow text-slate-gray px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105"
              >
                Register Now - Only $49 Deposit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-white hover:text-epic-blue transition-all duration-200"
              >
                Ask Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="font-heading font-bold text-4xl text-slate-gray mb-8">
                8-Session Training Agenda
              </h2>
              <div className="space-y-6">
                {program.sessions.map((session, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start space-x-4">
                      <div className="bg-epic-blue text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-xl text-slate-gray mb-2">
                          {session.split(':')[0]}
                        </h3>
                        <p className="font-body text-light-gray">
                          {session.split(':')[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="font-heading font-bold text-4xl text-slate-gray mb-8">
                  What to Bring
                </h2>
                <div className="bg-gradient-to-br from-epic-blue to-blue-800 text-white rounded-2xl p-8">
                  <ul className="space-y-4">
                    {program.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-energy-yellow flex-shrink-0 mt-1" />
                        <span className="font-body text-lg">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-8 sticky top-24">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="font-heading font-bold text-4xl text-epic-blue">$209</span>
                    <span className="font-body text-xl text-gray-500 line-through">$249</span>
                  </div>
                  <div className="bg-alert-red text-white px-4 py-2 rounded-full text-sm font-bold inline-block">
                    Save $40 - Limited Time
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center space-x-3 text-slate-gray">
                    <Clock className="h-5 w-5 text-epic-blue" />
                    <span className="font-body">8 Training Sessions</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-gray">
                    <Users className="h-5 w-5 text-epic-blue" />
                    <span className="font-body">20-24 Kids per Group</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-gray">
                    <Star className="h-5 w-5 text-epic-blue" />
                    <span className="font-body">Ages 8-16</span>
                  </div>
                  <div className="flex items-center space-x-3 text-slate-gray">
                    <MapPin className="h-5 w-5 text-epic-blue" />
                    <span className="font-body">Epic Youth Sports</span>
                  </div>
                </div>

                <Link
                  to={`/register/${type}`}
                  className="block w-full bg-epic-blue text-white text-center px-6 py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-colors duration-200 mb-4"
                >
                  Register Now
                </Link>

                <div className="text-center">
                  <p className="font-body text-sm text-light-gray mb-2">
                    Secure your spot with just $49 deposit
                  </p>
                  <p className="font-body text-xs text-gray-500">
                    Remaining $160 due on first day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
              Upcoming Session Dates
            </h2>
            <p className="font-body text-xl text-light-gray max-w-3xl mx-auto">
              Choose the schedule that works best for your family. All sessions cover the same comprehensive curriculum.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {program.schedule.map((schedule, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="font-heading font-bold text-2xl text-slate-gray mb-4">
                    {schedule.day}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center space-x-2 text-epic-blue">
                      <Clock className="h-5 w-5" />
                      <span className="font-body font-semibold">{schedule.time}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-slate-gray">
                      <Calendar className="h-5 w-5" />
                      <span className="font-body">{schedule.dates}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-slate-gray">
                      <Users className="h-5 w-5" /> {/* Assuming you have a Users icon */}
                      <span className="font-body">Ages: {schedule.ageGroup}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/register/${type}?schedule=${index}`}
                    className="block w-full bg-epic-blue text-white text-center px-6 py-3 rounded-lg font-heading font-semibold hover:bg-blue-700 transition-colors duration-200"
                  >
                    Select This Schedule
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetails;