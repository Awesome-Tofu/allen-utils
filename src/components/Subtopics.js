import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../context/api/Apicontext';
import { useParams, Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


const Subtopics = () => {
    const context = useContext(ApiContext);
    const { getSubtopics } = context;
    const [subtopics, setSubtopics] = useState([]);
    const { subject, id, topic, topicid } = useParams();
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        document.title = `${topic} - ALLEN UTILS`;
        setProgress(10)
        const fetchData = async () => {
            const data = await getSubtopics(id, topicid);
            setSubtopics(data);
        }

        fetchData();
        setProgress(100)
    }, [getSubtopics, id, topicid, topic]);


    return (
        <>
            <LoadingBar
                height={3}
                color='#00ffe2'
                progress={progress}
            />
            <h1 className='text-3xl text-center font-semibold mb-8'>{topic}</h1>
            <div className="mt-16">
                <div className="flex justify-start mb-4">
                    <Link to={`/${subject}/${id}`} className="bg-base-100 text-secondary-foreground hover:scale-110 shadow-lg px-4 py-2 rounded-lg font-semibold text-lg ml-8 lg:ml-48 transition-transform duration-200">
                        Go Back
                    </Link>
                </div>
                <div className="flex flex-wrap md:flex-row justify-center gap-4"> {/* Keep responsive layout */}
                    {subtopics && subtopics.map((subtopic) => (
                        <div key={subtopic.classId} className="my-5 card bg-base-100 w-96 shadow-xl"> {/* Adjusted width and styles */}
                            <figure className="px-10 pt-10">
                                <img
                                    src={subtopic.videoThubnailLink}
                                    alt={subtopic.videoTitle}
                                    className="rounded-xl"
                                    loading='lazy' />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{subtopic.videoTitle}</h2>
                                <div className="card-actions">
                                    <Link to={`/${subject}/${id}/${topic}/${topicid}/class/${subtopic.classId}/${subtopic.type}`} className="btn btn-primary" rel="noopener noreferrer">Open</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Subtopics
