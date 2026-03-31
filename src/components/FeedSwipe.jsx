import TinderCard from "react-tinder-card";
import { useState } from "react";
import UserCard from "./UserCard";

const FeedSwipe = ({ feeds }) => {
  const [currentIndex, setCurrentIndex] = useState(feeds.length - 1);

  const swiped = (direction, user) => {
    console.log(`Swiped ${direction} on ${user.firstName}`);
    setCurrentIndex((prev) => prev - 1);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen");
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="relative w-[300px] h-[400px]">
        {feeds.map((feed, index) => (
          <TinderCard
            key={feed._id}
            onSwipe={(dir) => swiped(dir, feed)}
            onCardLeftScreen={() => outOfFrame(feed.firstName)}
            preventSwipe={["up", "down"]}
            className="absolute"
          >
            <UserCard user={feed} />
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default FeedSwipe;
