import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../context/api/Apicontext';
import { useParams, Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


const Topics = () => {
    const context = useContext(ApiContext);
    const { getTopics } = context;
    const [topics, setTopics] = useState([]);
    const [progress, setProgress] = useState(0);

    const { subject, id } = useParams();

    useEffect(() => {
        document.title = `${subject} - ALLEN UTILS`;
        setProgress(10)
        const fetchData = async () => {
            const data = await getTopics(id);
            setTopics(data);
        }

        fetchData();
        setProgress(100)
    }, [getTopics, id, subject]);



    return (
        <>
            <LoadingBar
                height={3}
                color='#00ffe2'
                progress={progress}
            />
            <h1 className='text-3xl text-center font-semibold mb-8'>{subject}</h1>
            <div className="mt-16">
                <div className="flex justify-start mb-4"> {/* Container for the back button */}
                    <Link to="/" className="bg-base-100 text-secondary-foreground hover:scale-110 shadow-lg px-4 py-2 rounded-lg font-semibold text-lg ml-8 lg:ml-48 transition-transform duration-200">
                        Go Back
                    </Link>
                </div>
                <div className="flex flex-wrap md:flex-row justify-center gap-4"> {/* Keep responsive layout */}
                    {topics && topics.map((topic) => (
                        <div key={topic.id} className="my-5 card bg-base-100 w-96 shadow-xl"> {/* Adjusted width and styles */}
                            <figure className="px-10 pt-10">
                                <img
                                    src={topic.thumbnailImage} // Use topic.thumbnailImage instead of the static URL
                                    alt={topic.topicsName} // Use topic.topicsName for the alt text
                                    className="rounded-xl"
                                    loading='lazy' />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{topic.topicsName}</h2> {/* Use topic.topicsName for the title */}
                                <p>If a dog chews shoes whose shoes does he choose?</p> {/* Static content, can be dynamic based on topic */}
                                <div className="card-actions">
                                    <Link to={`/${subject}/${id}/${topic.topicsName}/${topic.id}`} className="btn btn-primary">Open</Link> {/* Adjusted button text to "Open" */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Topics