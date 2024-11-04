from flask import Flask, request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
import re

app = Flask(__name__)
CORS(app)

def get_video_id(url):
    # Extract video ID from YouTube URL
    video_id_match = re.search(r'(?:v=|\/)([0-9A-Za-z_-]{11}).*', url)
    if video_id_match:
        return video_id_match.group(1)
    return None

def get_transcript(video_id):
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        transcript = ' '.join([d['text'] for d in transcript_list])
        return transcript
    except Exception as e:
        return str(e)

@app.route('/api/summarize', methods=['POST'])
def summarize_video():
    try:
        data = request.json
        video_url = data.get('video_url', '')
        
        video_id = get_video_id(video_url)
        if not video_id:
            return jsonify({'error': 'Invalid YouTube URL'})
        
        transcript = get_transcript(video_id)
        
        # Initialize summarization pipeline
        summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
        
        # Split transcript into chunks due to model's max token limit
        max_chunk_size = 1024
        chunks = [transcript[i:i + max_chunk_size] for i in range(0, len(transcript), max_chunk_size)]
        
        summaries = []
        for chunk in chunks:
            summary = summarizer(chunk, max_length=130, min_length=30, do_sample=False)
            summaries.append(summary[0]['summary_text'])
        
        final_summary = ' '.join(summaries)
        
        return jsonify({
            'summary': final_summary,
            'video_id': video_id
        })
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)