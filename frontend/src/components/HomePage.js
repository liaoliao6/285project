import React from 'react';
import {Row, Col, Layout} from "antd";
import InputForm from "./InputForm";
import StockWidget from "./StockWidget";

class HomePage extends React.Component{

    render() {
        return (
            <Layout>
                <Row>
                    <Col span={8} padding={10}><InputForm /></Col>
                    <Col span={12} padding={10}><div><StockWidget /></div></Col>
                </Row>

            </Layout>

        )

    }
}

export default HomePage;