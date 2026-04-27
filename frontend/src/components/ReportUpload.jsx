import React, { useState, useRef } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial");
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setStatus("initial");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      setStatus(res.ok ? "success" : "fail");
    } catch {
      setStatus("fail");
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-medium mb-4">Upload Document</h2>

      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-gray-400 transition"
      >
        <p className="text-sm text-gray-500">
          {file ? "Change file" : "Click to upload PDF"}
        </p>
      </div>

      {file && (
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      {file && status === "initial" && (
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Upload
        </button>
      )}

      {status === "uploading" && (
        <p className="mt-4 text-sm text-blue-500">Uploading...</p>
      )}
      {status === "success" && (
        <p className="mt-4 text-sm text-green-600">
          Uploaded successfully
        </p>
      )}
      {status === "fail" && (
        <p className="mt-4 text-sm text-red-500">
          Upload failed
        </p>
      )}
    </div>
  );
};

export default function ReportUpload() {
  return <FileUploader />;
}