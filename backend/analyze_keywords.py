import re
from collections import Counter
import string
import nltk
from nltk.corpus import stopwords

nltk.download("stopwords")
stop_words = set(stopwords.words("english"))

def extract_keywords(text, top_n=10):
    # Lowercase, remove punctuation, split
    text = text.lower()
    text = re.sub(f"[{string.punctuation}]", "", text)
    words = text.split()
    
    filtered = [word for word in words if word not in stop_words and len(word) > 2]
    counts = Counter(filtered)
    return dict(counts.most_common(top_n))
