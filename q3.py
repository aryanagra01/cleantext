import string

# text_to_english = {
#     "u": "you", "r": "are", "y": "why", "ur": "your", "pls": "please", "plz": "please", "thx": "thanks", "ty": "thank you",
#     "np": "no problem", "idk": "I don't know", "imo": "in my opinion", "brb": "be right back", "gtg": "got to go",
#     "ttyl": "talk to you later", "omw": "on my way", "btw": "by the way", "lol": "laughing out loud", "lmk": "let me know",
#     "wyd": "what are you doing", "wru": "where are you", "hru": "how are you", "gr8": "great", "b4": "before", "cya": "see you",
#     "tmr": "tomorrow", "2": "to", "4": "for", "8": "ate", "tho": "though"
# }

text_to_english = {

    # Basic pronouns / verbs
    "u": "you",
    "ur": "your",
    "urs": "yours",
    "r": "are",
    "y": "why",
    "im": "I am",
    "i'm": "I am",
    "ive": "I have",
    "i've": "I have",
    "id": "I would",
    "i'd": "I would",

    # Common short forms
    "pls": "please",
    "plz": "please",
    "thx": "thanks",
    "ty": "thank you",
    "np": "no problem",
    "yw": "you're welcome",
    "idk": "I don't know",
    "imo": "in my opinion",
    "ikr": "I know right",
    "brb": "be right back",
    "gtg": "got to go",
    "ttyl": "talk to you later",
    "omw": "on my way",
    "btw": "by the way",
    "asap": "as soon as possible",
    "fyi": "for your information",
    "afaik": "as far as I know",

    # Casual texting
    "lol": "laughing out loud",
    "lmao": "laughing",
    "rofl": "rolling on the floor laughing",
    "smh": "shaking my head",
    "tbh": "to be honest",
    "ngl": "not going to lie",
    "lmk": "let me know",
    "wyd": "what are you doing",
    "wru": "where are you",
    "hru": "how are you",
    "wbu": "what about you",
    "sup": "what is up",

    # Time / numbers
    "tmr": "tomorrow",
    "2": "to",
    "4": "for",
    "8": "ate",
    "b4": "before",
    "l8r": "later",
    "2day": "today",
    "2nite": "tonight",
    "4ever": "forever",
    "gr8": "great",
    "m8": "mate",

    # Agreements / reactions
    "ok": "okay",
    "kk": "okay",
    "k": "okay",
    "alr": "alright",
    "tho": "though",
    "bc": "because",
    "cuz": "because",
    "coz": "because",
    "msg": "message",
    "sec": "second",
    "mins": "minutes",

    # Goodbyes
    "cya": "see you",
    "gn": "good night",
    "gm": "good morning",

    # Social media
    "dm": "direct message",
    "irl": "in real life",
    "tmi": "too much information",
}

def collapse_repeats(s):
    if not s:
        return s

    out = [s[0]]
    run_len = 1

    for ch in s[1:]:
        if ch == out[-1]:
            run_len += 1
            if run_len >= 2:  
                continue
        else:
            run_len = 1
        out.append(ch)

    return ''.join(out)

def translate(text):
    words = text.split()
    results = []
    for word in words:
        clean = word.strip(string.punctuation)

        if clean == "":
            results.append(word)
            continue
        
        normalised = collapse_repeats(clean.lower())
        replacement = text_to_english.get(normalised, normalised)

        if any(char.isupper() for char in clean):
            replacement = replacement[0].upper() + replacement[1:]

        results.append(word.replace(clean, replacement))
    return ' '.join(results)


input_text = "U r gr8, thx for asking!!! idk... whattttt i'm doing tmr tho."
print(translate(input_text))

