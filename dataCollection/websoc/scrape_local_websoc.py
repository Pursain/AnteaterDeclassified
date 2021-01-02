from bs4 import BeautifulSoup
import re
import json
import os
from os import listdir
from os.path import isfile, join

onlyfiles = ["websoc_html/{}".format(f) for f in listdir("websoc_html")]

d = []
yearTermMap = {"03": "Winter", "92": "Fall", "76": "Summer Session 2", "51": "Summer Quarter (Com)", "39": "Summer 10wk", "25": "Summer Session 1", "14": "Spring"}

for i, file in enumerate(onlyfiles):
    print("{}/{}: Working on {}".format(i, len(onlyfiles), file))
    page = open(file);
    soup = BeautifulSoup(page, "html.parser")
    if soup.find(string=re.compile("No courses matched your search criteria")) != None:
        page.close()
        continue

    # grab year from file name
    # eg. websoc_html/COMPSCI-2019-51
    yearTerm = file[-7:]

    # Scan every tr
    trs = soup.find_all("tr")
    last_course_number = ''
    for tr in trs:
        if tr.find("td", class_="CourseTitle"):
            last_course_number = " ".join(tr.find("td", class_="CourseTitle").get_text("|").split("|")[0].strip().replace("\xa0", "").split()).upper()
            # save
        elif len(tr.find_all("td")) == 14:
            columns = tr.find_all("td")
            # if columns[1].get_text().strip().replace("\xa0", "") != "Lec":
            #     continue
            obj = {\
                "course": last_course_number,
                # "yearTerm": yearTerm,
                "term": yearTermMap[yearTerm[-2:]],
                "year": yearTerm[:4],
                # "code": columns[0].get_text().strip().replace("\xa0", ""), \
                "type": columns[1].get_text().strip().replace("\xa0", ""), \
                "sec": columns[2].get_text().strip().replace("\xa0", ""), \
                # "units": columns[3].get_text().strip().replace("\xa0", ""), \
                "instructor": columns[4].get_text("|").split("|")[-1].strip().replace("\xa0", ""), \
                "time": columns[5].get_text().strip().replace("\xa0", ""), \
                "place": columns[6].get_text().strip().replace("\xa0", ""), \
                "final": columns[7].get_text().strip().replace("\xa0", ""), \
                "max": columns[8].get_text().strip().replace("\xa0", ""), \
                "enr": columns[9].get_text().strip().replace("\xa0", ""), \
                # "req": columns[10].get_text().strip().replace("\xa0", ""), \
                # "rstr": columns[11].get_text().strip().replace("\xa0", ""), \
                # "textbooks": columns[12].get_text().strip().replace("\xa0", ""), \
                # "web": columns[13].get_text().strip().replace("\xa0", "")
                }
            d.append(obj)
        elif len(tr.find_all("td")) == 15:
            columns = tr.find_all("td")
            # if columns[1].get_text().strip().replace("\xa0", "") != "Lec":
            #     continue
            obj = {\
                "course": last_course_number,
                # "yearTerm": yearTerm,
                "term": yearTermMap[yearTerm[-2:]],
                "year": yearTerm[:4],
                # "code": columns[0].get_text().strip().replace("\xa0", ""), \
                "type": columns[1].get_text().strip().replace("\xa0", ""), \
                "sec": columns[2].get_text().strip().replace("\xa0", ""), \
                # "units": columns[3].get_text().strip().replace("\xa0", ""), \
                "instructor": columns[4].get_text("|").split("|")[-1].strip().replace("\xa0", ""), \
                "time": columns[5].get_text().strip().replace("\xa0", ""), \
                "place": columns[6].get_text().strip().replace("\xa0", ""), \
                "final": columns[7].get_text().strip().replace("\xa0", ""), \
                "max": columns[8].get_text().strip().replace("\xa0", ""), \
                "enr": columns[9].get_text().strip().replace("\xa0", ""), \
                # "req": columns[10].get_text().strip().replace("\xa0", ""), \
                # "rstr": columns[11].get_text().strip().replace("\xa0", ""), \
                # "textbooks": columns[12].get_text().strip().replace("\xa0", ""), \
                # "web": columns[13].get_text().strip().replace("\xa0", ""), \
                # "status":  columns[14].get_text().strip().replace("\xa0", "")
                }
            d.append(obj)
        elif len(tr.find_all("td")) == 16:
            columns = tr.find_all("td")
            # if columns[1].get_text().strip().replace("\xa0", "") != "Lec":
            #     continue
            obj = {\
                "course": last_course_number,
                # "yearTerm": yearTerm,
                "term": yearTermMap[yearTerm[-2:]],
                "year": yearTerm[:4],
                # "code": columns[0].get_text().strip().replace("\xa0", ""), \
                "type": columns[1].get_text().strip().replace("\xa0", ""), \
                "sec": columns[2].get_text().strip().replace("\xa0", ""), \
                # "units": columns[3].get_text().strip().replace("\xa0", ""), \
                "instructor": columns[4].get_text("|").split("|")[-1].strip().replace("\xa0", ""), \
                "time": columns[5].get_text().strip().replace("\xa0", ""), \
                "place": columns[6].get_text().strip().replace("\xa0", ""), \
                "final": columns[7].get_text().strip().replace("\xa0", ""), \
                "max": columns[8].get_text().strip().replace("\xa0", ""), \
                "enr": columns[9].get_text().strip().replace("\xa0", ""), \
                # "wl": columns[10].get_text().strip().replace("\xa0", ""), \
                # "req": columns[11].get_text().strip().replace("\xa0", ""), \
                # "rstr": columns[12].get_text().strip().replace("\xa0", ""), \
                # "textbooks": columns[13].get_text().strip().replace("\xa0", ""), \
                # "web": columns[14].get_text().strip().replace("\xa0", ""), \
                # "status":  columns[15].get_text().strip().replace("\xa0", "")
                }
            d.append(obj)
    page.close()

with open('websoc.json', 'w') as file:
    file.write(json.dumps(d, indent=4))
