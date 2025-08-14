import ShortUrl from '../Model/shortUrlSchema.js';
import { nanoid } from 'nanoid';
import { ConflictError } from '../Utils/errorHandler.js';

export const saveShortUrl = async (longUrl, userId, customUrl = null) => {
    try {
        const shortUrl = customUrl || nanoid(6);
        let originalUrl = longUrl;

        // This is a regEx expression which Ensure it starts with http:// or https://
        if (!/^https?:\/\//i.test(originalUrl)) {
            originalUrl = 'https://' + originalUrl;
        }


        const newUrl = new ShortUrl({
            originalUrl: originalUrl,
            shortUrl: shortUrl
        })
        if (userId) {
            newUrl.userId = userId;
        }
        await newUrl.save();
        return shortUrl
    } catch (err) {
        if (err.code == 11000) throw new ConflictError(err);
        throw new Error(err);
    }
}