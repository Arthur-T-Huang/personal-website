import { Link } from 'react-router-dom'

const DRIVE_FILE_ID = '1CvS9rHAZNMBbQYxRIh_7xD2PMm-q8epR'
const PREVIEW_URL = `https://drive.google.com/file/d/${DRIVE_FILE_ID}/preview`
const DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${DRIVE_FILE_ID}`

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-topbar">
        <Link to="/" className="resume-back">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
        <div className="resume-topbar-title">Arthur Huang — Resume</div>
        <a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" className="resume-download">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
      </div>
      <div className="resume-viewer">
        <iframe
          src={PREVIEW_URL}
          title="Arthur Huang Resume"
          className="resume-iframe"
          allow="autoplay"
        />
      </div>
    </div>
  )
}
