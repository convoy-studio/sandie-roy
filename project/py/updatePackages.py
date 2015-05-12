import re
import os, os.path, sys, shutil, time, subprocess
from subprocess import call
from slugify import slugify
from json import JSONDecoder
import copy
from os import listdir


def main():

    startStr = "# Define start - generated content"
    endStr = "# Define end - generated content"

    startMovieStr = "# Define start - movies - generated content"
    endMovieStr = "# Define end - movies - generated content"

    packagesFolder = "../src/coffee/app/view/scenePackage"
    allPackages = []
    i = 0
    for root, dirs, files in os.walk(packagesFolder):
        if i != 0:
            break
        for d in dirs:
            dir_id = d
            camel_dir_id = d.title()
            allPackages.append(dir_id)
            targetFileURL = packagesFolder + "/" + dir_id + "/" + dir_id[0].upper() + dir_id[1:] + "Package.coffee"
            movieRequireFiles = []
            serviceRequireFiles = []

            for serviceFile in listdir(packagesFolder+"/"+dir_id+"/service"):
                if serviceFile.endswith(".coffee"):
                    serviceRequireFiles.append(serviceFile)

            for movieFile in listdir(packagesFolder+"/"+dir_id+"/movieclip"):
                if movieFile.endswith(".coffee"):
                    movieRequireFiles.append(movieFile)

            with open(targetFileURL) as f:
                targetFile = f.read()
                
                top = targetFile[:targetFile.find(startStr)+len(startStr)]
                bottom = targetFile[targetFile.find(endStr):]
                middle = ""

                defineLine = targetFile[targetFile.find(startStr)+len(startStr):targetFile.find(endStr)]
                firstPos = defineLine.find("]")
                secondPos = defineLine.find(")")
                firstPart = ""
                secondPart = ""

                for f in serviceRequireFiles:
                    f_id = f.replace(".coffee", "")
                    path_id = packagesFolder+"/"+dir_id+"/service/" + f_id
                    path_id = path_id.replace("../src/coffee/", "")
                    if defineLine.find(f_id) < 0:
                        firstPart += ", "+'"'+camel_dir_id+f_id+'"'
                        secondPart += ", "+f_id

                for f in movieRequireFiles:
                    f_id = f.replace(".coffee", "")
                    path_id = packagesFolder+"/"+dir_id+"/movieclip/" + f_id
                    path_id = path_id.replace("../src/coffee/", "")
                    if defineLine.find(f_id) < 0:
                        firstPart += ", "+'"'+camel_dir_id+f_id+'"'
                        secondPart += ", "+f_id

                middle = defineLine[:firstPos]+firstPart+"]"+defineLine[firstPos+len("]"):secondPos]+secondPart+")"+defineLine[secondPos+len(")"):]
                # print middle

                content = top+ middle + bottom

                content = content.replace("[, ", "[")
                content = content.replace("(, ", "(")

                newFile = open(targetFileURL, "w+")
                newFile.write(content)

        i += 1

if __name__ == '__main__':
    main()
