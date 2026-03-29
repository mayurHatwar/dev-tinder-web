import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUserFeed } from "../utils/userFeedSlice";
import { BASE_URL } from "../utils/constant";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.userFeed.feed);
  useEffect(() => {
    getFeedData();
  }, []);

  const getFeedData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addUserFeed(response.data.data));
    } catch (error) {}
  };

  if (users.length === 0) {
    return <div className="w-2/3 mx-auto mt-10">No users found.</div>;
  }

  return (
    <div className="flex flex-row  justify-center mt-10 gap-6">
      {users && users.map((user) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};

export default Feed;
