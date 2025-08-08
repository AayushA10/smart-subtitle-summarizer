import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import UploadAudioForm from "./components/UploadAudioForm";
import ResultDisplay from "./components/ResultDisplay";
import axios from "axios";

function App() {
  const [result, setResult] = useState(null);
  const [summaryLength, setSummaryLength] = useState("medium");

  const updateSummary = async (newLength) => {
    setSummaryLength(newLength);
    if (!result?.cleaned_text) return;

    try {
      const res = await axios.post("http://127.0.0.1:8000/summarize-text/", {
        text: result.cleaned_text,
        length: newLength,
      });

      setResult((prev) => ({
        ...prev,
        summary: res.data.summary,
      }));
    } catch (err) {
      alert("Failed to summarize again.");
      console.error(err);
    }
  };

  const handleResult = async (initialResult) => {
    try {
      const res2 = await axios.post("http://127.0.0.1:8000/extract-ner/", {
        text: initialResult.cleaned_text,
      });

      setResult({
        ...initialResult,
        entities: res2.data.entities,
      });
    } catch (err) {
      alert("NER extraction failed.");
      console.error(err);
      setResult(initialResult); // fallback
    }
  };

  return (
    <div
      className="App"
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
        🎬 Smart Subtitle Cleaner + Summarizer + 🧠 NER
      </h2>

      {/* SRT Upload */}
      <UploadForm
        setResult={handleResult}
        onLengthChange={updateSummary}
        summaryLength={summaryLength}
      />

      {/* MP3 Upload */}
      <UploadAudioForm setResult={handleResult} />

      {/* Final Display */}
      {result && <ResultDisplay result={result} />}
    </div>
  );
}

export default App;
