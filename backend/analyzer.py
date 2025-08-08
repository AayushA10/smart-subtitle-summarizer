from collections import Counter
import re

def analyze_text(text):
    lines = text.strip().split("\n")
    total_lines = len(lines)
    words = re.findall(r'\b\w+\b', text.lower())
    total_words = len(words)
    avg_sentence_length = total_words / total_lines if total_lines > 0 else 0
    est_time_minutes = total_words / 130  # avg speech rate ~130 wpm

    # Basic keyword freq
    keyword_counts = Counter(words)
    top_keywords = keyword_counts.most_common(5)

    return {
        "total_words": total_words,
        "total_lines": total_lines,
        "estimated_speaking_time": round(est_time_minutes, 2),
        "top_keywords": top_keywords
    }
