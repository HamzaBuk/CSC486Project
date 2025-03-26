import requests
import json
from dotenv import load_dotenv
import os

api_key = os.getenv('api_key')
url = "https://api.spoonacular.com/recipes/716429/information?apiKey="+api_key+"&includeNutrition=false&number=1"
r = requests.get(url)
with open("sample.json", "w") as f:
    json.dump(r.json(), f)

print(r)
