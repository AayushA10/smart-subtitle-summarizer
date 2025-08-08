from textblob import TextBlob

def analyze_emotions(text):
    lines = text.strip().split("\n")
    results = []

    for line in lines:
        if not line.strip():
            continue

        blob = TextBlob(line)
        polarity = blob.sentiment.polarity

        if polarity > 0.1:
            label = "positive"
            emoji = "😊"
        elif polarity < -0.1:
            label = "negative"
            emoji = "😠"
        else:
            label = "neutral"
            emoji = "😐"

        results.append({
            "line": line,
            "emotion": label,
            "emoji": emoji
        })

    return results
