import React from "react";
import DiscussionYard from "./DiscussionYard";
import DiscussInput from "./DiscussInput";

import { useContext } from "react";
import myContext from "../../../context/data/myContext";
import { auth } from "../../../firebase/FirebaseConfig";

const CommunityDiscussions = () => {
  const context = useContext(myContext);
  const { threads } = context;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "linear-gradient(to right, #0f172a, #1e293b, #334155)",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header Section */}
      <div
        className="py-6 px-4"
        style={{
          background: "linear-gradient(to right, #0f172a, #1e293b, #334155)",
        }}
      >
        <h2
          className="text-3xl font-semibold text-center"
          style={{ color: "rgb(241 245 249)", letterSpacing: "0.05em" }}
        >
          Community Discussions
        </h2>
      </div>

      {/* Threads Section */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        {threads.map((thread, index) => {
          const authorID = thread.authorId;
          return (
            <div key={index} className="mb-4">
              {authorID === auth.currentUser.uid ? (
                <DiscussionYard thread={thread} myPost={true} />
              ) : (
                <DiscussionYard thread={thread} myPost={false} />
              )}
            </div>
          );
        })}
      </div>

      {/* Input Section */}
      <div
        className="fixed bottom-0 left-0 right-0 border-t shadow-lg"
        style={{
          backgroundColor: "#1e293b",
          borderColor: "#334155",
        }}
      >
        <div className="max-w-4xl mx-auto p-4">
          <DiscussInput />
        </div>
      </div>
    </div>
  );
};

export default CommunityDiscussions;
