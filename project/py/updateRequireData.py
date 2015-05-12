import re
import os, os.path, sys, shutil, time, subprocess
from subprocess import call
from slugify import slugify
from json import JSONDecoder
import copy

###
# Checks all the "scene" files and create debug data
###

def main():

    movieclipsFolder = "../src/coffee/app/view/movieclip"
    allMovieclips = []
    for root, dirs, files in os.walk(movieclipsFolder):
        for file in files:
            if file.endswith(".coffee"):
                allMovieclips.append(file)


    # SwitcherService
    pagesFolder = "../src/coffee/app/view/layout/page"
    allPages = []
    for root, dirs, files in os.walk(pagesFolder):
        for file in files:
            if file.endswith(".coffee"):
                allPages.append(file)

    url = "../src/coffee/app/service/SwitcherService.coffee"
    startStr = "# Define start - generated content"
    endStr = "# Define end - generated content"
    with open(url) as f:
        file = f.read()

        top = file[:file.find(startStr)+len(startStr)]
        bottom = file[file.find(endStr):]
        middle = ""

        defineLine = file[file.find(startStr)+len(startStr):file.find(endStr)]
        firstPos = defineLine.find("]")
        secondPos = defineLine.find(")")
        firstPart = ""
        secondPart = ""
        for file in allPages:
            id = file.replace(".coffee", "")
            if defineLine.find(id) < 0:
                firstPart += ", "+'"'+id+'"'
                secondPart += ", "+id
        middle = defineLine[:firstPos]+firstPart+"]"+defineLine[firstPos+len("]"):secondPos]+secondPart+")"+defineLine[secondPos+len(")"):]

        content = top+ middle + bottom

        content = content.replace("[, ", "[")
        content = content.replace("(, ", "(")

        newFile = open(url, "w+")
        newFile.write(content)

if __name__ == '__main__':
    main()
