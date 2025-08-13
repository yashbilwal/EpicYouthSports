import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqData = [
    {
      category: "Program Information",
      questions: [
        {
          question: "What ages do you accept for your programs?",
          answer: "Our programs are designed for children ages 8-16. We group kids by age and skill level to ensure everyone gets the most out of their training experience. Younger children (8-10) focus more on fundamental skills and fun, while older kids (11-16) work on advanced techniques and competitive strategies."
        },
        {
          question: "How many kids are in each training session?",
          answer: "We keep our groups small with a maximum of 12 kids per session. This ensures each child gets personalized attention from our certified coaches and allows for better skill development. Most sessions have 8-10 participants, creating an ideal learning environment."
        },
        {
          question: "What's included in the 8-session program?",
          answer: "Each 8-session program includes professional coaching, skill development curriculum, all necessary equipment during training, progress tracking, and a final skills assessment. You'll also receive training tips to practice at home and access to our parent resource portal."
        },
        {
          question: "Do you provide equipment or should we bring our own?",
          answer: "We provide all basketballs, volleyballs, and training equipment during sessions. Your child should bring appropriate athletic shoes, comfortable clothing, a water bottle, and a towel. For volleyball, knee pads are recommended but not required."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "How does the payment process work?",
          answer: "Our total program cost is $209 (reduced from $249 for a limited time). You pay just $49 online to secure your child's spot, plus a small Stripe processing fee (approximately 2.9% + $0.30). The remaining $160 is due on the first day of the program and can be paid by cash, check, or card."
        },
        {
          question: "Is the $49 deposit refundable?",
          answer: "Yes! You can receive a full refund of your deposit if you cancel at least 48 hours before the program start date. Cancellations made less than 48 hours before the start date are non-refundable, but you can transfer to a future session."
        },
        {
          question: "Are there any additional fees?",
          answer: "No hidden fees! The only additional cost is the small Stripe processing fee on your online deposit (about $1.50-$2.00). The remaining $160 payment on the first day has no additional fees regardless of payment method."
        },
        {
          question: "Do you offer sibling discounts?",
          answer: "Yes! We offer a 10% discount on the second child when registering siblings for the same session. Contact us directly to apply this discount to your registration."
        }
      ]
    },
    {
      category: "Safety & Policies",
      questions: [
        {
          question: "What safety measures do you have in place?",
          answer: "Safety is our top priority. All coaches are certified in first aid and CPR, we maintain low student-to-coach ratios, use age-appropriate equipment, conduct safety briefings, and require emergency contact information. Our facility is regularly inspected and meets all safety standards."
        },
        {
          question: "What happens if my child gets injured during training?",
          answer: "While we take every precaution to prevent injuries, minor bumps and scrapes can happen in sports. Our coaches are first aid certified and will provide immediate care. For any injury requiring medical attention, we'll contact you immediately and call emergency services if needed."
        },
        {
          question: "Can parents watch the training sessions?",
          answer: "Absolutely! We encourage parents to watch from our designated viewing area. However, we ask that you allow our coaches to lead the instruction without sideline coaching, as this can be confusing for young athletes."
        },
        {
          question: "What is your weather/cancellation policy?",
          answer: "Our indoor facility means weather rarely affects our programs. In rare cases where we must cancel (facility issues, coach illness), we'll notify you immediately and make up the session at the end of the program or offer a prorated refund."
        }
      ]
    },
    {
      category: "Getting Started",
      questions: [
        {
          question: "My child has never played before. Is that okay?",
          answer: "Absolutely! Our programs welcome complete beginners. We start with basic fundamentals and build skills progressively. Many of our most successful graduates started with zero experience. Our coaches are experts at making beginners feel comfortable and confident."
        },
        {
          question: "How do I know which schedule to choose?",
          answer: "All schedule options cover the same comprehensive curriculum. Choose based on what works best for your family's schedule. Weekday sessions (Mon/Wed or Tue/Thu) are popular with families who prefer consistent weekday routines, while Saturday sessions work well for busy weekday schedules."
        },
        {
          question: "What should my child expect on the first day?",
          answer: "The first session includes introductions, a fun warm-up activity, basic skill assessment, and an overview of what we'll cover in the program. We keep it light and fun to help everyone feel comfortable. Please arrive 10 minutes early to complete any final paperwork."
        },
        {
          question: "How can I track my child's progress?",
          answer: "We provide regular progress updates and a final skills assessment. Parents receive a progress report after week 4 and a comprehensive evaluation at the end of the program, including areas of improvement and recommendations for continued development."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const faqIndex = categoryIndex * 100 + questionIndex;
    setOpenFAQ(openFAQ === faqIndex ? null : faqIndex);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-epic-blue to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-energy-yellow rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-10 w-10 text-slate-gray" />
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Frequently Asked <span className="text-energy-yellow">Questions</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Find answers to common questions about our programs, pricing, safety measures,
              and what to expect at Epic Sports Academy.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="font-heading font-bold text-3xl text-slate-gray mb-8 text-center lg:text-left">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const faqIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openFAQ === faqIndex;

                  return (
                    <div key={questionIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h3 className="font-heading font-semibold text-lg text-slate-gray pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="h-6 w-6 text-epic-blue" />
                          ) : (
                            <ChevronDown className="h-6 w-6 text-epic-blue" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-8 pb-6">
                          <div className="border-t border-gray-200 pt-6">
                            <p className="font-body text-light-gray leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-6">
            Still Have Questions?
          </h2>
          <p className="font-body text-xl text-light-gray mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our friendly team is here to help.
            Get in touch and we'll get back to you as soon as possible.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-epic-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-gray mb-3">Call Us</h3>
              <p className="font-body text-light-gray mb-4">
                Speak directly with our team for immediate answers
              </p>
              <a href="tel:5551234567" className="font-body font-semibold text-epic-blue hover:text-blue-700">
                (555) 123-4567
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-epic-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-gray mb-3">Email Us</h3>
              <p className="font-body text-light-gray mb-4">
                Send us your questions and we'll respond within 24 hours
              </p>
              <a href="mailto:info@epicsportsacademy.com" className="font-body font-semibold text-epic-blue hover:text-blue-700">
                info@epicsportsacademy.com
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-epic-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-gray mb-3">Visit Us</h3>
              <p className="font-body text-light-gray mb-4">
                Come see our facility and meet our coaches in person
              </p>
              <a
                href="https://maps.app.goo.gl/7G2sK2ooFVhFHu6i7"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                  color: "#0066cc",
                }}
              >
                SportsPlex at Metuchen, <br />
                215 Durham Avenue, Metuchen, NJ, 08840, United States
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-epic-blue text-white px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Contact Us
            </a>
            <a
              href="/programs"
              className="inline-flex items-center justify-center border-2 border-epic-blue text-epic-blue px-8 py-4 rounded-lg font-heading font-bold text-lg hover:bg-epic-blue hover:text-white transition-all duration-200"
            >
              View Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQs;