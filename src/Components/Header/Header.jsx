import './Header.css'

const Header = () => {
    return (
        <div className='Header'>
            <div className="left-header">
                <h1><span>Resume</span> that stands out!</h1>
                <h1>Make your own resume. <span>It's free</span></h1>
            </div>
            <div className="right-header">
                <div className="resume-image">
                    <img src={'/resume.svg'} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header