import React from "react";

const TimelineDisplay = ({ timeline }) => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🕒 Timeline Summary</h3>
      <ul style={{ lineHeight: "1.8", paddingLeft: "1.5rem" }}>
        {timeline.map((item, i) => (
          <li key={i}>
            <strong>{item.timestamp}</strong> – {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimelineDisplay;
