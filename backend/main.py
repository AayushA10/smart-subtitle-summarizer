from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.cleaner import load_and_clean_srt
from backend.summarizer import generate_summary
from backend.transcriber import transcribe_to_srt
from backend.analyzer import analyze_text
from backend.ner import extract_named_entities
from backend.emotion import analyze_emotions  # 🆕 Emotion Detection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Smart Subtitle Cleaner API"}

class SummaryRequest(BaseModel):
    text: str
    length: str

class NERRequest(BaseModel):
    text: str

# 🎬 Upload .srt → Clean + Summarize + Analyze + NER + Emotion
@app.post("/clean-subtitle/")
async def clean_subtitle(file: UploadFile = File(...), length: str = Form("medium")):
    contents = await file.read()
    path = f"temp_{file.filename}"

    with open(path, "wb") as f:
        f.write(contents)

    cleaned = load_and_clean_srt(path)

    length_map = {"short": 2, "medium": 5, "long": 8}
    sentence_count = length_map.get(length, 5)
    summary = generate_summary(cleaned, sentence_count)
    analysis = analyze_text(cleaned)
    entities = extract_named_entities(cleaned)
    emotions = analyze_emotions(cleaned)  # 🧠

    return {
        "cleaned_text": cleaned,
        "summary": summary,
        "analysis": analysis,
        "entities": entities,
        "emotions": emotions
    }

# ✂️ Text-only summarization
@app.post("/summarize-text/")
def summarize_from_text(req: SummaryRequest):
    length_map = {"short": 2, "medium": 5, "long": 8}
    sentence_count = length_map.get(req.length, 5)
    summary = generate_summary(req.text, sentence_count)
    return {"summary": summary}

# 🔊 Upload .mp3 → Transcribe → Clean + Summarize + Analyze + NER + Emotion
@app.post("/transcribe-mp3/")
async def transcribe_mp3(file: UploadFile = File(...)):
    file_location = f"temp_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    srt_path = transcribe_to_srt(file_location)
    cleaned = load_and_clean_srt(srt_path)
    summary = generate_summary(cleaned)
    analysis = analyze_text(cleaned)
    entities = extract_named_entities(cleaned)
    emotions = analyze_emotions(cleaned)  # 🧠

    return {
        "cleaned_text": cleaned,
        "summary": summary,
        "analysis": analysis,
        "entities": entities,
        "emotions": emotions
    }

# 🔍 Named Entity Recognition only
@app.post("/extract-ner/")
def extract_ner(req: NERRequest):
    entities = extract_named_entities(req.text)
    return {"entities": entities}
