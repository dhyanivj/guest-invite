// src/AdminPage.js
import React, { useState, useEffect } from "react";
import { db } from "./firebase";

const AdminPage = () => {
  const [guestName, setGuestName] = useState("");
  const [guestList, setGuestList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const snapshot = await db
          .collection("invitations")
          .orderBy("timestamp", "desc")
          .get(); // Order by timestamp in descending order
        const guests = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGuestList(guests);
      } catch (error) {
        console.error("Error fetching guest list:", error);
      }
    };

    fetchGuestList();
  }, []);

  const generateLink = async () => {
    const uuid = generateUUID(); // Function to generate UUID
    await db
      .collection("invitations")
      .doc(uuid)
      .set({ name: guestName, timestamp: new Date() }); // Add timestamp
    setGuestName("");

    // Update guest list
    setGuestList([{ name: guestName, id: uuid }, ...guestList]); // Add the latest guest to the top
  };

  const generateUUID = () => {
    // Function to generate random UUID
    return Math.random().toString(36).substr(2, 6); // Change length as needed
  };

  const copyLink = (id) => {
    const link = `${window.location.origin}/invite/${id}`;
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  const deleteGuest = async (id) => {
    try {
      await db.collection("invitations").doc(id).delete();
      setGuestList(guestList.filter((guest) => guest.id !== id));
      alert("Guest deleted successfully!");
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert("Error deleting guest. Please try again.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGuests = guestList.filter((guest) =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Admin Page</h2>
      <form>
        <input
          type="text"
          placeholder="Enter guest name"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
        />
        <button type="button" onClick={generateLink}>
          Generate Link
        </button>
      </form>

      <h3>Guest List</h3>
      <input
        type="text"
        placeholder="Search guest"
        value={searchQuery}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map((guest, index) => (
            <tr key={index}>
              <td>{guest.name}</td>
              <td>{`${window.location.origin}/invite/${guest.id}`}</td>
              <td>
                <button onClick={() => copyLink(guest.id)}>Copy Link</button>
                <button onClick={() => deleteGuest(guest.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
