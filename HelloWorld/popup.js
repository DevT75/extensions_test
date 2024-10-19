// Mock chrome.helloWorld if it doesn't exist
if (!chrome.helloWorld) {
  chrome.helloWorld = {
    sayHello: async () => {
    	return '{"message":"Mocked Hello World"}'
    }
  };
}

// Mock chrome.wootz if it doesn't exist
if (!chrome.wootz) {
  chrome.wootz = {
    info: async () => {
      return '{"mock":"device", "info":"wootz", "long": "string to testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt"}';
    },
    helloWorld: async () => {
    	return '{"message":"Mocked Hello World!"}';
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
  /*document.getElementById('sayHelloButton').addEventListener('click', async () => {
  	const res = await chrome.helloWorld.sayHello();
	result = JSON.parse(res);
  	updateHelloResult(result.message);
        console.log('Hello World Message:', result.message);
  });*/

  chrome.helloWorld.sayHello().then((res) => {
    try {
      const parsedInfo = JSON.parse(res);
      updateHelloResult(JSON.stringify(parsedInfo, null, 2));
    } catch (error) {
      console.error('Failed to parse sayhello return value:', error);
      updateDeviceInfo('Error fetching sayHello return value.');
    }
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
