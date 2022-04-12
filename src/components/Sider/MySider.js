import { Avatar, Space } from 'antd';
import {Html5Outlined, PieChartTwoTone} from '@ant-design/icons';
import MyButton from "../Button/MyButton";
import SFooter from "./SFooter";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import {selectAll} from "../../services/category";
import EdgeButton from "../Button/EdgeButton";


// css in js
let style = {
    sider: {
        marginTop: "30%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "30px",
    }
}

function MySider () {
    // 存放所有以MyButton组件存储的路由，
    let [category,setCategory] = useState([]);
    //
    useEffect(()=>{
        let category = [];
        selectAll().then(resp=>{
            resp.data.map(c=>{
                category.push({
                    to: c.path,
                    title: c.name
                })
            })
            setCategory(category);
        })
            // .finally(err=>{console.log(err)});
    },[]);

    //
    let categoryResult = []
    for (let e of category) {
        let re = <MyButton to={e.to} key={e.title}>{e.title}</MyButton>;
        categoryResult.push(re);
    }

    // 显示登录和音乐
    

    //
    return (
        <div style={style.sider}>
            <Link to={'/dafs'}>
                <div>
                    <Avatar
                        shape={"square"} size={{xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100,}}
                        icon={<Html5Outlined/>}
                    />
                </div>
            </Link>
            <br/>
            <Space direction={"vertical"}>
                {/*把所有路由导入进来*/}
                {categoryResult}
            </Space>
            <br/>
            {/*<EdgeButton/>*/}
            {/*<SFooter>*/}
            {/*</SFooter>*/}
        </div>
    )
}
export default MySider;
