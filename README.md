# 🎬 Smart Subtitle Summarizer

An intelligent full-stack app to clean, summarize, and analyze subtitles or transcribed audio — powered by NLP.

## ✨ Features

- 🧹 **Subtitle Cleaning** (.srt)
- 🧠 **Text Summarization** (Short, Medium, Long)
- 📊 **Smart Analytics**  
  - Word count  
  - Line count  
  - Speaking time  
  - Top keywords (bar chart)
- 🔍 **Named Entity Recognition (NER)**  
  - People  
  - Organizations  
  - Locations
- 🎤 **Audio Transcription** (.mp3 → .srt)
- 🔊 **Speech Playback** of Summary
- ⬇️ **Download Summary** (.txt / .pdf)
- 📦 API built with **FastAPI**
- 💻 Frontend in **React.js**

---

## 🚀 Quick Start

### 1. Clone this repo

```bash
git clone https://github.com/AayushA10/smart-subtitle-summarizer
cd smart-subtitle-summarizer

2. Backend Setup (FastAPI + Python 3.10+)
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --reload

3. Frontend Setup (React)
cd frontend
npm install
npm start

🔁 Workflow
Upload .srt or .mp3 file
Backend:
Cleans text
Generates summary
Runs TF-IDF + NLP analytics
Extracts named entities

Frontend:
Displays result
Shows keyword chart + entity info
Allows download + TTS

📂 Project Structure
smart-subtitle-summarizer/
│
├── backend/
│   ├── main.py               # FastAPI endpoints
│   ├── cleaner.py            # SRT cleaner
│   ├── summarizer.py         # Summarization logic
│   ├── analyzer.py           # Analytics + keyword stats
│   ├── ner.py                # Named Entity Recognition (spaCy)
│   ├── transcriber.py        # MP3 → SRT via Whisper
│   └── requirements.txt
│
├── frontend/
│   ├── components/
│   │   ├── UploadForm.js
│   │   ├── UploadAudioForm.js
│   │   ├── ResultDisplay.js
│   │   └── KeywordChart.js
│   ├── App.js
│   └── index.js
│
└── README.md

🧠 Tech Stack
Frontend: React, Chart.js, jsPDF
Backend: FastAPI, spaCy, Whisper, NLTK, Scikit-learn
NLP: Summarization, NER, TF-IDF, Tokenization
TTS: Browser speech synthesis API

