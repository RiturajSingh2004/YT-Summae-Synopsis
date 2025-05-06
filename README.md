# YT: Summae & Synopsis

<div align="center">
  
![YT: Summae & Synopsis Logo](https://github.com/RiturajSingh2004/YT-Summae-Synopsis/blob/main/extension/icon128.png)

*Transform YouTube videos into concise, actionable summaries with just one click.*

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

<p>If you find this project helpful, please consider giving it a star ⭐</p>

</div>

## 🌟 Overview

**YT: Summae & Synopsis** is a powerful Browser extension that leverages advanced AI to automatically summarize YouTube videos. Whether you're researching for a project, studying, or simply want to decide if a video is worth your time, this extension provides instant, high-quality video summaries with minimal effort.

## ✨ Key Features

- **Automatic Transcript Extraction**: Fetches video transcripts even when not provided by the video owner
- **AI-Powered Summarization**: Uses state-of-the-art natural language processing to generate concise, meaningful summaries
- **Seamless UI Integration**: Adopts YouTube's theme (light/dark mode) for a native experience
- **Responsive Design**: Works beautifully across desktop and mobile devices
- **One-Click Copy**: Easily copy summaries to your clipboard
- **Structured Output**: Presents summaries in a readable format with key points highlighted

## 🚀 Installation

### Method 1: Chrome Web Store
*(Coming soon)*

### Method 2: Manual Installation
1. Download the [latest release](https://github.com/RiturajSingh2004/YT-Summae-Synopsis) of the extension
2. Open Chrome or any Browser and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top-right corner
4. Click "Load unpacked" and select the downloaded extension directory
5. The extension icon should now appear in your Chrome toolbar

## 🛠️ Server Setup

The extension requires a backend server to perform the summarization:

1. Clone the repository:
   ```bash
   git clone https://github.com/RiturajSingh2004/YT-Summae-Synopsis.git
   cd YT-Summae-Synopsis
   ```

2. Install the required dependencies:
   ```bash
   pip install Flask==2.0.2 Flask-CORS==3.0.10 youtube-transcript-api==0.5.0 transformers==4.18.0
   ```

3. Start the server:
   ```bash
   python server.py
   ```

The server will run on `http://localhost:5000` by default.

## 📋 Usage

1. Navigate to any YouTube video you want to summarize
2. Click the YT: Summae & Synopsis extension icon in your toolbar
3. The extension will automatically detect the current video
4. Click "Generate Summary" to begin the process
5. View the formatted summary and copy it to your clipboard if needed

## 🖥️ Technical Architecture

### Backend (Python)

The backend server uses:
- **Flask**: Lightweight web framework for API endpoints
- **YouTube Transcript API**: For extracting video transcripts
- **Transformers Library**: Leveraging BART model for text summarization
- **Flask-CORS**: Enabling cross-origin resource sharing

### Frontend (JavaScript/HTML/CSS)

The Chrome extension uses:
- **Chrome Extensions API**: For interacting with the browser
- **Vanilla JavaScript**: For core functionality
- **Responsive CSS**: For adaptive layout and theming
- **Theme Detection**: For automatically matching YouTube's light/dark theme

## 🔄 Data Flow

1. User clicks "Generate Summary" in the extension popup
2. Extension captures the current YouTube video URL
3. Request is sent to the Flask backend server
4. Server extracts video transcript using YouTube Transcript API
5. Transcript is processed and summarized using the BART model
6. Summary is returned to the extension
7. Extension formats and displays the summary to the user

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Built with ❤️ by [RiturajSingh2004](https://github.com/RiturajSingh2004)
- Thanks to the creators of the libraries and frameworks used in this project
- Special thanks to the open-source community for their continuous support and inspiration

## 🔮 Future Enhancements

- Support for additional languages
- Customizable summary length and format
- YouTube playlist summarization
- Offline mode support
- Keyword extraction and highlighting
- Export to PDF/Markdown options

---

<div align="center">
  <p>If you find this project helpful, please consider giving it a star ⭐</p>
  <p>For issues, suggestions, or questions, please open an <a href="https://github.com/RiturajSingh2004/YT-Summae-Synopsis/issues">issue</a>.</p>
</div>
