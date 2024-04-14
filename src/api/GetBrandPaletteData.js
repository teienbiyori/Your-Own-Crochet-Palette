import axios from "axios";
import { useState, useEffect } from "react";
const authURL = "http://34.125.232.84:8080"

export function GetBrandPaletteData(url){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
    useEffect(()=>{
    axios.get(url).then((response)=>{
      setData(response.data)
    })
    .catch((error)=>{
      setError(error)
    })
    },[url])
  return {data, error};
}


export function AddBrandToMine(myToken, brandID){
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(brandID.length===0){
      return;
    }
    axios.post(`${authURL}/mypalettes`, {brandId:brandID}, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setActionId(response.data._id);
    })
    .catch((e)=>{
      setError(e);
    })
  },[myToken,brandID])
  return {actionId, error}
}

export function RemoveBrandFromMine(myToken, actionID){
  const [delData, setDelData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(actionID.length===0){
      return;
    }
    axios.delete(`${authURL}/mypalette/:id`, {params:{id:actionID}}, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setDelData(response.data);
    })
    .catch((e)=>{
      setError(e);
    })
  },[myToken,actionID])
  return {delData, error}
}

export function GetMyFavBrands(myToken){
  const [favBrands, setFavBrands] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    axios.get(`${authURL}/mypalettes`, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setFavBrands(response.data);
    })
    .catch((e)=>{
      setError("[Failed getting favBrands]:",e);
    })
  },[myToken])
  return {favBrands, error}
}