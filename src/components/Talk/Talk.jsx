import "../DragCard/DragCard"
import TalkSimple from "./TalkSimple";
import {style} from "./style";
import MyButton from "../Button/MyButton";
import {useState} from "react";
import Comment from "../Comment/Comment";
import Desc from "../Desc/Desc";


const ChangeCommentTalkPage = ({style, onClick}) => {
    return(
        <changeCommentTalkPage style={style}>
            <MyButton to={"#"} onClick={()=>onClick('talk')}>评论</MyButton>
            <br/>
            <MyButton to={"#"} onClick={()=>onClick('comment')}>客服</MyButton>
        </changeCommentTalkPage>
    )
}

function Talk({desc,currentProducts}) {
    let [show,setShow] = useState('comment');
    const setShowFunc = (me) => {
        if (me==='comment') setShow('talk')
        else setShow('comment')
    }
    return(
        <container style={style.container}>
            {/*最左边的两个按钮，评论和客服*/}
            <ChangeCommentTalkPage style={style.button} onClick={(me)=>setShowFunc(me)}/>
            {/*显示实时聊天和留言评论*/}
            <comment_talk style={style.comment_talk}>
                {show==='comment'?<Comment currentProducts={currentProducts}/>:<TalkSimple/>}
            </comment_talk>
            {/*展示商品的描述信息*/}
            <div style={{
                marginTop: "-20px",
                marginBottom: "-27px",
                fontFamily: "serif",
                width: "50%", backgroundColor:"rgba(221,221,221,1)",borderRadius:"0px 102px 75px 0px", paddingLeft: "20px",boxShadow: "10px 5px 5px #726b6b"}}>
                <Desc style={style.desc} data={desc}/>
            </div>
        </container>
    )
}
export default Talk;
