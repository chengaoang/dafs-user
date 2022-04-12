import {useState} from "react";
import {Form, Avatar, Input, Button, Comment as AntComment} from "antd";
import {style} from "./style";
import moment from "moment";
import useGlobalData from "../../util/useGlobalData";
import axios, {Axios} from "axios";
import {serverUrl} from "../../util/config";
import {getToken} from "../../util/auth";

const { TextArea } = Input;

function AddComment({comments,setComments,currentProducts}){
    let globalData = useGlobalData();
    let [submitting,setSubmitting] = useState(false);
    let [value,setValue] = useState('');
    const handleSubmit = () => {
        if (!value) { // 没有value就不需要提交
            return;
        }
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false)
            setValue('')
            let dateTime = moment().format('yyyy-MM-DD HH:mm:ss'); // 四月 8日 2022, 2:49:07 下午
            setComments([
                ...comments,
                {
                    author: `${globalData.userName}`,
                    avatar: 'https://joeschmoe.io/api/v1/random',
                    content: <p>{value}</p>,
                    datetime: dateTime
                }
            ])
            console.log(comments)
            // 调用api，写入数据库
            axios({
                method: 'post',
                url: `${serverUrl}/comments`,
                headers: {'token': getToken()},
                data: {
                    uid: globalData?.id, // 当前用户id
                    pid: currentProducts, // 商品id
                    content: value, // 评论内容，，！！！！！！！！！重要
                    dateTime: dateTime, // 评论时间
                    userName: globalData?.userName, // 冗余数据：author 用户名，avatar头像
                    avatar: globalData?.avatar
                }
            }).then(resp=>{
                console.log(resp.data)
            })
        }, 1000);
    };
    return(
        <addComment style={style.addComment}>
            <AntComment
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo"/>}
                content={
                    <>
                        <Form.Item>
                            <TextArea rows={2} onChange={(e)=>setValue(e.target.value)} value={value} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                提交评论
                            </Button>
                        </Form.Item>
                    </>
                }
            />
        </addComment>
    )
}
export default AddComment;
