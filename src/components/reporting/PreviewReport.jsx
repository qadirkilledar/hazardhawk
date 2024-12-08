import React from "react";
import RenderHTMLContent from "../../utils/RenderHTMLContent";
import { MapPin, Paperclip, X } from "lucide-react";

const PreviewReport = ({
  reporttype,
  description,
  latitude,
  longitude,
  anonymousReporting,
  handleConfirmation,
  images,
}) => {
  const firstImage = images[0];
  const additionalImagesCount = images.length - 1;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Report Preview</h3>
        <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm">
          {reporttype}
        </span>
      </div>

      {/* Location Info */}
      <div className="flex items-center space-x-2 text-blue-300">
        <MapPin className="w-5 h-5" />
        <span>
          {latitude
            ? `Latitude: ${latitude}, Longitude: ${longitude}`
            : "Location not available"}
        </span>
      </div>

      {/* Anonymous Badge */}
      {anonymousReporting && (
        <div className="inline-block px-3 py-1 bg-slate-700 text-blue-300 rounded-full text-sm">
          Anonymous Report
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-slate-700 rounded-lg p-4 text-white">
          <RenderHTMLContent htmlContent={description} />
        </div>
      )}

      {/* Attachments */}
      {firstImage && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-blue-300">
            <Paperclip className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Attachments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Attachment ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleConfirmation}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default PreviewReport;
