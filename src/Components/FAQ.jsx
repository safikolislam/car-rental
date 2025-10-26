import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How can I book a car?",
      answer: "Go to 'Available Cars', choose a car, click 'Book Now', and follow the instructions.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes! Go to 'My Bookings' to cancel or modify your booking easily.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, digital wallets, and online banking.",
    },
    {
      question: "Is there a minimum age requirement?",
      answer: "You must be at least 21 years old with a valid driving license.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us 24/7 via chat, email at support@rentifycar.com, or call +1-800-123-456.",
    },
    {
      question: "Can I rent cars for multiple days?",
      answer: "Yes, you can select the start and end date while booking. The system will calculate the total price automatically.",
    },
    {
      question: "How do I add a car to the platform?",
      answer: "Log in, go to 'Add Car', fill in the car details, features, availability, and click 'Save'.",
    },
    {
      question: "Can I update or delete my listed cars?",
      answer: "Yes, go to 'My Cars' to update car details or remove a car from the listings.",
    },

    {
      question: "Do you offer insurance for rental cars?",
      answer: "Yes, all cars come with basic insurance. Additional coverage can be selected during booking.",
    },
    {
      question: "Are there any hidden charges?",
      answer: "No, all prices are transparent. Taxes and fees are included in the total price during booking.",
    },

 

  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-4xl mx-auto px-6 py-16 bg-base-100 min-h-screen" id="faq">
      <h2 className="text-4xl font-bold text-center mb-12 text-base-content">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="collapse collapse-arrow border border-base-200 bg-base-200 rounded-lg">
            <input
              type="checkbox"
              checked={openIndex === index}
              onChange={() => setOpenIndex(openIndex === index ? null : index)}
            />
            <div className="collapse-title text-lg font-semibold text-base-content">
              {faq.question}
            </div>
            <div className="collapse-content text-base-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;





