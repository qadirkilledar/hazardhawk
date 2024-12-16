import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/data/myContext";
import Report from "./Report";

const DepartmentAdminDB = () => {
  const context = useContext(myContext);
  const { reports, getAllReports, deleteReport, getMyDept, getFiledReports } =
    context;

  const [department, setDept] = useState("");
  const [deptName, setDeptname] = useState("");

  const user_emailID = JSON.parse(localStorage.getItem("user")).user.email;

  let deptReports = reports.filter((obj) =>
    obj.incidentType.toLowerCase().includes(deptName.toLowerCase())
  );

  const [filedreports, setFiledReports] = useState(false);

  const fetchFiledReports = async () => {
    try {
      const reports = await Promise([getFiledReports()]);
    } catch (error) {
      console.log(error);
    } finally {
      const originalData = reports.filter((obj) =>
        obj.incidentType.toLowerCase().includes(deptName.toLowerCase())
      );

      setFiledReports(originalData);
    }
  };

  const fetchUnFiledReports = async () => {
    await getAllReports();

    deptReports = reports.filter((obj) =>
      obj.incidentType.toLowerCase().includes(deptName.toLowerCase())
    );

    setFiledReports(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simultaneously fetch data from both functions
        const [reportsdata, deptData] = await Promise.all([
          getAllReports(),
          getMyDept(user_emailID),
        ]);

        setDept(deptData?.department);
        setDeptname(deptData?.departmentName);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="container mx-auto">
        <div className="mb-8 bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="bg-blue-600 text-white py-6">
            <h2 className="text-center text-3xl font-bold tracking-wide">
              {department} Dashboard
            </h2>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                onClick={fetchFiledReports}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm4-1a1 1 0 10-2 0v5a1 1 0 102 0V8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Retrieve Filed Reports</span>
              </button>

              <button
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                onClick={fetchUnFiledReports}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Retrieve Unfiled Reports</span>
              </button>
            </div>

            {filedreports === false && deptReports && deptReports.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deptReports.map((reportItem, index) => {
                  const {
                    incidentType,
                    imageUrl,
                    latitude,
                    longitude,
                    anonymousReporting,
                    description,
                    uid,
                    id,
                    filed,
                  } = reportItem;

                  const handleDelete = async () => {
                    deleteReport(reportItem);
                  };

                  return (
                    <Report
                      key={index}
                      reporttype={incidentType}
                      images={imageUrl}
                      latitude={latitude}
                      longitude={longitude}
                      anonymousReporting={anonymousReporting}
                      description={description}
                      deleteReport={handleDelete}
                      reportUserID={uid}
                      reportID={id}
                      filed={filed}
                    />
                  );
                })}
              </div>
            ) : (
              ""
            )}

            {filedreports && filedreports.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filedreports.map((reportItem, index) => {
                  const {
                    incidentType,
                    imageUrl,
                    latitude,
                    longitude,
                    anonymousReporting,
                    description,
                    uid,
                    id,
                    filed,
                  } = reportItem;

                  const handleDelete = async () => {
                    deleteReport(reportItem);
                  };

                  return (
                    <Report
                      key={index}
                      reporttype={incidentType}
                      images={imageUrl}
                      latitude={latitude}
                      longitude={longitude}
                      anonymousReporting={anonymousReporting}
                      description={description}
                      deleteReport={handleDelete}
                      reportUserID={uid}
                      reportID={id}
                      filed={filed}
                    />
                  );
                })}
              </div>
            ) : (
              ""
            )}

            {(filedreports !== false && filedreports.length === 0) ||
            (deptReports && deptReports.length === 0) ? (
              <div className="text-center bg-gray-100 rounded-lg p-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto text-blue-500 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h2 className="text-2xl text-gray-600 font-semibold">
                  Hurray, no reports filed as of now. Happy Hours..
                </h2>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentAdminDB;
