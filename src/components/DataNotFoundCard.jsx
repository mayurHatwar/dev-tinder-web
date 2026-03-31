import { useNavigate } from "react-router-dom";

const DataNotFoundCard = ({ title, message, buttonText }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center  mt-50 m-auto card card-dash bg-base-300 w-96">
      <div className="card-body">
        <h2 className="card-title text-center">{title}</h2>
        <p className="text-center">{message}</p>
        <div className="card-actions justify-center p-4">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataNotFoundCard;
