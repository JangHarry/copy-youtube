import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import axios from 'axios';
import Youtube, { serach } from '../api/youtube';


import { useYoutubeApi } from '../context/YoutubeApiContext';



export default function Videos() {
    const { keyword } = useParams();
    const { youtube } = useYoutubeApi()
    const { isLoading, error, data: videos } = useQuery({
        queryKey: ['videos', keyword], queryFn: () => {
            
            return youtube.search(keyword)
        }, staleTime: 1000*60*1
}
    );

    return (
        <>
            <div>
            Videos {keyword ? `🔎 ${keyword}` : `❌`}
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Somet</p>}
            {videos && <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-col-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4'>                
                {videos.map(video => <VideoCard key={video.id} video={video} />)}
            </ul>}
        </>
    );
}

