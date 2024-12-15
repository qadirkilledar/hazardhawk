// Importing necessary modules and components
import React, { useContext, useEffect, useState } from 'react'; // React and hooks
import myContext from '../../context/data/myContext'; // Importing the context to access global state
import Report from './Report'; // Importing Report component to display individual reports
import { FaPlus, FaRedo, FaCheck } from 'react-icons/fa'; // Importing icons for buttons

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
        addDeptAdmin
    } = context;

    // State variables to manage adding department admin, email input, department input, and confirmation message
    const [addDeptAdminFn, setAddDeptAdminFn] = useState(false);
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [confMsg, setConfMsg] = useState(false);

    // Extracting unique categories from the reports
    const uniqueCategories = [...new Set(reports.map(report => report.incidentType))];
    
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
                console.error('Error fetching data:', error); // Error handling
            }
        };

        fetchData();
    }, [getAllReports]);

    return (
        <div
            className="min-h-screen text-gray-100"
            style={{
                background: "linear-gradient(to right, rgb(15, 23, 42), rgb(30, 41, 59), rgb(51, 65, 85))",
            }}
        >
            <div className="container mx-auto p-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-200 mb-6">Admin Dashboard</h2>

                {/* Dashboard header section with filter reset and add admin button */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Explore Reports</h3>
                        <div className="flex gap-4">
                            {/* Button to reset report filters */}
                            <button
                                onClick={() => setReportType('')}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-md transition duration-200"
                            >
                                <FaRedo className="inline mr-2" /> Reset Filters
                            </button>
                            {/* Button to toggle add department admin form */}
                            <button
                                onClick={() => setAddDeptAdminFn((prev) => !prev)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md flex items-center gap-2 transition duration-200"
                            >
                                <FaPlus className="inline" /> Add Dept. Admin
                            </button>
                        </div>
                    </div>

                    {/* Conditional rendering of the form to add a department admin */}
                    {addDeptAdminFn && (
                        <form className="space-y-4">
                            <h3 className="text-center text-2xl font-semibold text-blue-700 mb-4">Add a New Department Admin</h3>
                            <div>
                                {/* Email input field */}
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name="email"
                                    className="w-full px-4 py-2 mb-4 bg-gray-100 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    placeholder="Enter email address"
                                    required
                                />
                                {/* Department selection dropdown */}
                                <select
                                    id="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="" disabled>Select Department</option>
                                    <option value="Accident">Accident</option>
                                    <option value="Infrastructure">Infrastructure</option>
                                    <option value="Cybersecurity">Cybersecurity</option>
                                    <option value="Suspicious activities">Suspicious activities</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Social Issues">Social Issues</option>
                                </select>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                {/* Button to initiate adding admin and confirm the action */}
                                <button
                                    className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-gray-800 font-medium rounded-md transition duration-200"
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
                                        <p className="text-gray-800 font-semibold">Confirm adding {email} as an admin for {department}?</p>
                                        <button
                                            className="mt-2 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-medium rounded-md transition duration-200"
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
                        className="w-full px-4 py-2 bg-gray-100 rounded-lg text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                {/* Displaying the filtered reports */}
                {filteredReports.length > 0 ? (
                    filteredReports.map((reportItem, index) => {
                        const { incidentType, imageUrl, latitude, longitude, anonymousReporting, description } = reportItem;
                        const handleDelete = async () => {
                            deleteReport(reportItem); // Delete report
                        };

                        return (
                            <div key={index} className="bg-gray-100 rounded-lg shadow-md p-4 mb-4 border border-gray-200">
                                {/* Rendering individual report */}
                                <Report
                                    reporttype={incidentType}
                                    images={Array.isArray(imageUrl) && imageUrl.length > 0 ? imageUrl : []}
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
                    <div className="text-center text-xl text-gray-500 mt-10">
                        <p>No reports found. Everything looks good!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
