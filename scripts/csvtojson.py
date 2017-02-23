import csv  
import json  

def main():
	loadData()
	
def loadData():
	#open and read  
	with open('data.csv', newline='') as csvfile:
		reader = csv.DictReader(csvfile, delimiter=',', quotechar='|')
		for row in reader:
			print(row['Date'],row['Weight'], row['Calories'], row['Note'])

if __name__ == "__main__":
	main()