import axios from "axios";
import { useEffect, useState } from "react";
import { getAllUrls, getShortUrl } from "../Apis/shortUrl.api";
import { useSelector, useDispatch } from "react-redux";
import { setAllUrls, loginSuccess } from "../Store/Slices/authSlice";
import { loginUser } from "../Apis/userAuth.api";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();

  const { isAuthenticated, allUrls, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleUrls = async () => {
      const urls = await getAllUrls();
      dispatch(setAllUrls(urls));
    };

    handleUrls();
  }, [dispatch, allUrls]);

  const handleShorten = async () => {
    if (!url.trim()) return;

    const payload = { url, customUrl };

    try {
      const { shortUrl } = await getShortUrl(payload);
      setShortUrl(shortUrl);
    } catch (err) {
      alert(err?.response?.data?.message || "Error creating short URL");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-2xl space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-800">🔗 URL Shortener</h2>

        <input
          type="text"
          placeholder="Enter your URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {isAuthenticated && (
          <input
            type="text"
            placeholder="Custom short URL (optional)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="w-full p-3 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}

        <button
          onClick={handleShorten}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold shadow-md transition"
        >
          ✂️ Shorten URL
        </button>

        {shortUrl && (
          <div className="bg-gray-50 border p-4 rounded-xl text-center">
            <p className="text-sm text-gray-500 mb-2">Here's your shortened URL:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <a
                href={`http://localhost:5000/${shortUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-medium underline break-all"
              >
                {`http://localhost:5000/${shortUrl}`}
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`http://localhost:5000/${shortUrl}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className={`px-4 py-2 text-sm ${copied ? "bg-green-600" : "bg-blue-600"} text-white rounded-full hover:bg-opacity-90 transition-all shadow-sm`}
              >
                {copied ? "✅ Copied!" : "📋 Copy"}
              </button>
            </div>
          </div>
        )}

        {allUrls.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3 text-blue-700">Your Shortened URLs</h3>
            <div className="space-y-3">
              {allUrls.map((url, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <a
                      href={`http://localhost:5000/${url.shortUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 font-medium underline break-all"
                    >
                      {`http://localhost:5000/${url.shortUrl}`}
                    </a>
                    <p className="text-sm text-gray-500 truncate">{url.originalUrl}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;