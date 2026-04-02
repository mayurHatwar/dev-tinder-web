import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, appendFeed } from "../utils/feedSlice";
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
  const [isFetching, setIsFetching] = useState(false);
  const [isFeedExhausted, setIsFeedExhausted] = useState(false);

  const getFeed = async (append = false) => {
    if (isFetching || isFeedExhausted) return;
    setIsFetching(true);

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      const fetchedProfiles = res?.data?.data ?? [];

      if (fetchedProfiles.length === 0) {
        setIsFeedExhausted(true);

        if (!append && feeds === null) {
          dispatch(addFeed([]));
        }

        return;
      }

      if (append) {
        dispatch(appendFeed(fetchedProfiles));
      } else {
        dispatch(addFeed(fetchedProfiles));
      }
    } catch (err) {
      // TODO: handle error
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (feeds === null) {
      getFeed(false);
    }
  }, [feeds]);

  useEffect(() => {
    if (Array.isArray(feeds) && feeds.length === 1) {
      getFeed(true);
    }
  }, [feeds]);

  if (feeds === null) {
    return (
      <h1 className="flex justify-center my-10 text-base-content/80">
        Loading profiles...
      </h1>
    );
  }

  if (feeds.length === 0 && isFeedExhausted) {
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  }

  if (feeds.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-base-content/80">
        Finding more profiles for you...
      </h1>
    );
  }

  const message = MOTIVATION_MESSAGES[messageIndex];
  const otherMessageIndex = (messageIndex + 1) % MOTIVATION_MESSAGES.length;
  const otherMessage = MOTIVATION_MESSAGES[otherMessageIndex];

  return (
    <div className="relative flex flex-col justify-center items-center gap-7 w-full pt-8 pb-24">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl flex items-center justify-center">
        <aside className="hidden md:flex flex-col items-end w-80 text-right text-white/80 uppercase tracking-wider">
          <p className="text-xs mb-2">{message.tag}</p>
          <h2 className="text-2xl lg:text-3xl font-black leading-tight">
            {message.title}
          </h2>
          <p className="mt-2 text-sm italic">Swipe right, change your life.</p>
        </aside>
        <div className="relative mx-4 w-[320px] min-h-[420px] max-h-[calc(100vh-18rem)]">
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

        <aside className="hidden md:flex flex-col items-start w-80 text-left text-white/80 uppercase tracking-wider">
          <p className="text-xs mb-2">{otherMessage.tag}</p>
          <h2 className="text-2xl lg:text-3xl font-black leading-tight">
            {otherMessage.title}
          </h2>
          <p className="mt-2 text-sm italic">
            A connection away from your next role.
          </p>
        </aside>
      </div>

      <div className="md:hidden text-center px-4">
        <p className="text-sm uppercase tracking-[0.2em] text-info/80">
          {message.tag}
        </p>
        <h1 className="text-xl font-extrabold">{message.title}</h1>
      </div>
    </div>
  );
};

export default Feed;
