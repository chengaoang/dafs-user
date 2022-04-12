import axios from "axios";

export function post(data){
    return axios({
        method: 'post',
        url: 'http://localhost:8888/users',
        data: data
    }).then(resp=>{return resp.data})
}
