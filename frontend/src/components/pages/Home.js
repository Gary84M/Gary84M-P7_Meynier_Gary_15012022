import React, { useState, useEffect, useContext } from "react";
import { UidContext } from "../AppContext";
import LeftNav from "../LeftNav";
import Thread from "../Thread";
import NewPostForm from "../Post/NewPostForm";
import Log from "../Log/index";

const Home = () => {
  const uid = useContext(UidContext);
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
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default Home;
