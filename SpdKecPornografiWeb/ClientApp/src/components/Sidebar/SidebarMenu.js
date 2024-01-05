import dashboardIcon from "../../resources/dashboard.png";
import users from "../../resources/everyuser.png";
import questionIcon from "../../resources/question.png";
import answerIcon from "../../resources/answer.png";
import diagnosisIcon from "../../resources/diagnosis.png";
import testingIcon from "../../resources/testing.png";
import testingHistoryIcon from "../../resources/history.png";
import infoIcon from "../../resources/info.png";
import logoutIcon from "../../resources/logout.png";
import relationIcon from "../../resources/relation.png";

export const superAdminMenu = [
    {
        title: "Dashboard",
        value: [
            {
                name: "Dashboard",
                icon: dashboardIcon,
                link: "/dashboard"
            }
        ]
    },
    {
        title: "User Management",
        value: [
            {
                name: "User",
                icon: users,
                link: "/user"
            }
        ]
    },
    {
        title: "Master Data",
        value: [
            {
                name: "Pertanyaan",
                icon: questionIcon,
                link: "/question"
            },
            {
                name: "Jawaban",
                icon: answerIcon,
                link: "/answer"
            },
            {
                name: "Diagnosa",
                icon: diagnosisIcon,
                link: "/diagnosis"
            }
        ]
    },
    {
        title: "Relasi Data",
        value: [
            {
                name: "Relasi",
                icon: relationIcon,
                link: "/relation"
            },
        ]
    },
    {
        title: "Pengujian",
        value: [
            {
                name: "Pengujian",
                icon: testingIcon,
                link: "/testing"
            },
            {
                name: "Riwayat Pengujian",
                icon: testingHistoryIcon,
                link: "/answer"
            }
        ]
    },
    {
        title: "Aplikasi",
        value: [
            {
                name: "Tentang Aplikasi",
                icon: infoIcon,
                link: "/about"
            },
        ]
    },
]

export const adminMenu = [
    {
        title: "Dashboard",
        value: [
            {
                name: "Dashboard",
                icon: dashboardIcon,
                link: "/dashboard"
            }
        ]
    },
    {
        title: "Master Data",
        value: [
            {
                name: "Pertanyaan",
                icon: questionIcon,
                link: "/question"
            },
            {
                name: "Jawaban",
                icon: answerIcon,
                link: "/answer"
            },
            {
                name: "Diagnosa",
                icon: diagnosisIcon,
                link: "/diagnosis"
            }
        ]
    },
    {
        title: "Relasi Data",
        value: [
            {
                name: "Relasi",
                icon: relationIcon,
                link: "/relation"
            },
        ]
    },
    {
        title: "Pengujian",
        value: [
            {
                name: "Pengujian",
                icon: testingIcon,
                link: "/testing"
            },
            {
                name: "Riwayat Pengujian",
                icon: testingHistoryIcon,
                link: "/answer"
            }
        ]
    },
    {
        title: "Aplikasi",
        value: [
            {
                name: "Tentang Aplikasi",
                icon: infoIcon,
                link: "/about"
            }
        ]
    },
]

export const userMenu = [
    {
        title: "Dashboard",
        value: [
            {
                name: "Dashboard",
                icon: dashboardIcon,
                link: "/dashboard"
            }
        ]
    },
    {
        title: "Pengujian",
        value: [
            {
                name: "Pengujian",
                icon: testingIcon,
                link: "/testing"
            },
            {
                name: "Riwayat Pengujian",
                icon: testingHistoryIcon,
                link: "/answer"
            }
        ]
    },
    {
        title: "Aplikasi",
        value: [
            {
                name: "Tentang Aplikasi",
                icon: infoIcon,
                link: "/about"
            }
        ]
    },
]