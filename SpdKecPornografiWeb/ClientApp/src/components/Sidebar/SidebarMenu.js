import dashboardIcon from "../../resources/dashboard.png";
import users from "../../resources/everyuser.png";
import questionIcon from "../../resources/question.png";
import answerIcon from "../../resources/answer.png";
import diagnosisIcon from "../../resources/diagnosis.png";
import testingIcon from "../../resources/history.png";
import testingHistoryIcon from "../../resources/history.png";

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
                name: "Kelola Pertanyaan",
                icon: questionIcon,
                link: "/question"
            },
            {
                name: "Kelola Jawaban",
                icon: answerIcon,
                link: "/answer"
            },
            {
                name: "Kelola Diagnosa",
                icon: diagnosisIcon,
                link: "/diagnosis"
            }
        ]
    },
    {
        title: "Pengujian",
        value: [
            {
                name: "Lakukan Pengujian",
                icon: testingIcon,
                link: "/question"
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
                icon: testingIcon,
                link: "/question"
            }
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
                name: "Kelola Pertanyaan",
                icon: questionIcon,
                link: "/question"
            },
            {
                name: "Kelola Jawaban",
                icon: answerIcon,
                link: "/answer"
            },
            {
                name: "Kelola Diagnosa",
                icon: diagnosisIcon,
                link: "/diagnosis"
            }
        ]
    },
    {
        title: "Pengujian",
        value: [
            {
                name: "Lakukan Pengujian",
                icon: testingIcon,
                link: "/question"
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
                icon: testingIcon,
                link: "/question"
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
                name: "Lakukan Pengujian",
                icon: testingIcon,
                link: "/question"
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
                icon: testingIcon,
                link: "/question"
            }
        ]
    },
]