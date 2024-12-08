import { formatDistanceToNow } from "date-fns";
import React, { useContext } from "react";
import { FaReply } from "react-icons/fa";
import myContext from "../../../context/data/myContext";

const DiscussionYard = ({ thread, myPost }) => {
  const conditionalStyles = myPost
    ? { backgroundColor: "#5bcc75", color: "white" }
    : { backgroundColor: "white", color: "white" };

  const timestamp = thread.time.toDate();

  const relativeTime = formatDistanceToNow(timestamp, { addSuffix: true });

  const context = useContext(myContext);

  const { followUser } = context;

  const userID = JSON.parse(localStorage.getItem("user")).user.uid;

  function replytoThread() {
    window.location.href = `thread-reply/${thread.id}`;
  }

  const followActivity = async () => {
    await followUser(userID, thread.authorId, thread.author);
  };

  return (
    <div
      className={`my-6 rounded-lg shadow-sm border ${
        myPost ? "bg-sky-50 border-sky-200" : "bg-white border-gray-100"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-100"
              alt="User Avatar"
            />
            <div>
              <h3 className="font-medium text-sky-900">{thread.author}</h3>
              <p className="text-sm text-sky-600">{relativeTime}</p>
            </div>
          </div>

          <button
            onClick={followActivity}
            className="px-4 py-1.5 text-sm text-sky-600 border border-sky-200 rounded-full hover:bg-sky-50 transition-colors"
          >
            Follow
          </button>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg border border-sky-100">
          <p className="text-sky-900 leading-relaxed merriweather">
            {thread.discussion}
          </p>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={replytoThread}
            className="px-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg flex items-center gap-2 transition-colors"
          >
            Reply
            <FaReply className="text-sm rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionYard;
