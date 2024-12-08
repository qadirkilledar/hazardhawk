import React, { useState, useRef, useContext } from "react";
import MyMap from "./Maps";
import getLocation from "./mapScript";
import PreviewReport from "./PreviewReport";
import myContext from "../../context/data/myContext";
import getUsernameByUID from "../../utils/GetUser";
import { auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import { uploadFile } from "../../utils/UploadFile";
import Navbar from "../Navbar";
import { Camera, MapPin, X } from "lucide-react";

const Reporting = () => {
  const context = useContext(myContext);
  const { sendReport } = context;
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [latitude, setLatitude] = useState(-1);
  const [longitude, setLongitude] = useState(-1);
  const [anonymousReporting, setAnonymousReporting] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const editorRef = useRef(null);

  const uid = auth?.currentUser?.uid;
  const [u_name, setUser] = useState("");

  getUsernameByUID(uid).then((username) => {
    if (username) setUser(username);
    else console.log(`User with UID ${uid} not found.`);
  });

  // Existing handlers remain the same
  const handleMediaChange = async (e) => {
    try {
      const url = await uploadFile(e.target.files[0]);
      setMediaFile(e.target.files[0]);
      if (url !== null) {
        setImageUrl((prev) => [...prev, url]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handlePreview = async () => {
    const content = editorRef.current.getContent();
    setDescription(content);
    setShowPreview(true);
  };

  const handleConfirmation = async (e) => {
    e.preventDefault();
    if (description.trim() === "") return;

    const reportSent = await sendReport(
      uid,
      u_name,
      incidentType,
      description,
      latitude,
      longitude,
      imageUrl,
      anonymousReporting
    );

    if (reportSent === true) {
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("Report submitted successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">HazardHawk</h1>
              <p className="text-blue-300">Report an Incident</p>
            </div>

            <form className="space-y-6">
              {/* Incident Type */}
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Incident Type
                </label>
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select an incident type
                  </option>
                  <option value="Accident">Accident</option>
                  <option value="Cybersecurity Concerns">
                    Cybersecurity Concerns
                  </option>
                  <option value="Crime">Crime</option>
                  <option value="Infrastructure Issue">
                    Infrastructure Issue
                  </option>
                  <option value="Suspicious activities">
                    Suspicious activities
                  </option>
                  <option value="Social Issues">Social Issues</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Location
                </label>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    getLocation()
                      .then((location) => {
                        setLatitude(location.latitude);
                        setLongitude(location.longitude);
                      })
                      .catch((error) => alert(error));
                  }}
                  className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition duration-200"
                >
                  <MapPin className="mr-2" />
                  Get My Location
                </button>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Description
                </label>
                <Editor
                  apiKey="aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    skin: "oxide-dark",
                    content_css: "dark",
                    height: 400,
                    menubar: false,
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                  }}
                  initialValue="Give report description"
                />
              </div>

              {/* Media Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-blue-300 mb-2">
                  Upload Media (optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer hover:bg-slate-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-8 h-8 mb-3 text-blue-300" />
                      <p className="mb-2 text-sm text-blue-300">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleMediaChange}
                      multiple
                    />
                  </label>
                </div>

                {/* Image Preview */}
                {imageUrl.length > 0 && (
                  <div className="flex flex-wrap gap-4 mt-4">
                    {imageUrl.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Upload ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() =>
                            setImageUrl((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Anonymous Reporting */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="anonymousReporting"
                  checked={anonymousReporting}
                  onChange={() => setAnonymousReporting(!anonymousReporting)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="anonymousReporting" className="text-white">
                  Report Anonymously
                </label>
              </div>
            </form>

            <button
              onClick={handlePreview}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
            >
              Preview Report
            </button>
          </div>

          {/* Map Section */}
          <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">
              Location Details
            </h2>
            {latitude !== -1 ? (
              <MyMap latitude={latitude} longitude={longitude} />
            ) : (
              <div className="flex items-center justify-center h-64 bg-slate-700 rounded-lg">
                <p className="text-blue-300">Please get your location first</p>
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <PreviewReport
                reporttype={incidentType}
                images={imageUrl}
                latitude={latitude}
                longitude={longitude}
                anonymousReporting={anonymousReporting}
                description={description}
                handleConfirmation={handleConfirmation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reporting;
