"use server";
import urlMetadata from "url-metadata";

function getUrlMetadata(url: string){
    try {
        if (!url) return null;
        return urlMetadata(url);
    } catch (error) {
        return null;
    }

}

export {getUrlMetadata};