console.info('chrome-ext template-react-ts content script')
const iframe = document.createElement('iframe');
// iframe.src = 'https://main.dy6d4zldr783d.amplifyapp.com/';

// iframe needs to be embedded on main window page (e.g. airbnb.com)
// as opposed to the chrome extension window bc the chrome extension window
// functions as a Chrome Browser window and thus doe not allow for transparent views
iframe.src = 'http://localhost:3001';
iframe.id = 'parcl-labs-map';
document.body.appendChild(iframe);
iframe.style.position = "absolute";
iframe.style.top = '0px';
iframe.style.left = '0px';
iframe.style.minHeight = '1000px';
iframe.style.width = '100%';
iframe.style.display = 'none';
iframe.style.opacity = '70%';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('content: new msg received, showing message now...')
    console.log(request.message);
      if (request.message === 'toggle-map') {
        if (iframe.style.display === 'none') {
          iframe.style.display = 'block';
        }
        else {
          iframe.style.display = 'none';
        }
      }
      return true;
  }
);

var previousSearch = window.location.search;

setInterval(function() {
  if (window.location.search !== previousSearch) {
    // Query parameters have changed
    previousSearch = window.location.search;
    console.log(previousSearch);
    console.log()
  }
}, 500);

// How can I have separate controls (or intercept the controls
// that fire on google maps?

// listen for changes to query params changing, then:

// use the average of the ne/sw lat lngs and the zoom (when the url query params change)
// to position mymap

// fix box size of my map to boxsize of airbnb map
/*
https://www.airbnb.com/s/New-York--NY/homes?
  place_id=ChIJOwg_06VPwokRYv534QaPC8g&
  refinement_paths%5B%5D=%2Fhomes&
  flexible_trip_dates%5B%5D=february&
  flexible_trip_dates%5B%5D=march&
  flexible_trip_dates%5B%5D=april&
  flexible_trip_dates%5B%5D=may&
  flexible_trip_dates%5B%5D=june&
  flexible_trip_dates%5B%5D=july&
  flexible_trip_dates%5B%5D=august&
  flexible_trip_dates%5B%5D=september&
  flexible_trip_dates%5B%5D=october&
  flexible_trip_dates%5B%5D=november&
  flexible_trip_dates%5B%5D=december&
  flexible_trip_dates%5B%5D=january&
  flexible_trip_lengths%5B%5D=one_week&
  date_picker_type=flexible_dates&
  adults=0&children=0&infants=0&
  pets=0&search_type=AUTOSUGGEST
*/
export {}
