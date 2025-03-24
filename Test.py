import requests
from pprint import pprint
import json

# r = requests.get("https://api.spoonacular.com/recipes/\
#                  information?apiKey=a8b79bd13e1b4daea84052d93eee4093\
#                  complexSearch?query=pasta&maxFat=25&number=2")
r = requests.get("https://api.spoonacular.com/recipes/716429/information?apiKey=a8b79bd13e1b4daea84052d93eee4093&includeNutrition=false&number=1")
with open("sample.json", "w") as f:
    json.dump(r.json(), f)

print(r)