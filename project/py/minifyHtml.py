import re
import os, os.path, sys

def main():
    for root, dirs, files in os.walk("../deploy/www/partial/"):
        for file in files:
            if file.endswith(".html"):
                path = root+"/"+file
                path = path.replace("../www/", "")
                with open(path) as f:
                    file = f.read()
                    s = ' '.join(file.split())
                    newFile = open(path, "w+")
                    newFile.write(s)

    # for root, dirs, files in os.walk("../deploy/www/shader/"):
    #     for file in files:
    #         if file.endswith(".frag") or file.endswith(".vert"):
    #             path = root+"/"+file
    #             path = path.replace("../www/", "")
    #             with open(path) as f:
    #                 file = f.read()
    #                 s = ' '.join(file.split())
    #                 newFile = open(path, "w+")
    #                 newFile.write(s)

    for root, dirs, files in os.walk("../deploy/www/model/"):
        for file in files:
            if file.endswith(".js"):
                path = root+"/"+file
                path = path.replace("../www/", "")
                with open(path) as f:
                    file = f.read()
                    s = ' '.join(file.split())
                    newFile = open(path, "w+")
                    newFile.write(s)

if __name__ == '__main__':
    main()
