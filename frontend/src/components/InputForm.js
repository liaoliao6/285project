import React from 'react';
import {Button, Form, InputNumber} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import { Typography } from 'antd';
import { suggest } from "../api/api";
import AllocationTable from "./AllocationTable";
import StockPieChart from "./StockPieChart";

class InputForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            amount: 5000,
            strategies: [],
            loading: false,
            showGraph: false,
            allocation: [],
            pie_chart_data: [],
            weekly_trend: [],
            weekly_trend_by_stock: []
        };

    }

    setAmount = e => {
        this.setState({amount: e});
    };


    setStrategies  = strategy => event => {
        if(event.target.checked) {
            this.setState({strategies: this.state.strategies.concat(strategy)});
        } else {
            this.setState({strategies: this.state.strategies.filter( s => s !== strategy)});
        }
    };

    isDisabled = id => {
        return (
            this.state.strategies.length > 1 && this.state.strategies.indexOf(id) === -1
        );
    };

    refreshPage() {
        window.location.reload(false);
    }

    handleSubmit = async () => {
        await this.setState({loading: true})
        await suggest(this.state).then((response) => {
            this.setState({
                allocation: response.allocation,
                pie_chart_data: response.pie_chart_data,
                weekly_trend: response.weekly_trend,
                weekly_trend_by_stock: response.weekly_trend_by_stock,
                showGraph: true
            })
        });
    };

    render() {
        const names = [
            "Ethical Investing",
            "Growth Investing",
            "Index Investing",
            "Quality Investing",
            "Value Investing"
        ];
        const { Title, Paragraph} = Typography;
        return (
            <div className='input-form'>
                <Typography className='Typography'>
                    <Title level={3} className='title'>Welcome to Stock Advisor</Title>
                    <Paragraph className='subtitle'>
                        Please Enter your investment amount and chose your strategies
                    </Paragraph>
                    <Form
                        name="stockInput"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                        className='stockInputForm'
                    >

                        <Form.Item
                            className='InputAmount'
                            label="Money"
                            name="money"
                            rules={[{required:true, message:'Please enter a number'}]}
                        >
                            <InputNumber style={{width:'50%'}}
                                         defaultValue={this.state.amount}
                                         onChange={this.setAmount}
                            />
                        </Form.Item>
                        <Form.Item className='InputCheckbox'>
                            <Paragraph>Choose one or two investment Strategies</Paragraph>
                            {names.map(name =>(
                                <Checkbox.Group >
                                    <Checkbox value={name}
                                              onChange={this.setStrategies(name)}
                                              disabled={this.isDisabled(name)}
                                              label={name}
                                              checked={this.state.strategies.indexOf(name) > -1}>
                                        {name}
                                    </Checkbox>
                                </Checkbox.Group>
                                )
                            )}

                        </Form.Item>
                        <Button disabled={this.state.strategies.length < 1 || this.state.strategies.length > 2
                        || this.state.loading || this.state.amount<5000}
                                color="primary"
                                className='submit-button'
                                onClick={this.handleSubmit}>
                            Submit
                        </Button>

                    </Form>
                </Typography>
                {this.state.showGraph &&
                    <div>
                        <strong>Investment Allocation Table</strong>
                        <AllocationTable allocations={this.state.allocation} />
                        <hr/>
                        <strong>Investment Advice Pie Chart</strong>
                        <StockPieChart piechartData={this.state.pie_chart_data} />
                        <Button onClick={this.refreshPage}>Reset</Button>
                    </div>
                }
            </div>

        )

    }
}

export default InputForm;