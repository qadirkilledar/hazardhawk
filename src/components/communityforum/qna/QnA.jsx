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
        'To publish a post, go to the "Community Posts" section, click on the feather icon (or "New Post") and provide the necessary details. Users can react to posts, comment on them, and follow other users for updates.',
    },
    {
      id: "q6",
      question: "How can I start a new discussion thread on HazardHawk?",
      answer:
        'To start a new thread, go to the "General Discussions" section, create your thread in the thread field of the main screen. Users can reply to your threads and engage in a healthy discussion.',
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(to right, #0f172a, #1e293b, #334155)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-gray-300 mb-12">
          Welcome to our FAQ page! Here, you'll find answers to common
          questions about HazardHawk.
        </p>

        <div className="space-y-4">
          {questions.map((item) => (
            <div
              key={item.id}
              className="rounded-lg shadow-md transition-transform transform hover:scale-105"
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => toggleAnswer(item.id)}
                className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none transition-colors hover:bg-gray-700"
              >
                <span
                  className="font-medium text-lg"
                  style={{ color: "rgb(241 245 249)" }}
                >
                  {item.question}
                </span>
                <span
                  className={`transform transition-transform ${
                    openQuestion === item.id ? "rotate-180" : ""
                  }`}
                  style={{ color: "rgb(148 163 184)" }}
                >
                  ▼
                </span>
              </button>

              {openQuestion === item.id && (
                <div
                  className="px-6 py-4"
                  style={{
                    backgroundColor: "#334155",
                    color: "rgb(241 245 249)",
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer className="mt-16 text-center space-y-2">
          <p className="text-sm text-gray-400">
            Contact us: contact@HazardHawk.com
          </p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} HazardHawk. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default QnA;
