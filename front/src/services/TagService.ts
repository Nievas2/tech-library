import { Tag } from "@/interfaces/Tag"
import axios from "axios"

export function getTags() {
  axios
    .get("http://localhost:8000/api/tag/all")
    .then((response) => {
        console.log(response);
        
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export function postTag(tag: Tag) {
    console.log(tag);
    
  axios
    .post("http://localhost:8000/api/tag/create", {
        "name": tag.name,
        "color" : tag.bgColor
  
    })
    .then((response) => {
        console.log(response);
        
      return response.data
    })
    .catch((error) => {
      console.log(error)
    })
}