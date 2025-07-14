import { CircleUserRound, SquarePen } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="flex justify-between items-center h-20 px-20
    "
    >
      <div>
        <h1 className="text-5xl font-semibold">MonoBlog</h1>
      </div>
      <div className="flex gap-10 px=4">
        <Link to="/verify">
          <div className="flex gap-4">
            <SquarePen />
            <p className="text-lg font-light">Write</p>
          </div>
        </Link>

        <CircleUserRound />
      </div>
    </div>
  );
};

export default Navbar;
