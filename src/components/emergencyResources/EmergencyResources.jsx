import React from 'react';
import DisasterManager from './DisasterManager';

const earthquake = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/smqt8fp6cyque2uw9qhd.jpg";
const flood = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/qaldkrd1evov6rthgl5m.jpg";
const hurricane = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/cvscgtfwrnd6lqbxxgpu.jpg";
const thunderstorm = "https://res.cloudinary.com/drlkkozug/image/upload/v1705042855/ifkhne728mqijv4ftscn.jpg";

const EmergencyResources = () => {
    const emergencyServicesData = [
        {
            title: 'Local Police Department',
            contactNumber: '100',
            description: 'Dedicated to ensuring the safety and security of our community.',
            url: "https://dmsouthwest.delhi.gov.in/police/"
        },
        {
            title: 'Fire Department',
            contactNumber: '101',
            description: 'Responding to fire emergencies and promoting fire safety in the neighborhood.',
            url: "https://delhi.gov.in/page/fire-services"
        },
        {
            title: 'Emergency Medical Services (EMS)',
            contactNumber: '108',
            description: 'Providing swift medical assistance during emergencies.',
            url: "https://zhl.org.in/blog/medical-emergency-numbers-india/"
        },
        {
            title: 'National Emergency Hotline',
            contactNumber: '112',
            description: 'Connect with emergency services nationwide for immediate assistance.',
            url: "https://indianhelpline.co.in/list-of-emergency-numbers-in-india-3/"
        },
    ];

    const disasterData = [
        {
            title: 'Earthquake',
            description: 'Guidelines on what to do during an earthquake.',
            link: "https://www.ready.gov/earthquakes",
            image: earthquake,
        },
        {
            title: 'Flood',
            description: 'Guidelines on how to stay safe during a flood.',
            link: 'https://www.ready.gov/floods',
            image: flood,
        },
        {
            title: 'Hurricane',
            description: 'Steps to take before and during a hurricane.',
            link: 'https://www.ready.gov/hurricanes',
            image: hurricane,
        },
        {
            title: 'Thunderstorm',
            description: 'Steps to take before and during a thunderstorm.',
            link: 'https://www.ready.gov/thunderstorms-lightning',
            image: thunderstorm
        },
    ];

    return (
        <div className="py-8">
            <h1 className="text-lg lg:text-3xl text-center font-bold font-serif text-slate-800">
                Emergency Services Information Hub
            </h1>
            <div className="mx-[10%] lg:grid lg:grid-cols-4 mt-7 lg:gap-y-7 gap-6">
                {emergencyServicesData.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col"
                    >
                        <h2 className="text-xl font-bold mb-2 text-slate-900">{service.title}</h2>
                        <p className="text-gray-700 mb-4">{service.description}</p>
                        <p className="text-slate-800 font-semibold text-lg">{`Contact: ${service.contactNumber}`}</p>
                        <a
                            href={service.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-sm mt-2 hover:underline"
                        >
                            Click to know more
                        </a>
                    </div>
                ))}
            </div>

            {/* Natural Disasters Section */}
            <h1 className="text-lg lg:text-3xl text-center font-bold font-serif text-slate-800 mt-16">
                What to do in Natural Disasters?
            </h1>
            <p className="text-center my-4 text-gray-600">
                Guidance on actions to take during natural disasters such as earthquakes, floods, and storms.
            </p>
            <div className="mx-[10%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {disasterData.map((disaster, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4"
                    >
                        <img
                            src={disaster.image}
                            alt={disaster.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-slate-900 mb-2">{disaster.title}</h2>
                            <p className="text-gray-700 text-sm mb-4">{disaster.description}</p>
                            <a
                                href={disaster.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline text-sm font-medium"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmergencyResources;
