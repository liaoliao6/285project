import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default class ChosenWeeklyTrend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: props}
    }

    render() {
        const data = this.state.data
        const stock_names = Object.keys(data.data[0])
        stock_names.shift()
        let rgb = [];
        for(let i = 0; i < stock_names.length; i++)
            rgb.push(Math.floor(Math.random()*16777215).toString(16))
        let zipped = stock_names.map(function(e, i) {
            return [e, '#' + rgb[i]];
        });

        return (
            <div>
                <LineChart
                    width={500}
                    height={300}
                    data={data.data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        zipped.map((name) =>
                            <Line type="monotone" dataKey={name[0]} stroke={name[1]} />
                        )
                    }
                </LineChart>
            </div>
        );
    }
}