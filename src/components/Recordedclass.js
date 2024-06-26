import React, { useContext, useState, useEffect } from 'react';
import ApiContext from '../context/api/Apicontext';
import { useParams, Link } from 'react-router-dom';
import PdfIcon from '../assets/pdf.svg';
import DownloadIcon from '../assets/download.svg';
import NewTab from '../assets/newtab.svg';
import pcTutorial from '../assets/pc-download.mp4';
import mobileDownload from '../assets/mobile-download.mp4';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import LoadingBar from 'react-top-loading-bar';



export default function Recordedclass({ alert }) {
    const context = useContext(ApiContext);
    const { getClass } = context;
    const [classes, setClasses] = useState([]);
    const [emoji, setEmoji] = useState('📋️');
    const { id, topicid, classid, typeid, topic, subject } = useParams();
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        setProgress(10)
        const fetchData = async () => {
            const data = await getClass(classid, typeid);
            setClasses(data);
        }
        
        fetchData();
        document.title = `${classes.videoTitle} - ALLEN UTILS`;
        setProgress(100)
    }, [getClass, classid, typeid, classes.videoTitle]);

    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const tutorialVideoSrc = isMobileDevice() ? mobileDownload : pcTutorial;

    const tutorialVideoCaption = isMobileDevice() ?
        `<a class="blue-dotted-underline" target="_blank" href="https://play.google.com/store/apps/details?id=com.kiwibrowser.browser&hl=en_IN">Kiwi Browser&nbsp;<img src=${NewTab} alt="PDF Icon" style="width: 14px; height: 14px; vertical-align: middle; display: inline-block;"> </a><br/><a class="blue-dotted-underline" target="_blank" href="https://chromewebstore.google.com/detail/zed-zoom-easy-downloader/pdadlkbckhinonakkfkdaadceojbekep">ZED extension<img src=${NewTab} alt="PDF Icon" style="width: 14px; height: 14px; vertical-align: middle; display: inline-block;"></a>`
        : `<a class="blue-dotted-underline" target="_blank" href="https://chromewebstore.google.com/detail/enable-right-click-for-go/ofgdcdohlhjfdhbnfkikfeakhpojhpgm">Enable Right Click Extension&nbsp;<img src=${NewTab} alt="PDF Icon" style="width: 14px; height: 14px; vertical-align: middle; display: inline-block;"> </a>`;

    const copyToClipboard = async (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                alert('Copied to clipboard');
                setEmoji('✔️');
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        } else {
            // Fallback: Copying text using a temporary text area
            try {
                let textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Copied to clipboard');
                setEmoji('✔️');
            } catch (err) {
                console.error('Fallback failed to copy: ', err);
            }
        }
    };

    return (
        <>
            <LoadingBar
                height={3}
                color='#00ffe2'
                progress={progress}
            />
            <h1 className="text-3xl text-center font-semibold mb-8">{classes.videoTitle}</h1>
            <div className="mt-16">
                <div className="flex justify-start mb-4">
                    <Link to={`/${subject}/${id}/${topic}/${topicid}`} className="bg-base-100 text-secondary-foreground hover:scale-110 shadow-lg px-4 py-2 rounded-lg font-semibold text-lg ml-8 lg:ml-48 transition-transform duration-200">
                        Go Back
                    </Link>
                </div>
                {classes && <>
                    <div className="relative p-6 border-2 border-dotted border-muted-foreground rounded-2xl bg-card text-card-foreground max-w-2xl mx-auto shadow-lg transition-all duration-300">
                        <a href={classes.videoLink} target="_blank" rel="noopener noreferrer" className="block mb-4 text-lg cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-500 max-w-full" style={{ textDecorationStyle: 'dotted', overflowWrap: 'break-word' }}>
                            <p id="copyText" className="whitespace-normal" style={{ overflowWrap: 'break-word' }}>
                                {classes.videoLink}
                            </p>
                        </a>
                        <button id="copyButton" onClick={() => copyToClipboard(classes.videoLink)} className="absolute top-4 right-4 bg-white text-secondary-foreground p-2 rounded-full hover:scale-110">
                            <img alt="copy-icon" src={`https://openui.fly.dev/openui/24x24.svg?text=${emoji}`} />
                        </button>
                    </div>
                    {classes.pdfLinks?.length > 0 && <div className="dropdown mt-5">
                        <div tabIndex={0} role="button" className="btn m-1">
                            Notes <img src={PdfIcon} alt="PDF Icon" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {classes.pdfLinks?.map((notes, index) => {
                                return <li key={index}><a href={notes}>PDF {index + 1} <img src={DownloadIcon} alt='Donwload icon' style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} /> </a></li>;
                            })}
                        </ul>
                    </div>}
                    <br />
                    <button className="btn mt-10" onClick={() => document.getElementById('my_modal_1').showModal()}>How to Download the Lecture ❓</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Tutorial</h3>
                            <Player>
                                <source src={tutorialVideoSrc} />
                            </Player>
                            <div className='mt-7' dangerouslySetInnerHTML={{ __html: tutorialVideoCaption }}></div>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </>}
            </div>
        </>
    )
}
