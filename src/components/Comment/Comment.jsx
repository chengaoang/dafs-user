import AddComment from "./AddComment";
import {useEffect, useState} from "react";
import {List, Comment as AntComment} from "antd";
import axios from "axios";
import {serverUrl} from "../../util/config";
import {getToken} from "../../util/auth";

// =======================================================================
function Comment({style, currentProducts}) {
    let [comments,setComments] = useState([]);
    useEffect(()=>{
        axios({
            method: 'get',
            url: `${serverUrl}/comments/${currentProducts}`,
            headers: {'token': getToken()},
        }).then(resp=>{
            console.log(resp.data.data)
            setComments(resp.data.data.map(e=>{
                return{
                    author: e.userName,
                    avatar: "https://joeschmoe.io/api/v1/random",
                    content: <p> {e.content} </p>,
                    datetime: e.dateTime
                }
            }))
        })
    },[])
    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} 条评论`}
            itemLayout="horizontal"
            renderItem={comments => <AntComment {...comments} />}
        />
    );
    return(
        <comment style={style}>
            {comments.length > 0 ? <CommentList comments={comments}/> : <p>欢迎评论！</p>}
            <AddComment comments={comments} setComments={setComments} currentProducts={currentProducts}/>
        </comment>
    )
}
export default Comment;
