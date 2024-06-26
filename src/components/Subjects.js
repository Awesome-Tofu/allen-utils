import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../context/api/Apicontext';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';



const Subjects = () => {
    const context = useContext(ApiContext);
    const { getSubjects } = context;
    const [subjects, setSubjects] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        document.title = 'HOME - ALLEN UTILS';
        setProgress(10)
        const fetchData = async () => {
            const data = await getSubjects();
            setSubjects(data);
        }

        fetchData();
        setProgress(100)
    }, [getSubjects]);


    return (
        <>
            <LoadingBar
                height={3}
                color='#00ffe2'
                progress={progress}
            />
            <div className="mt-16 lg:mt-72">
                <div className="flex flex-wrap md:flex-row justify-center gap-4">
                    {subjects && subjects.map((sub) => (
                        <div key={sub.subjectName} style={{ backgroundColor: sub.subjectBgColor }} className="card text-primary-content w-4/5 md:w-96">
                            <div className="card-body">
                                <h1 className="card-title">{sub.subjectName}</h1>

                                <div className="card-actions justify-end">
                                    <Link to={`/${sub.subjectName}/${sub.id}`} className=" hover:scale-110 btn btn-black">Open</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Subjects