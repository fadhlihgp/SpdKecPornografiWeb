import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import LandingPage from "../components/LandingPage";
import {Layout} from "../components/Layout";
import {Counter} from "../components/Counter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {FetchData} from "../components/FetchData";
import AuthRoute from "./AuthRoute";
import Dashboard from "../pages/Dashboard";
import GlobalProvider from "../context/GlobalContext";

const RouterApp = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Routes>
                    <Route
                        path="/"
                        element={
                        <LandingPage />}
                    />
                    <Route
                        path={"/counter"}
                        element={
                            <Layout>
                                <Counter />
                            </Layout>}
                    />
                    <Route
                        path={"/register"}
                        element={<PublicRoute>
                            <Register />
                        </PublicRoute>}
                    />
                    <Route 
                        path={"/fetch-data"}
                        element={<FetchData />}
                    />
                </Routes>
                <GlobalProvider>
                    <Routes>
                        <Route
                            path={"/login"}
                            element={<PublicRoute>
                                <Login />
                            </PublicRoute>}/>
                        <Route
                            path={"/dashboard"}
                            element={<AuthRoute>
                                <Dashboard />
                            </AuthRoute>}
                        />
                    </Routes>
                </GlobalProvider>
            </React.Fragment>
        </BrowserRouter>
    )
}

export default RouterApp;