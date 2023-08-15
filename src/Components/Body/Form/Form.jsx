import { useEffect, useRef, useState } from 'react'
import './Form.css'
import { toast } from 'react-toastify';
import { ImCross } from 'react-icons/im'
import { InputControl } from '../../InputControl/InputControl'

const Form = (props) => {
    const markerRef = useRef();
    const sections = props.sections;
    const resumeInformation = props.resumeInformation;
    const setResumeInformation = props.setResumeInformation;
    const [wid, setWid] = useState(1)
    const [pid, setPid] = useState(1)
    const [eid, setEid] = useState(1)
    const [work, setWork] = useState(true)
    const [project, setProject] = useState(true)
    const [education, setEducation] = useState(true)
    const [updatingState, setUpdatingState] = useState(false);
    const workExpContent = {
        title: "",
        company: "",
        certificate: "",
        location: "",
        startDate: "",
        endDate: "",
        workDesc: ["", "", ""],
        displayOnResume: true,

    }
    const projectContent = {
        title: "",
        overview: "",
        deployedLink: "",
        githubLink: "",
        projectDesc: ["", "", "", ""],
        displayOnResume: true,

    }
    const educationContent = {
        title: '',
        collegeSchool: "",
        startDate: "",
        endDate: "",
        displayOnResume: true,

    }
    const [activeSection, setActiveSection] = useState(Object.keys(sections)[0])
    const [basicInfoData, setBasicInfoData] = useState({
        name: "",
        title: "",
        linkedin: "",
        github: "",
        email: "",
        number: "",
    })
    const [workExpData, setWorkExpData] = useState(workExpContent)
    const [projectsData, setProjectsData] = useState(projectContent)
    const [educationData, setEducationData] = useState(educationContent)
    const [achievementsData, setAchievementsData] = useState(["", "", "", ""])
    const [summaryData, setSummaryData] = useState({
        summary: "",
    })
    const [otherData, setOtherData] = useState({
        other: "",
    })

    const basicInfoBody = (
        <div className={"detail"}>
            <InputControl value={basicInfoData.name} onChange={(e) => { setBasicInfoData((prev) => ({ ...prev, name: e.target.value })) }}
                label="Name"
                placeholder="Enter your full name eg. Aashu"
            />
            <div className={"row"}>
                <InputControl value={basicInfoData.title} onChange={(e) => { setBasicInfoData((prev) => ({ ...prev, title: e.target.value })) }}
                    label="Title"
                    placeholder="Enter your title eg. Frontend developer"
                />
            </div>
            <div className={"row"}>
                <InputControl value={basicInfoData.linkedin} onChange={(e) => { setBasicInfoData((prev) => ({ ...prev, linkedin: e.target.value })) }}
                    label="Linkedin Link"
                    placeholder="Enter your linkedin profile link" />
                <InputControl value={basicInfoData.github} onChange={(e) => { setBasicInfoData((prev) => ({ ...prev, github: e.target.value })) }}
                    label="Github Link"
                    placeholder="Enter your github profile link"
                />
            </div><div className={"row"}>
                <InputControl value={basicInfoData.email} onChange={(e) => { setBasicInfoData((prev) => ({ ...prev, email: e.target.value })) }} label="Email" placeholder="Enter your email" />
                <InputControl value={basicInfoData.number} onChange={(e) => { setBasicInfoData((prev) => ({ ...prev, number: e.target.value })) }}
                    label="Enter phone"
                    type="number"
                    placeholder="Enter your phone number"
                />
            </div>
        </div>
    );

    const workExpBody = (
        <div className={"detail"}>
            <InputControl value={workExpData.title} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, title: e.target.value })) }}
                label="Title"
                placeholder="Enter title e.g. Frontend developer"
            />
            <div className="chips">
                {resumeInformation[sections.workExp]?.details.length >= 1 && resumeInformation[sections.workExp]?.details.map((workExp) => {
                    return (
                        <div key={workExp.id} style={{ cursor: 'default' }} className="chip">
                            <p onClick={() => editWorkExp(workExp.id)}>{workExp.title}</p>
                            <ImCross onClick={() => deleteWorkExp(workExp.id)
                            } />
                        </div>
                    )
                })}
                <p onClick={() => {
                    setWorkExpData(workExpContent),
                        setUpdatingState(false)
                }
                } style={{ color: 'blue', cursor: 'pointer' }}>{resumeInformation[sections.workExp]?.details.length >= 1 && '+New'}</p>
            </div>
            <div className={"row"}>
                <InputControl value={workExpData.company} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, company: e.target.value })) }}
                    label="Company Name"
                    placeholder="Enter company name e.g. amazon"
                />
            </div>
            <div className={"row"}>
                <InputControl value={workExpData.certificate} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, certificate: e.target.value })) }}
                    label="Certificate Link"
                    placeholder="Enter certificate link"
                />
                <InputControl value={workExpData.location} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, location: e.target.value })) }}
                    label="Location"
                    placeholder="Enter location eg. Remote"
                />
            </div>
            <div className={"row"}>
                <InputControl value={workExpData.startDate} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, startDate: e.target.value })) }}
                    label="Start Date"
                    type="date"
                    placeholder="Enter start date of work" />
                <InputControl value={workExpData.endDate} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, endDate: e.target.value })) }}
                    label="End Date"
                    type="date"
                    placeholder="Enter end date of work" />
            </div>
            <div className={"column"}>
                <label>Enter work description</label>
                <InputControl value={workExpData.workDesc[0]} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, workDesc: [e.target.value, prev.workDesc[1], prev.workDesc[2]] })) }} placeholder="Line 1" />
                <InputControl value={workExpData.workDesc[1]} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, workDesc: [prev.workDesc[0], e.target.value, prev.workDesc[2]] })) }} placeholder="Line 2" />
                <InputControl value={workExpData.workDesc[2]} onChange={(e) => { setWorkExpData((prev) => ({ ...prev, workDesc: [prev.workDesc[0], prev.workDesc[1], e.target.value] })) }} placeholder="Line 3" />
                <InputControl label={'Display on Resume:'}
                    type="checkbox"
                    checked={workExpData.displayOnResume}
                    onChange={(e) => setWorkExpData((prev) => ({ ...prev, displayOnResume: e.target.checked }))}
                />
            </div>
        </div>
    );

    const projectBody = (
        <div className={"detail"}>
            <InputControl value={projectsData.title} onChange={(e) => { setProjectsData((prev) => ({ ...prev, title: e.target.value })) }} label="Title" placeholder="Enter title eg. Chat app" />
            <div className="chips">
                {resumeInformation[sections.project]?.details.length >= 1 && resumeInformation[sections.project]?.details.map((project) => {
                    return (
                        <div key={project.id} style={{ cursor: 'default' }} className="chip">
                            <p onClick={() => editProject(project.id)}>{project.title}</p>
                            <ImCross onClick={() => deleteProject(project.id)} />
                        </div>
                    )
                })}
                <p onClick={() => { setProjectsData(projectContent), setUpdatingState(false) }} style={{ color: 'blue', cursor: 'pointer' }}>{resumeInformation[sections.project]?.details.length >= 1 && '+New'}</p>
            </div>
            <InputControl value={projectsData.overview} onChange={(e) => { setProjectsData((prev) => ({ ...prev, overview: e.target.value })) }}
                label="Overview"
                placeholder="Enter basic overview of project" />
            <div className={"row"}>
                <InputControl value={projectsData.deployedLink} onChange={(e) => { setProjectsData((prev) => ({ ...prev, deployedLink: e.target.value })) }}
                    label="Deployed Link"
                    placeholder="Enter deployed link of project"
                />
                <InputControl value={projectsData.githubLink} onChange={(e) => { setProjectsData((prev) => ({ ...prev, githubLink: e.target.value })) }}
                    label="Github Link"
                    placeholder="Enter github link of project"
                />
            </div>
            <div className={"column"}>
                <label>Enter project description</label>
                <InputControl value={projectsData.projectDesc[0]} onChange={(e) => { setProjectsData((prev) => ({ ...prev, projectDesc: [e.target.value, prev.projectDesc[1], prev.projectDesc[2], prev.projectDesc[3]], })) }} placeholder="Line 1" />
                <InputControl value={projectsData.projectDesc[1]} onChange={(e) => { setProjectsData((prev) => ({ ...prev, projectDesc: [prev.projectDesc[0], e.target.value, prev.projectDesc[2], prev.projectDesc[3]] })) }} placeholder="Line 2" />
                <InputControl value={projectsData.projectDesc[2]} onChange={(e) => { setProjectsData((prev) => ({ ...prev, projectDesc: [prev.projectDesc[0], prev.projectDesc[1], e.target.value, prev.projectDesc[3]] })) }} placeholder="Line 3" />
                <InputControl value={projectsData.projectDesc[3]} onChange={(e) => { setProjectsData((prev) => ({ ...prev, projectDesc: [prev.projectDesc[0], prev.projectDesc[1], prev.projectDesc[2], e.target.value,] })) }} placeholder="Line 4" />
                <InputControl label={'Display on Resume:'}
                    type="checkbox"
                    checked={projectsData.displayOnResume}
                    onChange={(e) => setProjectsData((prev) => ({ ...prev, displayOnResume: e.target.checked }))}
                />
            </div>
        </div>
    );

    const educationBody = (
        <div className={"detail"}>
            <InputControl value={educationData.title} onChange={(e) => { setEducationData((prev) => ({ ...prev, title: e.target.value })) }} label="Title" placeholder="Enter title eg. B-tech" />
            <div className="chips">
                {resumeInformation[sections.education]?.details.length >= 1 && resumeInformation[sections.education]?.details.map((education) => {
                    return (
                        <div key={education.id} style={{ cursor: 'default' }} className="chip">
                            <p onClick={() => editEducation(education.id)}>{education.title}</p>
                            <ImCross onClick={() => deleteEducation(education.id)} />
                        </div>
                    )
                })}
                <p onClick={() => { setEducationData(educationContent), setUpdatingState(false) }} style={{ color: 'blue', cursor: 'pointer' }}>{resumeInformation[sections.education]?.details.length >= 1 && '+New'}</p>
            </div>
            <InputControl value={educationData.collegeSchool} onChange={(e) => { setEducationData((prev) => ({ ...prev, collegeSchool: e.target.value })) }}
                label="College/School Name"
                placeholder="Enter name of your college/school" />
            <div className={"row"}>
                <InputControl value={educationData.startDate} onChange={(e) => { setEducationData((prev) => ({ ...prev, startDate: e.target.value })) }}
                    label="Start Date"
                    type="date"
                    placeholder="Enter start date of this education"
                />
                <InputControl value={educationData.endDate} onChange={(e) => { setEducationData((prev) => ({ ...prev, endDate: e.target.value })) }}
                    label="End Date"
                    type="date"
                    placeholder="Enter end date of this education"
                />
            </div>
            <InputControl label={'Display on Resume:'}
                type="checkbox"
                checked={educationData.displayOnResume}
                onChange={(e) => setEducationData((prev) => ({ ...prev, displayOnResume: e.target.checked }))}
            />
        </div>
    );

    const achievementsBody = (
        <div className={"detail"}>
            <div className={"column"}>
                <label>List your achievements</label>
                <InputControl
                    value={achievementsData[0]}
                    onChange={(e) => {
                        setAchievementsData((prev) => {
                            const newData = [...prev];
                            newData[0] = e.target.value;
                            return newData;
                        });
                    }}
                    placeholder="Line 1"
                />
                <InputControl
                    value={achievementsData[1]}
                    onChange={(e) => {
                        setAchievementsData((prev) => {
                            const newData = [...prev];
                            newData[1] = e.target.value;
                            return newData;
                        });
                    }}
                    placeholder="Line 2"
                />
                <InputControl
                    value={achievementsData[2]}
                    onChange={(e) => {
                        setAchievementsData((prev) => {
                            const newData = [...prev];
                            newData[2] = e.target.value;
                            return newData;
                        });
                    }}
                    placeholder="Line 3"
                />
                <InputControl
                    value={achievementsData[3]}
                    onChange={(e) => {
                        setAchievementsData((prev) => {
                            const newData = [...prev];
                            newData[3] = e.target.value;
                            return newData;
                        });
                    }}
                    placeholder="Line 4"
                />
            </div>
        </div>
    );

    const summaryBody = (
        <div className={"detail"}>
            <InputControl value={summaryData.summary} onChange={(e) => { setSummaryData((prev) => ({ ...prev, summary: e.target.value })) }}
                label="Summary"
                placeholder="Enter your objective/summary" />
        </div>
    );

    const otherBody = (
        <div className={"detail"}>
            <InputControl value={otherData.other} onChange={(e) => { setOtherData((prev) => ({ ...prev, other: e.target.value })) }}
                label="Other"
                placeholder="Enter your something" />
        </div>
    );

    const generateBody = () => {
        switch (sections[activeSection]) {
            case sections.basicInfo: return basicInfoBody;
            case sections.workExp: return workExpBody;
            case sections.project: return projectBody;
            case sections.education: return educationBody;
            case sections.achievements: return achievementsBody;
            case sections.summary: return summaryBody;
            case sections.other: return otherBody;
            default: return null;
        }
    };

    const editWorkExp = (id) => {
        setWid(id);
        setUpdatingState(true);
        const workExp = resumeInformation[sections.workExp].details;
        const newWorkExp = workExp.find(x => x.id === id);
        setWorkExpData(newWorkExp)
    }

    const updateWorkExp = () => {
        const updatedWorkExpDetails = resumeInformation[sections.workExp]?.details.map(exp => (exp.id === wid ? workExpData : exp));
        setResumeInformation(prevResumeInfo => ({
            ...prevResumeInfo,
            [sections.workExp]: {
                ...prevResumeInfo[sections.workExp],
                details: updatedWorkExpDetails,
            },
        }));
        setUpdatingState(false);
        setWorkExpData(workExpContent)
    }

    const deleteWorkExp = (id) => {
        const workExp = [...resumeInformation[sections.workExp].details]
        const newWorkExp = workExp.filter(x => x.id !== id)
        setResumeInformation((prev) => ({
            ...prev, [sections.workExp]: {
                ...prev[sections.workExp],
                details: newWorkExp,
            },
        }))
        setWorkExpData(workExpContent);
    }

    const editProject = (id) => {
        setPid(id);
        setUpdatingState(true);
        const project = resumeInformation[sections.project].details;
        const newProject = project.find(x => x.id === id);
        setProjectsData(newProject);
    }

    const updateProject = () => {
        const updatedProjectDetails = resumeInformation[sections.project]?.details.map(exp => (exp.id === pid ? projectsData : exp));
        setResumeInformation(prevResumeInfo => ({
            ...prevResumeInfo,
            [sections.project]: {
                ...prevResumeInfo[sections.project],
                details: updatedProjectDetails,
            },
        }));
        setUpdatingState(false);
        setProjectsData(projectContent)
    }

    const deleteProject = (id) => {
        const project = [...resumeInformation[sections.project].details]
        const newProject = project.filter(x => x.id !== id)
        setResumeInformation((prev) => ({
            ...prev, [sections.project]: {
                ...prev[sections.project],
                details: newProject,
            },
        }))
        setProjectsData(projectContent)
    }

    const editEducation = (id) => {
        setEid(id);
        setUpdatingState(true);
        const education = resumeInformation[sections.education].details;
        const newEducation = education.find(x => x.id === id);
        setEducationData(newEducation)
    }

    const updateEducation = () => {
        const updatedEducationDetails = resumeInformation[sections.education]?.details.map(exp => (exp.id === eid ? educationData : exp));
        setResumeInformation(prevResumeInfo => ({
            ...prevResumeInfo,
            [sections.education]: {
                ...prevResumeInfo[sections.education],
                details: updatedEducationDetails,
            },
        }));
        setUpdatingState(false);
        setEducationData(educationContent)
    }

    const deleteEducation = (id) => {
        const education = [...resumeInformation[sections.education].details]
        const newEducation = education.filter(x => x.id !== id)
        setResumeInformation((prev) => ({
            ...prev, [sections.education]: {
                ...prev[sections.education],
                details: newEducation,
            },
        }))
        setEducationData(educationContent);
    }

    const updateResume = () => {
        if (basicInfoData.name === "") {
            toast.error("Your Name Is Required Before Saving")
            return;
        }
        if (basicInfoData.title === "") {
            toast.error("Your Title Is Required Before Saving")
            return;
        }
        const isEmptyBasicInfo = Object.values(basicInfoData).every(value => value === "");
        var isEmptyWorkExp = false;
        var isEmptyProjects = false;
        var isEmptyEducation = false;
        if (workExpData.title == "" && workExpData.certificate == "" && workExpData.company == "" && workExpData.startDate == "" && workExpData.endDate == "" && workExpData.workDesc.every(desc => desc == "")) {
            isEmptyWorkExp = true;
        }
        if (projectsData.title == "" && projectsData.deployedLink == "" && projectsData.overview == "" && projectsData.githubLink == "" && projectsData.projectDesc.every(desc => desc == "")) {
            isEmptyProjects = true;
        }
        if (educationData.title == "" && educationData.collegeSchool == "" && educationData.startDate == "" && educationData.endDate == "") {
            isEmptyEducation = true;
        } const isEmptyAchievements = achievementsData.every(value => value === "");
        const isEmptySummary = summaryData.summary === "";
        const isEmptyOther = otherData.other === "";
        if ((workExpData.company !== "" || workExpData.startDate !== "" || workExpData.endDate !== "") && workExpData.title === "") {
            isEmptyWorkExp = true;
            setWork(false);
            toast.error("Your Work Exprerience Title Is Empty");
        }
        else {
            setWork(true)
        }
        if ((projectsData.overview !== "" || projectsData.deployedLink !== "" || projectsData.githubLink !== "") && projectsData.title === "") {
            isEmptyProjects = true;
            setProject(false);
            toast.error("Your Project Title Is Empty");
        }
        else {
            setProject(true)
        }
        if ((educationData.collegeSchool !== "" || educationData.startDate !== "" || educationData.endDate !== "") && educationData.title === "") {
            isEmptyEducation = true;
            setEducation(false);
            toast.error("Your Education Title Is Empty");
        }
        else {
            setEducation(true)
        }

        if (!isEmptyWorkExp) {
            workExpData.id = Math.random() * 5;
        }
        if (!isEmptyProjects) {
            projectsData.id = Math.random() * 5;
        }
        if (!isEmptyEducation) {
            educationData.id = Math.random() * 5;
        }

        setResumeInformation(prevResumeInfo => ({
            ...prevResumeInfo,
            [sections.basicInfo]: isEmptyBasicInfo
                ? { ...prevResumeInfo[sections.basicInfo] }
                : { ...prevResumeInfo[sections.basicInfo], detail: basicInfoData },
            [sections.workExp]: isEmptyWorkExp
                ? { ...prevResumeInfo[sections.workExp] }
                : { ...prevResumeInfo[sections.workExp], details: [...prevResumeInfo[sections.workExp].details, workExpData] },
            [sections.project]: isEmptyProjects
                ? { ...prevResumeInfo[sections.project] }
                : { ...prevResumeInfo[sections.project], details: [...prevResumeInfo[sections.project].details, projectsData] },
            [sections.education]: isEmptyEducation
                ? { ...prevResumeInfo[sections.education] }
                : { ...prevResumeInfo[sections.education], details: [...prevResumeInfo[sections.education].details, educationData] },
            [sections.achievements]: isEmptyAchievements
                ? { ...prevResumeInfo[sections.achievements] }
                : { ...prevResumeInfo[sections.achievements], details: achievementsData },
            [sections.summary]: isEmptySummary
                ? { ...prevResumeInfo[sections.summary] }
                : { ...prevResumeInfo[sections.summary], detail: summaryData.summary },
            [sections.other]: isEmptyOther
                ? { ...prevResumeInfo[sections.other] }
                : { ...prevResumeInfo[sections.other], detail: otherData.other },
        }));
        if (work) {
            setWorkExpData(workExpContent);
        }
        if (project) {
            setProjectsData(projectContent)
        }
        if (education) {
            setEducationData(educationContent)
        }
    };

    function indicator(e) {
        markerRef.current.style.left = e.offsetLeft + 'px';
        markerRef.current.style.width = e.offsetWidth + 'px';
    }

    useEffect(() => {
        console.log(resumeInformation);
    }, [resumeInformation]);

    return (
        <div className='resume-form'>
            <div className="resume-form-mainbody">
                <div className="resume-form-header custom-scroll">
                    <span ref={markerRef} id="marker"></span>
                    {Object.keys(sections).map((key) =>
                        <div className={`section ${activeSection === key ? 'active' : ''}`} onMouseEnter={(e) => { setActiveSection(key), indicator(e.target) }} key={key}>{sections[key]}</div>
                    )}
                </div>
                <hr style={{ margin: '5px 0' }} />
                <div className='Editor'>
                    {generateBody(props.activeSection)}
                </div>
                <button onClick={() => {
                    if (updatingState && activeSection === 'workExp') {
                        updateWorkExp()
                    }
                    else if (updatingState && activeSection === 'project') {
                        updateProject()
                    }
                    else if (updatingState && activeSection === 'education') {
                        updateEducation()
                    }
                    else {
                        updateResume()
                    }
                }}>{updatingState ? 'Update' : 'Save'}</button>
            </div>
        </div>
    )
}

export default Form