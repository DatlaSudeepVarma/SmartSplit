import http.client
import json

def test_connection():
    try:
        conn = http.client.HTTPConnection("127.0.0.1", 8000)
        conn.request("GET", "/trips")
        res = conn.getresponse()
        print(f"Status: {res.status}")
        print(f"Body: {res.read().decode()}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_connection()
