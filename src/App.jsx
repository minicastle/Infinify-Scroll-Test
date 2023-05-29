import React from "react";
import styled from "@emotion/styled";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./Pages/Test";
import Demo from "./Pages/Demo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: rgb(13, 50, 77);
  background: linear-gradient(
    99deg,
    rgba(13, 50, 77, 1) 0%,
    rgba(57, 39, 90, 1) 22%,
    rgba(127, 90, 131, 1) 95%
  );
  font-size: 80px;
  color: white;
  min-height: 100vh;
`;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
