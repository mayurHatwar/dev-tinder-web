import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const profileUser = user?.data && typeof user.data === "object" ? user.data : user;

  return (
    profileUser && (
      <div>
        <EditProfile user={profileUser} />
      </div>
    )
  );
};
export default Profile;
