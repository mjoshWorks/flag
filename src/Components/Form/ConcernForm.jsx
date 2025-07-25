import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./ConcernForm.css";

const ConcernForm = () => {
  const [name, setName] = useState("");
  const [usedToCall, setUsedToCall] = useState("");
  const [number, setNumber] = useState("");
  const [ban, setBan] = useState("");
  const [token, setToken] = useState("");
  const [resolved, setResolved] = useState("");
  const [concern, setConcern] = useState("");
  const [savedData, setSavedData] = useState([]);

  const handleSave = () => {
    if (
      !name ||
      !usedToCall ||
      !number ||
      !ban ||
      !token ||
      !resolved ||
      !concern
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    const newEntry = {
      NAME: name,
      USED_TO_CALL: usedToCall,
      NUMBER: number,
      BAN: ban,
      TOKEN: token,
      RESOLVED: resolved,
      CX_CONCERN: concern,
    };

    const updatedData = [...savedData, newEntry];
    setSavedData(updatedData);
    localStorage.setItem("concerns", JSON.stringify(updatedData));
    alert("Saved successfully!");
  };

  const handleClear = () => {
    setName("");
    setUsedToCall("");
    setNumber("");
    setBan("");
    setToken("");
    setResolved("");
    setConcern("");
  };

  const handleCopy = () => {
    const copyText = `
NAME: ${name}
# USED TO CALL: ${usedToCall}
NUMBER: ${number}
BAN: ${ban}
TOKEN: ${token}
RESOLVED: ${resolved}
CX CONCERN: ${concern}
    `;
    navigator.clipboard.writeText(copyText.trim());
    alert("Copied to clipboard!");
  };

  const handleDownload = () => {
    const data = localStorage.getItem("concerns");
    const entries = JSON.parse(data || "[]");

    const content = entries
      .map(
        (entry, i) =>
          `Entry ${i + 1}\nNAME: ${entry.NAME}\n# USED TO CALL: ${entry.USED_TO_CALL}\nNUMBER: ${entry.NUMBER}\nBAN: ${entry.BAN}\nTOKEN: ${entry.TOKEN}\nRESOLVED: ${entry.RESOLVED}\nCX CONCERN: ${entry.CX_CONCERN}\n`
      )
      .join("\n");

    const blob = new Blob([content.trim()], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "concerns.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div className="concern-wrapper">
      <div className="concern-card">
        <h2 className="concern-title">Customer Concern Form</h2>

        <label>Name</label>
        <input
          className="form-control"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label># Used to Call</label>
        <input
          className="form-control"
          placeholder="Enter # Used to Call"
          type="number"
          value={usedToCall}
          onChange={(e) => setUsedToCall(e.target.value)}
        />

        <label>Number</label>
        <input
          className="form-control"
          placeholder="Enter Number"
          type="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <label>BAN</label>
        <input
          className="form-control"
          placeholder="Enter BAN"
          type="number"
          value={ban}
          onChange={(e) => setBan(e.target.value)}
        />

        <label>Token</label>
        <input
          className="form-control"
          placeholder="Enter Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <label>Resolved</label>
        <div className="resolved-toggle">
          <button
            type="button"
            className={`resolved-button yes ${resolved === "Yes" ? "active yes" : ""}`}
            onClick={() => setResolved("Yes")}
          >
            Yes
          </button>
          <button
            type="button"
            className={`resolved-button no ${resolved === "No" ? "active no" : ""}`}
            onClick={() => setResolved("No")}
          >
            No
          </button>
        </div>

        <label>CX Concern</label>
        <textarea
          className="concern-textarea"
          placeholder="Enter Concern"
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
        />

        <div className="button-group">
          <button className="concern-button" onClick={handleSave}>
            Save
          </button>
          <button className="concern-button concern-clear" onClick={handleClear}>
            Clear
          </button>
          <button className="concern-button concern-copy" onClick={handleCopy}>
            Copy
          </button>
          <button className="concern-button concern-download" onClick={handleDownload}>
            Download
          </button>
        </div>

        <footer className="footer-credit">
          <p>Created by Mcquinley Josh Maglangit</p>
          <a href="https://github.com/mjoshWorks" target="_blank" rel="noopener noreferrer">
            <FaGithub className="github-icon" />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default ConcernForm;
