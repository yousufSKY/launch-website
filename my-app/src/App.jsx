import { useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti'
import './App.css'
import { playSound } from './utils/audio'
import popSound from './assets/sounds/pop.mp3'
import applauseSound from './assets/sounds/applause.mp3'
import vtcLogo from './assets/logo.png' // Add your logo file

function App() {
  const [launched, setLaunched] = useState(false)
  const [windowDimension, setWindowDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)
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
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
          gravity={0.1}  // Added gravity (default is 0.1)
          wind={0.05}    // Added slight wind
          numberOfPieces={400} // Increased number of pieces
          recycle={true}  // Don't recycle pieces
        />
      )}
      <div className="logo-container">
        <img src={vtcLogo} alt="VTU Logo" className="vtc-logo" /> {/* Fixed class name */}
      </div>
      <div className='ceremony-header'>
<h1>Visvesvaraya Tecnological University </h1>
<h2 >Center for PG Studies and Regional Office Kalaburagi - 585105</h2>
<h3>Presents</h3>
<h5>YUKTI - 2025</h5>
<h4>Reimagining Tommorrow</h4>
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
    </div>
  )
}

export default App
