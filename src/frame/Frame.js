import {Outlet} from "react-router";
import MySider from "../components/Sider/MySider";
import React from "react";
import {clearToken, getToken} from "../util/auth";
import useGlobalData from "../util/useGlobalData";
import CContext from "../components/Content/CContext";
import {NavLink} from "react-router-dom";

let style = {
    afterLogin: {
        position: 'absolute',
        bottom: '10px',
        left: '20px',
    }
}
function Frame() {
    let globalData = useGlobalData();
    let display = getToken()?"block":"none";
    return(
        <div className={'container'}>
            <div className="side">
                <MySider/>
            </div>
            <div style={{...style.afterLogin,display: display}}>
                {/*<NavLink to="/我的收藏">我的收藏</NavLink>*/}
                <h2 onClick={()=>{clearToken();document.location.href="/"}}>退出({globalData?.userName})</h2>
                <NavLink to="/设置">设置</NavLink>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )

}

export default Frame;


