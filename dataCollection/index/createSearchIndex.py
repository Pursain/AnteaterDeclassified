import json

with open("deptAcrynoms.json", "r") as f:
    deptAcrynoms = json.loads(f.read())

with open("../catalogue/catalogue.json", "r") as f:
    catalogue = json.loads(f.read())

searchIndex = []

for course in catalogue:
    obj = dict()
    dept = str(" ".join(course["course"].split(" ")[:-1]))
    course_code = str(course["course"].split(" ")[-1])
    obj["course"] = course["course"]
    obj["title"] = course["title"]
    obj["aliases"] = ["{} {}".format(acynomn, course_code) for acynomn in deptAcrynoms[dept]]
    obj["aliases"].extend(["{}{}".format(acynomn, course_code) for acynomn in deptAcrynoms[dept]])
    searchIndex.append(obj)

with open("searchIndex.json", "w") as f:
    f.write(json.dumps(searchIndex, indent=4))

