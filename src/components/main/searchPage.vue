<template>
    <div class="container-fluid d-inline-flex flex-wrap justify-content-left align-items-center table-dark">
        <!-- Start Search Bar -->
        <div class="input-group mb-3 searchbar">
        <input v-model="animeTitle" type="text" class="form-control" placeholder="Title" aria-label="Recipient's username" aria-describedby="basic-addon2">
        <div class="input-group-append">
            <span class="input-group-text" id="basic-addon2">Search</span>
        </div>
        </div>
        <!-- End Search Bar -->
            <div v-for="anime in animes" :key="anime" class="animeCard" @click="loadAnime">
                <table class="table table-dark">
                    <thead>
                        <tr>
                        <th><img :src="anime.attributes.posterImage.small" alt=""><div class="addAnime"><button @click="addAnimeToMyList" type="button" class="btn btn-success btn-addAnime">+</button></div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <table class="table table-dark">
                            <thead>
                                <tr>
                                <th class="text-center"><span class="info">{{anime.attributes.canonicalTitle}}</span></th>
                                </tr>
                            </thead>
                        </table>
                    </tr>
                </tbody>
                </table>
            </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'mainPage',
    data() {
        return {
            url: '/anime?filter[text]=',
            method: 'get',
            baseURL: 'https://kitsu.io/api/edge',
            animeTitle: '',
            animes: [{
                attributes: {
                    coverImage: {
                    large: '',
                    original: '',
                    small: '',
                    tiny: '',
                    },
                        posterImage: '',
                        abreviatedTitles: '',
                        ageRating: '',
                        ageRatingGuide: '',
                        canonicalTitle: '',
                        description: '',
                        startDate: '',
                        endDate: '',
                        episodeCount: 0,
                        episodeLength: 0,
                        favoritesCount: 0,
                        nextRelease: '',
                        nsfw: false,
                        popularityRank: 0,
                        ratingRank: 0,
                        showType: '',
                        slug: '',
                        status: '',
                        subtype: '',
                        synopsis: '',
                        tba: '',
                        titles: {
                            en: '',
                            en_jp: '',
                            ja_jp: ''
                    },
                        youtubeVideoId: ''
                    }

            }],
            anime: {
                coverImage: {
                    large: '',
                    original: '',
                    small: '',
                    tiny: '',
                },
                posterImage: '',
                abreviatedTitles: '',
                ageRating: '',
                ageRatingGuide: '',
                canonicalTitle: '',
                description: '',
                startDate: '',
                endDate: '',
                episodeCount: 0,
                episodeLength: 0,
                favoritesCount: 0,
                nextRelease: '',
                nsfw: false,
                popularityRank: 0,
                ratingRank: 0,
                showType: '',
                slug: '',
                status: '',
                subtype: '',
                synopsis: '',
                tba: '',
                titles: {
                    en: '',
                    en_jp: '',
                    ja_jp: ''
                },
                youtubeVideoId: ''

            },
            img: 'https://i.picsum.photos/id/643/200/300.jpg?hmac=rS-MHa0BIMHdAgm-FZ7QM36aRKEAzzhSRNRv5n4uqGc'
        }
    },
    methods: {
        loadAnime() {
            if (this.animeTitle === "") {
                axios.get("https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0")
            .then((response) => {
                console.log(response.data);
                /* this.img = response.data.data[0].attributes.posterImage.large; */
                this.animes = response.data.data;
                console.log(this.animes);
/*              console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config); */
                });
            } else {
                axios.get(this.baseURL + this.url + this.animeTitle.replace(" ", "%20"))
            .then((response) => {
                console.log(response.data);
                /* this.img = response.data.data[0].attributes.posterImage.large; */
                this.animes = response.data.data;
                console.log(this.animes);
/*              console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config); */
                });
            }
            
        }
    },
    watch: {
        animeTitle() {
            this.loadAnime()
        }
    },
    mounted() {

    }
}
</script>

<style >
img {
    border: 1px solid black;
    width: 250px;
    height: 350px;
}

.info {
    font-weight: normal;
    word-wrap: normal;
    font-size: clamp(.8rem, 1.2vw, .8rem);
}

.animeCard {
    cursor: pointer;
    margin: 10px;
    max-height: 450px;
    max-width: 300px;
}

.addAnime {
position: relative;
top: -345px;
left: 212px;
}

.btn-addAnime {
    zoom: .9;
}

.searchbar {
    background-color: black;
}

</style>