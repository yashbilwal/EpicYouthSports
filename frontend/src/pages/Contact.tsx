import React, { useState } from 'react';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Download } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const form = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS IDs
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! We\'ll get back to you within 24 hours.'
        });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error(error.text);
        setSubmitStatus({
          success: false,
          message: 'Failed to send message. Please try again later.'
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-epic-blue to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading font-bold text-4xl md:text-6xl mb-6">
              Get in <span className="text-energy-yellow">Touch</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
              Ready to start your child's epic sports journey? We're here to answer questions,
              schedule visits, and help you find the perfect program.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="font-heading font-bold text-3xl text-slate-gray mb-6">
                Send Us a Message
              </h2>

              {submitStatus && (
                <div className={`mb-6 p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                  {submitStatus.message}
                </div>
              )}

              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-gray mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent resize-none"
                    placeholder="Tell us about your child's interest in our programs, any questions you have, or how we can help..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-epic-blue text-white py-4 rounded-lg font-heading font-bold text-lg hover:bg-blue-700 transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="font-heading font-bold text-3xl text-slate-gray mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-epic-blue rounded-full p-3">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-slate-gray mb-1">Phone</h3>
                      <p className="font-body text-light-gray mb-2">(555) 123-4567</p>
                      <p className="font-body text-sm text-gray-500">
                        Call us for immediate assistance with registration questions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-epic-blue rounded-full p-3">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-slate-gray mb-1">Email</h3>
                      <p className="font-body text-light-gray mb-2">info@epicsportsacademy.com</p>
                      <p className="font-body text-sm text-gray-500">
                        We respond to all emails within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-epic-blue rounded-full p-3">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-slate-gray mb-1">Address</h3>
                      <p className="font-body text-light-gray mb-2">
                        SportsPlex at Metuchen, 215 Durham Avenue, <br />
                        Metuchen, NJ, 08840, United States
                      </p>
                      <p className="font-body text-sm text-gray-500">
                        Free parking available for all visitors
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-epic-blue rounded-full p-3">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-slate-gray mb-1">Office Hours</h3>
                      <div className="font-body text-light-gray space-y-1">
                        <p>Monday - Friday: 9:00 AM - 7:00 PM</p>
                        <p>Saturday: 8:00 AM - 5:00 PM</p>
                        <p>Sunday: 10:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-epic-blue to-blue-800 text-white rounded-2xl p-8">
                <h3 className="font-heading font-bold text-2xl mb-4">Stay Updated</h3>
                <p className="font-body text-gray-100 mb-6">
                  Get news, offers, and session updates delivered to your inbox.
                </p>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!emailRef.current) return;
                    const email = emailRef.current.value.trim();
                    if (!email) {
                      alert('Please enter a valid email address');
                      return;
                    }
                    try {
                      const response = await fetch('http://localhost:5000/subscribe', { // replace with your backend URL
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                      });
                      if (response.ok) {
                        alert('Subscribed successfully! 🎉');
                        emailRef.current.value = '';
                      } else {
                        alert('Subscription failed. Please try again.');
                      }
                    } catch (error) {
                      console.error(error);
                      alert('Error connecting to server.');
                    }
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    ref={emailRef}
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg text-slate-gray focus:outline-none focus:ring-2 focus:ring-energy-yellow"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-energy-yellow text-slate-gray px-6 py-3 rounded-lg font-heading font-bold hover:bg-yellow-500 transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
              Visit Our Facility
            </h2>
            <p className="font-body text-xl text-light-gray max-w-3xl mx-auto">
              Come see our state-of-the-art training facility and meet our coaching team.
              We'd love to show you around and answer any questions in person.
            </p>
          </div>

          <div className="bg-gray-200 rounded-2xl overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3029.215313036011!2d-74.3710556!3d40.5410576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3b7c54a1e757f%3A0xc55479114339e698!2sSportsPlex%20at%20Metuchen!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Epic Sports Academy Location"
            ></iframe>
          </div>

          <div className="text-center mt-8">
            <a
              href="https://www.google.com/maps/place/SportsPlex+at+Metuchen/@40.5410576,-74.3710556,17z/data=!3m1!4b1!4m6!3m5!1s0x89c3b7c54a1e757f:0xc55479114339e698!8m2!3d40.5410576!4d-74.3710556!16s%2Fg%2F1tknlcxd?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center font-body text-epic-blue hover:text-epic-blue-dark transition-colors"
            >
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-gray-300 text-sm">
                SportsPlex at Metuchen, <br />
                215 Durham Avenue, Metuchen, <br />
                NJ, 08840, United States
              </span>
            </a>
          </div>
        </div>
      </section>
      {/* Downloads Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
              Required Forms
            </h2>
            <p className="font-body text-xl text-light-gray max-w-3xl mx-auto">
              Download and complete these forms before your child's first session to ensure
              a smooth registration process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-epic-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-gray mb-4">
                Emergency Contact Form
              </h3>
              <p className="font-body text-light-gray mb-6">
                Required emergency contact information and medical details for your child's safety during training.
              </p>
              <a
                href="/Epic_Pick-up_Authorization__Emergency_ContactForm.pdf"
                download
                className="inline-block bg-epic-blue text-white px-8 py-3 rounded-lg font-heading font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Download PDF
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-epic-blue rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-gray mb-4">
                Refund Policy Agreement
              </h3>
              <p className="font-body text-light-gray mb-6">
                Important information about our cancellation and refund policies for all training programs.
              </p>
              <a
                href="/Epic_Camp_Refund_Cancellation_Form-1.pdf"
                download
                className="inline-block bg-epic-blue text-white px-8 py-3 rounded-lg font-heading font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;