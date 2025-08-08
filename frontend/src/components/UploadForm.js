import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ setResult, onLengthChange, summaryLength }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a .srt file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("length", summaryLength);

    try {
      const res = await axios.post("http://127.0.0.1:8000/clean-subtitle/", formData);
      const cleanedData = res.data;

      // NER extraction
      const nerRes = await axios.post("http://127.0.0.1:8000/extract-ner/", {
        text: cleanedData.cleaned_text
      });

      setResult({
        ...cleanedData,
        entities: nerRes.data.entities
      });
    } catch (err) {
      alert("Upload or NER failed.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      {file && (
        <p style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "1rem" }}>
          📄 <code>{file.name}</code>
        </p>
      )}

      <div style={{ marginBottom: "1rem" }}>
        <label><strong>Select Summary Length:</strong></label><br />
        <select
          value={summaryLength}
          onChange={(e) => onLengthChange(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            marginTop: "0.5rem",
            width: "220px"
          }}
        >
          <option value="short">Short (2 lines)</option>
          <option value="medium">Medium (5 lines)</option>
          <option value="long">Long (8 lines)</option>
        </select>
      </div>

      <input
        type="file"
        accept=".srt"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit" style={{
        padding: "10px 20px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        marginLeft: "1rem"
      }}>
        Upload & Summarize
      </button>
    </form>
  );
};

export default UploadForm;
