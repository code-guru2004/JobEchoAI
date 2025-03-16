import { Briefcase, Clock, MessageCircle, Star, Users } from "lucide-react";

const features = [
  {
    title: "Realistic Mock Interviews",
    description: "Experience real-world interview scenarios with expert interviewers.",
    icon: <Briefcase className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "AI-Powered Feedback",
    description: "Get instant feedback on your performance with AI-driven insights.",
    icon: <Star className="w-10 h-10 text-yellow-500" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Book interviews at your convenience, anytime, anywhere.",
    icon: <Clock className="w-10 h-10 text-green-500" />,
  },
  {
    title: "Industry-Specific Questions",
    description: "Practice with questions tailored to your target industry and role.",
    icon: <Users className="w-10 h-10 text-purple-500" />,
  },
  
];

export default function FeaturesPage() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Elevate your interview skills with our advanced mock interview platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-2xl shadow-md flex flex-col items-center text-center">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
