

export default class Youtube {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword: any) {
        return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
    }

    async channelImageURL(id) {
        return this.apiClient.channels({ params: { part: 'snippet', id } })
        .then((res) => res.data.items[0].snippet.thumbnails.default.url)
    }

    async relatedVideos(id) {
        return this.apiClient.search({
           params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                // relatedToVideoId: id
                channelId: id
            }
        })
       .then((res) => {                
                return res.data.items.map((item) => {
                    return {...item, id: item.id.videoId}
                })
        })
    }

    async #searchByKeyword(keyword) {
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                type: 'video',
                q: keyword
            }
        }).then((res) => {                
                return res.data.items.map((item) => {
                    return {...item, id: item.id.videoId}
                })
        })
    }

    async #mostPopular() {
         return this.apiClient.videos({
            params: {
                part: 'snippet',
                 maxResults: 25,          
                chart: 'mostPopular'
                
        }}).then((res) => {                
                return res.data.items
        })
    }
}