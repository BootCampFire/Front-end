
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BoardList from "pages/BoardPage/BoardListPage";
import BoardDetail from "pages/BoardPage/BoardDetailPage";
import BootCamp from "./pages/BootCamp";
import BoardCreate from "pages/BoardPage/BoardCreatePage";
import BoardModify from "pages/BoardPage/BoardModifyPage";
import MyPosts from "pages/MyPage/MyPosts";
import PersonalInfo from "pages/MyPage/PersonalInfo";
import VS from "./pages/VS";
import MainPage from "./pages/MainPage/MainPage";
import store from "./store";
import { Provider } from "react-redux";
import Header from "components/Header";
import BootCampListDetailPage from "./pages/BootCampPage/BootCampDetailPage";
import LoginModal from "components/Login/LoginModal";
import ManagerPage from "pages/ManagerPage/ManagerPage";
import Regist from "pages/ManagerPage/Regist";
import Management from "pages/ManagerPage/Management";
import Mission from "pages/ManagerPage/Mission";
import LoginDataPage from "components/Login/LoginDataPage";
import MyPage from "pages/MyPage/MyPage";
import ManageCreate from "pages/ManagerPage/ManageCreate";
import BoardListInfinityScroll from "pages/BoardPage/BoardListInfinityScroll2";

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/loginInfo" element={<LoginDataPage />} />
            <Route path="/Board" element={<BoardList />} />
            <Route path="/BoardDetail/:id" element={<BoardDetail />} />
            <Route path="/BoardCreate" element={<BoardCreate />} />
            <Route path="/BootCamp" element={<BootCamp />} />
            <Route path="/infinity" element={<BoardListInfinityScroll />} />
            <Route path="/VS" element={<VS />} />
            <Route
              path="/bootcampdetail/:bootcampid"
              element={<BootCampListDetailPage />}
            />
            <Route path="/BoardModify" element={<BoardModify />} />
            <Route path="/MyPage/*" element={<MyPage />}>
              <Route path="" element={<PersonalInfo />} />
              <Route path="MyPosts" element={<MyPosts />} />
            </Route>
            <Route path="/ManagerPage/*" element={<ManagerPage />}>
              <Route path="" element={<Regist />} />
              <Route path="Management" element={<Management />} />
              <Route path="Management/create" element={<ManageCreate />} />
              <Route path="Mission" element={<Mission />} />
            </Route>
          </Routes>
        </main>
      </Provider>
    </div>
  );
}
