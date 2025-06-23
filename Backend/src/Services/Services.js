import { saveShortUrl } from "../Dao/Short_Url.js";
import { generateNanoid } from "../Utils/helper.js";
import { getCustomShortUrl } from "../Dao/Short_Url.js";


 function isValidUrl(url){
        try{
            new URL(url)
            return true;
        }catch(_){
            return false;
        }
    }

export const CreateShortUrlWithoutUser = async (url) => {
    
    if(!isValidUrl(url)){
        throw new Error("Invalid URL Formate");
    }

        const shortUrlCode = await generateNanoid(7);
        if(!(shortUrlCode)) throw new Error ("error creating short url code without useer");
        await saveShortUrl(shortUrlCode, url);
        return shortUrlCode;   

    }

export const CreateShortUrlWithUser = async (url, userId, Slug=null) => {

    if(!isValidUrl(url)){
        throw new Error("Invalid URL Formate");
    }

    const shortUrlCode = Slug || generateNanoid(7);

    if(Slug){
        const exist = await getCustomShortUrl(Slug);
        if (exist) throw new Error("Custom short URL already exists");
    }

    // const exists = await getCustomShortUrl(Slug);
    // if(exists) throw new Error("Custom short URL already exists"); 

   

    
    await saveShortUrl(shortUrlCode, url, userId);
    

    return shortUrlCode;

}


