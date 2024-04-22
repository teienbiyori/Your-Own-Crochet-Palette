import axios from "axios";

const authURL = "http://54.250.240.16:8080"

export const register = async({name, email, password, checkpassword}) => {
  try { 
    const { data } = await axios.post(`${authURL}/signup`, {name, email, password, checkpassword});
    const { createAt } = data;
    if(createAt){
      return {success:true, ...data};
    }
    return data;
  }catch(error) {
    console.log(`[Register Failed]:${error}`)
    return {success:false};
  }
}

export const login = async({email, password}) => {
  try { 
    const { data } = await axios.post(`${authURL}/signin`, {email, password});
    const { token } = data;
    if(token){
      return {success:true, ...data};
    }
    return data;
  }catch(error) {
    console.log(`[Login Failed]:${error}`)
    return {success:false};
  }
}