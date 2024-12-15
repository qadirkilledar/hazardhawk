import React, { useContext, useState } from 'react';
import { FaHandHoldingHeart } from "react-icons/fa6";
import { auth, fireDB } from '../../../firebase/FirebaseConfig';
import myContext from '../../../context/data/myContext';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import CommentForm from './CommentForm';
import CommentSection from './CommentSection';
import RenderHTMLContent from '../../../utils/RenderHTMLContent';
import { MdOutlineDangerous } from "react-icons/md";
import { toast } from 'react-toastify';

const Post = ({ post }) => {
    const { title, tags, description, imageUrl, id, authorId, category, location, author, likes } = post;
    const tagList = tags.split(", ");
    const context = useContext(myContext);
    const { followUser, flagPost } = context;
    const userID = JSON.parse(localStorage.getItem('user')).user.uid;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);

    const likePost = async () => {
        try {
            if (auth.currentUser == null) {
                toast.dark('Please log in/sign up to like posts.');
                return;
            }
            const userId = auth.currentUser.uid;
            const postId = id;
            const likeRef = doc(fireDB, 'likes', `${userId}_${postId}`);
            const likeDoc = await getDoc(likeRef);
            if (likeDoc.exists()) {
                const updatedVotes = post.likes - 1;
                const updatedPost = { ...post, likes: updatedVotes };
                await setDoc(doc(fireDB, 'posts', id), updatedPost);
                toast.dark('Post Downvoted 👎');
                await deleteDoc(likeRef);
            } else {
                const updatedVotes = post.likes + 1;
                const updatedPost = { ...post, likes: updatedVotes };
                await setDoc(doc(fireDB, 'posts', id), updatedPost);
                toast.success('Post Upvoted 👍');
                await setDoc(likeRef, { userId, postId });
            }
        } catch (error) {
            console.error('Error while liking a post:', error);
        }
    };

    const followActivity = async () => {
        await followUser(userID, authorId, author);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleDescription = () => setDescriptionExpanded(!isDescriptionExpanded);
    const truncatedDescription = description && description.length > 150 ? description.substring(0, 150) + '...' : description;

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 shadow-lg max-w-md mx-auto mt-6 overflow-hidden transition-transform transform hover:scale-105">
            {/* Post Title */}
            <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-700">{title}</h2>

            {/* Author */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8">
                        <img src="https://res.cloudinary.com/drlkkozug/image/upload/v1705071144/y9evmbpdht5ezj3fkal9.jpg" alt="User Avatar" className="rounded-full border-2 border-blue-500" />
                    </div>
                    <span className="text-blue-600 font-semibold text-sm">{author}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition text-sm" onClick={followActivity}>Follow</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition flex items-center text-sm" onClick={flagPost}>
                        Flag <MdOutlineDangerous className="ml-1 text-lg" />
                    </button>
                </div>
            </div>

            {/* Location and Category */}
            <div className="flex items-center justify-between mb-3 text-sm">
                <div className="flex items-center">
                    <span className="text-blue-600 font-semibold">Location:</span>
                    <span className="text-blue-800 ml-1">{location}</span>
                </div>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-md">{category}</span>
            </div>

            {/* Media (Image) */}
            <div className="flex justify-center mb-3">
                <img src={imageUrl} alt="Post Media" className="w-full h-48 object-cover rounded-md shadow-md cursor-pointer transition-transform transform hover:scale-105" onClick={openModal} />
            </div>

            {/* Post Description */}
            <div className="text-blue-800 leading-relaxed mb-3 text-sm">
                <RenderHTMLContent htmlContent={isDescriptionExpanded ? description : truncatedDescription} />
            </div>
            {description && !isDescriptionExpanded && (
                <button onClick={toggleDescription} className="text-blue-600 text-sm">Read more...</button>
            )}
            {isDescriptionExpanded && (
                <button onClick={toggleDescription} className="text-blue-600 text-sm">Show less</button>
            )}

            {/* Upvotes */}
            <div className="flex items-center space-x-2 mb-3 gap-3 ml-2">
                <div className="flex space-x-2" onClick={likePost}>
                    <span className="text-xl text-blue-600 my-1 cursor-pointer"><FaHandHoldingHeart /></span>
                    <span className="text-blue-800 text-lg">{likes}</span>
                </div>
            </div>

            {/* Tags */}
            <div className="text-sm mb-3">
                {tagList.slice(0, 3).map((item, index) => (
                    <span className="bg-blue-200 text-blue-800 mx-1 px-2 py-1 rounded-md" key={index}>#{item}</span>
                ))}
            </div>

            {/* Comments Section */}
            {userID && <CommentForm post_id={id} />}
            <CommentSection postId={id} />

            {/* Modal for Full-Screen Image */}
            {isModalOpen && (
                <div
                    id="modal-background"
                    className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative max-w-3xl">
                        <img src={imageUrl} alt="Full-Screen Post Media" className="w-full h-auto rounded-lg shadow-lg" />
                        <button
                            className="absolute top-3 right-3 text-white text-3xl border-none bg-transparent cursor-pointer"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Post;
