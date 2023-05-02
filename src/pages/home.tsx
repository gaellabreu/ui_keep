import { Button, Input } from "antd";
import React from "react";

const home = () => {

    return <Input.Group compact>
        <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
        <Button type="primary">Submit</Button>
    </Input.Group>
}

export default home;