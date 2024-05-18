import React, {useEffect} from 'react';
import {getUrlMetadata} from "@/app/actions/getUrlMetadata.ts";
import {embed} from "@/types";

const Embed = React.memo(({ url } : {url: string}) => {
    const [embed, setEmbed] = React.useState<embed | null>(null);
    const [unsuccesful, setUnsuccesful] = React.useState<boolean>(false);

    useEffect(() => {
        if (!embed && url && !unsuccesful) {
            getUrlMetadata(url).then((data) => {
                if (!data) {
                    setUnsuccesful(true)
                    return;
                }
                const embed = {
                    url: url,
                    title: data?.title as string,
                    description: data ? (data?.description ? data.description : data['Description'] as string) : "",
                    color: data ? data["theme-color"] as string : "#FFFFF",
                    image: data ? data["og:image"] as string : "",
                } as embed;
                // Set the state with the new embeds

                setEmbed(embed);
            });
        }
    }, [embed, unsuccesful, url]);

    // Logic to generate embed from URL
    if (!embed) {
        return null;
    }
    return (
        <div style={{borderColor:  embed.color}} className="flex flex-row w-full dark:bg-neutral-900 hover:bg-neutral-800 rounded-sm my-2 border-l-4 p-4 h-auto">
            <div className="nowrap flex-flex-col w-auto mr-4">
                <a href={embed.url} className="text-lg font-bold flex-nowrap">{embed.title}</a>
                <h2 className="flex-nowrap text-base text-neutral-400">{embed.description}</h2>
            </div>

            <img className="rounded-md w-1/4" src={embed.image} alt="Embed Image"/>

        </div>
    );
});

export default Embed;
