import React, { useState, useEffect } from 'react';
import { getUserData, updateUserData, uploadProfilePicture } from '../api/auth';

import '../editprofile.css';
import Header from './Header';
import account from '../images/account-icon.svg';

const EditProfile = () => {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        doorNumber: '',
        streetName: '',
        city: '',
        country: '',
        pincode: ''
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);
    const [errors, setErrors] = useState({});

    const email = localStorage.getItem('userEmail');

    useEffect(() => {
        const fetchUserData = async () => {
            if (email) {
                const userData = await getUserData(email);
                setUser(userData);
                setFormData({
                    name: userData.name,
                    contactNumber: userData.contactNumber || '',
                    doorNumber: userData.doorNumber || '',
                    streetName: userData.streetName || '',
                    city: userData.city || '',
                    country: userData.country || '',
                    pincode: userData.pincode || ''
                });
                setProfilePicture(userData.profilePicture || '');
                setProfilePreview(userData.profilePicture ? `${userData.profilePicture}` : account);
            }
        };
        fetchUserData();
    }, [email]);

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                if (!/^[A-Za-z\s]+$/.test(value)) return 'Name must only contain letters and spaces.';
                if (value.length > 15) return 'Name must not exceed 15 characters.';
                return '';
            case 'contactNumber':
                return /^\d+$/.test(value) ? '' : 'Contact number must only contain digits.';
            case 'doorNumber':
                return value.length < 1 ? 'Door number is required' : '';
            case 'streetName':
                return value.length < 5 ? 'Street name is too short' : '';
            case 'city':
                return !/^[A-Za-z\s]+$/.test(value) ? 'Invalid city name' : '';
            case 'country':
                return !/^[A-Za-z\s]+$/.test(value) ? 'Invalid country name' : '';
            case 'pincode':
                return !/^\d{5,6}$/.test(value) ? 'Invalid pincode' : '';
            default:
                return '';
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setProfilePreview(user.profilePicture ? `${user.profilePicture}` : account);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));

        const error = validateField(name, value);
        setErrors((prevState) => ({
            ...prevState,
            [name]: error
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
        setProfilePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length === 0) {
            await updateUserData(email, formData);
            if (profilePicture) {
                const data = new FormData();
                data.append('profilePicture', profilePicture);
                data.append('email', email);
                await uploadProfilePicture(data);
            }
            setIsEditing(false);
            const updatedUserData = await getUserData(email);
            setUser(updatedUserData);
            setProfilePreview(updatedUserData.profilePicture ? `${updatedUserData.profilePicture}` : account);
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div>
            <Header />
            <div className="edit-profile-container">
            <h2>Profile</h2>
            <div className="profile-form-container">
                {!isEditing ? (
                    <div className="profile-form-view">
                        <div className="profile-picture-section">
                            <div>
                            <img src={profilePreview} alt="Profile" width={100} height={100} />
                            </div>
                            <div>
                            <button onClick={handleEditClick} className="edit-btn">Edit</button>
                            </div>
                            
                            
                        </div>
                        <div className="form-fields">
                            <div className="form-field">
                                <label><strong>Name</strong></label>
                                <p>{user.name}</p>
                            </div>
                            <div className="form-field">
                                <label><strong>Email</strong></label>
                                <p>{user.email}</p>
                            </div>
                            <div className="form-field">
                                <label><strong>Contact Number</strong></label>
                                <p>{user.contactNumber || 'Add Contact Number'}</p>
                            </div>
                            <div className="form-field">
                                <label><strong>Address</strong></label>
                                <p>{`${user.doorNumber || ''} ${user.streetName || ''} ${user.city || 'Add Address'} ${user.country || ''} ${user.pincode || ''}`}</p>
                            </div>

                        </div>
                        
                    </div>
                ) : (
                    <form className="profile-edit-form" onSubmit={handleSubmit}>
                        <div className="profile-picture-section">
                            <div className='profile-preview'>
                            {profilePreview && <img src={profilePreview} alt="Profile Preview" width={100} height={100} />}
                            </div>
                            
                            <div className='profile-change'>
                            <input 
                                    id="profilePicture" 
                                    type="file" 
                                    onChange={handleFileChange} 
                                    style={{ display: 'none' }} 
                                />
                                
                                {/* Styled label to act as button */}
                                <label htmlFor="profilePicture" className="image-upload-button">
                                    Change Image
                                </label>
                            </div>
                             
                        </div>
                        
                        <div className="form-fields">
                            <label>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                            {errors.name && <p className="error">{errors.name}</p>}
                            
                            <label>Email</label>
                            <input type="email" name="email" value={user.email} disabled />
                            
                            <label>Contact Number</label>
                            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                            {errors.contactNumber && <p className="error">{errors.contactNumber}</p>}
                            
                            <label>Door Number</label>
                            <input type="text" name="doorNumber" value={formData.doorNumber} onChange={handleChange} />
                            {errors.doorNumber && <p className="error">{errors.doorNumber}</p>}
                            
                            <label>Street Name</label>
                            <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} />
                            {errors.streetName && <p className="error">{errors.streetName}</p>}
                            
                            <label>City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} />
                            {errors.city && <p className="error">{errors.city}</p>}
                            
                            <label>Country</label>
                            <input type="text" name="country" value={formData.country} onChange={handleChange} />
                            {errors.country && <p className="error">{errors.country}</p>}
                            
                            <label>Pincode</label>
                            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
                            {errors.pincode && <p className="error">{errors.pincode}</p>}
                        </div>
                        
                        <div className="form-actions">
                            <button type="submit">Save</button>
                            <button type="button" onClick={handleCancelClick}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
        </div>
        
    );
};

export default EditProfile;
