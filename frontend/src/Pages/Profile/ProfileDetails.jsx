import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Edit3, Camera, Check, X, Briefcase, Loader2 } from "lucide-react";
import { ProfileService } from "../../services/api";
import { toast } from "react-hot-toast";
import "./ProfileDetails.css";

const ProfileDetails = ({ currentUser, onUpdateUser }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(null);
  const [profileData, setProfileData] = useState({
    name: currentUser?.full_name || currentUser?.username || "User Name",
    email: currentUser?.email || "Email",
    phone: currentUser?.phone || "N/A",
    address: currentUser?.address || "Location",
    username: currentUser?.username || "Username",
    image: currentUser?.profile_image ? (currentUser.profile_image.startsWith('http') ? currentUser.profile_image : `http://127.0.0.1:8000${currentUser.profile_image}`) : null
  });

  const fileInputRef = useRef(null);

  const [loadingField, setLoadingField] = useState(null);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async (fieldName) => {
    setLoadingField(fieldName);
    try {
      const dataToUpdate = {};
      if (fieldName === 'name') {
        dataToUpdate.full_name = profileData.name;
      } else {
        dataToUpdate[fieldName] = profileData[fieldName];
      }

      const response = await ProfileService.updateProfile(dataToUpdate);

      // Sync local state and global state
      if (onUpdateUser) {
        onUpdateUser(response);
      }

      setProfileData(prev => ({
        ...prev,
        name: response.full_name || prev.name,
        email: response.email || prev.email,
        phone: response.phone || prev.phone,
        address: response.address || prev.address,
        username: response.username || prev.username
      }));

      toast.success(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} updated successfully`);
      setIsEditing(null);
    } catch (error) {
      console.error("Update failed", error);
      let errorMessage = `Failed to update ${fieldName}`;

      if (error.response?.data) {
        const data = error.response.data;
        // Check for field-specific errors
        if (data[fieldName]) {
          errorMessage = data[fieldName][0];
        } else if (fieldName === 'name' && data.full_name) {
          errorMessage = data.full_name[0];
        } else if (data.email && fieldName === 'email') {
          errorMessage = data.email[0];
        } else if (data.detail) {
          errorMessage = data.detail;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (typeof data === 'object') {
          // Fallback: take the first error found in the object
          const firstKey = Object.keys(data)[0];
          if (Array.isArray(data[firstKey])) {
            errorMessage = data[firstKey][0];
          }
        }
      }
      toast.error(errorMessage);
    } finally {
      setLoadingField(null);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profile_image', file);

      setLoadingField('image');
      try {
        const response = await ProfileService.updateProfile(formData);
        console.log("Image upload response:", response);
        setProfileData({ ...profileData, image: response.profile_image });
        if (onUpdateUser) {
          onUpdateUser({ profile_image: response.profile_image });
        }
        toast.success("Profile image updated successfully");
      } catch (error) {
        console.error("Image upload failed", error);
        let errorMessage = "Failed to upload image";
        if (error.response?.data) {
          const data = error.response.data;
          if (data.profile_image) {
            errorMessage = data.profile_image[0];
          } else if (data.detail) {
            errorMessage = data.detail;
          }
        }
        toast.error(errorMessage);
      } finally {
        setLoadingField(null);
      }
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
              {loadingField === fieldName ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <Check size={16} className="save-icon" onClick={() => handleSave(fieldName)} />
                  <X size={16} className="cancel-icon" onClick={() => setIsEditing(null)} />
                </>
              )}
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
          <div className="avatar-upload-container" onClick={() => !loadingField && fileInputRef.current.click()}>
            {loadingField === 'image' ? (
              <div className="loading-overlay"><Loader2 size={24} className="animate-spin" /></div>
            ) : (
              profileData.image ? <img src={profileData.image} alt="Profile" /> : <User size={40} />
            )}
            <div className="camera-overlay"><Camera size={18} /></div>
            <input type="file" ref={fileInputRef} hidden onChange={handleImageUpload} accept="image/*" />
          </div>
          <div className="user-text-info">
            <h2>{profileData.name}</h2>
            <p><MapPin size={14} /> {profileData.address}</p>
          </div>
        </div>

        {/* Become Provider Button */}
        {!currentUser?.isProvider && (
          <button
            className="become-provider-btn"
            onClick={() => navigate('/become-provider')}
          >
            <Briefcase size={18} />
            Become a Service Provider
          </button>
        )}

        {/* Provider Dashboard Button */}
        {currentUser?.isProvider && (
          <button
            className="provider-dashboard-btn"
            onClick={() => navigate('/dashboard')}
          >
            <Briefcase size={18} />
            Go to Provider Dashboard
          </button>
        )}
      </div>

      <div className="profile-right-panel">
        <div className="details-main-card">
          <h3>Profile Details</h3>
          {renderField("Username", <User size={18} />, "username")}
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