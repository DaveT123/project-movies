import axios from "axios";

export default axios.create({
// when running locally
//    baseURL: "http://localhost:5000/",
// when deploying to AWS
    baseURL: "http://projectmovie-env.eba-ht7pguhu.ap-southeast-1.elasticbeanstalk.com/",
});
