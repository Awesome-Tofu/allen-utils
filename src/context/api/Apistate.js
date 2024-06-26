// import { useState } from "react";
import ApiContext from "./Apicontext";


const ApiState = (props) => {
    const baseUrl = "https://gateway-production.allen.ac.in/solutionms/v1";

    const auth_token = localStorage.getItem('auth_token');

    const getSubjects = async () => {
        const response = await fetch(`${baseUrl}/taxonomy-subject`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token,
                "Referer": "https://allenplus.allen.ac.in/"
            }
        });

        let data = await response.json();
        data = data.subjectList;
        const sortedData = data.sort((a, b) => (a.videoTitle > b.videoTitle ? 1 : -1));
        return sortedData;
    }

    const getTopics = async (id) => {
        const payload = { "subjectId": id }
        const response = await fetch(`${baseUrl}/taxonomy-topics`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token,
                "Referer": "https://allenplus.allen.ac.in/"
            },
            body: JSON.stringify(payload)
        });

        let data = await response.json();
        data = data.topicsList;
        const sortedData = data.sort((a, b) => (a.videoTitle > b.videoTitle ? 1 : -1));
        return sortedData;
    }

    const getSubtopics = async (id, topicid) => {
        const response = await fetch(`${baseUrl}/subtopics-details?subjectId=${id}&topicId=${topicid}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token,
                "Referer": "https://allenplus.allen.ac.in/"
            },
        });

        let data = await response.json();
        data = data.subTopicsVideoDetailsList;
        const sortedData = data.sort((a, b) => (a.videoTitle > b.videoTitle ? 1 : -1));
        return sortedData;
    }

    const getClass = async (classid, typeid) => {
        const response = await fetch(`${baseUrl}/play-video?classId=${classid}&typeId=${typeid}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token,
                "Referer": "https://allenplus.allen.ac.in/"
            },
        });

        let data = await response.json();
        data = data.videoDetails;
        data = {
            videoLink: data[0]?.videoLink,
            pdfLinks: data[0]?.notesList?.map(note => note.tronData.url),
            videoTitle: data[0]?.videoTitle
        }
        return data;
    }

    const getUserdetails = async () => {
        const response = await fetch(`https://gateway-production.allen.ac.in/userms/v1/student-details`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth_token,
                "Referer": "https://allenplus.allen.ac.in/"
            },
        });
        const data = await response.json();
        return data.data?.student_name;
    }

    const login = async (formid, password) => {
        const payload = { "enrollmentNo": formid, "password": password, "platform": "W" };
        const response = await fetch(`https://gateway-production.allen.ac.in/userms/v1/login`, {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br, zstd",
                "Accept-Language": "en-US,en;q=0.9",
                "Appversion": "1",
                "Content-Type": "application/json",
                "Origin": "https://allenplus.allen.ac.in",
                "Platform": "W",
                "Priority": "u=1, i",
                "Referer": "https://allenplus.allen.ac.in/",
                "Sec-Ch-Ua": `"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"`,
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": `"Windows"`,
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (data.status === "OK") {
            localStorage.setItem('auth_token', data.ACCESS_TOKEN);
            return data.ACCESS_TOKEN;
        } else {
            return false;
        }
    }

    const logout = async () => {
        const payload = {};
        const response = await fetch(`https://gateway-production.allen.ac.in/userms/v1/logout`, {
            method: 'POST',
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br, zstd",
                "Accept-Language": "en-US,en;q=0.9",
                "Appversion": "1",
                "Authorization": auth_token,
                "Content-Type": "application/json",
                "Ism": "false",
                "Origin": "https://allenplus.allen.ac.in",
                "Platform": "W",
                "Priority": "u=1, i",
                "Referer": "https://allenplus.allen.ac.in/",
                "Sec-Ch-Ua": `"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"`,
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": `"Windows"`,
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        if (data.status === "OK") {
            localStorage.removeItem('auth_token');
            return data.msg;
        } else {
            return false;
        }
    }

    return (
        <ApiContext.Provider value={{
            getSubjects,
            getTopics,
            getSubtopics,
            getClass,
            getUserdetails,
            login,
            logout
        }}>
            {props.children}
        </ApiContext.Provider>
    )
}

export default ApiState;