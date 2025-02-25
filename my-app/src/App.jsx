import { useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti'
import './App.css'
import { playSound } from './utils/audio'
import popSound from './assets/sounds/pop.mp3'
import applauseSound from './assets/sounds/applause.mp3'
import vtcLogo from './assets/logo.png' // Add your logo file
import yuktiLogo from './assets/yukti-logo.png' // Add this import

function App() {
  const [launched, setLaunched] = useState(false)
  const [documentHeight, setDocumentHeight] = useState(document.body.scrollHeight)
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight
    })
    setDocumentHeight(Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    ))
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)
    detectSize() // Initial detection
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [])

  const handleLaunch = () => {
    setLaunched(true)
    
    // Stage 1: Initial pop sound (0s)
    playSound(popSound);
    
    // Stage 2: Start continuous applause (1s)
    setTimeout(() => {
      const applause = new Audio(applauseSound);
      applause.loop = true;
      applause.play();
      
      // Stop applause just before redirect
      setTimeout(() => {
        applause.pause();
        applause.currentTime = 0;
      }, 9000); // Stop at 9 seconds
    }, 1000);
    
    // Final redirect (10s)
    setTimeout(() => {
      window.location.href = "https://yukti.vtucpgsklb.in";
    }, 10000);
  }

  return (
    <div className="launch-container">
      {launched && (
        <div className="confetti-container">
          <ReactConfetti
            width={windowDimension.width}
            height={documentHeight}
            tweenDuration={1000}
            gravity={0.2}
            numberOfPieces={400}
            recycle={true}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />
        </div>
      )}
      
      <div className='ceremony-header'>
      <img src={vtcLogo} alt="VTU Logo" className="vtc-logo" /> {/* Fixed class name */}
        <h1>Visvesvaraya Tecnological University </h1>
        <h2>Center for PG Studies and Regional Office Kalaburagi - 585105</h2>
        <h3>Presents</h3>
        <img src={yuktiLogo} alt="YUKTI 2025" className="yukti-logo" />
      </div>
      
      <div className="ceremony-content">
        <h2>Welcome to Our Digital Inauguration</h2>
        <h4>By</h4>
        <h3>Dr. S. Vidyashankar</h3>
        <p>Hon'ble Vice Chancellor</p>
        {!launched ? (
          <div className="launch-section">
            <button 
              className="launch-button"
              onClick={handleLaunch}
            >
              Launch Website
            </button>
            <p>Please click the button to inaugurate our website</p>
          </div>
        ) : (
          <div className="success-message">
            <h2>🎉 Website Successfully Launched! 🎉</h2>
            <p>Thank you for being part of this memorable moment.</p>
          </div>
        )}
      </div>
      <div className="section-divider">
        <div className="divider-line"></div>
        <div className="divider-icon">⚡</div>
        <div className="divider-line"></div>
      </div>
      <footer className="footer">
        <p className="copyright">© 2025 YUKTI-2025. All rights reserved.</p>
        <p>Made with ❤️ by <a href="https://yousufsky.vercel.app" target="_blank" rel="noopener noreferrer" className="highlight-name">Yousufuddin</a></p>
      </footer>
    </div>
  )
}

export default App
