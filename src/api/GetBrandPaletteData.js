import axios from "axios";
import { useState, useEffect } from "react";
const authURL = "http://34.125.232.84:8080"

//token free /brands
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

///user/brands
export function AddBrandToMine(myToken, brandID){
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(brandID.length===0){
      return;
    }
    axios.post(`${authURL}/user/brands`, {brandId:brandID}, {headers:{Authorization:"Bearer "+myToken}})
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
    axios.delete(`${authURL}/user/brand/${actionID}`, {headers:{Authorization:"Bearer "+myToken}})
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
    axios.get(`${authURL}/user/brands`, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setFavBrands(response.data);
    })
    .catch((e)=>{
      setError("[Failed getting favBrands]:",e);
    })
  },[myToken])
  return {favBrands, error}
}

///user/palettes
export function useAddColorToMine(myToken, hexCode){
  const [hexcodeId, setHexcodeId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(hexCode && hexCode.length>0){
    axios.post(`${authURL}/user/palettes`, {hexCode:hexCode, paletteName:"myPalette"}, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setHexcodeId(response.data._id);
    })
    .catch((e)=>{
      setError(e);
    })
    }
  },[myToken,hexCode])
  return {hexcodeId, error}
}

export function useRemoveColorFromMine(myToken, actionID){
  const [delData, setDelData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(actionID.length===0){
      return;
    }
    axios.delete(`${authURL}/user/palette/${actionID}`, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setDelData(response.data);
    })
    .catch((e)=>{
      setError(e);
    })
  },[myToken,actionID])
  return {delData, error}
}

export function GetMyPaletteColor(myToken){
  const [favColors, setFavColors] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    axios.get(`${authURL}/user/palettes`, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setFavColors(response.data);
    })
    .catch((e)=>{
      setError("[Failed getting favColors]:",e);
    })
  },[myToken])
  return {favColors, error}
}


export function GetMyCollection(myToken){
  const [collections, setCollections] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    axios.get(`${authURL}/user/collections`, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setCollections(response.data);
    })
    .catch((e)=>{
      setError("[Failed getting favColors]:",e);
    })
  },[myToken])
  return {collections, error}
}

export function RemoveMyCollection(myToken, collectionId){
  const [delId, setDelId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(collectionId.length===0){
      return;
    }
    axios.delete(`${authURL}/user/collection/${collectionId}`, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setDelId(response.data);
    })
    .catch((e)=>{
      setError("[Failed getting favColors]:",e.response);
    })
  },[myToken, collectionId])
  return {delId, error}
}

export function AddSelectionToMine(myToken, colorArray){
  const [collectionId, setCollectionId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(()=>{
    if(colorArray?.length>0){
    axios.post(`${authURL}/user/collections`, {colorSchema:colorArray}, {headers:{Authorization:"Bearer "+myToken}})
    .then((response)=>{
      setCollectionId(response.data);
    })
    .catch((e)=>{
      setError(e.response);
    })
    }
  },[myToken,colorArray])
  return {collectionId, error}
}