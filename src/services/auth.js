import {post} from "../util/request";

/**
 * 用户登录api
 * @param user
 * @returns {Promise<AxiosResponse<*>>}
 * usrename
 * password
 */
export function loginApi(user){
    return post("/user/login", user);
}

// /public/user/reg

export function reg(user){
    return post("/public/user/reg",user)
}
