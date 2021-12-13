import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

export default class ChosenWeeklyTrend extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
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
        console.log(zipped)
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