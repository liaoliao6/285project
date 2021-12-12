import React from "react";
import {Layout, Table} from "antd";

class AllocationTable extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: props}
    }
    render() {
        const {data} = this.state
        const column = [
            {
                title:'Name',
                dataIndex: 'name',
                key: 'name',

            },
            {
                title:'Stock',
                dataIndex:'stocks',
                key:'stocks',
            },
            {
                title:'Price',
                dataIndex:'price',
                key:'price',
            },
            {
                title:'Strategy',
                dataIndex:'strategy',
                key:'strategy',
            },
        ]
        return (
            <Layout>
                <Table columns={column} dataSource={data.allocations} pagination={false} />
            </Layout>

        )

    }
}

export default AllocationTable;