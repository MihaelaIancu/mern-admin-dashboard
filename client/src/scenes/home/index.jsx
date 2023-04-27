import React from "react";
import "./index.css";
import { Button, Container, useTheme, Zoom } from "@mui/material";

const Home = () => {
  const theme = useTheme();
  return (
    <div className="main">
      <Container>
        {/* <Row> */}
        <div className="intro-text">
          <Zoom in={true} style={{ transitionDelay: "1000ms" }}>
            <div className="intro-text-shadow">
              <h1
                className="title"
                style={{ color: theme.palette.secondary[200] }}
              >
                Welcome to your sales dashboard
              </h1>
              <p
                className="subtitle"
                style={{ color: theme.palette.secondary[200] }}
              >
                One safe place for all your transactions.
              </p>
            </div>
          </Zoom>
          <div className="buttonContainer">
            <a href="/login">
              <Zoom in={true} style={{ transitionDelay: "1500ms" }}>
                <Button
                  size="medium"
                  className="landingButton"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary.light,
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Button>
              </Zoom>
            </a>
            <a href="/signup">
              <Zoom in={true} style={{ transitionDelay: "2000ms" }}>
                <Button
                  size="medium"
                  className="landingButton"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.background.alt,
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </Button>
              </Zoom>
            </a>
          </div>
        </div>
        {/* </Row> */}
      </Container>
    </div>
  );
};

export default Home;
