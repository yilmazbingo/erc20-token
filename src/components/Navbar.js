import React from "react";
import bank from "../assets/images/bank.png";

const Navbar = (props) => {
  console.log("props", props);
  return (
    <nav
      className="navbar navbar-dark fixed-top shadow p-0"
      style={{ backgroundColor: "green", height: "50px" }}
    >
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        style={{ color: "white" }}
      >
        <img
          src={bank}
          width="50"
          height="30"
          className="d-inline-block align-top"
          alt="bank"
        />
        {/* &nbsp; will add space */}
        &nbsp; DAPP Yield Staking (Decentralized Banking)
      </a>
      <ul className="navbar-nav px-3">
        <li>
          <small style={{ color: "white" }}>
            <span style={{ color: "black", fontWeight: "bold" }}>
              ACCOUNT NUMBER:
            </span>{" "}
            {props.account}
          </small>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
