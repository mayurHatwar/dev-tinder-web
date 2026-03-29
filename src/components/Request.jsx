import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import axios from "axios";
import { addRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.request);
  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log("Fetched requests:", response.data.data);
      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const reviewRequest = async (state, id) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/request/review/${state}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      console.log("Fetched requests:", response.data);
      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <div className="w-2/3 mx-auto mt-10">No requests found.</div>;
  }

  return (
    <div className="w-2/4 mx-auto mt-10">
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, gender, skills } =
          request.fromUserId;
        return (
          <ul
            key={request._id || request.id}
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
              <div className="flex gap-4">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    reviewRequest("accepted", request._id || request.id)
                  }
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    reviewRequest("rejected", request._id || request.id)
                  }
                >
                  Decline
                </button>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};
export default Request;
