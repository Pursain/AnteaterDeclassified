from bs4 import BeautifulSoup
from urllib.request import urlopen
from urllib.error import HTTPError
import re
import json

out = []

# find all course section
url = "http://catalogue.uci.edu/allcourses/"
page = urlopen(url)
html = page.read().decode("utf-8")
soup = BeautifulSoup(html, "html.parser")


# iterate through every course link
course_section_links = set(['http://catalogue.uci.edu{}'.format(link["href"]) for link in soup.find_all('a', attrs={"href": re.compile("/allcourses/.+")})])
print("Found {} links".format(len(course_section_links)))
for i, course_section_link in enumerate(course_section_links):
    print("{}/{} Working on {}".format(i+1, len(course_section_links), course_section_link))
    url = course_section_link
    try:
        page = urlopen(url)
    except HTTPError as err:
        if err.code == 404:
            continue
        else:
            raise
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")

    courses = soup.find_all("div", "courseblock")
    for course in courses:
        # Course identifier (eg. AC ENG 20A)
        d = dict()
        d["course"] = course.find("p", {"class": "courseblocktitle"}).get_text().split('.')[0].strip().replace('\xa0', ' ').upper()
        d["title"] = course.find("p", {"class": "courseblocktitle"}).get_text().split('.')[1].strip().replace('\xa0', ' ')  
        d["units"] = course.find("p", {"class": "courseblocktitle"}).get_text().split('.')[2].strip().replace('\xa0', ' ')  

        course_ps = course.find("div", {"class": "courseblockdesc"}).find_all("p")
        
        # Desc
        d["desc"] = course_ps[0].get_text().strip().replace('\xa0', ' ')  
        course_ps.pop(0)

        """
        handled cases            
            Prerequisite or corequisite
            Corequiste <br> Prerequisite
            Prerequisite
            Corequisite
            Repeatability
            Concurrent with
            Restriction
            Grading Option
            Same as 
            Overlaps with
            Breadth code
            Design units
        """
        for course_p in course_ps:
            # Prerequisite or corequisite:
            if course_p.find(string=re.compile("Prerequisite or corequisite:")) != None:
                d["prereqRaw"] = str(course_p)
                d["prereqStr"] = course_p.get_text().strip().replace('\xa0', ' ')
                d["prereqList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in course_p.find_all("a")]))

                d["coreqRaw"] = str(course_p)
                d["coreqStr"] = course_p.get_text().strip().replace('\xa0', ' ')
                d["coreqList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in course_p.find_all("a")]))

            # Prerequisite and corequisite:
            elif course_p.find(string=re.compile("Prerequisite:")) != None and course_p.find(string=re.compile("Corequisite:")) != None:
                # split by 'Prerequiste:'
                course_p_split = str(course_p).split("Prerequisite:")

                coreq_soup = BeautifulSoup(course_p_split[0], "html.parser")
                prereq_soup = BeautifulSoup(course_p_split[1], "html.parser")
                
                # assumes coreq is always before prereq
                if coreq_soup.find(string=re.compile("Prerequisite:")) != None or prereq_soup.find(string=re.compile("Corequisite:")):
                    print(str(coreq_soup))
                    print(str(prereq_soup))
                    raise "Something aint right" 

                d["coreqRaw"] = str(coreq_soup)
                d["coreqStr"] = coreq_soup.get_text().strip().replace('\xa0', ' ')
                d["coreqList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in coreq_soup.find_all("a")]))

                d["prereqRaw"] = "Prerequisite:" + str(prereq_soup)
                d["prereqStr"] = prereq_soup.get_text().strip().replace('\xa0', ' ')
                d["prereqList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in prereq_soup.find_all("a")]))

            # Prereq
            elif course_p.find(string=re.compile("Prerequisite:")) != None:
                d["prereqRaw"] = str(course_p)
                d["prereqStr"] = course_p.get_text().strip().replace('\xa0', ' ')
                d["prereqList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in course_p.find_all("a")]))

            # Corequisite
            elif course_p.find(string=re.compile("Corequisite:")) != None:
                d["coreqRaw"] = str(course_p)
                d["coreqStr"] = course_p.get_text().strip().replace('\xa0', ' ')
                d["coreqList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in course_p.find_all("a")]))

            # Repeatability
            elif course_p.find(string=re.compile("Repeatability:")) != None:
                d["repeatRaw"] = str(course_p)
                d["repeatStr"] = course_p.get_text().strip().replace('\xa0', ' ')  

            # Concurrent with
            elif course_p.find(string=re.compile("Concurrent with")) != None:
                d["concurrentWithRaw"] = str(course_p)
                d["concurrentWithStr"] = course_p.get_text().strip().replace('\xa0', ' ')  
                d["concurrentWithList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in course_p.find_all("a")]))

            # Restriction
            elif course_p.find(string=re.compile("Restriction:")) != None:
                d["restrictRaw"] = str(course_p)
                d["restrictStr"] = course_p.get_text().strip().replace('\xa0', ' ')  

            # Grading Option
            elif course_p.find(string=re.compile("Grading Option:")) != None:
                d["gradeOptionRaw"] = str(course_p)
                d["gradeOptionStr"] = course_p.get_text().strip().replace('\xa0', ' ')  
                
            # Same as
            elif course_p.find(string=re.compile("Same as")) != None:
                d["sameAsRaw"] = str(course_p)  
                d["sameAsStr"] = course_p.get_text().strip().replace('\xa0', ' ')  
                d["sameAsList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in course_p.find_all("a")]))
                
            # Overlaps with
            elif course_p.find(string=re.compile("Overlaps with")) != None:
                d["overlapsWithRaw"] = str(course_p)  
                d["overlapsWithStr"] = course_p.get_text().strip().replace('\xa0', ' ')  
                d["overlapsWithList"] = list(set([a_tag.get_text().strip().replace('\xa0', ' ') for a_tag in course_p.find_all("a")]))

            # Breadth code
            elif re.compile(r'<strong>\(.+\).*</strong>').search(str(course_p)) != None:
                d["breadthCodeRaw"] = str(course_p)  
                d["breadthCodeStr"] = course_p.get_text().strip().replace('\xa0', ' ')  

            # Design units
            elif course_p.find(string=re.compile(r"\(Design units:")) != None:
                d["designUnitsRaw"] = str(course_p)  
                d["designUnitsStr"] = course_p.get_text().strip().replace('\xa0', ' ')  
            
            else:
                raise "Unable to categorize this p tag: {}".format(str(course_p))

        out.append(d)


with open('catalogue.json', 'w') as file:
    file.write(json.dumps(out, indent=4))