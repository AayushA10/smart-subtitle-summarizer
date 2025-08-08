import React, { useState } from "react";
import axios from "axios";

const UploadAudioForm = ({ setResult }) => {
  const [file, setFile] = useState(null);

  const handleAudioSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an .mp3 file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/transcribe-mp3/", formData);
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
      alert("Failed to transcribe or extract entities.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleAudioSubmit} style={{ marginBottom: "2rem", marginTop: "3rem" }}>
      <h3>🎤 Transcribe & Summarize from Audio (.mp3)</h3>

      <input
        type="file"
        accept=".mp3"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: "10px" }}
      />

      <button
        type="submit"
        style={{
          padding: "10px 20px",
          backgroundColor: "#6f42c1",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          marginLeft: "1rem"
        }}
      >
        Upload & Transcribe
      </button>
    </form>
  );
};

export default UploadAudioForm;
