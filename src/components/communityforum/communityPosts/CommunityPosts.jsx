import React, { useContext } from 'react'; 
import Post from './Post';
import { Link } from 'react-router-dom';
import myContext from '../../../context/data/myContext';
import Filter from './Filter';

const CommunityPosts = () => {
    const context = useContext(myContext);
    const { post, searchkey, setPostCategory, categoryType } = context;

    const uniqueCategories = [...new Set(post.map((item) => item.category))];
    const filteredPosts = post
        .filter(
            (obj) =>
                obj.title.toLowerCase().includes(searchkey.toLowerCase()) ||
                obj.tags.toLowerCase().includes(searchkey.toLowerCase())
        )
        .filter((obj) => obj.category.toLowerCase().includes(categoryType.toLowerCase()));

    return (
        <div
            className="min-h-screen"
            style={{
                backgroundImage: "linear-gradient(to right, #0f172a, #1e293b, #334155)",
                color: "white",
                fontFamily: "Arial, sans-serif",
            }}
        >
            {/* Filter Section */}
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
                <div
                    className="rounded-lg shadow-md"
                    style={{
                        backgroundColor: "#1e293b",
                        border: "1px solid #334155",
                        padding: '1.5rem',
                    }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <p
                            className="font-semibold text-2xl"
                            style={{ color: '#f1f5f9' }}
                        >
                            Filters
                        </p>
                        <button
                            onClick={() => setPostCategory('')}
                            className="px-4 py-2 rounded-lg text-sm shadow-md transition-all"
                            style={{
                                backgroundColor: '#475569',
                                color: '#f1f5f9',
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <div>
                        <select
                            value={categoryType}
                            onChange={(e) => setPostCategory(e.target.value)}
                            className="w-full px-4 py-2 rounded-md border outline-none text-sm shadow-md"
                            style={{
                                backgroundColor: '#1e293b',
                                color: '#f1f5f9',
                                borderColor: '#475569',
                            }}
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full sm:w-1/3">
                    <Filter />
                </div>
            </div>

            {/* Add Post Button */}
            <div className="fixed bottom-6 right-6">
                <Link to="/add-post">
                    <div
                        className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-110"
                        style={{ backgroundColor: 'rgb(30 41 59)' }}
                    >
                        <img
                            src="https://res.cloudinary.com/drlkkozug/image/upload/v1705042854/ynrer4jfk9ywantavge8.png"
                            alt="Add Post"
                            className="w-8 h-8"
                        />
                    </div>
                </Link>
            </div>

            {/* Posts Section */}
            <div className="max-w-4xl mx-auto px-4 mt-6">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((postItem, index) => (
                        <Post key={index} post={postItem} />
                    ))
                ) : (
                    <div className="text-center mt-10">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="No posts"
                            className="mx-auto mb-4"
                        />
                        <h2 className="text-2xl font-semibold" style={{ color: 'rgb(241 245 249)' }}>
                            No posts found.
                        </h2>
                        <p style={{ color: 'rgb(241 245 249)' }}>Be the first to write on this topic!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommunityPosts;
