import { Link } from 'react-router-dom';
import { Target, Heart, Users, Award, ArrowRight } from 'lucide-react';
import ourmissionImage from '../Assets/about_coach1.jpg';


const About = () => {
  const coreValues = [
    {
      icon: <Target className="h-8 w-8 text-epic-blue" />,
      title: "Growth",
      description: "Every child progresses at their own pace. We celebrate small wins and build on them to achieve bigger goals."
    },
    {
      icon: <Users className="h-8 w-8 text-epic-blue" />,
      title: "Teamwork",
      description: "Sports teach collaboration, communication, and supporting teammates - skills that extend far beyond the court."
    },
    {
      icon: <Heart className="h-8 w-8 text-epic-blue" />,
      title: "Fun",
      description: "Learning happens best when kids are engaged and enjoying themselves. We make every session exciting and memorable."
    },
    {
      icon: <Award className="h-8 w-8 text-epic-blue" />,
      title: "Discipline",
      description: "Building habits of practice, persistence, and dedication that create champions in sports and life."
    }
  ];

  const teamMembers = [
    // {
    //   name: "Nirav Shukla",
    //   role: "Founder",
    //   image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
    //   bio: "Former college basketball player with 15+ years coaching youth sports. Passionate about developing both athletic skills and character in young athletes."
    // },
    // {
    //   name: "Coach Sarah Thompson",
    //   role: "Volleyball Program Director",
    //   image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
    //   bio: "NCAA Division I volleyball champion and certified youth coach. Specializes in fundamental skills and building confidence in young players."
    // },
    // {
    //   name: "Coach James Wilson",
    //   role: "Basketball Skills Specialist",
    //   image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400",
    //   bio: "Professional basketball trainer with expertise in player development. Known for his patient approach and ability to connect with kids of all skill levels."
    // },
    // {
    //   name: "Coach Emily Chen",
    //   role: "Youth Development Coordinator",
    //   image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400",
    //   bio: "Child development specialist and certified coach. Focuses on age-appropriate training methods and creating positive sports experiences."
    // }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-epic-blue to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              About <span className="text-energy-yellow">Epic Youth Sports</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              We're passionate about nurturing the next generation of athletes through
              professional training, character development, and a love for the game.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">
            <div>
              <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-6">
                Our Mission
              </h2>
              <p className="font-body text-xl text-light-gray mb-6 leading-relaxed">
                At Epic Youth Sports, we believe every child has the potential to achieve greatness.
                Our mission is to unlock that potential through expert coaching, structured training,
                and a supportive environment that builds both athletic skills and life skills.
              </p>
              <p className="font-body text-lg text-light-gray mb-8 leading-relaxed">
                We're not just teaching kids how to play basketball and volleyball - we're helping
                them develop confidence, discipline, teamwork, and resilience that will serve them
                throughout their lives.
              </p>
              <Link
                to="/programs"
                className="inline-flex items-center bg-epic-blue text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Explore Our Programs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="relative">
              <img
                src={ourmissionImage}
                alt="Kids training at Epic Youth Sports"
                className="rounded-2xl shadow-2xl"
              />
              {/* <div className="absolute -bottom-6 -left-6 bg-energy-yellow text-slate-gray p-6 rounded-xl shadow-lg">
                <div className="font-heading font-bold text-3xl">500+</div>
                <div className="font-body text-sm">Kids Trained</div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
              Our Core Values
            </h2>
            <p className="font-body text-xl text-light-gray max-w-3xl mx-auto">
              These values guide everything we do and shape the character we help build in every young athlete.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="font-heading font-bold text-2xl text-slate-gray mb-4">{value.title}</h3>
                <p className="font-body text-light-gray leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
              Meet Our <span className="text-epic-blue">Expert Team</span>
            </h2>
            <p className="font-body text-xl text-light-gray max-w-3xl mx-auto">
              Our certified coaches bring years of experience and genuine passion for youth development.
              Each coach is dedicated to helping your child reach their full potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-slate-gray mb-2">{member.name}</h3>
                  <p className="font-body font-semibold text-epic-blue mb-4">{member.role}</p>
                  <p className="font-body text-sm text-light-gray leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to Join Section */}
      <section className="py-20 bg-gradient-to-br from-epic-blue to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Ready to Start Your Child's Epic Journey?
          </h2>
          <p className="font-body text-xl text-gray-100 mb-8 leading-relaxed">
            Join hundreds of families who have trusted us to help their children grow through sports.
            Limited spots available for our next session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/programs"
              className="inline-flex items-center justify-center bg-energy-yellow text-slate-gray px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-yellow-500 transition-all duration-200 transform hover:scale-105"
            >
              View Programs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/#home-subscribe" // Links to Home page with hash
              className="inline-flex items-center bg-epic-blue text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Subscribe Now for Updates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
