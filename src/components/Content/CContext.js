import './Content.css';
import {Button, Card, Checkbox, Form, Input, message} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import React, {useEffect, useRef, useState} from "react";
import {collectionListApi, listApi} from "../../services/product";
import MyButton from "../Button/MyButton";
import {loginApi} from "../../services/auth";
import {getToken, setToken} from "../../util/auth";
import Reg from "../Reg/Reg";
import Talk from "../Talk/Talk";


// 登录api
const Test = () => {
    const [logOrReg, setLogOrReg] = useState(true);
    const onFinish = (values) => {
        console.log(values)
        /**
         * 登录api
         */
        loginApi({
            userName: values.username,
            password: values.password,
        }).then(res=>{
            if (res.code==200){
                message.success('登录成功！');
                setToken(res.data.token)
                setTimeout(()=>document.location.href='/',1000);
                console.log('Received values of form: ', values);
            }else {
                message.info(res.msg);
            }
        }).catch(err=>{
            message.error('用户不存在！')
        })

    };
    let style = {
        card: {
            width:"50%",
            height:"100%",
            marginTop: "10%",
            marginLeft: "30%"
        }
    }
  //  这里写登录组件
  return(logOrReg?
      <div>
          <Card title='Login' style={style.card}>
              <Form
                  name="normal_login"
                  initialValues={{
                      remember: true,
                  }}
                  onFinish={onFinish}
              >
                  <Form.Item
                      name="username"
                      rules={[
                          {
                              required: true,
                              message: '输入用户名！',
                          },
                      ]}
                  >
                      <Input
                          prefix={<UserOutlined className="site-form-item-icon"/>}
                          placeholder="用户名"
                      />
                  </Form.Item>
                  <Form.Item
                      name="password"
                      rules={[
                          {
                              required: true,
                              message: '输入密码！',
                          },
                      ]}
                  >
                      <Input
                          prefix={<LockOutlined className="site-form-item-icon"/>}
                          type="password"
                          placeholder="密码"
                      />
                  </Form.Item>
                  <Form.Item>
                      <Form.Item name="remember" valuePropName="checked" noStyle>
                          <Checkbox>记住账号密码</Checkbox>
                      </Form.Item>
                      {/*<a className="login-form-forgot" href="">*/}
                      {/*    Forgot password*/}
                      {/*</a>*/}
                  </Form.Item>

                  <Form.Item style={{float: "right"}}>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                          Log in
                      </Button>
                      <a onClick={()=>{setLogOrReg(!logOrReg)}}> 注册</a>
                  </Form.Item>
              </Form>
          </Card>
      </div>:<Reg style={style.card}/>
  )
}

const CContext = (props) => {
    // alert(props.categoryId)
    const imgServer = "http://localhost:8888";
    const [img,setImg] = useState(''); // 图片链接改变重新渲染图片
    const [productData,setProductData] = useState([]); // 存储产品信息
    const [current,setCurrent] = useState(0); // 当前图片下标
    const [desc, setDesc] = useState(''); // 存储描述信息
    const [showLike, setShowLike] = useState(false); // 收藏图标，进入图片才显示
    const [showLogin,setShowLogin] = useState(false);
    let display = showLike?'block':'none';

    // 根据传进来的cid动态获取产品信息
    useEffect(()=>{
        if (props.collection){ // 显示收藏
            collectionListApi().then(resp=>{
                setProductData(resp.data);
                console.log("收藏")
                console.log(resp)
                setImg(resp.data[0])
            })
        }else {
            listApi(props.categoryId).then(resp=>{
                setProductData(resp.data);
                setImg(resp.data[0])
            })
        }
    },[props.categoryId]);

    //
    const handleClick = _=>{
        setShowLogin(!showLogin);
    }
    const handleMouseOver = _=>{ // 移入的时候
        setDesc(productData[current]?.desc);
        setShowLike(true);
    }
    const handleMouseOut = _=>{ // 移出的时候
        setDesc('');
        setShowLike(false);
    }


    let popComp = showLogin?'block':'none';
    const PopComp = ({url,data})=>{
        return(
            <>
                {/*外部的透明层，点击取消详情显示状态*/}
                <div style={{...style.cardBorder,display: popComp}} onClick={handleClick}/>
                {/*详情组件，展示详情信息*/}
                <div
                    style={{
                        ...style.imageCard,
                        display: popComp,
                        backgroundImage: `linear-gradient(to right,#747474, transparent),
                                          url(${url})` // 组件传参传入的url
                    }}>
                    <div style={style.CardData}>
                        {/*组件传参传入的，可以传组件*/}
                        {data}
                    </div>
                </div>
            </>
        )
    }


    // getToken()?true:false; === !!getToken();
    let displayPopComp = !!getToken(); // 如果token存在则显示聊天页面
    return(
      <div className={"CContext"}>
          {/*登录了则显示聊天，否则显示登录！*/}
          {showLogin ?
              <PopComp
                  url={imgServer+img?.images}
                  data={
                    displayPopComp ?
                        <Talk desc={productData[current]?.desc} currentProducts={productData[current]?.pid}/> :
                        <Test/>
                  } key={img?.pid}/> : ""
          }
          {/*渲染产品信息图片*/}
          <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
              {/*产品图片展示*/}
              <img style={style.image} onClick={handleClick} src={imgServer+img?.images} alt=""/>
              {/*<div style={style.desc}>*/}
              {/*    <div dangerouslySetInnerHTML={{__html: desc}}/>*/}
              {/*</div>*/}
          </div>
          {/* 2：prev按钮*/}
          <div style={{position:"absolute",top:"40%",right:9,transform:"rotate(90deg)"}}>
              <MyButton to={'#'} onClick={()=> {
                  setImg(productData[(current - 1 + productData.length) % productData.length]);
                  setCurrent((current - 1 + productData.length) % productData.length);
              }} >prev</MyButton>
          </div>
          {/* 3：当前页/总页数*/}
          <div style={{position:"absolute",top:"46%",right:12,transform:"rotate(50deg)",fontSize:20}}>
              {`${current+1}/${productData?.length}`}
          </div>
          {/* 4：next 按钮*/}
          <div style={{position:"absolute",top:"52%",right:9,transform:"rotate(90deg)"}}>
              <MyButton to={"#"} onClick={()=> {
                  setImg(productData[(current + 1) % productData.length]);
                  setCurrent((current + 1) % productData.length);
              }} >next</MyButton>
          </div>
      </div>
    )
}
export default CContext;


// ======================================================================= css =======================================================================

let style = {
    image: {
        height: "100vh", // 100%屏幕高度
        padding: "20px", // 内边距
        borderRadius: "10em", // 圆角
    },
    desc: {
        pointerEvents: "none", // 666
        position: "relative",
        bottom: "60%",
        width: "100%",
        left: "10%",
    },
    like: {
        position: "relative",
        height: "50px",
        width: "50px",
    },
    cardBorder: {
        zIndex: 1,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#c3c3c3",
        opacity: 0.9,
    },
    imageCard: {
        background: "no-repeat -390px 0",
        zIndex: 2,
        /* 悬浮居中 */
        position: "fixed",
        top: "5%",
        left: "10%",
        /*~~~~~~~~~~*/
        height: "90%",
        width: "80%",
        backgroundSize: "cover",
        borderRadius: "10em",
        opacity: 1,
        /*background-image: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)), url("https://picsum.photos/500/500");*/
    },
    CardData: {
        height: "100%",
        margin: "20px 30px",
    },
}
