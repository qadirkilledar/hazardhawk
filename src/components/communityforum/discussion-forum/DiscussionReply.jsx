import React, { useContext, useEffect, useState } from "react";
import getUsernameByUID from "../../../utils/GetUser";
import myContext from "../../../context/data/myContext";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

const DiscussionReply = () => {
  const params = useParams();
  const commentId = params.id;

  const context = useContext(myContext);
  const { threadReplies, getThreadReplies, replyOnThread, setThreadReplies } =
    context;

  const [thread, setThread] = useState(null);

  let [taggedNames, setTaggedNames] = useState([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchThreadReplies = () => {
      getThreadReplies(commentId)
        .then((currentThread) => {
          setThread(currentThread);

          const replies = currentThread.replies;

          if (currentThread) {
            const uniqueNames = Array.from(
              new Set(replies.map((obj) => obj.author))
            );
            setTaggedNames(uniqueNames);
          }
        })
        .catch((error) => {
          console.error("Error fetching thread replies:", error);
        });
    };

    fetchThreadReplies();
  }, [commentId]);

  const [selectedName, setSelectedName] = useState("");

  const [replyText, setReplyText] = useState("");

  const handleNameClick = (name) => {
    setSelectedName(name);
    setIsMenuOpen(false);
    setReplyText((prevText) => prevText + `${name}` + " ");
  };

  const handleReplyChange = (e) => {
    setReplyText(e.target.value);

    const reply = e.target.value;
    const lastletter = reply[reply.length - 1];

    if (lastletter == "@") {
      setIsMenuOpen(true);
    } else if (isMenuOpen === true) {
      setIsMenuOpen(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("user")).user.uid;

  const [u_name, setUser] = useState("");

  getUsernameByUID(user).then((username) => {
    if (username) {
      setUser(username);
    }
  });

  function colorTaggedNames(message) {
    // Use a regular expression to find all words starting with '@'
    const regex = /@(\w+)/g;
    const coloredMessage = message.replace(
      regex,
      '<span className="text-blue-800 font-semibold">@$1</span>'
    );

    // Display the colored message

    return coloredMessage;
    // document.body.innerHTML = coloredMessage;
  }

  function copyToClipboard() {
    const urlToCopy = window.location.href;

    // Create a temporary input element
    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    const messagePointer = document.getElementById("copyConf");

    messagePointer.classList.remove("hidden");

    setTimeout(() => {
      messagePointer.classList.add("hidden");
    }, 1000);
  }

  // Attach the copyToClipboard function to the share button click event

  const handleReplySubmit = () => {
    replyOnThread(commentId, replyText, u_name);
    setReplyText("");
    getThreadReplies(commentId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-sky-100">
        <div className="p-6">
          {/* Original post */}
          <div className="flex items-center gap-4">
            <img
              src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-100"
            />
            <span className="font-medium text-sky-900">{thread?.author}</span>
          </div>

          <div className="mt-4 p-4 bg-sky-50 rounded-lg">
            <p className="text-sky-900">{thread?.discussion}</p>
          </div>

          {/* Share button */}
          <div className="mt-6 flex gap-4">
            <button
              className="px-4 py-2 text-sky-600 border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors"
              onClick={copyToClipboard}
            >
              Share Thread
            </button>

            <div
              id="copyConf"
              className="hidden px-4 py-2 text-pink-500 bg-pink-50 rounded-lg border border-pink-200"
            >
              Copied to Clipboard
            </div>
          </div>

          {/* Mentions dropdown */}
          <div className="mt-6">
            <div
              className="flex items-center cursor-pointer text-sky-600"
              onClick={toggleMenu}
            >
              <p className="text-sm mr-2">Mention someone using '@'</p>
              {isMenuOpen ? (
                <HiChevronUp className="text-sky-600" size={20} />
              ) : (
                <HiChevronDown className="text-sky-600" size={20} />
              )}
            </div>

            {isMenuOpen && (
              <ul className="mt-2 bg-white rounded-lg shadow-sm border border-sky-100">
                {taggedNames && taggedNames.length > 0 ? (
                  taggedNames.map((name, index) => (
                    <li
                      key={index}
                      className="px-4 py-3 border-b border-sky-50 hover:bg-sky-50 cursor-pointer transition-colors"
                      onClick={() => handleNameClick(name)}
                    >
                      <span className="text-sky-900">{name}</span>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-3 text-sky-500">
                    No one available to tag.
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Reply textarea */}
          <div className="mt-6">
            <textarea
              id="discussionTextarea"
              className="w-full p-4 border border-sky-200 rounded-lg bg-white text-sky-900 placeholder-sky-400 focus:outline-none focus:border-sky-400 transition-colors"
              rows="4"
              placeholder="Type your reply here..."
              value={replyText}
              onChange={handleReplyChange}
            />
          </div>

          <button
            className="mt-3 px-6 py-2 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors"
            onClick={handleReplySubmit}
          >
            Reply
          </button>
        </div>
      </div>

      {/* Replies section */}
      <div className="mt-8 space-y-4">
        {threadReplies.map((reply) => {
          const timestamp = reply.timestamp.toDate();
          const relativeTime = formatDistanceToNow(timestamp, {
            addSuffix: true,
          });

          return (
            <div
              key={reply.timestamp}
              className="p-4 bg-white rounded-lg shadow-sm border border-sky-100"
            >
              <p className="text-sky-900">{reply.text}</p>
              <div className="mt-3 flex justify-between items-center">
                <p className="text-sm text-sky-600">{`By ${reply.author}`}</p>
                <p className="text-sm text-sky-500">{relativeTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscussionReply;
