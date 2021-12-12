from flask import Flask, jsonify, request, render_template
import requests
import json
import StockManager
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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

    allocations = StockManager.allocate_stocks(amount, strategies)
    
    return json.dumps(allocations), 200


@app.route('/weeklytrend', methods = ["GET"])
def get_total_weekly_trend():
    total_strategies = ["Ethical Investing", "Growth Investing", "Index Investing", "Quality Investing", "Value Investing"]
    trend = StockManager.get_total_weekly_trend(total_strategies)
    return json.dumps(trend), 200


@app.route("/")
def serve_template():
    return render_template('index.html')



@app.route("/dashboard")
def serve_template_dashboard():
    return render_template('index.html')



if __name__ == "__main__":
    app.run(host='127.0.0.1', port = 5000, debug=True)
    
