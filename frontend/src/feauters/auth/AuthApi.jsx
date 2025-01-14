import {axiosInstance} from '../../api/axiosInstance';

export const signup = async(cred)=>{
    try{
        const response = await axiosInstance.post('/auth/signup',cred);
        return response.data;
    }catch(err){
        throw err.response.data;
    }
}

export const login = async(cred)=>{
    try{
        const response = await axiosInstance.post('/auth/login',cred);
        return response.data;
    }catch(err){
        throw err.response.data;
    }
}