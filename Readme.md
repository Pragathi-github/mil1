API Endpoints
POST /menu - Add or Update Menu Item
URL: http://localhost:3000/menu


Request Body (Raw JSON):

{
  "id": "1",
  "name": "Pizza",
  "price": 9.99,
  "category": "Main Course"
}
Expected Response :

json
{
  "message": "Menu item added/updated successfully."
}


GET /menu - Retrieve All Menu Items
URL: http://localhost:3000/menu


Expected Response:

json
[
  {
    "id": "1",
    "name": "Pizza",
    "price": 9.99,
    "category": "Main Course"
  }
]


POST /orders - Place an Order
URL: http://localhost:3000/orders



Request Body (Raw JSON):


{
  "items": ["1"]
}
Expected Response:


{
    "id": "1733303080865",
    "items": [
        "1"
    ],
    "status": "Preparing",
    "createdAt": "2024-12-04T09:04:40.865Z"
}
Expected Response (Error: Invalid Item):

{
  "error": "Item with ID '5' does not exist."
}


Fetch Order Details
URL: http://localhost:3000/orders/{orderId} (Replace {orderId} with your actual order ID)

Method: GET

{
    "id": "1733302268609",
    "items": [
        "1"
    ],
    "status": "Out for Delivery",
    "createdAt": "2024-12-04T08:51:08.609Z"
}
Expected Response (Error: Order Not Found):


{
  "error": "Order not found."
}
