"use server";
import urlMetadata from "url-metadata";

async function getUrlMetadata(url: string){
    try {
        if (!url) return null;
        return urlMetadata(url);
    } catch (error) {
        return null;
    }

}

export {getUrlMetadata};