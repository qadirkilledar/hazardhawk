import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// import { motion } from 'framer-motion';
import { auth } from "../../firebase/FirebaseConfig";
import getUsernameByUID from "../../utils/GetUser";
import { MdCircleNotifications } from "react-icons/md";
import myContext from "../../context/data/myContext";

const Sidebar = () => {
  const [user_name, setUser] = useState("");

  const context = useContext(myContext);

  const { getMyNotifications, notifications } = context;

  useEffect(() => {
    const fetchData = async () => {
      // Get user ID from local storage
      const storedUserID = localStorage.getItem("user");
      const userID = storedUserID ? JSON.parse(storedUserID).user.uid : null;

      // Fetch username and set it to the state and local storage
      const fetchUsername = async () => {
        const cachedUsername = localStorage.getItem("username");
        if (cachedUsername == null) {
          try {
            const uid = auth.currentUser.uid;
            const username = await getUsernameByUID(uid);
            if (username) {
              setUser(username);
              localStorage.setItem("username", username);
            } else {
              console.log(`User with UID ${uid} not found.`);
            }
          } catch (error) {
            console.error("Error fetching username:", error);
          }
        } else {
          setUser(cachedUsername);
        }
      };

      // Fetch notifications
      const fetchNotifications = async () => {
        try {
          const flag = await getMyNotifications(userID);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      // Execute the functions
      await fetchUsername();
      await fetchNotifications();
    };

    fetchData();
  }, []);

  const NavItem = ({ to, children, icon }) => (
    <Link to={to}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 hover:to-blue-50 
                   transition-all duration-300 shadow-sm hover:shadow-md group"
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">{icon}</span>
          <span className="text-slate-700 group-hover:text-slate-900 font-medium">
            {children}
          </span>
        </div>
      </motion.div>
    </Link>
  );

  return (
    <div className="fixed w-64 h-screen bg-white shadow-lg transition-all duration-300 transform sm:translate-x-0 -translate-x-full sm:static">
      <div className="h-full flex flex-col">
        {/* Header/Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <Link to="/" className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-slate-800 hidden lg:block">
              HazardHawk
            </h2>
          </Link>
          {notifications.length > 0 && (
            <Link to="/notifications" className="relative">
              <MdCircleNotifications className="text-2xl text-blue-500 hover:text-blue-600 transition-colors" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            </Link>
          )}
        </div>

        {/* User Profile Section */}
        <Link to="/user-profile">
          <div className="p-4 my-4 mx-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition-all duration-300">
            <div className="flex items-center space-x-3">
              <img
                src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg"
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              />
              <h3 className="text-slate-700 font-medium">{user_name}</h3>
            </div>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-3 mt-6">
          <NavItem to="/community-posts" icon="📝">
            Community Posts
          </NavItem>
          <NavItem to="/community-discussion" icon="💭">
            General Discussions
          </NavItem>
          <NavItem to="/community-qna" icon="❓">
            FAQs
          </NavItem>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
