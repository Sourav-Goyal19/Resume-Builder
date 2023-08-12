import { forwardRef, useEffect, useState } from 'react';
import './Resume.css'
import { FiMail, FiPhoneCall, FiLinkedin, FiGithub, FiLink } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { IoMdSchool } from 'react-icons/io'
import { BsCalendarDate } from 'react-icons/bs'

const Resume = forwardRef((props, ref) => {
    const resume = props.resume;
    const sections = props.sections;
    const [source, setSource] = useState();
    const [target, setTarget] = useState();
    const [column, setColumn] = useState([])
    useEffect(() => {
        setColumn([[sections.workExp, sections.project, sections.education],
        [sections.achievements, sections.summary, sections.other]])
    }, [])
    useEffect(() => {
        handleDrag();
    }, [source])
    useEffect(() => {
    }, [target])
    const sectionsDiv = {
        [sections.workExp]: ((resume[sections.workExp].details.length == 1 && resume[sections.workExp].details[0].displayOnResume == false) ? '' : resume[sections.workExp].details.length > 0 && <div draggable onDragEnd={() => { setSource(resume[sections.workExp].id) }} onDragOver={() => { setTarget(resume[sections.workExp].id) }} className='section'>
            <div className="heading">Work Experience</div>
            <div className="mainWorkExp">
                {resume[sections.workExp]?.details.map((workExp, index) => {
                    if (workExp.displayOnResume) {
                        return (
                            <div key={index + Math.random() * 8} className='single'>
                                <div className="Title">
                                    {workExp?.title || "Work Experience Title"}
                                </div>
                                <div className="company">
                                    {workExp.company}
                                </div>
                                {workExp?.certificate &&
                                    <div className="resume-links" style={{ color: props.color }}>
                                        <FiLink color={props.color} size={20} />
                                        {workExp?.certificate}
                                    </div>
                                }
                                {workExp.startDate &&
                                    <div className="date">
                                        <BsCalendarDate color={props.color} size={20} />
                                        {`${workExp?.startDate} to ${workExp?.endDate}`}
                                    </div>
                                }
                                {workExp?.location &&
                                    <div className="location">
                                        <HiOutlineLocationMarker color={props.color} size={20} />
                                        {workExp?.location}
                                    </div>
                                }
                                <div className="Desc">
                                    {workExp?.workDesc.map((work, index) => work !== '' && <li key={index + Math.random() * 8}>{work}</li>)}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>),
        [sections.project]: ((resume[sections.project].details.length == 1 && resume[sections.project].details[0].displayOnResume == false) ? '' : resume[sections.project].details.length > 0 && <div draggable onDragEnd={() => { setSource(resume[sections.project].id) }} onDragOver={() => { setTarget(resume[sections.project].id) }} className='section'>
            <div className='heading'>Projects</div>
            <div className="mainProject">
                {resume[sections.project].details.map((project, index) => {
                    if (project.displayOnResume) {
                        return (
                            <div key={index + Math.random() * 8} className='single'>
                                <div className="Title">
                                    {project.title}
                                </div>
                                {project.deployedLink &&
                                    <div className="resume-links" style={{ color: props.color }}>
                                        <FiLink color={props.color} />
                                        {project.deployedLink}
                                    </div>
                                }
                                {project.githubLink &&
                                    <div className="resume-links" style={{ color: props.color }}>
                                        <FiGithub color={props.color} />
                                        {project.githubLink}
                                    </div>
                                }
                                <div className="overview">
                                    {project.overview}
                                </div>
                                <div className="Desc">
                                    {project?.projectDesc.map((project, index) => project != '' && <li key={index + Math.random() * 8}>{project}</li>)}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>),
        [sections.education]: ((resume[sections.education].details.length == 1 && resume[sections.education].details[0].displayOnResume == false) ? '' : resume[sections.education].details.length > 0 && <div draggable onDragEnd={() => { setSource(resume[sections.education].id) }} onDragOver={() => { setTarget(resume[sections.education].id) }} className='section'>
            <div className='heading'>Education</div>
            <div className="mainEducation">
                {resume[sections.education].details.map((education, index) => {
                    {
                        if (education.displayOnResume)
                            return (
                                <div key={index + Math.random() * 8} className='single'>
                                    <div className="Title">
                                        {education.title}
                                    </div>
                                    {education.collegeSchool &&
                                        <div className="collegeSchool">
                                            <IoMdSchool color={props.color} size={20} />
                                            {education.collegeSchool}
                                        </div>
                                    }
                                    {education.startDate &&
                                        <div className="date">
                                            {`${education.startDate} to ${education.endDate}`}
                                        </div>
                                    }
                                </div>
                            )
                    }
                })}
            </div>
        </div>),
        [sections.achievements]: (resume[sections.achievements].details.length > 0 && <div draggable onDragEnd={() => { setSource(resume[sections.achievements].id) }} onDragOver={() => { setTarget(resume[sections.achievements].id) }} className='section'>
            <div className="heading">Achievements</div>
            <div className="achievementList">
                <ol type='number'>
                    {resume[sections.achievements].details.map((achievement, index) =>
                        <li key={index + Math.random() * 8}>{achievement}</li>
                    )}
                </ol>
            </div>
        </div>),
        [sections.summary]: (resume[sections.summary].detail !== '' && <div draggable onDragEnd={() => { setSource(resume[sections.summary].id) }} onDragOver={() => { setTarget(resume[sections.summary].id) }} className='section'>
            <div className="heading">Summary</div>
            <div className="summary">{resume[sections.summary].detail}</div>
        </div>),
        [sections.other]: (resume[sections.other].detail !== '' && <div draggable onDragEnd={() => { setSource(resume[sections.other].id) }} onDragOver={() => { setTarget(resume[sections.other].id) }} className='section'>
            <div className="heading">Other</div>
            <div className="other">{resume[sections.other].detail}</div>
        </div>)
    }
    const handleDrag = () => {
        if (!source || !target) {
            return;
        }
        const sourceColumnIndex = column.findIndex(col => col.includes(source));
        const targetColumnIndex = column.findIndex(col => col.includes(target));
        if (sourceColumnIndex === -1 || targetColumnIndex === -1) {
            return;
        }
        const updatedColumn = [...column];
        const sourceIndex = column[sourceColumnIndex].indexOf(source);
        const targetIndex = column[targetColumnIndex].indexOf(target);

        [updatedColumn[sourceColumnIndex][sourceIndex], updatedColumn[targetColumnIndex][targetIndex]] =
            [updatedColumn[targetColumnIndex][targetIndex], updatedColumn[sourceColumnIndex][sourceIndex]];

        setColumn(updatedColumn);
    };
    return (
        <div ref={ref} className='resume'>
            <div className="resume-header">
                <div className="details">
                    <h2 className="name">{resume[sections.basicInfo].detail.name || "User Name"}</h2>
                    <h3 style={{ color: props.color }} className='title'>{resume[sections.basicInfo].detail.title || "User Title"}</h3>
                </div>
                <div className="links">
                    <div className="link">
                        <FiMail color={props.color} />
                        <p>{resume[sections.basicInfo].detail.email || "user@email.com"}</p>
                    </div>
                    <div className="link">
                        <FiPhoneCall color={props.color} />
                        <p>{resume[sections.basicInfo].detail.number || "123456789"}</p>
                    </div>
                    <div className="link">
                        <FiLinkedin color={props.color} />
                        <p>{resume[sections.basicInfo].detail.linkedin || "LinkedIn Link"}</p>
                    </div>
                    <div className="link">
                        <FiGithub color={props.color} />
                        <p>{resume[sections.basicInfo].detail.github || "Github Link"}</p>
                    </div>
                </div>
            </div>
            <div className="columns">
                <div className="column1">
                    {column[0]?.map((section, index) => (
                        <div key={index} className="column-section">
                            {sectionsDiv[section]}
                        </div>
                    ))}
                </div>
                <div className="column2">
                    {column[1]?.map((section, index) => (
                        <div key={index} className="column-section">
                            {sectionsDiv[section]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default Resume