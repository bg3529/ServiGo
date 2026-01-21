import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import ProviderRegistration from "./ProviderRegistration";
import { Briefcase, ChevronRight } from "lucide-react";
import "./Profile.css";

const Profile = ({ currentUser }) => {
  const [showProviderReg, setShowProviderReg] = useState(false);

  return (
    <div className="profile-page-container">
      {/* 1. User Info Section */}
      <ProfileDetails currentUser={currentUser} />

      {/* 2. Provider Toggle / Section */}
      {!showProviderReg ? (
        <div className="register-provider-footer" onClick={() => setShowProviderReg(true)}>
          <div className="provider-promo">
            <Briefcase size={24} color="#10b981" />
            <div className="promo-content">
              <h4>Register as Service Provider</h4>
              <p>Earn by providing professional services.</p>
            </div>
            <ChevronRight size={20} />
          </div>
        </div>
      ) : (
        <ProviderRegistration currentUser={currentUser} />
      )}
    </div>
  );
};

export default Profile;