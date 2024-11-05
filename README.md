# YT-Summae-Synopsis
**Features**

Automatic Video Transcript Fetching: The extension can automatically fetch the transcript for a YouTube video, even if the transcript is not provided by the video owner.
Summarization: The extension uses advanced natural language processing techniques to analyze the video transcript and generate a concise summary.
Responsive Design: The extension's user interface is designed to be mobile-friendly and accessible across different screen sizes.
Theming: The extension can automatically detect and match the theme (light or dark) of the YouTube website, providing a seamless user experience.
Copy to Clipboard: Users can easily copy the generated summary to their clipboard with a single click.

**Installation**
To install the YouTube Video Summarization Chrome Extension, follow these steps:

1.Download the latest release of the extension from the releases page.
2.Open the Google Chrome browser and navigate to chrome://extensions/.
3.Enable "Developer mode" by toggling the switch in the top-right corner of the page.
4.Click the "Load unpacked" button and select the directory where you downloaded the extension files.
5.The extension should now be installed and ready to use.

**Requirements**

Flask==2.0.2
Flask-CORS==3.0.10
youtube-transcript-api==0.5.0
transformers==4.18.0

**Usage**

Navigate to a YouTube video you would like to summarize.
Click on the extension icon in the Chrome toolbar to open the extension's popup window.
The extension will automatically detect the current YouTube video and display its title.
Click the "Generate Summary" button to initiate the summarization process.
Once the summary is generated, it will be displayed in the popup window.
You can copy the summary to your clipboard by clicking the "Copy" button.

**Technical Overview**
**Architecture**
The YouTube Video Summarization Chrome Extension is composed of two main components:

Backend: A Flask-based Python server that provides the video summarization functionality.
Frontend: A Chrome extension built using HTML, CSS, and JavaScript that interacts with the backend server and provides the user interface.

**Backend**
The backend server, implemented in the server.py file, is responsible for the following tasks:

1.Video Transcript Fetching: The server uses the YouTube Transcript API to retrieve the transcript for a given YouTube video.
2.Text Summarization: The server utilizes the Transformers library, specifically the BART model, to generate a summary of the video transcript.
3.API Endpoint: The server exposes a /api/summarize endpoint that accepts a YouTube video URL and returns the generated summary.

**Frontend**
The frontend of the extension, implemented in the popup.html, popup.css, and popup.js files, is responsible for the following tasks:

1.User Interface: The extension's popup window displays the current YouTube video's title and provides a button to generate the summary.
2.Theme Detection: The extension can automatically detect the theme (light or dark) of the YouTube website and apply the corresponding styles to the extension's UI.
3.Summary Display: The extension displays the generated summary in a formatted, easy-to-read layout, with the option to copy the summary to the clipboard.
4.Communication with Backend: The extension's JavaScript code handles the communication with the backend server, sending the video URL and displaying the received summary.

**Technologies Used**
The YouTube Video Summarization Chrome Extension utilizes the following technologies:

**Backend**:

Python
Flask
Flask-CORS
YouTube Transcript API
Transformers library


**Frontend**:

HTML
CSS
JavaScript
Chrome Extensions API
