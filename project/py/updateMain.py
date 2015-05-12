import re
import os, os.path, sys, shutil, time, subprocess
from subprocess import call

###
# Checks all the .coffee files in src/ and generates paths in Main.coffee
###

def main():

    url = "../src/coffee/Main.coffee"
    startStr = "# Classes start"
    endStr = "# Classes end"

    with open(url) as f:
        file = f.read()

        top = file[:file.find(startStr)+len(startStr)]
        bottom = file[file.find(endStr):]
        middle = ""

        for root, dirs, files in os.walk("../src/coffee"):
            for file in files:
                if file.endswith(".coffee"):
                    if "scenePackage" in root and "Package" not in file :
                        path = root+"/"+file
                        path = path.replace("../src/coffee/", "")
                        path = path.replace(".coffee", "")
                        splitter = root.split("/")
                        folderId = splitter[len(splitter)-2].title()

                        middle += "        "
                        pathId = folderId + path.split("/").pop()
                        middle += pathId + ": " + '"' + path + '"'
                        middle += "\n"

                    else:
                        path = root+"/"+file
                        path = path.replace("../src/coffee/", "")
                        path = path.replace(".coffee", "")
                    
                        middle += "        "
                        pathId = path.split("/").pop()
                        middle += pathId + ": " + '"' + path + '"'
                        middle += "\n"

        middle += "\n"

        for root, dirs, files in os.walk("../www/three_extra"):
            for file in files:
                if file.endswith(".js"):
                    path = root+"/"+file
                    path = path.replace("../www/three_extra/", "")
                    path = path.replace(".js", "")
                    middle += "        "
                    middle += path.split("/").pop() + ": " + '"' + "../three_extra/" + path + '"'
                    middle += "\n"

        content = top + "\n" + "        " + "# Generated from updateMain.py" + "\n" + middle + "        " + bottom

        newFile = open(url, "w+")
        newFile.write(content)

if __name__ == '__main__':
    main()
