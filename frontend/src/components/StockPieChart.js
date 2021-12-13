import React from "react";
import {PieChart, Pie,Tooltip, Cell} from 'recharts';

class StockPieChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: props}
    }
    render() {
        const {data} = this.state
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#21618C', '#F4D03F'];
        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {data.piechartData[index].name + ":"}
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };
        return (
            <div>
                <PieChart width={400} height={400}>
                    <Pie
                        data={data.piechartData}
                        cx={180}
                        cy={200}
                        labelLine={false}
                        outerRadius={150}
                        label={renderCustomizedLabel}
                        fill="#8884d8"
                        dataKey="value">
                        {
                            data.piechartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </div>

        )

    }
}

export default StockPieChart;
