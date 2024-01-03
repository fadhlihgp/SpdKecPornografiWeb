import React, {createContext, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify";
import {adminMenu, superAdminMenu, userMenu} from "../components/Sidebar/SidebarMenu";
import {useNavigate, useParams} from "react-router-dom";

export const GlobalContext = createContext();
const GlobalProvider = ({children}) => {
    const { questionID } = useParams();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [sidebarMenu, setSidebarMenu] = useState(null);
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    
    // Question
    const [questionId, setQuestionId] = useState("-1");
    const [questionInput, setQuestionInput] = useState({questionCode: "", questionName: ""});
    const [questionCode, setQuestionCode] = useState(null);
    const [questionList, setQuestionList] = useState(null);
    const [questionDetail, setQuestionDetail] = useState(null);   
    const [fetchStatusQuestion, setFetchStatusQuestion] = useState(true);
    
    // Answer
    const [answerInput, setAnswerInput] = useState({ answerCode: "", questionId: "", answerName: ""});
    const [answerId, setAnswerId] = useState("-1");
    const [answerList, setAnswerList] = useState(null);
    const [answerDetail, setAnswerDetail] = useState(null);
    const [fetchStatusAnswer, setFetchStatusAnswer] = useState(true);
    const [showAnswerForm, setShowAnswerForm] = useState();
    
    //Diagnosis
    const [diagnosisInput, setDiagnosisInput] = useState({diagnosisCode: "", diagnosisName: "", diagnosisDescription: "", diagnosisSuggestion: ""});
    const [diagnosisId, setDiagnosisId] = useState("-1");
    const [diagnosisList, setDiagnosisList] = useState(null);
    const [diagnosisDetail, setDiagnosisDetail] = useState(null);
    const [fetchStatusDiagnosis, setFetchStatusDiagnosis] = useState(true);
    const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
    
    //AnswerDiagnosis
    const [answerDiagnosisInput, setAnswerDiagnosisInput] = useState({answerId: "", diagnosisId: ""});
    const [answerDiagnosisId, setAnswerDiagnosisId] = useState("-1");
    const [answerDiagnosisList, setAnswerDiagnosisList] = useState(null);
    const [answerDiagnosisDetail, setAnswerDiagnosisDetail] = useState(null);
    const [fetchStatusAnswerDiagnosis, setFetchStatusAnswerDiagnosis] = useState(true);
    
    const menuBaseRole = (roleId) => {
        switch (roleId) {
            case "1": 
                setSidebarMenu(superAdminMenu)
                return;
            case "2":
                setSidebarMenu(adminMenu)
                return;
            case "3":
                setSidebarMenu(userMenu)
                return;
            default:
                setSidebarMenu(adminMenu)
                return;
        }
    }
    
    const fetchDataCurrentUser = () => {
        if (fetchStatus) {
            axios.get("api/account/currentUser", {
                headers: {Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data})=> {
                const resultData = data.data;
                // console.log(resultData);
                setCurrentUser(resultData);
                menuBaseRole(resultData.roleId);
                // console.log(sidebarMenu);
                // console.log(currentUser);
                setFetchStatus(false);
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "colored",
                });
            })
        }
     }
     
     // ##################### QUESTIONS ######################
     const fetchGenerateQuestionCode = () => {
        axios.get("api/question/generateCode", {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setQuestionInput({ ... questionInput, questionCode: data?.data, questionName: ""});
        }).catch((error) => {
            console.log(error);
            alert(error.response.data.message)
        })
     }
     
     const handleSubmitQuestion = () => {
        if (questionId === "-1") {
            axios.post(`api/question`, questionInput, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                // toast.success(data.message, {
                //     position: toast.POSITION.TOP_CENTER,
                //     theme: "colored"
                // })
                alert(data.message);
                setFetchStatusQuestion(true);
                setQuestionId("-1");
                setQuestionInput(({...questionInput, questionName: ""}));
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    theme: "colored"
                })
            })
        } else {
            axios.put(`api/question/${questionId}`, questionInput, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                // toast.success(data.message, {
                //     position: toast.POSITION.TOP_CENTER,
                //     theme: "colored"
                // })
                alert(data.message);
                setFetchStatusQuestion(true);
                setQuestionId("-1")
            }).catch((error) => {
                // toast.error(error.response.data.message, {
                //     position: toast.POSITION.TOP_CENTER,
                //     theme: "colored"
                // })
                alert(error.response.data.message);
            })
        }
     }
     
     const fetchDataQuestion = (stringParam = "") => {
         axios.get(`api/question${stringParam}`, {
             headers: { Authorization: `Bearer ${Cookies.get("token")}`}
         }).then(({data}) => {
             setQuestionList([...data.data])
             setFetchStatusQuestion(false)
         }).catch((error) => {
             // console.log(error);
             // alert(error.response.data.message)
         })
     }
     
     const fetchDataDetailQuestion = (questionId) => {
        // console.log(questionID)
        axios.get(`api/question/${questionId}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            const dataQuestion = data.data;
            setQuestionId(questionId);
            setQuestionDetail({...questionDetail,
                questionId: dataQuestion?.questionId,
                questionCode: dataQuestion?.questionCode,
                questionName: dataQuestion?.questionName,
                answers: dataQuestion?.answers,
                createdAt: dataQuestion?.createdAt,
                createdBy: dataQuestion?.createdBy,
                updatedAt: dataQuestion?.updatedAt,
                updatedBy: dataQuestion?.updatedBy
            });
            setQuestionInput({questionCode: dataQuestion?.questionCode, questionName: dataQuestion?.questionName});
            console.log(dataQuestion)
        }).catch((error) => {
            console.log(error);
            // toast.error(error.response.data.message, {
            //     position: "top-center",
            //     theme: "colored"
            // })
            alert(error.response.data.message)
        })
     }
     
     const handleDeleteQuestion = (questionId) => {
        axios.delete(`api/question/${questionId}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        }).then(({data}) => {
            // toast.success(data.message, {
            //     position: "top-center",
            //     theme: "colored"
            // })
            alert(data.message);
            setQuestionId("-1")
            setFetchStatusQuestion(true);
        }).catch((error) => {
            setQuestionId("-1")
            console.log(error);
            // toast.error(error.response.data.message, {
            //     position: "top-center",
            //     theme: "colored"
            // })
            alert(error.response.data.message);
        })
     }
    
     const handleQuestionEdit = (questionId) => {
        fetchDataDetailQuestion(questionId);
         setShowQuestionForm(true);
     }
     
     const handleQuestionDetail = (questionId) => {
        fetchDataDetailQuestion(questionId)
        navigate(`/question/${questionId}`)
     }
     // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     
     // ################################# ANSWERS #################################
    const fetchGenerateAnswerCode = () => {
        axios.get(`api/answer/generateCode`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setAnswerInput({ ...answerInput, answerCode: data?.data, answerName: "", questionId: ""});
            setAnswerDetail({...answerDetail, questionName: ""})
            // console.log(data)
        }).then((error) => {
            alert(error.response.data.message)
        })
    }
    
    const handleSubmitAnswer = () => {
        if (answerId === "-1") {
            axios.post(`api/answer`, answerInput, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                alert(data.message)
                setFetchStatusAnswer(true);
                // console.log(answerInput)
            }).catch((error) => {
                // console.log(error)
                alert(error.response.data.message)
            })
        } else {
            axios.put(`api/answer/${answerId}`, answerInput, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                alert(data.message);
                setFetchStatusAnswer(true);
            }).catch((error) => {
                alert(!error.response.data.message ? error : error.response.data.message);
            })
        }
    }
    
    const fetchDataAnswer = (stringParam) => {
        axios.get(`api/answer${stringParam}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setAnswerList([...data.data]);
            setFetchStatusAnswer(false)
            // console.log(data)
        }).catch((error) => {
            console.log(error)
            alert(error.response.data.message)
        })
    }

    const fetchDataDetailAnswer = (answerId) => {
        axios.get(`api/answer/${answerId}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setAnswerId(answerId);
            setAnswerDetail({...answerDetail,
                id: data.data.id,
                answerCode: data.data.answerCode,
                questionCode: data.data.questionCode,
                questionName: data.data.questionName,
                answerName: data.data.answerName,
                createdAt: data.data.createdAt,
                createdBy: data.data.createdBy,
                updatedAt: data.data.updatedAt,
                updatedBy: data.data.updatedBy
            })
            setAnswerInput({answerCode: data.data.answerCode, questionId: data.data.questionId, answerName: data.data.answerName})
            
        }).catch((error) => {
            alert(error.response.data.message ?? error)
        })
    }
    
    const handleDeleteAnswer = (answerId) => {
        axios.delete(`api/answer/${answerId}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` }
        }).then(({data}) => {
            // toast.success(data.message, {
            //     position: "top-center",
            //     theme: "colored"
            // })
            alert(data.message);
            setAnswerId("-1")
            setFetchStatusAnswer(true);
        }).catch((error) => {
            setAnswerId("-1")
            // console.log(error);
            // toast.error(error.response.data.message, {
            //     position: "top-center",
            //     theme: "colored"
            // })
            alert(error.response.data.message);
        })
    }
    
    const handleAnswerEdit = (answerId) => {
        fetchDataDetailAnswer(answerId);
        setFetchStatusAnswer(true);
    }
    
    const handleAnswerDetail = (answerId) => {
        fetchDataDetailAnswer(answerId);
        navigate(`/answer/${answerId}`)
    }
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
     
    // ################################# DIAGNOSIS #################################
    
    const fetchGenerateDiagnosisCode = () => {
        axios.get(`api/diagnosis/generateCode`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setDiagnosisInput({...diagnosisInput, diagnosisCode: data.data})
        }).catch((error) => {
            alert(!error.response.data.message ? error : error.response.data.message);
        })
    }
    
    const fetchDataDiagnosis = (stringParam) => {
        axios.get(`api/diagnosis${stringParam}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setDiagnosisList([...data.data]);
            setFetchStatusDiagnosis(false);
        }).catch((error) => {
            console.log(error);
            alert(!error.response.data.message ? error : error.response.data.message);
        })
    }
    
    const handleSubmitDiagnosis = () => {
        if (diagnosisId === "-1") {
            axios.post(`api/diagnosis`, diagnosisInput, {
                headers: { Authorization: `Bearer  ${Cookies.get("token")}`}
            }).then(({data}) => {
                alert(data.message);
                setFetchStatusDiagnosis(true);
            }).catch((error) => {
                console.log(error);
                alert(!error.response.data.message ? error : error.response.data.message);
            })
        } else {
            axios.put(`api/diagnosis/${diagnosisId}`, diagnosisInput, {
                headers: { Authorization: `Bearer  ${Cookies.get("token")}`}
            }).then(({data}) => {
                alert(data.message);
                setFetchStatusDiagnosis(true);
            }).catch((error) => {
                console.log(error);
                alert(!error.response.data.message ? error : error.response.data.message);
            })
        }
    }
    
    const fetchDataDetailDiagnosis = (diagnosisId) => {
        axios.get(`api/diagnosis/${diagnosisId}`, {
            headers : { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setDiagnosisId(diagnosisId);
            setDiagnosisDetail({...diagnosisDetail,
                id: data.data.id,
                diagnosisCode: data.data?.diagnosisCode,
                diagnosisName: data.data?.diagnosisName,
                diagnosisDescription: data.data?.diagnosisDescription,
                diagnosisSuggestion: data.data?.diagnosisSuggestion,
                createdAt: data.data?.createdAt,
                createdBy: data.data?.createdBy,
                updatedAt: data.data?.updatedAt,
                updatedBy: data.data?.updatedBy
            });
            setDiagnosisInput({...diagnosisInput, 
                diagnosisCode: data.data?.diagnosisCode,
                diagnosisName: data.data?.diagnosisName,
                diagnosisDescription: data.data?.diagnosisDescription,
                diagnosisSuggestion: data.data?.diagnosisSuggestion
            });
            console.log(diagnosisDetail)
            setFetchStatusDiagnosis(true);
        }).catch((error) => {
            alert(error.response.data.message)
        })
    }
    
    const handleDeleteDiagnosis = (diagnosisId) => {
        axios.put(`api/diagnosis/delete/${diagnosisId}`, null, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            alert(data.message);
            setFetchStatusDiagnosis(true);
            setDiagnosisId(true)
        }).catch((error) => {
            console.log(error);
            alert(error.response.data.message)
        })
    }
    
    const handleDiagnosisDetail = (diagnosisID) => {
        fetchDataDetailDiagnosis(diagnosisID);
        navigate(`/diagnosis/${diagnosisID}`);
    }
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    // ########################## ANSWER DIAGNOSIS #########################
    const fetchDataAnswerDiagnosis = (stringParam) => {
        axios.get(`api/answerDiagnosis${stringParam}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setAnswerDiagnosisList([...data.data]);
            setFetchStatusAnswerDiagnosis(false);
        }).catch((error) => {
            console.log(error);
            alert(!error.response.data.message ? error : error.response.data.message);
        })
    }
    
    const handleSubmitAnswerDiagnosis = () => {
        if (answerDiagnosisId === "-1") {
            axios.post(`api/answerDiagnosis`, answerDiagnosisInput, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                alert(data.message);
                setFetchStatusAnswerDiagnosis(true);
            }).catch((error) => {
                alert(!error.response.data.message ? error : error.response.data.message);
            })
        } else {
            axios.put(`api/answerDiagnosis/${answerDiagnosisId}`, answerDiagnosisInput, {
                headers: { Authorization: `Bearer ${Cookies.get("token")}`}
            }).then(({data}) => {
                alert(data.message);
                setFetchStatusAnswerDiagnosis(true)
            }).catch((error) => {
                alert(!error.response.data.message ? error : error.response.data.message);
            })
        }
    }
    
    const handleDeleteAnswerDiagnosis = (answerDiagnosisId) => {
        axios.delete(`api/answerDiagnosis/${answerDiagnosisId}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            alert(data.message);
            setFetchStatusAnswerDiagnosis(true)
        }).catch((error) => {
            alert(!error.response.data.message ? error : error.response.data.message);
        })
    }
    
    const fetchDataDetailAnswerDiagnosis = (answerDiagnosisId) => {
        axios.get(`api/answerDiagnosis/${answerDiagnosisId}`, {
            headers: { Authorization: `Bearer ${Cookies.get("token")}`}
        }).then(({data}) => {
            setAnswerDiagnosisId(answerDiagnosisId);
            setAnswerDiagnosisInput({...answerDiagnosisInput, answerId: data.data.answerId, diagnosisId: data.data.diagnosisId, questionId: data.data.questionId});
            setAnswerDiagnosisDetail({...answerDiagnosisDetail, answerName: data.data.answerName, diagnosisName: data.data.diagnosisName, questionName: data.data.questionName});
        }).catch((error) => {
            console.log(error);
            alert(!error.response.data.message ? error : error.response.data.message);
        })
    }
    
    const handleAnswerDiagnosisDetail = (answerDiagnosisId) => {
        fetchDataDetailAnswerDiagnosis(answerDiagnosisId);
        navigate(`relation/${answerDiagnosisId}`);
    }
    
    
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const stateContext = {
        currentUser, setCurrentUser, fetchStatus, setFetchStatus, sidebarMenu, setSidebarMenu, 
        questionId, setQuestionId, questionInput, setQuestionInput, questionCode, setQuestionCode,
        questionList, setQuestionList, questionDetail, setQuestionDetail, fetchStatusQuestion, setFetchStatusQuestion,
        showQuestionForm, setShowQuestionForm,
        fetchStatusAnswer, setFetchStatusAnswer, answerDetail, setAnswerDetail, answerList, setAnswerList,
        answerId, setAnswerId, answerInput, setAnswerInput, showAnswerForm, setShowAnswerForm,
        diagnosisInput, setDiagnosisInput, diagnosisList, setDiagnosisList, diagnosisId, setDiagnosisId,
        diagnosisDetail, setDiagnosisDetail, fetchStatusDiagnosis, setFetchStatusDiagnosis, showDiagnosisForm, setShowDiagnosisForm,
        answerDiagnosisInput, setAnswerDiagnosisInput, answerDiagnosisList, setAnswerDiagnosisList,
        fetchStatusAnswerDiagnosis, setFetchStatusAnswerDiagnosis, answerDiagnosisId, setAnswerDiagnosisId,
        answerDiagnosisDetail, setAnswerDiagnosisDetail
    }
    
    const handleFunctionContext = {
        fetchDataCurrentUser, handleSubmitQuestion, fetchDataQuestion,
        fetchDataDetailQuestion, handleDeleteQuestion, fetchGenerateQuestionCode,handleQuestionEdit, handleQuestionDetail, 
        fetchGenerateAnswerCode, handleSubmitAnswer, fetchDataAnswer, handleDeleteAnswer,
        handleAnswerEdit, fetchDataDetailAnswer, handleAnswerDetail,
        fetchGenerateDiagnosisCode, fetchDataDiagnosis, fetchDataDetailDiagnosis, handleSubmitDiagnosis,
        handleDeleteDiagnosis, handleDiagnosisDetail,
        fetchDataAnswerDiagnosis, handleSubmitAnswerDiagnosis, handleAnswerDiagnosisDetail, fetchDataDetailAnswerDiagnosis,
        handleDeleteAnswerDiagnosis
    }
    
    return (
        <GlobalContext.Provider value={{ stateContext, handleFunctionContext }}>
            <ToastContainer />
            {children}
        </GlobalContext.Provider>
    )
}
export default GlobalProvider;