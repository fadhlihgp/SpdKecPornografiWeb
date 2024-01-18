import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import LandingPage from "../components/LandingPage";
import {Layout} from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthRoute from "./AuthRoute";
import Dashboard from "../pages/Dashboard";
import GlobalProvider from "../context/GlobalContext";
import Question from "../pages/Question";
import QuestionDetail from "../pages/QuestionDetail";
import Answer from "../pages/Answer";
import AnswerDetail from "../pages/AnswerDetail";
import Diagnosis from "../pages/Diagnosis";
import DiagnosisDetail from "../pages/DiagnosisDetail";
import AnswerDiagnosis from "../pages/AnswerDiagnosis";
import AnswerDiagnosisDetail from "../pages/AnswerDiagnosisDetail";
import Testing from "../pages/Testing";
import TestingDetail from "../pages/TestingDetail";
import TestingHistory from "../pages/TestingHistory";
import TestingDetailHistory from "../pages/TestingDetailHistory";
import UserList from "../pages/UserList";
import UserDetail from "../pages/UserDetail";
import ForgotPassword from "../pages/ForgotPassword";
import ChangePassword from "../pages/ChangePassword";
import Profile from "../pages/Profile";
import About from "../pages/About";

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
                        path={"/register"}
                        element={<PublicRoute>
                            <Register />
                        </PublicRoute>}
                    />
                    <Route
                        path={"/forgotPassword"}
                        element={<PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>}
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
                        <Route
                            path={"/question"}    
                            element={<AuthRoute>
                                <Question />
                            </AuthRoute>}
                        />
                        <Route 
                            path={"/question/:id"}
                            element={<AuthRoute>
                                <QuestionDetail />
                            </AuthRoute>}/>
                        <Route
                            path={"/answer"}
                            element={<AuthRoute>
                                <Answer />
                            </AuthRoute>}/>
                        <Route
                            path={"/answer/:id"}
                            element={<AuthRoute>
                                <AnswerDetail />
                            </AuthRoute>}/>
                        <Route
                            path={"/diagnosis"}
                            element={<AuthRoute>
                                <Diagnosis />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/diagnosis/:id"}
                            element={<AuthRoute>
                                <DiagnosisDetail />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/relation"}
                            element={<AuthRoute>
                                <AnswerDiagnosis />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/relation/:id"}
                            element={<AuthRoute>
                                <AnswerDiagnosisDetail />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/testing"}
                            element={<AuthRoute>
                                <Testing />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/testing/:id"}
                            element={<AuthRoute>
                                <TestingDetail />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/testing/history"}
                            element={<AuthRoute>
                                <TestingHistory />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/testing/history/:id"}
                            element={<AuthRoute>
                                <TestingDetailHistory />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/user"}
                            element={<AuthRoute>
                                <UserList />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/user/add"}
                            element={<AuthRoute>
                                <UserDetail />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/user/edit/:id"}
                            element={<AuthRoute>
                                <UserDetail />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/changePassword"}
                            element={<AuthRoute>
                                <ChangePassword />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/profile"}
                            element={<AuthRoute>
                                <Profile />
                            </AuthRoute>}
                        />
                        <Route
                            path={"/about"}
                            element={<AuthRoute>
                                <About />
                            </AuthRoute>}
                        />
                    </Routes>
                </GlobalProvider>
            </React.Fragment>
        </BrowserRouter>
    )
}

export default RouterApp;