import re
import os, os.path, sys, shutil, time, subprocess
from subprocess import call
from os import listdir

###
# Checks all the .htmls and images files and generates paths in InitialLoadController.coffee
###

def main():

    url = "../src/coffee/app/controller/InitialLoadController.coffee"
    startPartialsStr = "# Partials start"
    endPartialsStr = "# Partials end"

    with open(url) as f:
        file = f.read()

        top = file[:file.find(startPartialsStr)+len(startPartialsStr)]
        bottom = file[file.find(endPartialsStr):]
        middle = ""

        # adding all partials
        for root, dirs, files in os.walk("../www/partial"):
            for file in files:
                if file.endswith(".html"):
                    path = root+"/"+file
                    path = path.replace("../www/", "")
                    id = path.split("/").pop().replace(".html", "") + "-partial"
                    middle += "                "
                    middle += "{ id: " + '"' + id + '", ' + "src: " + '"' + path + '"' + " }"
                    middle += "\n"

        # adding pngs that i don't put inline in css
        for file in listdir("../www/image"):
            if "normal-" in file or "retina-" in file:
                path = "image/"+file
                id = file.split(".")[0] + "-image"
                middle += "                "
                middle += "{ id: " + '"' + id + '", ' + "src: " + '"' + path + '"' + " }"
                middle += "\n"
                
        # adding all svgs
        for root, dirs, files in os.walk("../www/svg"):
            for file in files:
                if file.endswith(".svg"):
                    dir = root.replace("../www/", "")
                    n = file.split(".")
                    id = n[0]
                    ext = n[1]
                    path = dir + "/" + id + "." + ext
                    middle += "                "
                    
                    middle += "{ id: " + '"' + id + "-svg" + '", ' + "src: " + '"' + path + '"' + ', ' + "type:createjs.LoadQueue.TEXT }"
                    middle += "\n"

        # adding all dvorak textures
        for file in listdir("../www/image/global"):
            if file != ".DS_Store":
                path = "image/global/"+file
                id = file.split(".")[0] + "-image"
                middle += "\t\t\t\t"
                middle += "{ id: " + '"' + id + '", ' + "src: " + '"' + path + '"' + " }"
                middle += "\n"

        currentFileName = os.path.basename(__file__)
        content = top + "\n\t\t\t\t" + "# Generated from " + currentFileName + "\n" + middle + "\t\t\t\t" + bottom
        content = content.replace("\t", "    ")

        newFile = open(url, "w+")
        newFile.write(content)

if __name__ == '__main__':
    main()
