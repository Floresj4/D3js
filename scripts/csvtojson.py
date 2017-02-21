import csv  
import json  
  
# Open the CSV  
with open('data.csv', newline='') as csvfile:
	reader = csv.DictReader(csvfile, delimiter=',', quotechar='|')
	for row in reader:
		print(row['Date'],row['Weight'], row['Calories'], row['Note'])