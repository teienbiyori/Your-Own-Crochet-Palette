import axios from "axios";
import { useState, useEffect } from "react";
const authURL = "https://ec2-13-231-143-123.ap-northeast-1.compute.amazonaws.com/cp"

const axiosInstance = axios.create({
  authURL:"https://ec2-13-231-143-123.ap-northeast-1.compute.amazonaws.com/cp",
  });

axiosInstance.interceptors.request.use(
    (config)=>{
      const token = localStorage.getItem("token");
      if(token){
        config.headers["Authorization"] = `Bearer ${token}`
      }
      return config;
    },
    (error)=>{
      console.log(error)
    }
);

//testing
export function RemoveBrandFromMine2(actionID){
  const [delData, setDelData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(actionID.length===0){
      return;
    }
    axiosInstance.delete(`${authURL}/user/brand/${actionID}`)
    .then((response)=>{
      setDelData(response.data);
    })
    .catch((e)=>{
      setError(e);
    })
  },[actionID])
  return {delData, error}
}


//token free /brands
export const GetBrandPaletteData = async() =>{
  try{ 
    const { data } = await axios.get(`${authURL}/brands`);
    const brandsData = [...data];
    return brandsData;
  }catch(error){
    if(error.response){
      console.log("[something's wrong here]:"+ error.response.data)
    }else{
      console.log(error)
    }
  }
}

///user/brands  
export const AddBrandToMine = async(brandID) =>{
  if(brandID.length===0){
    return;
  }
  try{
    const { data } = await axiosInstance.post(`${authURL}/user/brands`,{brandId:brandID})
    const actionId = data._id;
    return actionId;
  }catch(e){
    alert(e.response.data.message);
  }
}
export function RemoveBrandFromMine(actionID){
  const [delData, setDelData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(actionID.length===0){
      return;
    }
    axiosInstance.delete(`${authURL}/user/brand/${actionID}`)
    .then((response)=>{
      setDelData(response.data);
    })
    .catch((e)=>{
      setError(e);
    })
  },[actionID])
  return {delData, error}
}
export const GetMyFavBrands = async() =>{
    try{
      const { data } = await axiosInstance.get(`${authURL}/user/brands`);
      const favBrands = [...data]
      return favBrands;  
    }catch(e){
      console.log(e)
    }
}

///user/palettes
export function useAddColorToMine(hexCode){
  const [hexcodeId, setHexcodeId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(hexCode && hexCode.length>0){
    axiosInstance.post(`${authURL}/user/palettes`, {hexCode:hexCode, paletteName:"myPalette"})
    .then((response)=>{
      setHexcodeId(response.data._id);
    })
    .catch((e)=>{
      setError(e);
    })
    }
  },[hexCode])
  return {hexcodeId, error}
}

export function useRemoveColorFromMine(actionID){
  const [delData, setDelData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(actionID.length===0){
      return;
    }
    axiosInstance.delete(`${authURL}/user/palette/${actionID}`)
    .then((response)=>{
      setDelData(response.data);
    })
    .catch((e)=>{
      setError(e);
    })
  },[actionID])
  return {delData, error}
}

export const GetMyPaletteColor = async() =>{
  try{
    const { data } = await axiosInstance.get(`${authURL}/user/palettes`);
    const favColors = [...data];
    return favColors;
  }catch(e){
    console.log(e)
  } 
}

///user/collections
export const GetMyCollection = async() =>{
  try{
    const { data } = await axiosInstance.get(`${authURL}/user/collections`);
    const collectionsData = [...data];
    return collectionsData;
  }catch(e){
    console.log("[Failed to get myCollections]:" + e)
  }
}

export function RemoveMyCollection(collectionId){
  const [delId, setDelId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(collectionId.length===0){
      return;
    }
    axiosInstance.delete(`${authURL}/user/collection/${collectionId}`)
    .then((response)=>{
      setDelId(response.data);
    })
    .catch((e)=>{
      setError("[Failed getting favColors]:",e.response);
    })
  },[collectionId])
  return {delId, error}
}

export function AddSelectionToMine(colorArray){
  const [collectionId, setCollectionId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(colorArray?.length>0){
    axiosInstance.post(`${authURL}/user/collections`, {colorSchema:colorArray})
    .then((response)=>{
      setCollectionId(response.data);
    })
    .catch((e)=>{
      setError(e.response);
    })
    }
  },[colorArray])
  return {collectionId, error}
}