import axios from "axios";
import { useState, useEffect } from "react";

export function GetBrandPaletteData(url){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    useEffect(()=>{
      setLoading(true);
    axios.get(url).then((response)=>{
      setData(response.data)
    })
    .catch((error)=>{
      setError(error)
    })
    .finally(()=>{
      setLoading(false)
    })
    },[url])
  return {data, loading, error};
}