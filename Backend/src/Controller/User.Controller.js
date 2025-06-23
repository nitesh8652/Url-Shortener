import { getallurlbyuserDao } from "../Dao/User.Dao.js";
import wrapAsync from "../Utils/TryCatch.js";

export const getallurl = wrapAsync(async (req,res)=>{
    const {_id} = req.user;
    console.log(req.user, "req.user in getallurl");
    const urls = await getallurlbyuserDao(_id);
    res.status(200).json({
        success: true,
        message: "URLs fetched",
        urls
    })


})