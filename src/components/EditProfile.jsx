import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //Clear Errors
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 my-10">
        <div className="card bg-base-300 w-full max-w-md shadow-xl h-fit">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full md:col-span-2">
                <div className="label">
                  <span className="label-text">Photo URL:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="number"
                  value={age}
                  className="input input-bordered w-full"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <select
                  value={gender}
                  className="select select-bordered w-full"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label className="form-control w-full md:col-span-2">
                <div className="label">
                  <span className="label-text">About:</span>
                </div>
                <textarea
                  value={about}
                  className="textarea textarea-bordered w-full h-24"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center h-full">
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
            showSaveButton={false}
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
