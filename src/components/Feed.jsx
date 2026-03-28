import axios from "axios";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUserFeed } from "../utils/UserFeedSlice";
import { BASE_URL } from "../utils/Constant";

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

  return (
    <div className="flex flex-row  justify-center mt-10 gap-6">
      {users && users.map((user) => <UserCard key={user._id} user={user} />)}
    </div>
  );
};

export default Feed;
