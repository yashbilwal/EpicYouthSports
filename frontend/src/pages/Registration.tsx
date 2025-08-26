import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Shield, Clock } from 'lucide-react';

const Registration = () => {
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const scheduleIndex = searchParams.get('schedule') || '0';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    childGrade: '',
    childSchool: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    homeAddress: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    emergencyContact2: '',
    emergencyPhone2: '',
    selectedSchedule: scheduleIndex
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  const programData = {
    basketball: {
      title: 'Basketball Excellence Program',
      schedules: [
        { day: 'Every Tuesday', time: '5:00 PM - 6:30 PM', dates: 'Sep 2, 2025 - Oct 21, 2025', ageGroup: '8-12' },
        { day: 'Every Tuesday', time: '6:30 PM - 8:00 PM', dates: 'Sep 2, 2025 - Oct 21, 2025', ageGroup: '13-16' }
      ]
    },
    volleyball: {
      title: 'Volleyball Mastery Program',
      schedules: [
        { day: 'Every Monday', time: '5:00 PM - 6:30 PM', dates: 'Sep 2, 2025 - Oct 21, 2025', ageGroup: '8-12' },
        { day: 'Every Monday', time: '6:30 PM - 8:00 PM', dates: 'Sep 1, 2025 - Oct 20, 2025', ageGroup: '13-16' }
      ]
    }
  };

  const program = programData[type as keyof typeof programData];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    if (registrationSuccess && registrationId) {
      // Redirect to payment page after successful registration
      // For now, we'll just show a message. Replace with actual navigation when payment is ready:
      // navigate(`/payment/${registrationId}`);
      console.log('Redirecting to payment for registration:', registrationId);
      
      // For demonstration, reset after 3 seconds
      const timer = setTimeout(() => {
        setRegistrationSuccess(false);
        setRegistrationId(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, registrationId, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    // Check if parent info is used as emergency contact
    const isParentAsEmergency1 = formData.parentName === formData.emergencyContact ||
      formData.parentPhone === formData.emergencyPhone;

    const isParentAsEmergency2 = formData.emergencyContact2 &&
      (formData.parentName === formData.emergencyContact2 ||
        formData.parentPhone === formData.emergencyPhone2);

    if (isParentAsEmergency1 || isParentAsEmergency2) {
      alert('Emergency contacts must be different from the parent/guardian');
      return;
    }

    // Check for duplicate emergency contacts
    if (formData.emergencyContact2 &&
      (formData.emergencyContact === formData.emergencyContact2 ||
        formData.emergencyPhone === formData.emergencyPhone2)) {
      alert('Emergency contacts must be different people');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedScheduleData = program.schedules[parseInt(formData.selectedSchedule)];

      const payload = {
        childName: formData.childName,
        childAge: formData.childAge,
        childGrade: formData.childGrade,
        childSchool: formData.childSchool,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        parentEmail: formData.parentEmail,
        homeAddress: formData.homeAddress,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        emergencyContact1Name: formData.emergencyContact,
        emergencyContact1Phone: formData.emergencyPhone,
        emergencyContact2Name: formData.emergencyContact2 || '',
        emergencyContact2Phone: formData.emergencyPhone2 || '',
        selectedScheduleDay: selectedScheduleData.day,
        selectedScheduleTime: selectedScheduleData.time,
        selectedScheduleDates: selectedScheduleData.dates,
        selectedScheduleAgeGroup: selectedScheduleData.ageGroup,
        programType: type
      };

      // Send to backend
      const response = await fetch('https://epicyouthsports.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // On success - store registration ID and set success state
      console.log('Registration successful:', data);
      setRegistrationId(data.registrationId || 'temp-id'); // Use actual ID from backend
      setRegistrationSuccess(true);

      // Reset form data
      setFormData({
        childName: '',
        childAge: '',
        childGrade: '',
        childSchool: '',
        parentName: '',
        parentPhone: '',
        parentEmail: '',
        homeAddress: '',
        city: '',
        state: '',
        zipCode: '',
        emergencyContact: '',
        emergencyPhone: '',
        emergencyContact2: '',
        emergencyPhone2: '',
        selectedSchedule: scheduleIndex
      });

    } catch (error) {
      // Proper error type handling
      let errorMessage = 'Registration failed. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      console.error('Registration error:', error);
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!program) {
    return <div>Program not found</div>;
  }

  const selectedSchedule = program.schedules[parseInt(formData.selectedSchedule)];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-slate-gray mb-4">
            Register for {program.title}
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-6 inline-block">
            <div className="flex items-center justify-center space-x-4 text-slate-gray">
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-epic-blue">{selectedSchedule.day}</div>
                <div className="text-sm">{selectedSchedule.time}</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="font-heading font-bold text-2xl text-epic-blue">{selectedSchedule.dates}</div>
                <div className="text-sm">8 Sessions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="font-heading font-bold text-2xl text-slate-gray mb-6">
                Registration Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Child Information */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-gray mb-4">
                    Child Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Child's Full Name *
                      </label>
                      <input
                        type="text"
                        name="childName"
                        value={formData.childName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Age *
                      </label>
                      <select
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      >
                        <option value="">Select Age</option>
                        {[8, 9, 10, 11, 12, 13, 14, 15, 16].map(age => (
                          <option key={age} value={age}>{age} years old</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Grade *
                      </label>
                      <select
                        name="childGrade"
                        value={formData.childGrade}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      >
                        <option value="">Select Grade</option>
                        {['3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th'].map(grade => (
                          <option key={grade} value={grade}>{grade} Grade</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        School
                      </label>
                      <input
                        type="text"
                        name="childSchool"
                        value={formData.childSchool}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Parent Information */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-gray mb-4">
                    Parent/Guardian Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Parent/Guardian Name *
                      </label>
                      <input
                        type="text"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="parentPhone"
                        value={formData.parentPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="parentEmail"
                        value={formData.parentEmail}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Home Address */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-gray mb-4">
                    Address
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Home Address *
                      </label>
                      <input
                        type="text"
                        name="homeAddress"
                        value={formData.homeAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Schedule Selection */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-gray mb-4">
                    Schedule Selection
                  </h3>
                  <div className="space-y-3">
                    {program.schedules.map((schedule, index) => (
                      <label key={index} className="flex items-start p-4 border border-gray-300 rounded-lg hover:border-epic-blue cursor-pointer">
                        <input
                          type="radio"
                          name="selectedSchedule"
                          value={index.toString()}
                          checked={formData.selectedSchedule === index.toString()}
                          onChange={handleInputChange}
                          className="text-epic-blue focus:ring-epic-blue mt-1"
                        />
                        <div className="ml-3 flex-1">
                          <div className="font-body font-semibold text-slate-gray">
                            {schedule.day}
                          </div>
                          <div className="text-sm text-light-gray mb-1">
                            {schedule.time} • {schedule.dates}
                          </div>
                          <div className="text-xs bg-epic-blue/10 text-epic-blue px-2 py-1 rounded inline-block">
                            Age Group: {schedule.ageGroup}
                          </div>
                        </div>
                        </label>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-gray mb-4">
                    Authorized Pick Up and Emergency Contact
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Person #1 Name *
                      </label>
                      <input
                        type="text"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Person #1 Contact Phone *
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                        required
                      />
                    </div>
                    {/* Emergency Contact - Person #2 */}
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Person #2 Name
                      </label>
                      <input
                        type="text"
                        name="emergencyContact2"
                        value={formData.emergencyContact2 || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-gray mb-2">
                        Person #2 Contact Phone
                      </label>
                      <input
                        type="tel"
                        name="emergencyPhone2"
                        value={formData.emergencyPhone2 || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-epic-blue focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || registrationSuccess}
                  className={`w-full bg-epic-blue text-white py-4 rounded-lg font-heading font-bold text-lg transition-colors duration-200 flex items-center justify-center ${
                    isSubmitting || registrationSuccess ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : registrationSuccess ? 'Registration Complete!' : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Payment - $49 Deposit
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h3 className="font-heading font-bold text-2xl text-slate-gray mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-body text-slate-gray">Program Total</span>
                  <span className="font-body font-semibold">$209</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span className="font-body">Limited Time Savings</span>
                  <span className="font-body font-semibold">-$40</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-bold text-lg">Total Program Cost</span>
                    <span className="font-heading font-bold text-2xl text-epic-blue">$209</span>
                  </div>
                </div>
              </div>

              <div className="bg-energy-yellow/10 border border-energy-yellow rounded-lg p-4 mb-6">
                <div className="flex items-center text-slate-gray mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-body font-semibold">Payment Schedule</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Today (Deposit):</span>
                    <span className="font-semibold">$49</span>
                  </div>
                  <div className="flex justify-between">
                    <span>First Day of Program:</span>
                    <span className="font-semibold">$160</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-gray">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-epic-blue mt-1 flex-shrink-0" />
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-epic-blue mt-1 flex-shrink-0" />
                  <span>Instant confirmation email</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-epic-blue mt-1 flex-shrink-0" />
                  <span>Full refund if canceled 48 hours before start</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;