/* global chrome */

if (typeof chrome === 'undefined' || !chrome.helloWorld) {
  let chrome = {
    helloWorld: {
      sayHello: async () => {
        return 'Mocked Hello World';
      }
    }
  };
}

document.getElementById('sayHelloButton').addEventListener('click', async () => {
  // Call the existing chrome.helloWorld.sayHello function
  const result = await chrome.helloWorld.sayHello();
  document.getElementById('result').textContent = result;
});
