import React from "react";
import Layout, {Content} from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import {Button} from "antd";
import {Link} from "react-router-dom";

class My404Component extends React.Component{
    render() {
        return(
            <Layout style={{textAlign: 'center'}}>
                <Content>
                    <Title>Wrong URL! Nothing's here!</Title>
                    <Link to='/'><Button>Back to Main Page</Button></Link>
                </Content>
            </Layout>


        );
    }
}

export default My404Component;