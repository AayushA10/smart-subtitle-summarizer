import spacy
from collections import defaultdict

# Load English NLP pipeline
nlp = spacy.load("en_core_web_sm")

def extract_named_entities(text):
    doc = nlp(text)
    entities = defaultdict(set)

    for ent in doc.ents:
        if ent.label_ in ["PERSON", "ORG", "GPE"]:
            entities[ent.label_].add(ent.text.strip())

    # Convert sets to sorted lists
    return {
        "people": sorted(entities["PERSON"]),
        "organizations": sorted(entities["ORG"]),
        "locations": sorted(entities["GPE"])
    }
