if (typeof global === 'undefined') {
    global = window;
  }
  
  if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = window.TextEncoder;
  }
  
  if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = window.TextDecoder;
  }