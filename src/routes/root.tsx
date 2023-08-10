import { Outlet } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="container mx-auto text-center md:text-left">
        <Link to={"/"}>Companies</Link>
      </div>
      <div className="container mx-auto">
        {/* all the other elements */}
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
}
