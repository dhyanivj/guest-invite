// src/AdminPage.js
import React, { useState } from "react";
import { db } from "./firebase";

const AdminPage = () => {
  const [guestName, setGuestName] = useState("");

  const generateLink = () => {
    const uuid = generateUUID(); // Function to generate UUID
    db.collection("invitations").doc(uuid).set({ name: guestName, uuid: uuid });
    alert(`Invitation link generated: www.example.com/invite/${uuid}`);
    setGuestName("");
  };

  const generateUUID = () => {
    // Function to generate random UUID
    return Math.random().toString(36).substr(2, 6); // Change length as needed
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <input
        type="text"
        placeholder="Enter guest name"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />
      <button onClick={generateLink}>Generate Link</button>
    </div>
  );
};

export default AdminPage;
