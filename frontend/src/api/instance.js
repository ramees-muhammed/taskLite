import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:4010/api/v1"
})


export default instance;