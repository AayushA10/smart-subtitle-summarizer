import re

FILLER_WORDS = [
    "you know", "like", "um", "uh", "i mean", "so", "actually", "basically", "right", "well", "okay"
]

def load_and_clean_srt(file_path: str) -> str:
    """
    Cleans an SRT file by removing timestamps, filler words, and subtitle numbering.
    Returns plain cleaned text.
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove subtitle indexes (e.g., "1", "2") that appear on lines by themselves
    content = re.sub(r'\n\d+\n', '\n', content)

    # Remove timestamps (e.g., 00:00:01,000 --> 00:00:04,000)
    content = re.sub(r'\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}', '', content)

    # Strip extra whitespace and blank lines
    lines = content.splitlines()
    text_lines = [line.strip() for line in lines if line.strip()]

    # Join into full text
    cleaned_text = ' '.join(text_lines)

    # Remove leftover numbers (like "1 Hello world") at beginning
    cleaned_text = re.sub(r'^\d+\s+', '', cleaned_text)

    # Remove filler words
    for word in FILLER_WORDS:
        pattern = r'\b' + re.escape(word) + r'\b'
        cleaned_text = re.sub(pattern, '', cleaned_text, flags=re.IGNORECASE)

    # Normalize spacing
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()

    return cleaned_text
