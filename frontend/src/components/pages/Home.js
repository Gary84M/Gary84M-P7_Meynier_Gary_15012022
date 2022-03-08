import React, { useState, useEffect } from "react";
import LeftNav from "../LeftNav";
import Thread from "../Thread";

const Home = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    getCookieFunction();
  }, []);

  const getCookieFunction = () => {
    let a = localStorage.getItem("refresh_token");

    setToken(a);
  };

  return (
    <div className="home">
      {token}
      <LeftNav />
      <div className="main">
        <Thread />
      </div>
    </div>
  );
};

export default Home;
