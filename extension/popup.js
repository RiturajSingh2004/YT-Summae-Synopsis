document.addEventListener('DOMContentLoaded', function() {
    const summarizeBtn = document.getElementById('summarizeBtn');
    const videoTitleElement = document.getElementById('videoTitle');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const summaryContainer = document.getElementById('summaryContainer');
    const summaryText = document.getElementById('summaryText');
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const copyBtn = document.getElementById('copyBtn');
    const successToast = document.getElementById('successToast');
    
    // Get current tab URL and update UI
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const url = tabs[0].url;
        if (url && url.includes('youtube.com/watch')) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: () => document.title
            }, (result) => {
                const title = result[0].result.replace(' - YouTube', '');
                videoTitleElement.textContent = title;
                summarizeBtn.disabled = false;
            });
        } else {
            videoTitleElement.textContent = 'Please open a YouTube video';
            summarizeBtn.disabled = true;
        }
    });
    
    summarizeBtn.addEventListener('click', async function() {
        // Show loading state
        loadingElement.style.display = 'block';
        errorElement.style.display = 'none';
        summaryContainer.style.display = 'none';
        summarizeBtn.disabled = true;
        
        try {
            const tabs = await chrome.tabs.query({active: true, currentWindow: true});
            const videoUrl = tabs[0].url;
            
            const response = await fetch('http://localhost:5000/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    video_url: videoUrl
                })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Show summary
            const formattedSummary = formatSummary(data.summary);
            summaryText.innerHTML = formattedSummary;
            summaryContainer.style.display = 'block';
            
        } catch (error) {
            errorElement.textContent = `Error: ${error.message}`;
            errorElement.style.display = 'block';
        } finally {
            loadingElement.style.display = 'none';
            summarizeBtn.disabled = false;
        }
        function formatSummary(summary) {
          // Split into sentences and clean up
          const sentences = summary
              .split(/(?<=[.!?])\s+/)
              .filter(sentence => sentence.trim().length > 0)
              .map(sentence => sentence.trim());
          
          // If it's a very short summary, return as a single paragraph
          if (sentences.length <= 2) {
              return `<p>${summary}</p>`;
          }
  
          // Get the first two sentences as the main introduction
          const introduction = sentences.slice(0, 2).join(' ');
          
          // Group remaining sentences into detailed bullet points
          const bulletPoints = createDetailedPoints(sentences.slice(2));
  
          return `
              <p>${introduction}</p>
              <ul>
                  ${bulletPoints.map(point => `<li>${point}</li>`).join('\n')}
              </ul>
          `;
      }
  
      function createDetailedPoints(sentences) {
          let points = [];
          let currentPoint = '';
          
          sentences.forEach((sentence, index) => {
              // Check if the sentence should start a new point
              if (shouldStartNewPoint(sentence, index) && currentPoint) {
                  points.push(currentPoint.trim());
                  currentPoint = sentence;
              } else {
                  // If it's the first sentence or continuation of a point
                  currentPoint = currentPoint 
                      ? currentPoint + ' ' + sentence 
                      : sentence;
              }
          });
          
          // Add the last point
          if (currentPoint) {
              points.push(currentPoint.trim());
          }
  
          // If we have too few points, try to split longer points
          if (points.length < 3) {
              points = splitLongPoints(points);
          }
  
          return points;
      }
  
      function shouldStartNewPoint(sentence, index) {
          const transitionWords = [
              'additionally',
              'moreover',
              'furthermore',
              'also',
              'next',
              'then',
              'finally',
              'lastly',
              'first',
              'second',
              'third',
              'following',
              'another',
              'in addition',
              'further',
              'subsequently',
              'consequently',
              'as a result',
              'therefore',
              'thus',
              'hence',
              'meanwhile',
              'specifically',
              'notably',
              'importantly',
              'for example',
              'for instance',
              'in particular'
          ];
  
          const lowercaseSentence = sentence.toLowerCase();
          
          // Check for transition words
          const startsWithTransition = transitionWords.some(word => 
              lowercaseSentence.startsWith(word));
          
          // Check for other indicators of a new point
          const startsWithNumber = /^\d+\.?\s/.test(sentence);
          const isLongEnough = sentence.length > 50;
          const hasKeyTopicChange = /^(the|this|these|those|in|on|at|during|while|when|after|before)\s/i.test(sentence);
          
          // Start a new point if any of these conditions are true
          return startsWithTransition || 
                 startsWithNumber || 
                 (isLongEnough && hasKeyTopicChange) ||
                 (index > 0 && index % 2 === 0); // Create a new point every 2-3 sentences
      }
  
      function splitLongPoints(points) {
          const splitPoints = [];
          const targetLength = 100; // Approximate target length for each point
  
          points.forEach(point => {
              if (point.length > targetLength * 2) {
                  // Split long points into multiple shorter ones
                  const sentences = point.split(/(?<=[.!?])\s+/);
                  let currentPoint = '';
  
                  sentences.forEach(sentence => {
                      if (currentPoint.length > targetLength) {
                          splitPoints.push(currentPoint.trim());
                          currentPoint = sentence;
                      } else {
                          currentPoint = currentPoint 
                              ? currentPoint + ' ' + sentence 
                              : sentence;
                      }
                  });
  
                  if (currentPoint) {
                      splitPoints.push(currentPoint.trim());
                  }
              } else {
                  splitPoints.push(point);
              }
          });
  
          return splitPoints;
      }
    });

    

    // Function to detect YouTube's theme
    async function detectYouTubeTheme() {
      try {
        const tabs = await chrome.tabs.query({active: true, currentWindow: true});
        const result = await chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            const htmlElement = document.documentElement;
            return htmlElement.getAttribute('dark') !== null;
          }
        });
        return result[0].result ? 'dark' : 'light';
      } catch (error) {
        console.error('Error detecting theme:', error);
        return 'light'; // Default fallback
      }
    }

    // Initialize theme
    detectYouTubeTheme().then(theme => {
      root.setAttribute('data-theme', theme);
      updateThemeToggleIcon(theme);
    });

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
      const currentTheme = root.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', newTheme);
      updateThemeToggleIcon(newTheme);
    });

    function updateThemeToggleIcon(theme) {
      const icon = themeToggle.querySelector('.theme-icon');
      icon.innerHTML = theme === 'light' 
        ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>' // moon icon
        : '<circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>'; // sun icon
    }

    // Copy functionality
    copyBtn.addEventListener('click', async () => {
      const summaryText = document.getElementById('summaryText').textContent;
      try {
        await navigator.clipboard.writeText(summaryText);
        successToast.style.display = 'block';
        setTimeout(() => {
          successToast.style.display = 'none';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    });

    // Listen for theme changes in YouTube
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url?.includes('youtube.com')) {
        detectYouTubeTheme().then(theme => {
          root.setAttribute('data-theme', theme);
          updateThemeToggleIcon(theme);
        });
      }
    });
});