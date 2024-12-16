import React, { useContext, useRef, useState } from "react";
import myContext from "../../../context/data/myContext";
import { auth } from "../../../firebase/FirebaseConfig";
import { Editor } from "@tinymce/tinymce-react";
import getUsernameByUID from "../../../utils/GetUser";
import { uploadFile } from "../../../utils/UploadFile";
import PostPreview from "./PostPreview";

function AddPost() {
  const context = useContext(myContext);
  const { posts, setPosts, addPost } = context;

  const [useImageUrl, setUseImageUrl] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const [postPreview, setPostPreview] = useState(false);

  const handleCheckboxChange = () => {
    setUseImageUrl(!useImageUrl);
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImageFile(file);
  };

  let uid;

  try {
    uid = auth.currentUser.uid;
  } catch (err) {}

  const [u_name, setUser] = useState("");

  getUsernameByUID(uid).then((username) => {
    if (username) {
      setUser(username);
      posts.authorId = uid;
      posts.author = u_name;
    }
  });

  // Reference to the TinyMCE editor
  const editorRef2 = useRef(null);

  const handlePreview = async () => {
    const content = await editorRef2.current.getContent();

    // Update state using the state updater function
    setPosts((prevPosts) => ({ ...prevPosts, description: content }));

    if (!(imageFile == null)) {
      try {
        const imageUrlfromFB = await uploadFile(imageFile);

        // Update state with the image URL
        if (imageUrlfromFB !== null) {
          setPosts((prevPosts) => ({ ...prevPosts, imageUrl: imageUrlfromFB }));
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setPostPreview(true);
  };

  const uploadPost = async () => {
    const postUploadstate = await addPost();

    return postUploadstate;
  };

  return (
    <div className="min-h-screen bg-sky-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl space-y-8 bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl border border-sky-100 p-10">
        <div className="flex items-center justify-center space-x-4">
          <h1 className="text-2xl font-extrabold text-sky-800 text-center">
            Publish Post
          </h1>
          <span>
            <img
              src="https://res.cloudinary.com/drlkkozug/image/upload/v1705042854/ynrer4jfk9ywantavge8.png"
              alt="New Post"
              width={50}
              className="rounded-full border-2 border-sky-200"
            />
          </span>
        </div>

        {/* Title Input */}
        <div>
          <input
            type="text"
            value={posts.title}
            onChange={(e) => setPosts({ ...posts, title: e.target.value })}
            name="title"
            className="w-full px-4 py-3 rounded-lg bg-sky-100/50 text-sky-900 placeholder-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
            placeholder="Add Post title"
          />
        </div>

        {/* Editor */}
        <div className="border-2 border-sky-200 rounded-lg overflow-hidden">
          <Editor
            apiKey="aflhte2kchgwcgg6wo27mxqz79lhro2h443k16fftegeoo6x"
            onInit={(evt, editor) => (editorRef2.current = editor)}
            init={{
              menubar: false,
              height: 500,
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              content_style: "body { color: #0C4A6E; }", // Dark sky blue text
            }}
            initialValue="Post Description"
          />
        </div>

        {/* Image Upload Toggle */}
        <div className="flex items-center space-x-4 bg-sky-100/50 p-4 rounded-lg">
          <div className="flex-grow">
            {!useImageUrl ? (
              <label className="text-sky-800">Want to upload Image URL</label>
            ) : (
              <label className="text-sky-800">Want to upload Image File</label>
            )}
          </div>
          <input
            type="checkbox"
            id="useImageUrl"
            checked={useImageUrl}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-sky-600 rounded focus:ring-sky-500"
          />
        </div>

        {/* Image Input */}
        <div>
          {useImageUrl ? (
            <input
              type="text"
              value={posts.imageUrl}
              onChange={(e) => setPosts({ ...posts, imageUrl: e.target.value })}
              name="imageurl"
              className="w-full px-4 py-3 rounded-lg bg-sky-100/50 text-sky-900 placeholder-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
              placeholder="Add an Image Url"
            />
          ) : (
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full px-4 py-3 rounded-lg bg-sky-100/50 text-sky-900 file:mr-4 file:rounded-full file:border-0 file:bg-sky-200 file:px-4 file:py-2 file:text-sky-700"
            />
          )}
        </div>

        {/* Category Input */}
        <input
          type="text"
          value={posts.category}
          onChange={(e) => setPosts({ ...posts, category: e.target.value })}
          name="category"
          className="w-full px-4 py-3 rounded-lg bg-sky-100/50 text-sky-900 placeholder-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
          placeholder="Set Category"
        />

        {/* Location Input */}
        <input
          type="text"
          value={posts.location}
          onChange={(e) => setPosts({ ...posts, location: e.target.value })}
          name="location"
          className="w-full px-4 py-3 rounded-lg bg-sky-100/50 text-sky-900 placeholder-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
          placeholder="Location.."
        />

        {/* Tags Input */}
        <input
          type="text"
          value={posts.tags}
          onChange={(e) => setPosts({ ...posts, tags: e.target.value })}
          name="tags"
          className="w-full px-4 py-3 rounded-lg bg-sky-100/50 text-sky-900 placeholder-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition duration-300"
          placeholder="Add Tags (Separated by commas without #)"
        />

        {/* Preview Button */}
        <button
          onClick={handlePreview}
          className="w-full py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition duration-300 ease-in-out transform hover:scale-101 shadow-md hover:shadow-lg"
        >
          Get Post Preview
        </button>

        {/* Conditional Preview and Publish */}
        {postPreview && (
          <>
            <PostPreview posts={posts} />
            <button
              onClick={uploadPost}
              className="w-full py-3 bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition duration-300 ease-in-out transform hover:scale-101 shadow-md hover:shadow-lg"
            >
              Publish Post to Community
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default AddPost;
