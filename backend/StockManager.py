import requests
from datetime import datetime, timedelta
from collections import defaultdict

stocks = {
    'Ethical Investing': ["AAPL", "TSLA", "ADBE"],
    'Growth Investing': ["OXLC", "ECC", "AMD"],
    'Index Investing': ["VOO", "VTI", "ILTB"],
    'Quality Investing': ["NVDA", "MU", "CSCO"],
    'Value Investing': ["INTC", "BABA", "GE"]
}


def get_latest_price(strategies):
    latest_price = {}
    base_url = "https://financialmodelingprep.com/api/v3/quote-short/"
    url_list = []
    for strategy in strategies:
        for symbol in stocks[strategy]:
            url_list.append(symbol + "?apikey=3a807ad83b99593ca93f8d0345faf840")
    for url in url_list:
        response = requests.get(base_url + url)
        if response.status_code != 200:
            Exception("API Error")
        response_json = response.json()
        item = response_json[0]
        #print("item = ",item)
        latest_price[item['symbol']] = {"price": item['price'], "strategy": get_strategy_by_stock(item['symbol'])}
    #print("lastest_price = ",latest_price)
    return latest_price


def allocate_stocks(amount, strategies):

    allocation = {}
    pie_chart_data = []

    # get the latest price
    latest_price = get_latest_price(strategies)

    # sort by desc price
    latest_price = {k: v for k, v in sorted(latest_price.items(), key=lambda item: item[1]["price"], reverse=True)}
    #print("latest_price in allocate_stocks = ", latest_price)
    change = 0
    per_stock_amount = 0
    if len(latest_price) != 0:
        per_stock_amount = amount / len(latest_price)

    for ticker, meta in latest_price.items():
        stock_price = float(meta.get("price"))
        number_of_stocks = int((per_stock_amount + change)/stock_price)
        change = (per_stock_amount + change) - (stock_price * number_of_stocks)
        allocation[ticker] = {"stocks": number_of_stocks, "price": stock_price, "strategy": meta.get("strategy")}
        pie_chart_data.append({"name": ticker, "value": number_of_stocks * stock_price})

    #print({"allocation": allocation, "weekly_trend": get_weekly_trend(strategies, allocation),
    #        "pie_chart_data": pie_chart_data})
    print("####### pie_chart = ", pie_chart_data)
    return {"allocation": allocation, "weekly_trend": get_weekly_trend(strategies, allocation),
            "pie_chart_data": pie_chart_data}


def get_weekly_trend(strategies, allocation):
    weekly_trend = {"total": []}
    base_url = 'https://financialmodelingprep.com/api/v3/historical-price-full/'
    for strategy in strategies:
        #print("strategy = ", strategy)
        for ticker in stocks.get(strategy):
            #print("ticker = ", ticker)
            url = base_url + ticker + "?timeseries=5&apikey=3a807ad83b99593ca93f8d0345faf840"
            response = requests.get(url)
            if response.status_code != 200:
                Exception("API Error")
            response_json = response.json()
            weekly_trend["total"].append(response_json)
    #print("weekly_trend = ", weekly_trend)
    #print("len(weekly_trend['total']) = ", len(weekly_trend["total"]))
    return weekly_trend


def get_strategy_by_stock(ticker):
    for strategy, tickers in stocks.items():
        if ticker in tickers:
            return strategy
