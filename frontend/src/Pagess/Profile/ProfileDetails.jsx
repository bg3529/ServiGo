import React, { useState, useRef } from "react";
import { User, Mail, Phone, MapPin, Edit3, Plus, Camera, Check, X } from "lucide-react";
import "./ProfileDetails.css";

const ProfileDetails = ({ currentUser }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "User Name",
    email: currentUser?.email || "Email",
    phone: currentUser?.phone || "N/A",
    address: currentUser?.address || "Location",
    image: currentUser?.image || null
  });

  const fileInputRef = useRef(null);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, image: URL.createObjectURL(file) });
    }
  };

  const renderField = (label, icon, fieldName) => (
    <div className="detail-row">
      <div className="detail-label">{icon} <span>{label}</span></div>
      <div className="detail-input-box">
        {isEditing === fieldName ? (
          <>
            <input 
              name={fieldName} 
              value={profileData[fieldName]} 
              onChange={handleProfileChange}
              autoFocus 
            />
            <div className="edit-actions">
              <Check size={16} className="save-icon" onClick={() => setIsEditing(null)} />
              <X size={16} className="cancel-icon" onClick={() => setIsEditing(null)} />
            </div>
          </>
        ) : (
          <>
            <span>{profileData[fieldName]}</span>
            <Edit3 size={16} className="edit-pencil" onClick={() => setIsEditing(fieldName)} />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="profile-layout">
      <div className="profile-left-panel">
        <div className="user-header-info">
          <div className="avatar-upload-container" onClick={() => fileInputRef.current.click()}>
            {profileData.image ? <img src={profileData.image} alt="Profile" /> : <User size={40} />}
            <div className="camera-overlay"><Camera size={18} /></div>
            <input type="file" ref={fileInputRef} hidden onChange={handleImageUpload} />
          </div>
          <div className="user-text-info">
            <h2>{profileData.name}</h2>
            <p><MapPin size={14} /> {profileData.address}</p>
          </div>
        </div>
        
      </div>

      <div className="profile-right-panel">
        <div className="details-main-card">
          <h3>Profile Details</h3>
          {renderField("Name", <User size={18} />, "name")}
          {renderField("Email", <Mail size={18} />, "email")}
          {renderField("Phone", <Phone size={18} />, "phone")}
          {renderField("Address", <MapPin size={18} />, "address")}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;