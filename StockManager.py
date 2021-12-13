import requests
from datetime import datetime, timedelta
from collections import defaultdict
import json

stocks = {
    'Ethical Investing': ["AAPL", "TSLA", "ADBE"],
    'Growth Investing': ["ABNB", "ASAN", "AMD"],
    'Index Investing': ["VOO", "VTI", "ARKK"],
    'Quality Investing': ["NVDA", "TWLO", "CSCO"],
    'Value Investing': ["INTC", "DIS", "CHWY"]
}


def get_latest_price(strategies):
    latest_price = {}
    base_url = "https://financialmodelingprep.com/api/v3/quote-short/"
    url_list = []
    for strategy in strategies:
        for symbol in stocks[strategy]:
            url_list.append(symbol + "?apikey=5e46a24c274b0a3f3a27f46f34bf0bb8")
    for url in url_list:
        response = requests.get(base_url + url)
        if response.status_code != 200:
            Exception("API Error")
        response_json = response.json()
        item = response_json[0]
        latest_price[item["symbol"]] = {"price": item["price"], "strategy": get_strategy_by_stock(item["symbol"])}
    return latest_price


def allocate_stocks(amount, strategies):

    allocation = []
    pie_chart_data = []

    latest_price = get_latest_price(strategies)

    latest_price = {k: v for k, v in sorted(latest_price.items(), key=lambda item: item[1]["price"], reverse=True)}
    stock_amount1, stock_amount2, stock_amount3 = amount * 0.5, amount * 0.3, amount * 0.2
    cnt = 0
    stock_amount = [stock_amount1, stock_amount2, stock_amount3]
    for ticker, meta in latest_price.items():
        stock_price = float(meta.get("price"))
        number_of_stocks = round(((stock_amount[cnt])/stock_price), 2)
        allocation.append({"name": ticker, "stocks": number_of_stocks, "price": stock_price, "strategy": meta.get("strategy")})
        value = round((number_of_stocks * stock_price), 2)
        pie_chart_data.append({"name": ticker, "value": value})
        cnt += 1
        if cnt == 3:
            cnt = 0
    weekly_trend = get_weekly_trend(strategies)
    weekly_trend_by_stock = []

    for stock_trend in weekly_trend["total"]:
        symbol = stock_trend["symbol"]
        price_trend = []
        for h in stock_trend["historical"]:
            price_trend.append(h["close"])
        weekly_trend_by_stock.append({"name" : symbol, "trend" : price_trend})
    new_weekly_trend_by_stock = []
    today = datetime.today()
    dates = [today + timedelta(days = i) for i in range(today.weekday() - 12, today.weekday() - 5)]
    for date in dates:
        temp_dict = {}
        temp_dict['date'] = str(date.month) + '-' + str(date.day)
        new_weekly_trend_by_stock.append(temp_dict)
    j = -1
    for d in new_weekly_trend_by_stock:
        for i in range(len(weekly_trend_by_stock)):
            d[weekly_trend_by_stock[i]['name']] = weekly_trend_by_stock[i]['trend'][j]
        j -= 1

    return {"allocation": allocation, "weekly_trend": weekly_trend, "pie_chart_data": pie_chart_data, "weekly_trend_by_stock":new_weekly_trend_by_stock}

def get_total_weekly_trend(strategies):
    total_weekly_trend = get_weekly_trend(strategies)
    total_weekly_trend_by_stock = {}
    for stock_trend in total_weekly_trend["total"]:
        symbol = stock_trend["symbol"]
        price_trend = []
        for h in stock_trend["historical"]:
            price_trend.append(h["close"])
        total_weekly_trend_by_stock[symbol] = price_trend
    return {"total_weekly_trend_by_stock":total_weekly_trend_by_stock}




def get_weekly_trend(strategies):
    weekly_trend = {"total": []}
    base_url = 'https://financialmodelingprep.com/api/v3/historical-price-full/'
    for strategy in strategies:
        for ticker in stocks.get(strategy):
            url = base_url + ticker + "?timeseries=7&apikey=5e46a24c274b0a3f3a27f46f34bf0bb8"
            response = requests.get(url)
            if response.status_code != 200:
                Exception("API Error")
            response_json = response.json()
            weekly_trend["total"].append(response_json)
    return weekly_trend

def get_strategy_by_stock(ticker):
    for strategy, tickers in stocks.items():
        if ticker in tickers:
            return strategy

