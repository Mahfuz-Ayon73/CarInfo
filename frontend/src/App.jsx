import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState("");

  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  async function handleSubmit() {
    let base64Image = null;

    if (image) {
      base64Image = await convertImageToBase64(image);
    }

    const payload = {
      text: content,
      image: base64Image,
    };

    const response = await fetch("https://carinfox-7hsh.onrender.com/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setData(result.data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-black shadow-2xl rounded-3xl p-8 space-y-6 border border-red-700">
        <h1 className="text-4xl font-extrabold text-center text-red-500 animate-pulse">
          🚗 Car Info Assistant
        </h1>

        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter prompt about the car (e.g. 'Tell me about Tesla Model S')"
          className="w-full border border-red-600 bg-black text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500 transition-shadow duration-300 hover:shadow-lg"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-red-700 transition-transform duration-300 hover:scale-105"
        />

        {image ? (
          <div className="mt-4">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-40 object-contain mx-auto rounded-lg border border-red-600 shadow-md transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <p className="text-center text-gray-400">No image selected</p>
        )}

        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg"
          >
            Generate Info
          </button>
        </div>

        <div className="mt-6 bg-black p-6 rounded-lg border border-red-600 shadow-md transition-opacity duration-500 hover:opacity-90">
          {data ? (
            <div className="prose prose-invert text-gray-200">
              <ReactMarkdown>{data}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-500 text-center">No data to display yet...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
