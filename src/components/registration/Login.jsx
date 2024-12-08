import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/data/myContext";
import { auth } from "../../firebase/FirebaseConfig";

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  useEffect(() => {
    const isUserloggedin = localStorage.getItem("user");

    if (isUserloggedin) {
      navigate("/report");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
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
          Login
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-blue-50 border border-blue-100 focus:border-blue-300 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            placeholder="Password"
          />
          <button
            onClick={login}
            type="button"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
