import whisper
import os
import uuid

def transcribe_to_srt(file_path):
    model = whisper.load_model("base")  # options: tiny, base, small, medium, large
    result = model.transcribe(file_path, task="transcribe", verbose=False)

    # Save as .srt file
    srt_path = f"{uuid.uuid4().hex}.srt"
    with open(srt_path, "w", encoding="utf-8") as f:
        for i, segment in enumerate(result["segments"]):
            start = format_time(segment["start"])
            end = format_time(segment["end"])
            text = segment["text"].strip()
            f.write(f"{i+1}\n{start} --> {end}\n{text}\n\n")

    return srt_path

def format_time(seconds):
    h = int(seconds // 3600)
    m = int((seconds % 3600) // 60)
    s = int(seconds % 60)
    ms = int((seconds - int(seconds)) * 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
