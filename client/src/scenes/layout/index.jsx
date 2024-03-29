import React, { useState, useEffect, useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import axios from "axios";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const userToken = useSelector((state) => state.auth.token);
  const { data } = useGetUserQuery(userId);

  axios.defaults.withCredentials = true;
  let firstRender = useRef();

  const [updatedUserToken, setUpdatedUserToken] = useState({
    updatedUserToken: "",
  });

  const refreshToken = async () => {
    try {
      const res = await axios.get(
        "https://mern-admin-server.onrender.com/auth/refresh",
        {
          withCredentials: true,
        }
      );

      if (res && res.status === 200) {
        const data = await res.data;
        return data;
      } else {
        throw new Error("Refresh token request failed.");
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      setUpdatedUserToken(userToken);
    }

    let interval = setInterval(() => {
      refreshToken().then((data) => {
        setUpdatedUserToken(data.token);
      });
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, [userToken]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
