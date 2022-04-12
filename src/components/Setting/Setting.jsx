import useGlobalData from "../../util/useGlobalData";
import {Button, Form, Input, message} from "antd";
import axios from "axios";
import {getToken} from "../../util/auth";
import {serverUrl} from "../../util/config";
import {useState} from "react";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const validateMessages = {
    required: '${label} 是必须的!',
    types: {
        email: '${label} 不是一个有效的邮箱!',
    }
};
function Setting() {
    let globalData = useGlobalData();
    const onFinish = ({user}) => {
        // 处理提交信息
        axios({
            method: 'put',
            url: `${serverUrl}/users`,
            headers: {'token': getToken()},
            data: {
                ...globalData,
                userName: user.userName,
                email: user.email,
                password: user.password
            }
        }).then(resp=>{
            if (resp.data.code===200){
                localStorage.clear();
                document.location.href="/";
            }else {
                message.error("修改失败！");
            }
        })
        // 响应200则跳转登录，否则报错
    };
    return (
        // 不能浏览器直接进设置页面，因为useContext还没有初始化
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} style={{
            marginTop:"10%",marginRight:"20%"
        }}>
            <Form.Item
                initialValue={globalData.userName}
                name={['user', 'userName']}
                label="用户名"
                rules={[{required: true,},]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                initialValue={globalData.email}
                name={['user', 'email']}
                label="邮箱"
                rules={[{type: 'email',},]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name={['user', 'password']}
                label="修改密码"
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Setting;
