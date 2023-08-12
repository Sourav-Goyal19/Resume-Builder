import { useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import './Body.css'
import { BiDownload } from 'react-icons/bi'
import Form from './Form/Form'
import Resume from './Resume/Resume'

const Body = () => {
    const resumeRef = useRef();
    const sections = {
        basicInfo: "Basic Info",
        workExp: "Work Experience",
        project: "Projects",
        education: "Education",
        achievements: "Achievements",
        summary: "Summary",
        other: "Other",
    }
    const [resumeInformation, setResumeInformation] = useState({
        [sections.basicInfo]: {
            id: sections.basicInfo,
            sectionTitle: sections.basicInfo,
            detail: {},
        },
        [sections.workExp]: {
            id: sections.workExp,
            sectionTitle: sections.workExp,
            details: [],
        },
        [sections.project]: {
            id: sections.project,
            sectionTitle: sections.project,
            details: [],
        },
        [sections.education]: {
            id: sections.education,
            sectionTitle: sections.education,
            details: [],
        },
        [sections.achievements]: {
            id: sections.achievements,
            sectionTitle: sections.achievements,
            details: [],
        },
        [sections.summary]: {
            id: sections.summary,
            sectionTitle: sections.summary,
            detail: "",
        },
        [sections.other]: {
            id: sections.other,
            sectionTitle: sections.other,
            detail: "",
        }
    })
    const colors = ['#34568B', '#009b77', '#9b2335', '#363945', '#cd212a', '#ffa500']
    const [color, setColor] = useState(colors[1]);
    return (
        <div className='resume-body-section' >
            <h1>Resume Builder</h1>
            <div className="resume-body-header">
                <div className="colors">
                    {colors.map((item) =>
                        <span key={item} onClick={() => { setColor(item) }} className={color === item ? "activeColor" : ''} style={{ backgroundColor: item }} />
                    )}
                </div>
                <ReactToPrint
                    trigger={() => {
                        return (<div><button>Download <BiDownload /></button></div>);
                    }}
                    content={() => resumeRef.current}
                />
            </div>
            <div className="main">
                <Form sections={sections} resumeInformation={resumeInformation} setResumeInformation={setResumeInformation} />
                <Resume ref={resumeRef} resume={resumeInformation} color={color} sections={sections} />
            </div>
        </div >
    )
}

export default Body