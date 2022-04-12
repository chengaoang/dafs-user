import {useState} from "react";

//
export default function ImageCard ({url, data}) {
    let [v,setV] = useState(false);
    let display = v?'block':'none';
    const sV = ()=>setV(!v);
    function Img() {
        // 图片组件，点击图片显示状态
        return <img style={style.imageList} src={url} onClick={()=>sV()} alt=''/>
    }
    return(
        <div>
            {/*图片组件点击改变状态显示详情*/}
            {/*<Img/>*/}
            {/*外部的透明层，点击取消详情显示状态*/}
            <div style={{...style.cardBorder,display: display}} onClick={() => setV(!v)}/>
            {/*详情组件，展示详情信息*/}
                <div
                    style={{
                        ...style.imageCard,
                        display: display,
                        backgroundImage: `url(${url})` // 组件传参传入的url
                    }}>
                <div style={style.CardData}>
                    {/*组件传参传入的，可以传组件*/}
                    {data}
                </div>
            </div>
        </div>
    )
}

// css in js
let style = {
    cardBorder: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
    },
    imageCard: {
        zIndex: 2,
        /* 悬浮居中 */
        position: "fixed",
        top: "5%",
        left: "10%",
        /*~~~~~~~~~~*/
        height: "90%",
        width: "80%",
        backgroundSize: "cover",
        /*background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url("https://picsum.photos/500/500");*/
    },
    CardData: {
        height: "100%",
        margin: "20px 30px",
    },
    /*================================================================*/
    /*https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images*/
    imageList: {
        height: "100vh",
        padding: "20px",
        borderRadius: "10em",
    }
}
