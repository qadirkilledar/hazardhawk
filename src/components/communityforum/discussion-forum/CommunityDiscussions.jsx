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
    <div className="min-h-screen bg-white">
      <div className="py-6 px-4 bg-gradient-to-r from-sky-50 to-white">
        <h2 className="text-3xl font-semibold text-center text-sky-800 tracking-tight">
          Community Discussions
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {threads.map((thread, index) => {
          const authorID = thread.authorId;
          return (
            <div key={index}>
              {authorID === auth.currentUser.uid ? (
                <DiscussionYard thread={thread} myPost={true} />
              ) : (
                <DiscussionYard thread={thread} myPost={false} />
              )}
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-sky-100 shadow-lg">
        <div className="max-w-4xl mx-auto p-4">
          <DiscussInput />
        </div>
      </div>
    </div>
  );
};

export default CommunityDiscussions;
