from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow requests from React app

def get_place_id_for_restaurant(restaurant_name, location, api_key):
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_maps",
        "q": restaurant_name + " " + location,
        "api_key": api_key
    }

    response = requests.get(url, params=params)
    data = response.json()

    # Check if the response contains local_results
    if "local_results" in data:
        # Extract Place ID from the first result
        place_id = data["local_results"][0].get("place_id")
        if place_id:
            return place_id
        else:
            return None
    else:
        return None

@app.route('/get-reviews', methods=['GET'])
def get_reviews():
    restaurant_name = request.args.get('restaurant')
    location = request.args.get('location', '')  # Optional location parameter
    if not restaurant_name:
        return jsonify({"message": "Restaurant name is required."}), 400

    # Get the place_id for the restaurant using SerpApi
    api_key = "b6752fa557377bdbda8bef7d71693db13f9aa04fbcab1d20598bb60f6f561b17"  # Replace with your SerpApi key
    place_id = get_place_id_for_restaurant(restaurant_name, location, api_key)

    if not place_id:
        return jsonify({"message": "Restaurant not found."}), 404

    # Proceed with fetching reviews using the place_id from SerpApi
    reviews_api_key = "b6752fa557377bdbda8bef7d71693db13f9aa04fbcab1d20598bb60f6f561b17"  # Replace with your SerpApi key for reviews
    url = "https://serpapi.com/search"
    params = {
        "engine": "google_maps_reviews",
        "place_id": place_id,
        "api_key": reviews_api_key
    }

    response = requests.get(url, params=params)
    data = response.json()

    # Safely handle and extract reviews
    reviews = data.get("reviews", [])
    structured_reviews = []

    for review in reviews:
        structured_reviews.append({
            "name": review["user"]["name"],
            "review": review["snippet"],
            "rating": review["rating"],
            "date": review["date"],
            "link": review["link"]
        })

    if structured_reviews:
        return jsonify(structured_reviews)
    else:
        return jsonify({"message": "No reviews found."})

if __name__ == '__main__':
    app.run(debug=True)
