import {get,post,put,del} from "../util/request";
import {getToken} from "../util/auth";
import axios from "axios";

// 默认查cid=2的
export function listApi(categoryId=2){
    return get(`/public/products/${categoryId}`,{});
}
// 根据uid查询收藏
export function collectionListApi(){
    return axios({
        method: 'get',
        url: `http://localhost:8888/products/collection`,
        headers:{'token': getToken()}
    }).then(resp=>{return resp.data});
}

/**
 * 根据id获取一条数据
 * @param id
 * @returns {Promise<AxiosResponse<*>>}
 */
export function getOneByID(productId){
    return get(`/products/select/${productId}`,{})
}
