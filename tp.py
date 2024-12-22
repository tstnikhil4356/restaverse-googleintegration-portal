import requests

def get_place_id(restaurant_name, location, api_key):
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
            return "Place ID not found."
    else:
        return "No local results found."

# Example usage:
restaurant_name = "McDonald's"
location = "Mumbai"
api_key = "b6752fa557377bdbda8bef7d71693db13f9aa04fbcab1d20598bb60f6f561b17"  # Replace with your SerpApi key"  # Replace with your actual SerpApi key

place_id = get_place_id(restaurant_name, location, api_key)
print(f"Place ID for {restaurant_name} in {location}: {place_id}")
