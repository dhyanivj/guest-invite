import React, { useEffect, useState } from "react";
import { db } from "./firebase"; // Import the Firestore instance

const App = () => {
  const [guestData, setGuestData] = useState(null); // State to store guest data

  useEffect(() => {
    const getDetails = db
      .collection("guests")
      .doc("guestdetails")
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const data = doc.data();
            setGuestData(data); // Update state with fetched data
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error fetching document: ", error);
        }
      );

    return () => getDetails();
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      <h1>Guest Details</h1>
      {guestData ? (
        <div>
          <p>Name: {guestData.Name}</p>
          <p>Email: {guestData.url}</p>
          {/* Add additional fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
