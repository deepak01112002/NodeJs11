import React from "react";
import AddMovie from "../Components/AddMovie";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage";
import Editmovie from "../Components/editmovie";

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddMovie />}></Route>
        <Route path="/allmovie" element={<HomePage />}></Route>
        <Route path="/editmovie/:id" element={<Editmovie />}></Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
