// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import React, { useState } from 'react';
import { LivenessPopup } from 'dikript-react-live-face-sdk/dist/index.esm';

// demo1
// function App() {
//   React.useEffect(() => {
//     // 加载 QoreID SDK 脚本
//     const script = document.createElement('script');
//     script.src = 'https://dashboard.qoreid.com/qoreid-sdk/qoreid.js';
//     script.async = true;
    
//     script.onload = () => {
//       console.log('QoreID SDK loaded successfully');
//     };
    
//     script.onerror = () => {
//       console.error('Failed to load QoreID SDK');
//     };

//     document.body.appendChild(script);

//     return () => {
//       const existingScript = document.querySelector('script[src="https://dashboard.qoreid.com/qoreid-sdk/qoreid.js"]');
//       if (existingScript) {
//         document.body.removeChild(existingScript);
//       }
//     };
//   }, []);

//   const handleSubmitted = (event: any) => {
//     console.log('Verification submitted:', event.detail);
//   };

//   const handleError = (event: any) => {
//     console.error('Verification error:', event.detail);
//   };

//   const handleClosed = () => {
//     console.log('Verification closed');
//   };

//   return (
//     <div className="App">
//       <h1>QoreID Demo</h1>
//       <div style={{ margin: '20px' }}>
//       <qoreid-button
//           id="QoreIDButton"
//           clientId="A011XPUA3F6WBZ61OV3T"
//           // collectionId="16513"
//           productCode="liveness_nin" // liveness_bvn、liveness_nin
//           // flowId="16513"
//           customerReference="5705" // 生成唯一的客户引用
//           applicantData={JSON.stringify({
//               // bvn: '95888168924',
//               firstname: 'Bunch',
//               lastname: 'Dillon',
//               phone: '08000000000',
//           })}
//           onQoreIDSdkSubmitted="function(event){console.log('onQoreIDSdkSubmitted ----->', event)}"
//           onQoreIDSdkError={handleError}
//           onQoreIDSdkClosed={handleClosed}
//         ></qoreid-button>
//       </div>
//     </div>
//   );
//   // return (
//   //   <div className="App">
      
//   //   </div>
//   // );
// }


//demo2
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [livenessResult, setLivenessResult] = useState(null);

  const apiKey = "5b5b1b0d-0f04-4bca-8fef-c00a770a9ef0";
  const name = "Tenn";
  const apiUrl = "https://api.dikript.com/dikript/api/v1/biometrics/livelinesscheck";

  const startLivenessCheck = () => {
    setShowPopup(true);
    setLivenessResult(null);
  };

  const closePopup = () => {
    setShowPopup(false);
    setLivenessResult(null);
  };

  const handleLivenessResult = (result) => {
    console.log('Liveness result:', result);
    setLivenessResult(result);
  };

  return (
    <div id="app">
      <button onClick={startLivenessCheck}>Start Liveness Check</button>
      {showPopup && (
        <LivenessPopup
          apiKey={apiKey}
          name={name}
          apiUrl={apiUrl}
          onClose={closePopup}
          onLivenessResult={handleLivenessResult}
        />
      )}
      {livenessResult && (
        <div>
          <h3>Liveness Check Result:</h3>
          <pre>{JSON.stringify(livenessResult, null, 2)}</pre>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
