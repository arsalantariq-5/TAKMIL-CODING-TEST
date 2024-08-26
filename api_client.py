import requests

# Define the API URL
API_URL = "http://localhost:3000/v1/school"

# Data to be sent for creating a new school
create_school_data = {
    "name": "Greenwood High",
    "status": "Active",
    "startTime": "08:00",
    "endTime": "14:00",
    "shift": "Morning",
    "address": {
        "town": "Nehar Kot",
        "tehsil": "Barkhan",
        "district": "Barkhan",
        "state": "Balochistan",
        "address": "address-1",
        "latitude": 29.79,
        "longitude": 69.47
    },
    "organization": {
        "name": "Public Schools"
    },
    "hasProjector": True,
    "hasLaptop": False
}

# POST request to create a new school
response = requests.post(API_URL, json=create_school_data)
print("Create School Response:", response.json())

# Data to be sent for updating the school
update_school_data = {
    "status": "Inactive",
    "endTime": "15:00",
    "hasProjector": False
}

# PATCH request to update an existing school (replace `1` with the actual school ID)
school_id = 1
update_url = f"{API_URL}/{school_id}"
response = requests.patch(update_url, json=update_school_data)
print("Update School Response:", response.json())
