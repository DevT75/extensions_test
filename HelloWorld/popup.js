// Mock chrome.helloWorld if it doesn't exist
if (!chrome.helloWorld) {
  chrome.helloWorld = {
    sayHello: () => "Mocked Hello World"
  };
}

// Mock chrome.wootz if it doesn't exist
if (!chrome.wootz) {
  chrome.wootz = {
    info: async () => {
      return '{"mock":"device", "info":"wootz", "long": "string to testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"}';
    }
  };
}

// Function to update the UI with Hello World result
function updateHelloResult(result) {
  document.getElementById('helloResult').textContent = result;
}

// Function to update the UI with device info
function updateDeviceInfo(info) {
  document.getElementById('deviceInfo').textContent = info;
}

// Fetch and display device info when the popup loads
document.addEventListener('DOMContentLoaded', () => {
  // Set up Hello World button
  document.getElementById('sayHelloButton').addEventListener('click', () => {
    const result = chrome.helloWorld.sayHello();
    updateHelloResult(result);
  });

  // Fetch Wootz info
  chrome.wootz.info().then((res) => {
    try {
      const parsedInfo = JSON.parse(res);
      updateDeviceInfo(JSON.stringify(parsedInfo, null, 2));
    } catch (error) {
      console.error('Failed to parse device info:', error);
      updateDeviceInfo('Error fetching device info.');
    }
  });
});
