# google_places.py

import requests
from typing import Optional, Dict, Any, List


API_KEY = "sk***"
BASE_URL = "https://places.googleapis.com/v1"

QUERY = "best burgers in Hamburg"
FIELDS = "places.id,places.displayName,places.rating,places.formattedAddress,places.priceLevel,nextPageToken"
PAGE_SIZE = 20
OPEN_NOW = False
MIN_RATING = 3.5
PRICE_LEVELS = None
RANK_PREFERENCE = None

LOCATION_BIAS = {
    "circle": {
        "center": {
            "latitude": 53.5511,
            "longitude": 9.9937
        },
        "radius": 5000.0
    }
}


def text_search(
    query: str,
    fields: str,
    location_bias: Optional[Dict[str, Any]] = None,
    page_size: int = 20,
    page_token: Optional[str] = None,
    open_now: Optional[bool] = None,
    min_rating: Optional[float] = None,
    price_levels: Optional[List[str]] = None,
    rank_preference: Optional[str] = None,
) -> Dict[str, Any]:
    
    url = f"{BASE_URL}/places:searchText"
    
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": fields,
    }
    
    body = {
        "textQuery": query,
        "pageSize": page_size,
    }
    
    if page_token:
        body["pageToken"] = page_token
    if location_bias:
        body["locationBias"] = location_bias
    if open_now is not None:
        body["openNow"] = open_now
    if min_rating:
        body["minRating"] = min_rating
    if price_levels:
        body["priceLevels"] = price_levels
    if rank_preference:
        body["rankPreference"] = rank_preference
    
    response = requests.post(url, json=body, headers=headers)
    response.raise_for_status()
    
    return response.json()


def place_details(
    place_id: str,
    fields: str,
) -> Dict[str, Any]:
    
    url = f"{BASE_URL}/places/{place_id}"
    
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": fields,
    }
    
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    
    return response.json()


def main():
    print(f"Searching for: {QUERY}\n")
    
    results = text_search(
        query=QUERY,
        fields=FIELDS,
        location_bias=LOCATION_BIAS,
        page_size=PAGE_SIZE,
        open_now=OPEN_NOW,
        min_rating=MIN_RATING,
        price_levels=PRICE_LEVELS,
        rank_preference=RANK_PREFERENCE,
    )
    
    places = results.get("places", [])
    print(f"Found {len(places)} places:\n")
    
    for place in places:
        name = place.get("displayName", {}).get("text", "N/A")
        rating = place.get("rating", "N/A")
        address = place.get("formattedAddress", "N/A")
        price = place.get("priceLevel", "N/A")
        
        print(f"{name}")
        print(f"  Rating: {rating}")
        print(f"  Price: {price}")
        print(f"  Address: {address}")
        print()
    
    if "nextPageToken" in results:
        print(f"\nNext page token available: {results['nextPageToken'][:50]}...")


if __name__ == "__main__":
    main()