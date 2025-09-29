const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      internship: "Digital India Intern",
      content: "Sarkari Intern helped me land my dream internship at Ministry of Electronics & IT. The AI matching was spot on!",
      avatar: "👩‍💻"
    },
    {
      name: "Rahul Kumar",
      role: "Agriculture Student",
      internship: "Ministry of Agriculture",
      content: "The platform made applying to government internships so easy. I got matched with perfect opportunities in my field.",
      avatar: "👨‍🌾"
    },
    {
      name: "Anita Patel",
      role: "Public Health Student",
      internship: "Health Research Fellowship",
      content: "Amazing experience! The chatbot helped me understand the application process and I got selected for my first choice.",
      avatar: "👩‍⚕️"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Hear from students who found their perfect government internships through our platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="border-t pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
                <div className="text-blue-600 text-sm font-medium">{testimonial.internship}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;