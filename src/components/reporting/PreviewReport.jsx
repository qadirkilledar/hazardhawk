import React from "react";
import RenderHTMLContent from "../../utils/RenderHTMLContent";
import { MapPin, CheckCircle, FileImage } from "lucide-react";

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
    <div className="p-8 space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">Report Preview</h2>
        <p className="text-blue-300">Review Your Incident Report</p>
      </div>

      {/* Incident Type */}
      <div className="bg-slate-700 rounded-lg p-4">
        <h3 className="text-blue-300 text-sm font-medium mb-2">
          Incident Type
        </h3>
        <p className="text-white text-lg">{reporttype || "Not Specified"}</p>
      </div>

      {/* Location Info */}
      <div className="bg-slate-700 rounded-lg p-4">
        <div className="flex items-center text-blue-300 mb-2">
          <MapPin className="mr-2 w-5 h-5" />
          <h3 className="text-sm font-medium">Location</h3>
        </div>
        <p className="text-white">
          {latitude && longitude
            ? `Latitude: ${latitude}, Longitude: ${longitude}`
            : "Location not available"}
        </p>
      </div>

      {/* Anonymous Badge */}
      {anonymousReporting && (
        <div className="bg-blue-600/20 border border-blue-500 rounded-lg p-3 text-center">
          <p className="text-blue-300 flex items-center justify-center">
            <CheckCircle className="mr-2 w-5 h-5" />
            Anonymous Report
          </p>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-blue-300 text-sm font-medium mb-2">
            Description
          </h3>
          <div
            className="text-white prose prose-invert"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}

      {/* Attachments */}
      {images && images.length > 0 && (
        <div className="bg-slate-700 rounded-lg p-4">
          <div className="flex items-center text-blue-300 mb-2">
            <FileImage className="mr-2 w-5 h-5" />
            <h3 className="text-sm font-medium">Attachments</h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Attachment ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleConfirmation}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200 flex items-center justify-center"
        >
          <CheckCircle className="mr-2" />
          Submit Report
        </button>
      </div>
    </div>
  );
};

export default PreviewReport;
