import axios from 'axios';

const getM3U8 = async (url) => {
    try {
        const { data } = await axios.get(`https://aditya-freeapi-90.deno.dev/api/allenutils/getm3u8?url=${encodeURIComponent(url)}`);
        const { m3u8Url } = data;
        return m3u8Url;
    } catch (error) {
        console.error("Failed to fetch m3u8 URL", error);        
        return null;
    }
};

export default getM3U8;