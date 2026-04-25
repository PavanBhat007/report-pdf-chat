import React, { useState, useRef } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial"); // initial, uploading, success, fail
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
      const response = await fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("fail");
      }
    } catch (error) {
      setStatus("fail");
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="p-2 border border-gray-200 rounded-lg my-6">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {file && (
        <div className="px-4">
          <p>
            <strong>Name:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB
          </p>
          <p>
            <strong>Type:</strong> {file.type}
          </p>
        </div>
      )}

      <button onClick={triggerFileInput} className="px-4 py-1">
        {file ? "Change File" : "Select File"}
      </button>


      {file && status === "initial" && (
        <button onClick={handleUpload} className="mt-2 px-4 py-2">
          Upload
        </button>
      )}

      {status === "uploading" && <p>⏳ Uploading...</p>}
      {status === "success" && <p>✅ File uploaded successfully!</p>}
      {status === "fail" && <p>❌ Upload failed!</p>}
    </div>
  );
};

function ReportUpload() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted !");
    console.log(e);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FileUploader />
      </form>
    </div>
  );
}

export default ReportUpload;
