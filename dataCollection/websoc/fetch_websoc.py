import mechanicalsoup
browser = mechanicalsoup.StatefulBrowser()
import time
import os.path
from os import path
from random import randint


# get options
browser.open("https://www.reg.uci.edu/perl/WebSoc")
s = browser.get_current_page()
yearterm_options = [option['value'] for option in s.select("select[name=YearTerm]")[0].find_all("option")]
dept_options = [option['value'] for option in s.select("select[name=Dept]")[0].find_all("option")]

dept_options.remove(" ALL")


for dept in dept_options:
    for yearTerm in yearterm_options:
        if path.exists('websoc_local/{}-{}'.format(dept.replace(r'/','-'), yearTerm).replace(r'\\','-')):
            print("Existing {}-{}".format(dept, yearTerm))
            continue

        print("Working on {}-{}".format(dept, yearTerm))

        browser.open("https://www.reg.uci.edu/perl/WebSoc")
        try:
            form = browser.select_form('form[action="https://www.reg.uci.edu/perl/WebSoc"]')
        except:
            print("crashed... waiting 1 min before restart")
            browser.close()
            time.sleep(60)
            browser.open("https://www.reg.uci.edu/perl/WebSoc")
            continue
        
        form.set("Dept", dept)
        form.set("YearTerm", yearTerm)
        resp = browser.submit_selected()

        with open('websoc_local/{}-{}'.format(dept.replace(r'/','-'), yearTerm), 'w') as file:
            file.write(str(browser.get_current_page()))

        # Let's be good spiders now...
        # 100-1560ms
        time.sleep(randint(100,1560)/1000)