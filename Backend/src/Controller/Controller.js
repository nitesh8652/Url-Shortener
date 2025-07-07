import { get } from "mongoose";
import { getshortUrlByCode } from "../Dao/Short_Url.js";
import { CreateShortUrlWithoutUser } from "../Services/Services.js";
import wrapAsync from "../Utils/TryCatch.js";
import { CreateShortUrlWithUser } from "../Services/Services.js";
import shortUrl from "../Model/Model.js";

export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body
    console.log(data)
    let shortUrlCode;
    console.log(req.user, "req.user in createShortUrl");
    if (req.user) {
        shortUrlCode = await CreateShortUrlWithUser(data.url, req.user._id, data.Slug)
    } else {
        shortUrlCode = await CreateShortUrlWithoutUser(data.url);

    }
    console.log(data)

const host = req.get('host');            // e.g. "url-shortener-z9f3.onrender.com"
  const protocol = req.secure ? 'https' : 'http';
  const base = `${protocol}://${host}`;     // "https://url-shortener-z9f3.onrender.com"

  const fullShortUrl = `${base}/${shortUrlCode}`;  
  console.log("Returning short URL:", fullShortUrl);

  res.status(200).json({ shortUrl: fullShortUrl });

    // res.status(200).json({ shortUrl: process.env.APP_URL + shortUrlCode })
});



export const redirectfromshorturl = wrapAsync(async (req, res) => {
    const { id } = req.params
    const url = await getshortUrlByCode(id);
    if (url && url.full_url) {
        res.redirect(url.full_url)
    } else {
        res.status(404).send("URL not found");
    }

})

export const createCustomShortUrlService = wrapAsync(async (req, res) => {
    const { url, Slug } = req.body
    let shortUrlCode;
    if (req.user) {
        shortUrlCode = await CreateShortUrlWithUser(url, req.user._id, Slug)
    } else {
        shortUrlCode = await CreateShortUrlWithoutUser(url);
    }
    res.status(200).json({
        shortUrl: process.env.APP_URL + shortUrlCode
    })
})