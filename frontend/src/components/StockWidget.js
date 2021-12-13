import React from 'react';
import Plot from 'react-plotly.js';
import {weeklyTrend} from "../api/api";

class StockWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockChartXValues: [],
            stockChartYValues: [],
            error: false,
            errMessage: ''
        }
    }

    componentDidMount() {
        this.fetchStock();
    }

    fetchStock() {
        const pointerToThis = this;
        console.log(pointerToThis);

        let stockChartAAPLValuesFunction = [];
        let stockChartTSLAValuesFunction = [];
        let stockChartADBEValuesFunction = [];
        let stockChartABNBValuesFunction = [];
        let stockChartASANValuesFunction = [];
        let stockChartAMDValuesFunction = [];
        let stockChartVOOValuesFunction = [];
        let stockChartVTIValuesFunction = [];
        let stockChartARKKValuesFunction = [];
        let stockChartNVDAValuesFunction = [];
        let stockChartTWLOValuesFunction = [];
        let stockChartCSCOValuesFunction = [];
        let stockChartINTCValuesFunction = [];
        let stockChartDISValuesFunction = [];
        let stockChartCHWYValuesFunction = [];


            weeklyTrend().then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    console.log(data);


                    for (var key in data['total_weekly_trend_by_stock']) {
                        console.log(key);
                        if (key === 'AAPL')
                            console.log("fsads");
                    }

                    for (var val1 in data['total_weekly_trend_by_stock']['AAPL']) {
                        stockChartAAPLValuesFunction.push(data['total_weekly_trend_by_stock']['AAPL'][val1]);
                    }

                    for (var val2 in data['total_weekly_trend_by_stock']['TSLA']) {
                        stockChartTSLAValuesFunction.push(data['total_weekly_trend_by_stock']['TSLA'][val2]);
                    }

                    for (var val3 in data['total_weekly_trend_by_stock']['ADBE']) {
                        stockChartADBEValuesFunction.push(data['total_weekly_trend_by_stock']['ADBE'][val3]);
                    }

                    for (var val4 in data['total_weekly_trend_by_stock']['ABNB']) {
                        stockChartABNBValuesFunction.push(data['total_weekly_trend_by_stock']['ABNB'][val4]);
                    }

                    for (var val5 in data['total_weekly_trend_by_stock']['ASAN']) {
                        stockChartASANValuesFunction.push(data['total_weekly_trend_by_stock']['ASAN'][val5]);
                    }

                    for (var val6 in data['total_weekly_trend_by_stock']['AMD']) {
                        stockChartAMDValuesFunction.push(data['total_weekly_trend_by_stock']['AMD'][val6]);
                    }

                    for (var val7 in data['total_weekly_trend_by_stock']['VOO']) {
                        stockChartVOOValuesFunction.push(data['total_weekly_trend_by_stock']['VOO'][val7]);
                    }

                    for (var val8 in data['total_weekly_trend_by_stock']['VTI']) {
                        stockChartVTIValuesFunction.push(data['total_weekly_trend_by_stock']['VTI'][val8]);
                    }

                    for (var val9 in data['total_weekly_trend_by_stock']['ARKK']) {
                        stockChartARKKValuesFunction.push(data['total_weekly_trend_by_stock']['ARKK'][val9]);
                    }

                    for (var val10 in data['total_weekly_trend_by_stock']['NVDA']) {
                        stockChartNVDAValuesFunction.push(data['total_weekly_trend_by_stock']['NVDA'][val10]);
                    }

                    for (var val11 in data['total_weekly_trend_by_stock']['TWLO']) {
                        stockChartTWLOValuesFunction.push(data['total_weekly_trend_by_stock']['TWLO'][val11]);
                    }

                    for (var val12 in data['total_weekly_trend_by_stock']['CSCO']) {
                        stockChartCSCOValuesFunction.push(data['total_weekly_trend_by_stock']['CSCO'][val12]);
                    }

                    for (var val13 in data['total_weekly_trend_by_stock']['INTC']) {
                        stockChartINTCValuesFunction.push(data['total_weekly_trend_by_stock']['INTC'][val13]);
                    }

                    for (var val14 in data['total_weekly_trend_by_stock']['DIS']) {
                        stockChartDISValuesFunction.push(data['total_weekly_trend_by_stock']['DIS'][val14]);
                    }

                    for (var val15 in data['total_weekly_trend_by_stock']['CHWY']) {
                        stockChartCHWYValuesFunction.push(data['total_weekly_trend_by_stock']['CHWY'][val15]);
                    }

                    pointerToThis.setState({
                        stockChartAAPLValues: stockChartAAPLValuesFunction,
                        stockChartTSLAValues: stockChartTSLAValuesFunction,
                        stockChartADBEValues: stockChartADBEValuesFunction,
                        stockChartABNBValues: stockChartABNBValuesFunction,
                        stockChartASANValues: stockChartASANValuesFunction,
                        stockChartAMDValues: stockChartAMDValuesFunction,
                        stockChartVOOValues: stockChartVOOValuesFunction,
                        stockChartVTIValues: stockChartVTIValuesFunction,
                        stockChartARKKValues: stockChartARKKValuesFunction,
                        stockChartNVDAValues: stockChartNVDAValuesFunction,
                        stockChartTWLOValues: stockChartTWLOValuesFunction,
                        stockChartCSCOValues: stockChartCSCOValuesFunction,
                        stockChartINTCValues: stockChartINTCValuesFunction,
                        stockChartDISValues: stockChartDISValuesFunction,
                        stockChartCHWYValues: stockChartCHWYValuesFunction
                    });
                }
            ).catch(error => {
                console.log(error)
                this.setState({error: true, errMessage: 'Backend API no response! Can not fetch the graph!'})
            })
    }

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                <Plot
                    data={[
                        {
                            //x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartAAPLValues,
                            type: 'scatter',
                            name: 'AAPL',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartTSLAValues,
                            type: 'scatter',
                            name: 'TSLA',
                            mode: 'lines+markers',
                            marker: {color: 'blue'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartADBEValues,
                            type: 'scatter',
                            name: 'ADBE',
                            mode: 'lines+markers',
                            marker: {color: 'green'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartABNBValues,
                            type: 'scatter',
                            name: 'ABNB',
                            mode: 'lines+markers',
                            marker: {color: 'yellow'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartASANValues,
                            type: 'scatter',
                            name: 'ASAN',
                            mode: 'lines+markers',
                            marker: {color: 'black'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartAMDValues,
                            type: 'scatter',
                            name: 'AMD',
                            mode: 'lines+markers',
                            marker: {color: '#ff7f0e'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartVOOValues,
                            type: 'scatter',
                            name: 'VOO',
                            mode: 'lines+markers',
                            marker: {color: '#9467bd'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartVTIValues,
                            type: 'scatter',
                            name: 'VTI',
                            mode: 'lines+markers',
                            marker: {color: '#7f7f7f'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartARKKValues,
                            type: 'scatter',
                            name: 'ARKK',
                            mode: 'lines+markers',
                            marker: {color: '#d62728'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartNVDAValues,
                            type: 'scatter',
                            name: 'NVDA',
                            mode: 'lines+markers',
                            marker: {color: '#17becf'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartTWLOValues,
                            type: 'scatter',
                            name: 'TWLO',
                            mode: 'lines+markers',
                            marker: {color: '#8c564b'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartCSCOValues,
                            type: 'scatter',
                            name: 'CSCO',
                            mode: 'lines+markers',
                            marker: {color: '#bcbd22'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartINTCValues,
                            type: 'scatter',
                            name: 'INTC',
                            mode: 'lines+markers',
                            marker: {color: '#e377c2'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartDISValues,
                            type: 'scatter',
                            name: 'DIS',
                            mode: 'lines+markers',
                            marker: {color: '#1f77b4'},
                        },
                        {
                            x: [1,2,3,4,5,6,7],
                            y: this.state.stockChartCHWYValues,
                            type: 'scatter',
                            name: 'CHWY',
                            mode: 'lines+markers',
                            marker: {color: '#2ca02c'},
                        }
                    ]}
                    layout={{width: 900, height: 490, title: 'Weekly Report'}}
                />
                {this.state.error &&
                    <div>
                        <hr/>
                        <strong style={{ color: 'red' }}>Warning: { this.state.errMessage} </strong><br/><br/>
                    </div>
                }
            </div>
        )
    }
}

export default StockWidget;