import React, { use } from "react";

const UserCard = ({ user }) => {
  return (
    <div className="card bg-base-300 w-80 shadow-xl rounded-2xl overflow-hidden">
      <figure>
        <img src={user?.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        <p>{user?.age}</p>
        <p>{user?.gender}</p>
        <p>{user?.about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
