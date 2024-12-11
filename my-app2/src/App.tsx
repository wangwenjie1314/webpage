import React from 'react';
import './App.css';

function App() {
    React.useEffect(() => {
      // 加载 QoreID SDK 脚本
      const script = document.createElement('script');
      script.src = 'https://dashboard.qoreid.com/qoreid-sdk/qoreid.js';
      script.async = true;
      
      script.onload = () => {
        console.log('QoreID SDK loaded successfully');
      };
      
      script.onerror = () => {
        console.error('Failed to load QoreID SDK');
      };
  
      document.body.appendChild(script);
  
      return () => {
        const existingScript = document.querySelector('script[src="https://dashboard.qoreid.com/qoreid-sdk/qoreid.js"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    }, []);
  
    const handleSubmitted = (event: any) => {
      console.log('Verification submitted:', event.detail);
    };
  
    const handleError = (event: any) => {
      console.error('Verification error:', event.detail);
    };
  
    const handleClosed = () => {
      console.log('Verification closed');
    };
  
    return (
      <div className="App">
        <h1>QoreID Demo</h1>
        <div style={{ margin: '20px' }}>
        <qoreid-button
            id="QoreIDButton"
            clientId="A011XPUA3F6WBZ61OV3T"
            // collectionId="16513"
            productCode="liveness_nin" // liveness_bvn、liveness_nin
            // flowId="16513"
            customerReference="5705" // 生成唯一的客户引用
            applicantData={JSON.stringify({
                // bvn: '95888168924',
                firstname: 'Bunch',
                lastname: 'Dillon',
                phone: '08000000000',
            })}
            onQoreIDSdkSubmitted="function(event){console.log('onQoreIDSdkSubmitted ----->', event)}"
            onQoreIDSdkError={handleError}
            onQoreIDSdkClosed={handleClosed}
          ></qoreid-button>
        </div>
      </div>
    );
    // return (
    //   <div className="App">
        
    //   </div>
    // );
  }

  export default App;
