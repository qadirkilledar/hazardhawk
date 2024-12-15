import React, { useContext, useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import RenderHTMLContent from '../../utils/RenderHTMLContent';
import { MdNextPlan, MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import myContext from '../../context/data/myContext';
import { IoCheckmarkDone } from 'react-icons/io5';

const Report = ({ reporttype, description, latitude, longitude,
    anonymousReporting, images, deleteReport, reportUserID = -1, reportID, filed = false }) => {
    
    const [imageCnt, setImgCnt] = useState(0);
    const context = useContext(myContext);
    const { addNotification, UpdateReportState } = context;

    const firstImage = images[imageCnt];
    const totalImages = images.length;

    const handleSlider = () => {
        setImgCnt((prev) => (prev + 1) % totalImages);
    };

    const reportFiled = async () => {
        await addNotification(reportUserID, reportID);
        await UpdateReportState(reportID);
        toast.success("Report filed successfully!");
    };

    return (
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            <div className="flex flex-wrap justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">Report Details</h3>
                {filed && (
                    <div className="text-green-500 text-4xl">
                        <IoCheckmarkDone />
                    </div>
                )}
            </div>

            <div className="mb-4">
                <p className="text-lg font-semibold text-gray-700">Report Type:</p>
                <p className="text-xl text-gray-900">{reporttype}</p>
            </div>

            {anonymousReporting && (
                <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-700">Anonymous Reporting:</p>
                    <p className="text-xl text-gray-500">Yes</p>
                </div>
            )}

            <div className="mb-4">
                <p className="text-lg font-semibold text-gray-700">Location:</p>
                <p className="text-xl text-gray-900">{latitude}, {longitude}</p>
            </div>

            {images.length > 0 && (
                <div className="relative mb-6 overflow-hidden rounded-lg shadow-lg border-4 border-blue-500 bg-blue-50">
                    <img
                        src={firstImage}
                        alt={`Image ${imageCnt + 1}`}
                        className="w-full max-h-96 object-contain p-2 rounded-lg"
                    />
                    {totalImages > 1 && (
                        <button
                            onClick={handleSlider}
                            className="absolute top-0 right-0 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 shadow-lg"
                        >
                            <MdNextPlan size={24} />
                        </button>
                    )}
                </div>
            )}

            <div className="mb-4">
                <p className="text-lg font-semibold text-gray-700">Description:</p>
                <RenderHTMLContent content={description} className="text-gray-800 mt-2" />
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={reportFiled}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-md transition duration-300"
                >
                    Mark as Filed
                </button>
                <button
                    onClick={deleteReport}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center"
                >
                    <MdDeleteOutline className="mr-2" /> Delete
                </button>
            </div>
        </div>
    );
};

export default Report;
