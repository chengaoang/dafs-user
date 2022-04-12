import {Form, Input, Button, Checkbox, message} from 'antd';
import {post} from "../../services/user";
import axios from "axios";

function Reg({style}) {
    const onFinish = (values) => {
        axios({
            method: 'post',
            url: 'http://localhost:8888/users',
            data: values
        }).then(resp=>{
            if (resp.data.code===200){
                message.success(resp.data.msg);
            }else {
                message.error(resp.data.msg);
            }
        })

        // console.log(resp)
        // console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            style={{width: 800, marginTop: '20%', marginLeft: '20%'}}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="用户名"
                name="userName"
                rules={[{ required: true, message: '请输入你的用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: false, message: '请输入你的邮箱!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入你的密码!' }]}
            >
                <Input.Password />
            </Form.Item>

            {/*<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>*/}
            {/*    <Checkbox>Remember me</Checkbox>*/}
            {/*</Form.Item>*/}

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    );
}
export default Reg;
