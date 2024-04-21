import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebase";

const GuestPage = () => {
  const { uuid } = useParams();
  const [guestName, setGuestName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch guest name from Firestore
    const fetchGuestName = async () => {
      try {
        const doc = await db.collection("invitations").doc(uuid).get();
        if (doc.exists) {
          setGuestName(doc.data().name);
        } else {
          // Redirect to 404 page if UUID not found
          navigate("/not-found"); // Update path for clarity
        }
      } catch (error) {
        console.error("Error fetching guest name:", error);
        // Redirect to 404 page on error
        navigate("/not-found");
      }
    };

    fetchGuestName();

    // Cleanup function
    return () => {
      setGuestName("");
    };
  }, [uuid, navigate]); // Include navigate as a dependency

  return (
    <div>
      <h2>Guest Page</h2>
      {guestName ? <p>Dear {guestName}, you are invited.</p> : null}
    </div>
  );
};

export default GuestPage;
