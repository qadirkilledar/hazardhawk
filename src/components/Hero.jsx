import React from "react";
import {
  Shield,
  Map,
  MessageSquare,
  BookOpen,
  Phone,
  ChevronRight,
  Users,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <header className="bg-sky-100">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-sky-900 mb-6">
            Keeping Communities Safe Together
          </h1>
          <p className="text-xl text-sky-700 mb-8 max-w-2xl mx-auto">
            Real-time incident reporting and monitoring platform powered by
            community vigilance
          </p>
          <button
            className="bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold 
            hover:bg-sky-700 transition-all inline-flex items-center gap-2 shadow-sm"
          >
            Get Started <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Feature Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield />}
              title="Smart Incident Reporting"
              description="AI-powered system for quick and accurate incident documentation with location tracking and image analysis."
              primary
            />
            <FeatureCard
              icon={<Map />}
              title="Real-Time Safety Map"
              description="Interactive map showing live incidents and safety alerts in your area with risk heat mapping."
            />
            <FeatureCard
              icon={<MessageSquare />}
              title="Community Forums"
              description="Engage with neighbors, share safety tips, and coordinate neighborhood watch activities."
            />
            <FeatureCard
              icon={<Users />}
              title="Neighborhood Alerts"
              description="Instant notifications about safety concerns and emergencies in your vicinity."
            />
            <FeatureCard
              icon={<BookOpen />}
              title="Safety Resources"
              description="Comprehensive guides, emergency protocols, and safety best practices."
            />
            <FeatureCard
              icon={<Phone />}
              title="Emergency Integration"
              description="Direct connection to emergency services with automated location sharing."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-sky-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 text-sky-900">
            Join HazardHawk Today
          </h2>
          <p className="text-sky-700 mb-8 max-w-2xl mx-auto">
            Be part of the solution. Help create safer neighborhoods.
          </p>
          <button
            className="bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold 
            hover:bg-sky-700 transition-all shadow-sm"
          >
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, primary }) => {
  return (
    <div
      className={`p-8 rounded-2xl transition-all ${
        primary
          ? "bg-sky-100 border border-sky-200"
          : "bg-white shadow-md hover:shadow-lg border border-sky-50"
      }`}
    >
      <div className={`mb-6 ${primary ? "text-sky-600" : "text-sky-500"}`}>
        {React.cloneElement(icon, { size: 48 })}
      </div>
      <h3
        className={`text-xl font-bold mb-4 ${
          primary ? "text-sky-900" : "text-sky-800"
        }`}
      >
        {title}
      </h3>
      <p className={primary ? "text-sky-700" : "text-sky-600"}>{description}</p>
    </div>
  );
};

export default LandingPage;
