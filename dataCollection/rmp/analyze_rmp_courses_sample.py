import json
import re
from collections import defaultdict

with open("courseSample.json", "r") as f:
    array = json.loads(f.read())



### Use the most popular classes as a guide to how users define course codes
freqDict = defaultdict(int)
for c in array:
    freqDict[c]+=1

# filter out single ones
freqDict = {k:v for k,v in freqDict.items() if v > 1}

# order by freq
# as of python 3.7, dictionaries maintains insertion order
freqDict = {k:v for k,v in sorted(freqDict.items(), key=lambda k: k[1], reverse=True)}

with open("courseFreq.json", "w") as f:
    f.write(json.dumps(freqDict, indent=4))



### Aggregate the prefixes to see most common: "CS131" -> "CS"
freqDict = defaultdict(list)
regex = re.compile("^([a-zA-Z]+)")
print("RMP class sample size: {}".format(len(array)))
for c in array:
    match = regex.match(c)
    if match:
        freqDict[match[0]].append(c)

# filter out single ones
freqDict = {k:v for k,v in freqDict.items() if len(v) > 1}

# order by list length, desc
# as of python 3.7, dictionaries maintain insertion order, wooo
freqDict = {k:v for k,v in sorted(freqDict.items(), key=lambda k: len(k[1]), reverse=True)}

with open("coursePrefixes.json", "w") as f:
    f.write(json.dumps(freqDict, indent=4))





