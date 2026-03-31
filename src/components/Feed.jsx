import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const MOTIVATION_MESSAGES = [
  {
    tag: "Keep Building",
    title: "One great connection can change your career.",
  },
  {
    tag: "Stay Consistent",
    title: "Every swipe is one step closer to your next opportunity.",
  },
  {
    tag: "Trust The Process",
    title: "Small daily actions create big professional wins.",
  },
  {
    tag: "Momentum Matters",
    title: "Your future teammate might be one card away.",
  },
];

const Feed = () => {
  const feeds = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [messageIndex] = useState(() =>
    Math.floor(Math.random() * MOTIVATION_MESSAGES.length),
  );

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
      <div className="flex flex-col justify-center items-center gap-7 w-full">
        <div className="text-center mb-10 transition-all duration-300">
          <p className="text-sm uppercase tracking-[0.2em] text-info/80">
            {MOTIVATION_MESSAGES[messageIndex].tag}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold">
            {MOTIVATION_MESSAGES[messageIndex].title}
          </h1>
        </div>
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
