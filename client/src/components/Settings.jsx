import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function Settings(props) {
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
      };
    
      const settingsStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        fontSize: '50px',
        cursor: 'pointer',
    };
    
      const popupStyle = {
        position: 'absolute',
        top: '40px',
        right: '10px',
        border: '1px solid #ccc',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        display: showSettings ? 'block' : 'none' // Show or hide based on state
      };
    return(<>
    <FontAwesomeIcon icon={faCog} style={{...settingsStyle, color: props.isBadFaith ? "#a93c2b" : ''}} onClick={toggleSettings} />

    <div style={popupStyle}>
    {/* Settings content goes here */}
    <p>Settings</p>
    {/* You can add form elements or other settings components here */}
    </div>
</>)
}
export default Settings