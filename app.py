from flask import Flask, jsonify, request, render_template
import requests
import json
import StockSuggestion


app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World!"

@app.route('/suggest', methods = ['POST'])
def suggest_stocks():
    amount = request.json['amount']
    if amount < 5000:
        return json.dumps({"error": "Amount should be more than $5000"}), 500

    strategies = request.json['strategies']
    if len(strategies) == 0:
        return json.dumps({"error": "Select at-least one strategy"}), 500
    if len(strategies) > 2:
        return json.dumps({"error": "Maximum two strategies can be selected together"}), 500

    allocations = StockSuggestion.suggest_stocks(amount, strategies)
    
    return json.dumps(allocations), 200
    

if __name__ == "__main__":
    app.run(debug=True)
    
