import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import LandingPage from "../components/LandingPage";
import {Layout} from "../components/Layout";
import {Counter} from "../components/Counter";
import Login from "../pages/Login";
import Register from "../pages/Register";
import {FetchData} from "../components/FetchData";

const RouterApp = () => {
    return (
        <BrowserRouter>
            <React.Fragment>
                <Routes>
                    <Route
                        path="/"
                        element={<PublicRoute>
                            <Layout>
                                <LandingPage />
                            </Layout>
                        </PublicRoute>}
                    />
                    <Route
                        path={"/counter"}
                        element={<PublicRoute>
                            <Layout>
                                <Counter />
                            </Layout>
                        </PublicRoute>}
                    />
                    <Route
                        path={"/login"}
                        element={<PublicRoute>
                            <Login />
                        </PublicRoute>}/>
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
            </React.Fragment>
        </BrowserRouter>
    )
}

export default RouterApp;