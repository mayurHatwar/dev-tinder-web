import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feeds) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      //TODO: handle error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feeds) return;

  if (feeds.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;

  return (
    feeds && (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="relative w-[300px] h-[400px]">
          {feeds.map((feed, index) => (
            <div
              key={feed._id}
              className="absolute w-full h-full"
              style={{
                transform: `translateY(${index * 5}px)`,
                zIndex: feeds.length - index,
              }}
            >
              <UserCard user={feed} />
            </div>
          ))}
        </div>
      </div>
    )
  );
};
export default Feed;
