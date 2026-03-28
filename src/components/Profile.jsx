import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import UserCard from "./UserCard";

const Profile = () => {
  const dispatch = useDispatch();
  const response = useSelector((store) => store.user);
  const userData = response?.user?.data || {};
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    userData;
  const [userFirstName, setUserFirstName] = useState(firstName);
  const [userLastName, setUserLastName] = useState(lastName);
  const [userAge, setUserAge] = useState(age);
  const [userGender, setUserGender] = useState(gender);
  const [userPhotoUrl, setUserPhotoUrl] = useState(photoUrl);
  const [userAbout, setUserAbout] = useState(about);
  const [userSkills, setUserSkills] = useState(skills || []);
  const [error, setError] = useState(null);

  const handleProfile = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: userFirstName,
          lastName: userLastName,
          age: userAge,
          gender: userGender,
          photoUrl: userPhotoUrl,
          about: userAbout,
          skills: userSkills, // ✅ correct
        },
        {
          withCredentials: true,
        },
      );
      setError(null);
      dispatch(addUser(response.data));
    } catch (error) {
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
    }
  };
  return (
    <div className="flex justify-center gap-3 mt-4">
      <div className="flex justify-center">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-full max-w-2xl border p-6">
          <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="label">First Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="label">Last Name</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={userLastName}
                onChange={(e) => setUserLastName(e.target.value)}
              />
            </div>

            {/* Age */}
            <div>
              <label className="label">Age</label>
              <input
                type="number"
                className="input input-bordered w-full"
                value={userAge}
                onChange={(e) => setUserAge(e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="label">Gender</label>
              <select
                className="select select-bordered w-full"
                value={userGender}
                onChange={(e) => setUserGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Photo URL (full width) */}
            <div className="md:col-span-2">
              <label className="label">Photo URL</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={userPhotoUrl}
                onChange={(e) => setUserPhotoUrl(e.target.value)}
              />
            </div>

            {/* Skills (full width) */}
            <div className="md:col-span-2">
              <label className="label">Skills</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={userSkills.join(", ")}
                onChange={(e) =>
                  setUserSkills(
                    e.target.value.split(",").map((skill) => skill.trim()),
                  )
                }
              />
            </div>

            {/* About (full width) */}
            <div className="md:col-span-2">
              <label className="label">About</label>
              <textarea
                className="textarea textarea-bordered w-full h-24"
                value={userAbout}
                onChange={(e) => setUserAbout(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-error mt-2">{error}</p>}

          {/* Button */}
          <button
            className="btn btn-primary mt-4 w-full"
            onClick={handleProfile}
          >
            Update Profile
          </button>
        </fieldset>
      </div>
      <UserCard
        user={{
          firstName: userFirstName,
          lastName: userLastName,
          age: userAge,
          gender: userGender,
          photoUrl: userPhotoUrl,
          about: userAbout,
          skills: userSkills,
        }}
      />
    </div>
  );
};
export default Profile;
