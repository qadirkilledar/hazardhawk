import React, { useState, useContext } from "react";
import "../communityPosts/styles.css";
import getUsernameByUID from "../../../utils/GetUser";
import { auth } from "../../../firebase/FirebaseConfig";
import myContext from "../../../context/data/myContext";
import { IoMdSend } from "react-icons/io";

const DiscussInput = () => {
  const context = useContext(myContext);

  const { addThread, thread, setThread } = context;

  let uid;

  try {
    uid = auth.currentUser.uid;
  } catch (err) {}

  const [u_name, setUser] = useState("");

  getUsernameByUID(uid).then((username) => {
    if (username) {
      setUser(username);
      thread.authorId = uid;
      thread.author = u_name;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (thread.discussion.trim() === "") return;

    const threadAdded = await addThread();

    const discussId = document.getElementById("thread");

    if (threadAdded) {
      discussId.value = "";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          id="thread"
          type="text"
          placeholder="Start a new discussion..."
          value={thread.discussion}
          onChange={(e) => setThread({ ...thread, discussion: e.target.value })}
          className="flex-1 px-4 py-3 rounded-lg border border-sky-200 bg-white text-sky-900 placeholder-sky-400 focus:outline-none focus:border-sky-400 transition-colors"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          Submit Thread
          <IoMdSend className="text-lg" />
        </button>
      </form>
    </div>
  );
};

export default DiscussInput;
