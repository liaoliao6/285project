import React from 'react';

//export default class StockWidget extends Component {
//
//
//    componentDidMount() {
//        const script = document.createElement('script');
//        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
//        script.async = true;
//        script.innerHTML = JSON.stringify({
//            "colorTheme": "light",
//            "dateRange": "1m",
//            "exchange": "US",
//            "showChart": true,
//            "locale": "en",
//            "width": "100%",
//            "height": "100%",
//            "largeChartUrl": "",
//            "isTransparent": false,
//            "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
//            "plotLineColorFalling": "rgba(33, 150, 243, 1)",
//            "gridLineColor": "rgba(240, 243, 250, 1)",
//            "scaleFontColor": "rgba(120, 123, 134, 1)",
//            "belowLineFillColorGrowing": "rgba(33, 150, 243, 0.12)",
//            "belowLineFillColorFalling": "rgba(33, 150, 243, 0.12)",
//            "symbolActiveColor": "rgba(33, 150, 243, 0.12)"
//        });
//        document.getElementById("stockWidget").appendChild(script);
//    }
//
//    render() {
//        return(
//            <div id="stockWidget" className="stock-widget-container">
//                <div className="tradingview-widget-container">
//                    <div className="tradingview-widget-container__widget">
//                    </div>
//                </div>
//            </div>
//        );
//    }
//}

import Plot from 'react-plotly.js';

class StockWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: []
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);
        //const API_KEY = 'HGJWFG4N8AQ66ICD';
        //let StockSymbol = 'FB';
        //let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        //fetch(API_Call)
        fetch('/weeklytrend', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);

                    for (var key in data['total_weekly_trend_by_stock']) {
                        stockChartXValuesFunction.push(key);
                        stockChartYValuesFunction.push(data['total_weekly_trend_by_stock'][key][1]);
                    }

                    // console.log(stockChartXValuesFunction);
                    pointerToThis.setState({
                        stockChartXValues: stockChartXValuesFunction,
                        stockChartYValues: stockChartYValuesFunction
                    });
                }
            )
    }

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                <Plot
                    data={[
                        {
                            //x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                            x: this.state.stockChartXValues,
                            y: this.state.stockChartYValues,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        }
                    ]}
                    layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
                />
            </div>
        )
    }
}

export default StockWidget;