import React, { useContext, useEffect, useState } from "react";
import {
  FaCalendar,
  FaRegComments,
  FaThumbsUp,
  FaRegNewspaper,
  FaUsers,
  FaUserFriends,
} from "react-icons/fa";

import { IoMdArrowDropdown } from "react-icons/io";
import myContext from "../../context/data/myContext";
import { auth } from "../../firebase/FirebaseConfig";
import Post from "../communityforum/communityPosts/Post";

const UserProfile = () => {
  const context = useContext(myContext);

  const { myposts, getMyPosts, getUserDetails } = context;

  const [showPosts, setShowposts] = useState(false);

  const userid = auth?.currentUser?.uid;

  const userDetails = localStorage.getItem("userProfile");

  const handlePosts = async () => {
    setShowposts((prev) => !prev);

    if (showPosts === false) {
      return;
    }

    const fetchedPosts = await getMyPosts(userid);

    if (fetchedPosts) {
      setShowposts(true);
    }
  };

  const [metaData, setMetadata] = useState({
    postsCount: 0,
    commentsCount: 0,
    likesCount: 0,
    postCommentsCount: 0,
    followersCount: 0,
    followingsCount: 0,
    username: "Username",
    emailId: "email@gmail.com",
    joinDate: "January 1, 2024",
  });

  useEffect(() => {
    const getUserdata = async () => {
      const userData = await getUserDetails(userid);
      setMetadata(userData);
    };

    getUserdata();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 p-1 shadow-xl">
                <img
                  src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {userDetails?.username || metaData?.username}
            </h2>
            <p className="text-blue-500">
              {userDetails?.emailId || metaData?.emailId}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: FaRegNewspaper,
                label: "Posts",
                value: metaData?.postsCount,
              },
              { icon: FaThumbsUp, label: "Likes", value: metaData?.likesCount },
              {
                icon: FaRegComments,
                label: "Comments",
                value: metaData?.commentsCount,
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <stat.icon className="text-3xl text-blue-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-lg text-gray-600">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-3xl font-bold text-gray-800">
                      {stat.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Follow Stats */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: FaUsers,
                label: "Followers",
                value: metaData?.followersCount,
              },
              {
                icon: FaUserFriends,
                label: "Following",
                value: metaData?.followingsCount,
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-blue-50 rounded-2xl p-8 text-center hover:bg-blue-100 transition-all duration-300">
                  <stat.icon className="text-4xl text-blue-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                  <span className="block text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </span>
                  <span className="text-blue-500">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Join Date */}
          <div className="flex items-center justify-center space-x-3 mb-8">
            <FaCalendar className="text-2xl text-blue-400" />
            <p className="text-gray-600 text-lg">
              Joined on {userDetails?.joinDate || metaData?.joinDate}
            </p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <button
            onClick={handlePosts}
            className="w-full bg-white p-6 flex items-center justify-center space-x-4 hover:bg-blue-50 transition-colors duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800">My Posts</h3>
            <div
              className={`text-3xl text-blue-400 transform transition-transform duration-300 ${
                showPosts ? "rotate-180" : ""
              }`}
            >
              <IoMdArrowDropdown />
            </div>
          </button>

          {/* Posts Display */}
          {showPosts && (
            <div className="border-t border-blue-100">
              {myposts.length > 0 ? (
                <div className="divide-y divide-blue-100">
                  {myposts.map((postItem, index) => (
                    <div
                      key={index}
                      className="p-6 hover:bg-blue-50 transition-colors duration-300"
                    >
                      <Post post={postItem} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center bg-blue-50">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Start Your Journey
                  </h2>
                  <p className="text-blue-500 text-xl">
                    Create your first post and share your thoughts!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {!showPosts && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">
              Click above to view your posts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
