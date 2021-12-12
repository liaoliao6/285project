import React from 'react';
import {Row, Col, Layout} from "antd";
import InputForm from "./InputForm";
import MarketTrend from "./MarketTrend";

class HomePage extends React.Component{

    render() {
        return (
            <Layout>
                <Row>
                    <Col span={8} padding={10}><InputForm /></Col>
                    <Col span={12} padding={10}><MarketTrend /></Col>
                </Row>

            </Layout>

        )

    }
}

export default HomePage;