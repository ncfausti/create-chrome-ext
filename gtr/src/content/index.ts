console.info('chrome-ext template-react-ts content script')
const iframe = document.createElement('iframe');
iframe.src = 'https://main.dy6d4zldr783d.amplifyapp.com/';
iframe.id = 'parcl-labs-map';
document.body.appendChild(iframe);
iframe.style.position = "absolute";
iframe.style.top = '0px';
iframe.style.left = '0px';
iframe.style.minHeight = '1000px';
iframe.style.width = '1000px';
iframe.style.display = 'none';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.message === 'show') {
        iframe.style.display = 'block';
      }
      else {
        iframe.style.display = 'none';
      }
  }
);

export {}
