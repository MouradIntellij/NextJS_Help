// components/Citation.jsx
import React from "react";
import "./Citation.css";

interface CitationProps {
  quote: string;
  author: string;
}

const Citation: React.FC<CitationProps> = ({ quote, author }) => {
  return (
    <div className="citation-section" id="citation">
      <div className="citation-wrapper">
        <h2>"{quote}"</h2>
        <p>{author}</p>
      </div>
    </div>
  );
};

export default Citation;
