import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import axios from "axios";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0) {
    return <div className="w-2/3 mx-auto mt-10">No connections found.</div>;
  }

  return (
    <div className="w-2/4 mx-auto mt-10">
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, gender, skills } = connection;
        return (
          <ul
            key={connection._id || connection.id}
            className="list bg-base-300 rounded-box shadow-md"
          >
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                />
              </div>
              <div>
                <div>
                  {firstName} {lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {gender && `${gender}  `}
                  {skills?.join(", ")}
                </div>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};
export default Connection;
