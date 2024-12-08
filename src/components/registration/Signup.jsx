import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../loader/Loader";
import CommunityForumPoster from "../posters/CommunityForumPoster";

const Mobileposter1 =
  "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/xiakv9qelywtgkjcujtw.png";
const Mobileposter2 =
  "https://res.cloudinary.com/drlkkozug/image/upload/v1705042856/mztjmbz6liswerp5cdi8.png";
const desktopImage =
  "https://res.cloudinary.com/drlkkozug/image/upload/v1705042855/tsjzffj80djfqy2ixjrz.png";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const { profiles, setProfiles } = context;

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Login failed, Check your credentials!", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(loading);
    }
  };

  const signup = async () => {
    setLoading(true);
    if (name === "" || email === "" || password === "") {
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(fireDB, "users");
      await addDoc(userRef, user);

      setProfiles({
        ...profiles,
        email: user.email,
        userid: user.uid,
        fullname: user.name,
      });

      toast.success("Signup Succesfully", {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      await login();
    } catch (error) {
      console.log(error);

      if (password.length < 6) {
        toast.info("Password should consist of atleast 6 chars", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLoading(false);
      } else {
        toast.info("User already exits!", {
          position: "top-right",
          autoClose: 800,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col md:flex-row">
      {/* Left side - Welcome content */}
      <div className="hidden md:flex md:w-3/5 p-8 flex-col justify-center items-center">
        <div className="mt-12 text-center max-w-2xl">
          <h1 className="text-4xl font-serif text-blue-400 mb-6">
            Welcome to HazardHawk!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            "HazardHawk is a comprehensive safety and emergency management
            application designed for urban environments. The application aims to
            enhance community safety."
          </p>
          <p className="text-lg text-gray-600">
            "Building a Positive Environment – Our forum embraces positivity!
            Let's create a space where we uplift, support, and inspire each
            other on HazardHawk."
          </p>
        </div>
      </div>

      {/* Right side - Signup form */}
      <div className="w-full md:w-2/5 flex items-center justify-center p-6">
        {loading && <Loader />}
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/logo.jpg"
              alt="HazardHawk Logo"
              className="w-12 h-12 rounded-full"
            />
            <h1 className="text-2xl font-semibold ml-3 text-gray-800">
              HazardHawk
            </h1>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="What should we call you?"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="name@domain.com"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              placeholder="Shhh. its secret, Keep it strong"
            />
            <button
              onClick={signup}
              type="button"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-6 text-gray-600">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
