import React, { useState } from "react";
import "./qna.css";

const QnA = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleAnswer = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const questions = [
    {
      id: "q1",
      question: "What is HazardHawk?",
      answer:
        "HazardHawk is a web application designed to enhance safety and communication in smart cities. It allows users to report incidents, discuss community topics, and stay informed about various social issues.",
    },
    {
      id: "q2",
      question: "How can I use HazardHawk?",
      answer:
        "To use HazardHawk, you can sign up for an account. Once registered, you can report incidents, participate in community discussions, and explore safety-related features.",
    },
    {
      id: "q3",
      question: "Is HazardHawk free to use?",
      answer:
        "Yes, HazardHawk is a free-to-use platform. Users can access a variety of features without any charges.",
    },
    {
      id: "q4",
      question: "What is the Community Forum?",
      answer:
        "The Community Forum is a space for users to engage in discussions, share posts, and interact with others. It covers a wide range of topics related to safety, smart cities, and community well-being.",
    },
    {
      id: "q5",
      question: "How can I publish a post on the Community Forum?",
      answer:
        'To publish a post, go to the "Community Posts" section, click on feather icon (or "New Post") and provide the necessary details. Users can react to posts, comment on them, and follow other users for updates.',
    },
    {
      id: "q6",
      question: "How can I start a new discussion thread on HazardHawk?",
      answer:
        'To start a new thread, go to the "General Discussions" section, create your thread in the thread field of main screen. Users can reply to your threads and can engage in a healthy dicussion.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-sky-600 mb-4">
          Frequently Asked Questions
        </h1>

        <p className="text-center text-sky-700 mb-12">
          Welcome to our QnA page! Here, you'll find answers to some commonly
          asked questions about our platform.
        </p>

        <div className="space-y-4">
          {questions.map((item) => (
            <div
              key={item.id}
              className="bg-sky-50 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleAnswer(item.id)}
                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-sky-100 transition-colors"
              >
                <span className="font-medium text-sky-900">
                  {item.question}
                </span>
                <span
                  className={`transform transition-transform ${
                    openQuestion === item.id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {openQuestion === item.id && (
                <div className="px-6 py-4 bg-white border-t border-sky-100">
                  <p className="text-sky-800">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center text-sky-600 space-y-2">
          <p>Contact us: contact@HazardHawk.com</p>
          <p>© {new Date().getFullYear()} HazardHawk. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default QnA;
