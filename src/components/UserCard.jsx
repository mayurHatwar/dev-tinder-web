import React, { use } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/userFeedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, age, gender, about, firstName, lastName, photoUrl } = user;
  const handleSendRequest = async (status, id) => {
    const res = await axios.post(
      `${BASE_URL}/request/send/${status}/${id}`,
      { userId: user?.id },
      {
        withCredentials: true,
      },
    );
    dispatch(removeUserFeed(id));
  };
  return (
    <div className="card bg-base-300 w-80 shadow-xl rounded-2xl overflow-hidden">
      <figure>
        <img src={user?.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{age}</p>
        <p>{gender}</p>
        <p>{about}</p>
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
      </div>
    </div>
  );
};

export default UserCard;
