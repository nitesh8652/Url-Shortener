import shortUrl from '../models/Model.js';
import { ConflictError } from '../Utils/ErrorHandling.js';
import { generateNanoid } from '../Utils/helper.js';

export const saveShortUrl = async (shortUrlCode, longUrl, userId) => {
    console.log(userId, "userId in saveShortUrl");
    try {
        const newUrl = new shortUrl({
            full_url: longUrl,
            short_url: shortUrlCode,
            // user: req.user._id
             user: userId
 
        }); 
        if (userId) {
            newUrl.user = userId;
        }
        await newUrl.save();
        console.log("Saving short URL with:", shortUrlCode, longUrl,
            "user:",userId
        );
    } catch (error) {
        if (error.code === 11000) {
            console.error("Mongo Save Error:", error);
            const newCode = generateNanoid(7);
            return await saveShortUrl(newCode, longUrl, userId);
        }
        throw error;
    }
};

export const getshortUrlByCode = async (shortUrlCode) => {
    return await shortUrl.findOneAndUpdate(
        { short_url: shortUrlCode },
        { $inc: { clicks: 1 } }
    );
};

export const getCustomShortUrl = async (Slug) => { 
    // const exist = await shortUrl.findOne({ short_url: Slug });
    return await shortUrl.findOne({ short_url: Slug });
};