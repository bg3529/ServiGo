import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Sudip Bayalkoti",
    email: "sudip@gmail.com",
    phone: "9800000000",
    address: "Kathmandu, Nepal",
    image: "https://i.pravatar.cc/150?img=3"
  };

  return (
    <div className="profile-page">

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="profile-card">
        <img src={user.image} alt="Profile" className="profile-img" />

        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>

        <div className="profile-details">
          <p>📞 {user.phone}</p>
          <p>📍 {user.address}</p>
        </div>

        <button className="edit-btn">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
