import './App.css';
import {selectAll} from "./services/category";
import CContext from "./components/Content/CContext";
import {PieChartTwoTone} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PhotoFLow from "./components/PhotoFlow/PhotoFlow";
import Frame from "./frame/Frame";
import PageNotFound from "./frame/PageNotFound";
import GaspAnimation from "./components/GaspAnimation/GaspAnimation";
import {GlobalDataConfig} from "./util/useGlobalData";
import {isLogined} from "./util/auth";
import axios from "axios";
import {serverUrl} from "./util/config";
import {getToken} from "./util/auth";
import Setting from "./components/Setting/Setting";


function App() {
    const [router,setRouter] = useState([]);
    const [globalData,setGlobalData] = useState()
    useEffect(()=>{
        let routers = [];
        selectAll().then(resp=>{
            resp.data.map(category=>{
                routers.push({
                        id: category.id,
                        name: category.name,
                        path: category.path,
                        status: category.status,
                        desc: category.desc,
                        element: <CContext category={category.id}/>,
                        title: category.name,
                        isShow: category.status == 0,
                        icon: <PieChartTwoTone />,
                    }
                )
            })
            setRouter(routers);
        })

        isLogined() && axios({
            method: 'get',
            url: `${serverUrl}/users/whoami`,
            headers: {'token': getToken()}
        }).then(resp=>{
            setGlobalData(resp.data.data)
        })
    },[]);
    return (
        <GlobalDataConfig value={globalData}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Frame/>}>
                      {/*<Route path={'/'+encodeURI("我的收藏")} element={<CContext collection={true}/>} key={'collection'}/>*/}
                      <Route path={'/'+encodeURI("设置")} element={<Setting/>} key={'setting'}/>
                      {router.map(r=>{
                          // 混入CContext 栏目的id
                          return <Route path={encodeURI(r.path)} element={<CContext categoryId={r.id}/>} key={r.name}/>
                      })}
                      <Route path="/" element={<CContext categoryId={router[0]?.id}/>} key={router[0]?.name}/>
                  </Route>
                  <Route path="/photoFlow" element={<PhotoFLow/>}/>
                  <Route path="/dafs" element={<GaspAnimation/>}/>
                  <Route path='*' element={<PageNotFound/>}/>
              </Routes>
          </BrowserRouter>
        </GlobalDataConfig>
    );
}

export default App;
