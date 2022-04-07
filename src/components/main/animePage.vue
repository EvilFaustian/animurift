
<template>
    <div>
        <div class="animeCard">
            <table class="table table-dark">
            <thead>
                <tr>
                <th><img :src="this.animes.posterImage.large" alt=""></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <table class="table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Tittle: <span class="info">{{this.animes.canonicalTitle}}</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Age Rating: <span class="info">{{this.animes.ageRating}} - {{this.animes.ageRatingGuide}}</span></th>
                        </tr>
                        <tr>
                        <th scope="row">Episodes: <span class="info">{{this.animes.episodeCount}}</span></th>
                        </tr>
                        <tr>
                        <th scope="row">Show Type: <span class="info">{{this.animes.showType}}</span></th>
                        </tr>
                        <tr>
                        <th scope="row">Episode Duration: <span class="info">{{this.animes.episodeLength}} minutes</span></th>
                        </tr>
                        <tr>
                        <th scope="row">Status: <span class="info">{{this.animes.status}}</span></th>
                        </tr>
                        <tr>
                        <th scope="row">Start date: <span class="info">{{this.animes.startDate}}</span></th>
                        </tr>
                        <tr>
                        <th scope="row">End Date: <span class="info">{{this.animes.endDate}}</span></th>
                        </tr>
                        <tr>
                        <th scope="row"> Synopsis </th>
                        </tr>
                        <tr>
                        <th scope="row"><span class="info">{{this.animes.synopsis}}</span></th>
                        </tr>
                    </tbody>
                    </table>
                </tr>
            </tbody>
            </table>
        </div>
        <button @click="loadAnime">Submit</button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'mainPage',
    data() {
        return {
            url: '/anime',
            method: 'get',
            baseURL: 'https://kitsu.io/api/edge',
            animes: {
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
        loadAnime(url) {
            axios.get(this.baseURL + this.url)
            .then((response) => {
/*                 console.log(response.data.data[0].attributes); */
                this.img = response.data.data[0].attributes.posterImage.large;
                this.animes = response.data.data[0].attributes;
                console.log(this.animes);
/*                 console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config); */
            });
        }
    },
    watch: {
        img(newValue, oldValue) {

        }
    },
    mounted() {

    }
}
</script>

<style >
img {
    border: 1px solid black;
}

.info {
    font-weight: normal;
}

.animeCard {
    zoom: 0.7;
    width: 100px;
    height: 300px;
}
</style>