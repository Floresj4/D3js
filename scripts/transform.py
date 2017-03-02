import os
import csv  
import json

def main():

	c = open('data.csv', 'r')
	lines = c.readlines()
	linecount = 0
	totalLines = len(lines)

	with open('data.csv', 'r') as csvfile:
		reader = csv.DictReader(csvfile)

		with open('data.json', 'w') as jsonfile:
			
			jsonfile.write('[')
			for row in reader:
				linecount += 1
				
				json.dump(row, jsonfile, indent=4)
				jsonfile.write('\r\n')
				
				if(linecount < (totalLines - 1)):
					jsonfile.write(',')

			jsonfile.write(']')

if __name__ == "__main__":
	_ = os.system("cls")
	main()