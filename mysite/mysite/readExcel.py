filename = "excelCommaDelimExample.csv"
# excelFile = open (filename)
# file_contents = excelFile.read()
#
# with open(filename) as f:
#     for line in f:
#         for x in range (0,line.size())
#             print("Something")

import csv

for line in open(filename):
    listWords = line.split(",")
    word2 = listWords[1].split("\n")
    print "There are", word2[0],  listWords[0]
