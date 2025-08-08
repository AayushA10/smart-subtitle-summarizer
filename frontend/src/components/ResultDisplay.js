import React, { useState } from "react";
import { jsPDF } from "jspdf";
import KeywordChart from "./KeywordChart";

const ResultDisplay = ({ result }) => {
  const [format, setFormat] = useState("txt");

  const speakSummary = () => {
    const utterance = new SpeechSynthesisUtterance(result.summary);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const downloadFile = () => {
    const content = `
--- Cleaned Transcript ---
${result.cleaned_text}

--- Summary (${format.toUpperCase()}) ---
${result.summary}
    `;

    const filename = `subtitle_summary_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.${format}`;

    if (format === "txt") {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } else if (format === "pdf") {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(content, 180);
      doc.text(lines, 10, 10);
      doc.save(filename);
    }
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "12px",
      padding: "2rem",
      marginTop: "2rem",
      boxShadow: "0 0 15px rgba(0,0,0,0.1)"
    }}>
      {/* Cleaned Transcript */}
      <h2>📝 <strong>Cleaned Transcript</strong></h2>
      <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>{result.cleaned_text}</p>

      {/* Summary */}
      <h2>🧠 <strong>Summary</strong></h2>
      <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>{result.summary}</p>

      {/* Smart Analytics */}
      {result.analysis && (
        <div style={{ marginTop: "2rem" }}>
          <h3>📊 <strong>Smart Analytics</strong></h3>
          <ul style={{ lineHeight: "1.8" }}>
            <li><strong>Total Words:</strong> {result.analysis.total_words}</li>
            <li><strong>Total Lines:</strong> {result.analysis.total_lines}</li>
            <li><strong>Estimated Speaking Time:</strong> {result.analysis.estimated_speaking_time} minutes</li>
          </ul>

          {result.analysis.top_keywords && (
            <KeywordChart data={result.analysis.top_keywords} />
          )}
        </div>
      )}

      {/* Named Entity Recognition */}
      {result.entities && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🧠 <strong>Named Entities</strong></h3>

          {result.entities.people?.length > 0 && (
            <>
              <h4>👤 People</h4>
              <ul>{result.entities.people.map((name) => (
                <li key={name}>{name}</li>
              ))}</ul>
            </>
          )}

          {result.entities.organizations?.length > 0 && (
            <>
              <h4>🏢 Organizations</h4>
              <ul>{result.entities.organizations.map((org) => (
                <li key={org}>{org}</li>
              ))}</ul>
            </>
          )}

          {result.entities.locations?.length > 0 && (
            <>
              <h4>🌍 Locations</h4>
              <ul>{result.entities.locations.map((loc) => (
                <li key={loc}>{loc}</li>
              ))}</ul>
            </>
          )}
        </div>
      )}

      {/* Emotion Detection */}
      {result.emotions && (
        <div style={{ marginTop: "2rem" }}>
          <h3>😃 <strong>Emotion per Line</strong></h3>
          <ul style={{ lineHeight: "1.8", paddingLeft: "1rem" }}>
            {result.emotions.map((e, idx) => (
              <li key={idx}>
                {e.emoji} <strong>{e.emotion}</strong>: {e.line}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
        <button
          onClick={speakSummary}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          🔊 Play Summary
        </button>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        >
          <option value="txt">Download as .txt</option>
          <option value="pdf">Download as .pdf</option>
        </select>

        <button
          onClick={downloadFile}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          ⬇️ Download
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
