import { useState } from "react";
import { getShortUrlWithoutUser } from "../Apis/shortUrl.api";

function CreateUrl() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);


  const handleShorten = async () => {
    if (!url.trim()) return;

    const payload = { url };

    try {
      const { shortUrl } = await getShortUrlWithoutUser(payload);
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

       
      </div>
    </div>
  );
}

export default CreateUrl;