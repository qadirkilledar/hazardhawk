// Importing necessary modules and components
import React, { useContext, useEffect, useState } from "react"; // React and hooks
import myContext from "../../context/data/myContext"; // Importing the context to access global state
import Report from "./Report"; // Importing Report component to display individual reports
import { FaPlus, FaRedo, FaCheck } from "react-icons/fa"; // Importing icons for buttons

const AdminDashboard = () => {
  // Using context to get the reports and functions for managing reports and departments
  const context = useContext(myContext);
  const {
    reports,
    getAllReports,
    reportType,
    setReportType,
    deleteReport,
    getMyDept,
    addDeptAdmin,
  } = context;

  // State variables to manage adding department admin, email input, department input, and confirmation message
  const [addDeptAdminFn, setAddDeptAdminFn] = useState(false);
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [confMsg, setConfMsg] = useState(false);

  // Extracting unique categories from the reports
  const uniqueCategories = [
    ...new Set(reports.map((report) => report.incidentType)),
  ];

  // Filtering reports based on the selected report type
  const filteredReports = reports.filter((obj) =>
    obj.incidentType.toLowerCase().includes(reportType.toLowerCase())
  );

  // Fetching all reports when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllReports();
      } catch (error) {
        console.error("Error fetching data:", error); // Error handling
      }
    };

    fetchData();
  }, [getAllReports]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100 text-gray-800">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-8 drop-shadow-md">
          Admin Dashboard
        </h2>

        {/* Dashboard header section with filter reset and add admin button */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-6 border border-sky-200">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-sky-800 mb-4 md:mb-0">
              Explore Reports
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Button to reset report filters */}
              <button
                onClick={() => setReportType("")}
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center space-x-2 shadow-md"
              >
                <FaRedo className="inline" />
                <span>Reset Filters</span>
              </button>
              {/* Button to toggle add department admin form */}
              <button
                onClick={() => setAddDeptAdminFn((prev) => !prev)}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-medium rounded-lg flex items-center justify-center space-x-2 transition duration-300 shadow-md"
              >
                <FaPlus className="inline" />
                <span>Add Dept. Admin</span>
              </button>
            </div>
          </div>

          {/* Conditional rendering of the form to add a department admin */}
          {addDeptAdminFn && (
            <form className="space-y-4 bg-sky-100/50 p-6 rounded-xl">
              <h3 className="text-center text-2xl font-semibold text-sky-700 mb-4">
                Add a New Department Admin
              </h3>
              <div>
                {/* Email input field */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  className="w-full px-4 py-2 mb-4 bg-white rounded-lg text-sky-900 border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
                  placeholder="Enter email address"
                  required
                />
                {/* Department selection dropdown */}
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2 bg-white rounded-lg text-sky-900 border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option value="Accident">Accident</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Suspicious activities">
                    Suspicious activities
                  </option>
                  <option value="Crime">Crime</option>
                  <option value="Social Issues">Social Issues</option>
                </select>
              </div>

              <div className="mt-4 flex justify-between items-center">
                {/* Button to initiate adding admin and confirm the action */}
                <button
                  className="px-6 py-2 bg-sky-400 hover:bg-sky-500 text-white font-medium rounded-lg transition duration-300 shadow-md"
                  onClick={async (e) => {
                    e.preventDefault();
                    setConfMsg(true); // Show confirmation message
                  }}
                >
                  Add Admin
                </button>

                {/* Confirmation message and button to confirm the admin addition */}
                {confMsg && (
                  <div className="mt-4 flex flex-col items-center">
                    <p className="text-sky-800 font-semibold">
                      Confirm adding {email} as an admin for {department}?
                    </p>
                    <button
                      className="mt-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition duration-300 shadow-md"
                      onClick={async (e) => {
                        e.preventDefault();
                        const feedback = await addDeptAdmin(email, department);
                        if (feedback === true) setAddDeptAdminFn(false); // Hide form on success
                      }}
                    >
                      <FaCheck className="inline mr-2" /> Yes, Add
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Report type filter dropdown */}
        <div className="mb-6">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-4 py-2 bg-white rounded-lg text-sky-900 border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Displaying the filtered reports */}
        {filteredReports.length > 0 ? (
          filteredReports.map((reportItem, index) => {
            const {
              incidentType,
              imageUrl,
              latitude,
              longitude,
              anonymousReporting,
              description,
            } = reportItem;
            const handleDelete = async () => {
              deleteReport(reportItem); // Delete report
            };

            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-4 border border-sky-200 hover:shadow-xl transition duration-300"
              >
                {/* Rendering individual report */}
                <Report
                  reporttype={incidentType}
                  images={
                    Array.isArray(imageUrl) && imageUrl.length > 0
                      ? imageUrl
                      : []
                  }
                  latitude={latitude}
                  longitude={longitude}
                  anonymousReporting={anonymousReporting}
                  description={description}
                  deleteReport={handleDelete} // Deleting report
                />
              </div>
            );
          })
        ) : (
          // Message when no reports are found
          <div className="text-center text-xl text-sky-600 mt-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto mb-4 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>No reports found. Everything looks good!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
