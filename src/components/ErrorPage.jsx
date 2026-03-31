import { Link, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full flex justify-center px-4">
      <div className="card bg-base-300 w-full max-w-2xl shadow-xl">
        <div className="card-body text-center gap-4">
          <p className="text-sm font-semibold tracking-[0.2em] text-info/80 uppercase">
            Error 404
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold">Page Not Found</h1>
          <p className="text-base-content/80 max-w-xl mx-auto">
            The page you are trying to open does not exist or may have been moved.
            Let&apos;s get you back to the app.
          </p>
          <div className="card-actions justify-center gap-3 mt-2">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Go Back
            </button>
            <Link className="btn btn-secondary" to="/">
              Go To Feed
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
