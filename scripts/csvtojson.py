import csv  
import json 
import os
import time
import datetime
from datetime import date

class entry:
	def __init__(self, d, w, c, n):
		self.date = d
		self.weight = w
		self.calories = c
		self.note = n

def main():
	loadData()

def getDay(row):
	curr_date = row['date'].split("/")
	entry_date = datetime.datetime(
	int(curr_date[2]), 
	int(curr_date[0]), 
	int(curr_date[1]))

	return entry(entry_date, row['weight'], row['calories'], row['note'])
	
def loadData():
	print("loading data...")

	weekly = []
	#open and read  
	with open('data.csv', newline='') as csvfile:
		reader = csv.DictReader(csvfile, delimiter=',', quotechar='|')

		days = []
		for row in reader:
			e = getDay(row)
			
			#push a continue
			if(e.date.strftime("%A") == "Monday"):
				print("monday...")
				weekly.append(days)
				days = []
			else:
				days.append(e);


if __name__ == "__main__":
	_ = os.system("cls")
	main()