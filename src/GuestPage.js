// src/GuestPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";

const GuestPage = () => {
  const { uuid } = useParams();
  const [guestName, setGuestName] = useState("");

  useEffect(() => {
    // Function to fetch guest name from Firestore
    const fetchGuestName = async () => {
      try {
        const doc = await db.collection("invitations").doc(uuid).get();
        if (doc.exists) {
          setGuestName(doc.data().name);
        } else {
          setGuestName("Guest not found");
        }
      } catch (error) {
        console.error("Error fetching guest name:", error);
        setGuestName("Error fetching guest name");
      }
    };

    fetchGuestName();

    // Cleanup function
    return () => {
      setGuestName("");
    };
  }, [uuid]);

  return (
    <div>
      <h2>Guest Page</h2>
      <p>Dear {guestName}, you are invited.</p>
    </div>
  );
};

export default GuestPage;
