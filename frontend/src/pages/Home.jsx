import { useEffect } from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard", { replace: true });
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged will handle redirect
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100">
      <section className="w-full max-w-xl p-8 rounded-3xl shadow-xl bg-white/80 flex flex-col items-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg transition-all duration-700">
          StartupToolkit
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-8 font-medium transition-all duration-700">
          Your SaaS marketplace launchpad 🚀
        </p>
        <button
          className="mt-2 px-8 py-4 text-lg font-semibold rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </button>
      </section>
    </main>
  );
}

// Add fade-in animation
// In your tailwind.config.js, ensure 'animate-fade-in' is available or add it via plugin or extend.
