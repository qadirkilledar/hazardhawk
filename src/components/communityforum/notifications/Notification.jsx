// Notification.jsx
import React, { useState } from "react";

const Notification = ({ reportID, reportUserId, deleteNotification }) => {
  const [visible, setVisible] = useState(true);

  function getReport() {
    window.location.href = `myreport/${reportID}`;
  }

  return (
    <div
      className={`w-[80%] mx-[10%] md:w-[60%] md:ml-[20%] my-2 bg-sky-100 
            py-4 px-4 rounded-lg shadow-md shadow-sky-200 will-change-scroll 
            ${visible ? "visible" : "hidden"} transition-all duration-300`}
    >
      <h2 className="text-sky-800 font-semibold text-lg">Good News,</h2>
      <h3 className="text-sky-700 mt-2">
        Hey, your report with reference to Report id
        <span
          className="text-sky-500 hover:text-sky-600 mx-2 cursor-pointer 
                    font-medium underline"
          onClick={getReport}
        >
          {reportID}
        </span>
        has been filed.
      </h3>

      <button
        onClick={() => {
          setVisible(false);
          deleteNotification(reportID, reportUserId);
        }}
        className="flex justify-end mt-4 px-4 py-2 rounded-md text-sky-50 
                    bg-sky-600 hover:bg-sky-700 transition-all duration-200 
                    md:ml-[70%] shadow-sm"
      >
        Delete Notification
      </button>
    </div>
  );
};

export default Notification;
