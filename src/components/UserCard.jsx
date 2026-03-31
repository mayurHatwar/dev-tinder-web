import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user, showSaveButton = true }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const [isRemoving, setIsRemoving] = useState(false);
  const [actionType, setActionType] = useState(null); // "ignored" | "interested"

  const handleSendRequest = async (status, userId) => {
    setActionType(status);
    setIsRemoving(true);

    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );

      // Wait for animation to finish before removing
      setTimeout(() => {
        dispatch(removeUserFromFeed(userId));
      }, 300);
    } catch (err) {
      setIsRemoving(false);
    }
  };

  return (
    <div
      className={`card bg-base-300 w-80 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 pb-4
        ${isRemoving ? "opacity-0 scale-90" : "opacity-100 scale-100"}
        ${
          isRemoving && actionType === "interested"
            ? "translate-x-40 rotate-12"
            : ""
        }
        ${
          isRemoving && actionType === "ignored"
            ? "-translate-x-40 -rotate-12"
            : ""
        }
      `}
    >
      <figure className="h-80 w-full overflow-hidden">
        <img
          src={photoUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>

        {showSaveButton && (
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
