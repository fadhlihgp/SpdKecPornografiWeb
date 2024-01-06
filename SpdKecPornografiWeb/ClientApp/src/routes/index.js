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
                        <Route
                            path={"/question"}    
                            element={<AuthRoute>
                                <Question />
                            </AuthRoute>}
                        />
                        <Route 
                            path={"/question/:questionID"}
                            element={<AuthRoute>
                                <QuestionDetail />
                            </AuthRoute>}/>
                        <Route
                            path={"/answer"}
                            element={<AuthRoute>
                                <Answer />
                            </AuthRoute>}/>
                        <Route
                            path={"/answer/:answerID"}
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
                            path={"/diagnosis/:diagnosisID"}
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
                            path={"/relation/:answerDiagnosisID"}
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
                    </Routes>
                </GlobalProvider>
            </React.Fragment>
        </BrowserRouter>
    )
}

export default RouterApp;