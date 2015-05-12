import re
import os, os.path, sys
import uglipyjs

def main():
    for root, dirs, files in os.walk("../deploy/www/js/app/"):
        for file in files:
            if file.endswith(".js"):
                filepath = root + "/" + file
                js = open(filepath,'r').read()
                mini = uglipyjs.compile(js, {'mangle':False})
                newFile = open(filepath, "w+")
                newFile.write(mini)

    for root, dirs, files in os.walk("../deploy/www/three_extra/"):
        for file in files:
            if file.endswith(".js"):
                filepath = root + "/" + file
                js = open(filepath,'r').read()
                mini = uglipyjs.compile(js, {'mangle':False})
                newFile = open(filepath, "w+")
                newFile.write(mini)

    for root, dirs, files in os.walk("../deploy/www/soundfont/"):
        for file in files:
            if file.endswith(".js"):
                filepath = root + "/" + file
                js = open(filepath,'r').read()
                mini = uglipyjs.compile(js, {'mangle':False})
                newFile = open(filepath, "w+")
                newFile.write(mini)

if __name__ == '__main__':
    main()
