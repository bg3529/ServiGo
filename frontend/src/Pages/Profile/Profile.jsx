import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import { Briefcase, ChevronRight } from "lucide-react";
import "./Profile.css";

const Profile = ({ currentUser }) => {
  const navigate = useNavigate();

  return (
    <div className="profile-page-container">
      {/* 1. User Info Section */}
      <ProfileDetails currentUser={currentUser} />


    </div>
  );
};

export default Profile;