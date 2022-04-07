<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
    <div class="col-sm-5 col-maxwidth">
      <div class="container d-flex flex-column mb-4 mt-5">
      <div class="row">
        <div class="col">
          <h5 class="text-center">Search Anime</h5>
          <div class="input-group mb-3 mt-3 searchbar">
          <input v-model="animeTitle" type="text" maxlength="60" class="form-control" placeholder="Search" aria-label="Recipient's username">
          </div>
        </div>
      </div>
       <div class="row d-flex justify-content-between">
        <div class="col">
          <ul class="list-group text-center overflow-auto animeListMH">
          <li  v-for="anime in animes" :key="anime" @click="selectAnime(anime), isFavourite()" class="list-group-item animeInList">{{anime.attributes.canonicalTitle}}</li>
        </ul>
        </div>
      </div>
    </div>
    </div>
    <div v-if="this.animeloaded" class="col-md-7 mb-4 colcenter-maxwidth mt-4">
      <div class="d-flex flex-column">
        <img class="animeImg" :src="this.anime.posterImage.large" alt="">
        <div><span class="animeTitle">{{this.anime.canonicalTitle}}</span></div>
        <div>
          <div id="accordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Synopsis
                  </button>
                </h5>
              </div>
              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                  {{this.anime.synopsis}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col d-flex flex-column mt-3">
            <span class="episodeCount">Episodes: {{anime.episodeCount}}</span>
            <span class="episodeLength">Episode length: {{anime.episodeLength}} minutes</span>
            <span class="type">Type: {{anime.subtype}}</span>
            <span class="agerating">Rating: {{anime.ageRating}} - {{anime.ageRatingGuide}}</span>
            <span class="rating">Average Rating: {{anime.averageRating}}</span>
            <span class="ratingRank">Rating Rank: {{anime.ratingRank}}</span>
            <span class="popularity">Popularity Rank: {{anime.popularityRank}}</span>
            <span class="status">Status: {{anime.status}}</span>
            <span class="released">Release Date: {{anime.startDate}}</span>
          </div>
          <div class="col-md-4 mt-3">
            <div class="d-flex flex-row">
              <select v-model="this.WatchedStatus" @change="changeAnimeStatus" class="form-select form-select-sm animeStatus" aria-label=".form-select-sm example">
                <option value="1">Not Seen</option>
                <option value="2">Watching</option>
                <option value="3">Completed</option>
                <option value="4">Want to watch</option>
                <option value="5">Dropped</option>
              </select>
            <button v-if="this.favourite == false" type="button" @click="isFavourite(), addToFavourite(this.anime.id)" class="btn btn-danger favBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            
            </button>
            <button v-else-if="this.favourite" type="button" @click="isFavourite(), addToFavourite(this.anime.id)" class="btn btn-danger favBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>     
            </button>
            </div>
            <div class="d-flex flex-column mt-3">
              <p class="h6">Episodes seen</p>
              <div class="d-flex ">
              <select v-model="this.epSeen" @change="changeEpSeen(this.epSeen)" class="form-select form-select-sm epSeen" aria-label=".form-select-sm example">
                <option :value="parseInt(0)">0</option>
                <option v-for="index in anime.episodeCount" :key="index" :value="index">{{index}}</option>
              </select>
                / {{anime.episodeCount}}
              </div>
            </div>
            <div class="d-flex flex-column">
              <!-- Last Updated: date -->
            </div>
          </div>
          </div>
          <span class="linksUlTitle text-center mt-4 mb-4">Here is where people watch it.</span>
            <ul class="list-group overflow-auto linkMaxWidthHeight">
              <div class="linkOptions d-flex justify-content-between">
              <select v-model="linkLanguage" @change="this.findAllAnimeLinks()" class="form-select form-select-sm linkLanguage" aria-label=".form-select-sm example">
                <option value="en">English</option>
                <option value="ro">Romana</option>
              </select>
              <div class="linkEdit">
<!-- Button trigger modal -->
<button type="button" class="btn btn-success linkbtn" data-toggle="modal" data-target="#exampleModal">
  +
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Input the link of the website you have/are watching this anime
        <input v-model="this.address" maxlength="60" type="url" class="form-control" id="recipient-name">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" @click="addLinkAnime(this.address)" data-dismiss="modal" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>      
<button type="button" @click="this.RemoveLinkAnime()" class="btn btn-danger linkbtn">-</button>
              </div>
              </div>
              <li v-for="link in this.animeLinks" :key="link" class="list-group-item animeInList d-flex justify-content-between">
                <a class="mt-1 ml-1" target="_blank" :href="link.address">{{link.address}}</a> <div class="linkRating"><button class="btn" @click="this.vote(1, link)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
              </svg><span class="text-success">{{link.upvotes}}</span></button><button @click="this.vote(2, link)" class="btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
              </svg><span class="text-danger">{{link.downvotes}}</span></button></div></li>
            </ul>
        
      </div>
    </div>
    <div v-else class="col-md-8 mb-4 mt-4"></div>
    <div v-if="this.animeloaded" class="col-sm-5 col-maxwidth d-flex flex-column justify-content-arround mb-4 mt-4">
      <p class="h5 text-center">My Animes</p>
      <div class="container d-flex flex-column">
      <div class="row">
        <div class="col">
          <div class="input-group mb-3 searchbar">
          <input v-model="this.myAnimeSearchTitle" maxlength="60" type="text" v-on:blur="this.resetMyListSearch()" class="form-control" placeholder="Search" aria-label="Recipient's username">
          </div>
          <div class="myListBtn d-flex justify-content-center">
            <select v-model="this.myListDisplayBy" class="form-select" aria-label="Default select example" @change="displayMyListBy()">
              <option value="0" selected>Display by All</option>
              <option value="1">Not Seen</option>
              <option value="2">Watching</option>
              <option value="3">Want to Watch</option>
              <option value="4">Completed</option>
              <option value="5">Dropped</option>
              <option value="6">Favourite</option>
            </select>
          </div>
        </div>
      </div>
       <div class="row d-flex justify-content-between">
        <div  class="col">
          <ul class="list-group text-center overflow-auto animeListMH">
          <li v-for="anime in selectAnimeInMyList" :key="anime" @click="selectAnimeFromMyList(anime)" class="list-group-item animeInList green">{{anime.mapValue.fields.canonicalTitle.stringValue}}</li>
        </ul>
        </div>
      </div>
    </div>
    </div>
    <div class="col-sm-5 mb-4 mt-4"></div>
  </div>
  </div>
</template>


<script>

import axios from 'axios'
import { getAuth } from "firebase/auth"
import { addDoc, collection, getDocs, doc, setDoc, getDoc, getValue, query, where} from "firebase/firestore"; 
import {db} from './main.js'
/* const db = getFirestore(); // get databse */
import {_} from 'lodash';
export default {
    name: 'mainPage',
    onMounted() {

    },
    data() {
        return {
            url: '/anime?filter[text]=',
            method: 'get',
            baseURL: 'https://kitsu.io/api/edge',
            animeTitle: '',
            animeloaded: false,
            image: '',
            favourite: false,
            WatchedStatus: 1,
            linkLanguage: 'en',
            awaitingSearch: false,
            myList: [],
            myListDisplayBy: 0,
            myListSearchBy: 0,
            myAnimeSearchTitle: '',
            epSeen: 0,
            userId: getAuth().currentUser.uid,
            resp: '',
            address: '',
            animeLinks: [

            ],
            animes: [{
                attributes: {
                    id: '',
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
                id: '',
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
        async loadAnime() {
            if (this.animeTitle === "") {
                axios.get("https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0")
            .then((response) => {
                /* this.img = response.data.data[0].attributes.posterImage.large; */
                this.animes = response.data.data;
/*              console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config); */
                });
            } else {
                axios.get(this.baseURL + this.url + this.animeTitle.replace(" ", "%20"))
            .then((response) => {
                /* this.img = response.data.data[0].attributes.posterImage.large; */
                this.animes = response.data.data;
/*              console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config); */
                });
            }
            
        },
        checkVars() {
          console.log("WatchingStatus: " + this.WatchedStatus)
          console.log("epSeen" + this.epSeen)
          console.log("Favourite: " + this.favourite)
        },
        resetMyListSearch() {
          this.myAnimeSearchTitle = ""
        },
        updateMyValues: async function(resp) {

           await new Promise((resolve, reject) => {
             this.updateDBValue("canonicalTitle", this.anime.canonicalTitle)
            this.updateDBValue("id", this.anime.id)
              this.updateDBValue("favourite", false)     
              this.updateDBValue("WatchedStatus", parseInt(1))     
              this.updateDBValue("epSeen", parseInt(0))
           this.epSeen = 0
           this.favourite = false 
           this.WatchedStatus = parseInt(1)
           });

            
          /* getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {

          }); */
        },
        updateValuesFromDb: async function(resp) {
          let valLoc = resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields
           await new Promise((resolve, reject) => {
             this.favourite = valLoc.favourite.booleanValue
             this.epSeen = valLoc.epSeen.integerValue
             this.WatchedStatus = parseInt(valLoc.WatchedStatus.integerValue)
           });
        },
        
        updateDBValue: async function( valName, newVal ) {
          await new Promise((resolve, reject) => {
            setDoc(doc(db, 'users', getAuth().currentUser.uid), {
              anime: {
              [this.anime.id]: {
               [valName]: newVal,
                },
              }
            }, {merge: true});
            this[valName] = newVal;
          });
        },
        consolethis(anime) {
          console.log(anime)
        },
        animeInDatabase: async function() { //Check if the anime is in the animes database, if not add it
          let animeId = this.anime.id
          const docRef = doc(db, "animes", animeId.toString());
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            this.findAllAnimeLinks() //if anime exists then find the links we need
          } else {
            // doc.data() will be undefined in this case
            await setDoc(doc(db, "animes", animeId.toString()), {
              id: this.anime.id.toString(),
              canonicalTitle: this.anime.canonicalTitle,
              links: {
              }
            }, {merge: true});
          }
        },
        displayMyListBy: async function(){
          await getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {
            if (this.anime.id in resp._document.data.value.mapValue.fields.anime.mapValue.fields) {
                this.updateValuesFromDb(resp)
            } else {
               this.updateMyValues(resp)
            }
            console.log(resp._document.data.value.mapValue.fields)
            this.resp = resp
          }, {merge: true});
        },
        vote: async function(type, link) {
          
          if (type == 1) {
          const docRef = doc(db, "animes", this.anime.id.toString());
          const docSnap = await getDoc(docRef);
          if (getAuth().currentUser.uid in docSnap.data().links[this.linkLanguage][link.userUid].voted) {
            if (docSnap.data().links[this.linkLanguage][link.userUid].voted[getAuth().currentUser.uid].upvoted == false && docSnap.data().links[this.linkLanguage][link.userUid].voted[getAuth().currentUser.uid].downvoted == true) {
               let animeId = this.anime.id
            await setDoc(doc(db, "animes", animeId.toString()), {
              id: this.anime.id.toString(),
              canonicalTitle: this.anime.canonicalTitle,
              links: {
                [this.linkLanguage]: {
                [link.userUid]: {
                  upvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].upvotes) == 'undefined' ? 0 : ++docSnap.data().links[this.linkLanguage][link.userUid].upvotes,
                  downvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].upvotes) == 'undefined' ? 0 : --docSnap.data().links[this.linkLanguage][link.userUid].downvotes,
                  voted: {
                  [getAuth().currentUser.uid]: {
                    upvoted: true,
                    downvoted: false,
                  }
                }
                }
                }
              }
            }, {merge: true});
            }
          } else {
            let animeId = this.anime.id
            await setDoc(doc(db, "animes", animeId.toString()), {
              id: this.anime.id.toString(),
              canonicalTitle: this.anime.canonicalTitle,
              links: {
                [this.linkLanguage]: {
                [link.userUid]: {
                  upvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].upvotes) == 'undefined' ? 0 : ++docSnap.data().links[this.linkLanguage][link.userUid].upvotes,
                  downvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].downvotes) == 'undefined' ? 0 : docSnap.data().links[this.linkLanguage][link.userUid].downvotes,
                  voted: {
                  [getAuth().currentUser.uid]: {
                    upvoted: true,
                    downvoted: false,
                  }
                }
                }
                }
              }
            }, {merge: true});
          }
           
          } else if (type == 2) { 
          const docRef = doc(db, "animes", this.anime.id.toString());
          const docSnap = await getDoc(docRef);
          console.log(docSnap.data().links[this.linkLanguage][link.userUid].voted)
          if (getAuth().currentUser.uid in docSnap.data().links[this.linkLanguage][link.userUid].voted) {
            
            if (docSnap.data().links[this.linkLanguage][link.userUid].voted[getAuth().currentUser.uid].upvoted == true && docSnap.data().links[this.linkLanguage][link.userUid].voted[getAuth().currentUser.uid].downvoted == false) {
               let animeId = this.anime.id
            await setDoc(doc(db, "animes", animeId.toString()), {
              id: this.anime.id.toString(),
              canonicalTitle: this.anime.canonicalTitle,
              links: {
                [this.linkLanguage]: {
                [link.userUid]: {
                  upvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].upvotes) == 'undefined' ? 0 : --docSnap.data().links[this.linkLanguage][link.userUid].upvotes,
                  downvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].upvotes) == 'undefined' ? 0 : ++docSnap.data().links[this.linkLanguage][link.userUid].downvotes,
                  voted: {
                  [getAuth().currentUser.uid]: {
                    upvoted: false,
                    downvoted: true,
                  }
                }
                }
                }
              }
            }, {merge: true});
            }
          } else {
            let animeId = this.anime.id
            await setDoc(doc(db, "animes", animeId.toString()), {
              id: this.anime.id.toString(),
              canonicalTitle: this.anime.canonicalTitle,
              links: {
                [this.linkLanguage]: {
                [link.userUid]: {
                  downvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].upvotes) == 'undefined' ? 0 : docSnap.data().links[this.linkLanguage][link.userUid].downvotes,
                  upvotes: typeof(docSnap.data().links[this.linkLanguage][link.userUid].upvotes) == 'undefined' ? 0 : docSnap.data().links[this.linkLanguage][link.userUid].upvotes,
                  voted: {
                  [getAuth().currentUser.uid]: {
                    upvoted: false,
                    downvoted: true,
                  }
                }
                }
                }
              }
            }, {merge: true});
          }
          }
          this.findAllAnimeLinks()
        },
        findAllAnimeLinks: async function() {
          const docRef = doc(db, "animes", this.anime.id.toString());
          const docSnap = await getDoc(docRef);
          if (this.linkLanguage in docSnap.data().links) {
            if (docSnap.exists()) {
              this.animeLinks = docSnap.data().links[this.linkLanguage];
              this.animeLinks = Object.values(this.animeLinks)
              this.orderLinks()
            } else {
              // doc.data() will be undefined in this case
              this.animeInDatabase()
            }
          } else {
            let animeId = this.anime.id
            await setDoc(doc(db, "animes", animeId.toString()), {
              id: this.anime.id.toString(),
              canonicalTitle: this.anime.canonicalTitle,
              links: {
                [this.linkLanguage]: {
              }
              }
            }, {merge: true});
            if (docSnap.exists()) {
              this.animeLinks = docSnap.data().links[this.linkLanguage];
              this.animeLinks = Object.values(this.animeLinks)
              this.orderLinks()
            } else {
              // doc.data() will be undefined in this case
              this.animeInDatabase()
            }
          }

          
        },
        addLinkAnime: async function(link) {
          let animeId = this.anime.id
            await setDoc(doc(db, "animes", animeId.toString()), {
              id: this.anime.id.toString(),
              canonicalTitle: this.anime.canonicalTitle,
              links: {
                [this.linkLanguage]: {
                [getAuth().currentUser.uid]: {
                  lang: this.linkLanguage,
                  address: link,
                  upvotes: 0,
                  downvotes: 0,
                  addedBy: getAuth().currentUser.displayName,
                  userUid: getAuth().currentUser.uid,
                  voted: {

                  }
                }
              }
              }
            }, {merge: true});
            this.findAllAnimeLinks()

        },
        removeLinkAnime() {
          const animesDB= collection(db, "animes");
          const q = query(animesDB, where())
          
        },
        orderLinks(link) {
          let linkArr = Object.values(this.animeLinks);
          this.animeLinks = linkArr.sort((a,b) => {
            console.log(a.upvotes)
            return b.upvotes - a.upvotes
          })
        },
        myAnimeList: async function() {
          this.animeloaded = true
          await getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {
            this.myList = Object.values(resp._document.data.value.mapValue.fields.anime.mapValue.fields)
            this.myList = this.myList.slice(0, this.myList.length-1)
            /* this.anime.id in resp._document.data.value.mapValue.fields.anime.mapValue.fields */
          }, {merge: true});
        },
         selectAnime: async function(selected) {
          this.anime = selected.attributes
          console.log(this.anime)
          this.anime.id = parseInt(selected.id)
            await getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {
            if (this.anime.id in resp._document.data.value.mapValue.fields.anime.mapValue.fields) {
                this.updateValuesFromDb(resp)
            } else {
               this.updateMyValues(resp)
            }
            this.resp = resp
          }, {merge: true});
          this.animeInDatabase()
          this.findAllAnimeLinks()
          this.myAnimeList()

            
          /* if (resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.favourite == undefined) {

          } */
/*              getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {
                if (this.anime.id in resp._document.data.value.mapValue.fields.anime.mapValue.fields) {
                  if (resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.favourite == undefined){
                      setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                      anime: {
                        [this.anime.id]: {
                          favourite: false,
                        },
                      }
                    }, {merge: true});
                    this.favourite = false;
                  } else {
                    this.favourite = resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.favourite.booleanValue;
                  }
                } else {
                   setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                      anime: {
                        [this.anime.id]: {
                          favourite: false,
                        },
                      }
                    }, {merge: true});
                    this.favourite = resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.favourite.booleanValue;
                }
            })
            getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {
                if (this.anime.id in resp._document.data.value.mapValue.fields.anime.mapValue.fields) {
                  if (resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.WatchedStatus == undefined){
                      setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                      anime: {
                        [this.anime.id]: {
                          WatchedStatus: 1,
                        },
                      }
                    }, {merge: true});
                    console.log(resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id])
                    this.WatchedStatus = resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.WatchedStatus.stringValue;
                  } else {
                    console.log(resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields)
                    this.WatchedStatus = resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.WatchedStatus.stringValue;
                  }
                } else {
                   setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                      anime: {
                        [this.anime.id]: {
                          WatchedStatus: 1,
                        },
                      }
                    }, {merge: true});
                    console.log(resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields)
                    this.WatchedStatus = resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.WatchedStatus.stringValue;
                }
            }) */
        },
        selectAnimeFromMyList: async function(selected) {
           axios.get("https://kitsu.io/api/edge/anime/" + selected.mapValue.fields.id.integerValue.toString())
            .then((response) => {
                /* this.img = response.data.data[0].attributes.posterImage.large; */
                this.anime = response.data.data;
                console.log(response.data.data)
                this.selectAnime(response.data.data)
/*              console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config); */
                });
        },
        changeAnimeStatus: async function() {
          setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                    anime: {
                      [this.anime.id]: {
                        WatchedStatus: parseInt(this.WatchedStatus),
                      },
                    }
                  }, {merge: true});
                  console.log(this.WatchedStatus)
                  if (this.WatchedStatus == 3) {
                        setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                             epSeen: parseInt(this.anime.episodeCount), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
                        this.epSeen = parseInt(this.anime.episodeCount)
                  }
                  if (this.WatchedStatus == 1 && this.epSeen != 0) {
                        setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                             epSeen: parseInt(0), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
                        this.epSeen = parseInt(0)
                  }
        },
        changeEpSeen: async function(test) {
         await setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                    anime: {
                      [this.anime.id]: {
                        epSeen: test,
                      },
                    }
                  }, {merge: true});
                  this.epSeen = test
                  console.log(test)
                  console.log(this.epSeen)
                    if (this.epSeen != 0 ) {
                      if (this.WatchedStatus != 5 && this.epSeen <= this.episodeCount) {
                        setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                              WatchedStatus: parseInt(2), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
                        this.WatchedStatus = 2;
                } else if (this.epSeen <= this.anime.episodeCount && this.WatchedStatus == 3) {
                setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                              WatchedStatus: parseInt(2), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
                        this.WatchedStatus = parseInt(2)
              } else if (this.epSeen != 0 && this.WatchedStatus != 1 && this.WatchedStatus != 5) {
                setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                              WatchedStatus: parseInt(1), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
                        this.WatchedStatus = parseInt(1)
              }
              
              else if (this.epSeen == 0) {
                  setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                              WatchedStatus: parseInt(1), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
              } else if (this.WatchedStatus == 3) {
                setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                              epSeen: parseInt(this.anime.episodeCount), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
              } else if (this.epSeen == this.anime.episodeCount) {
                setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                          anime: {
                           [this.anime.id]: {
                              WatchedStatus: parseInt(3), //Not working for some reason!
                            },
                          }
                        }, {merge: true});
                        this.WatchedStatus = parseInt(3)
              }
                    } 
              
        },
          isFavourite: async function() {
             await new Promise((resolve, reject) => {
            const myDoc = getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {
              if (this.anime.id in resp._document.data.value.mapValue.fields.anime.mapValue.fields) {
                if (resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.favourite.booleanValue){
                  this.favourite = true
                  return true
                } else {
                   this.favourite = false
                  return false
                }
              } else {
                 this.favourite = false
                return false
              }
          })
             });
        },
        test() {
                      console.log("WatchingStatus: " + this.WatchedStatus)
          console.log("epSeen" + this.epSeen)
          console.log("Favourite: " + this.favourite)
        },

        addToFavourite: async function(idg) { //pass anime id
         await new Promise((resolve, reject) => {
          const myDoc = getDoc(doc(db, 'users', getAuth().currentUser.uid)).then((resp) => {
              if (this.anime.id in resp._document.data.value.mapValue.fields.anime.mapValue.fields) {
                if (resp._document.data.value.mapValue.fields.anime.mapValue.fields[this.anime.id].mapValue.fields.favourite.booleanValue){
                  setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                    anime: {
                      [idg]: {
                        favourite: false,
                      },
                    }
                  }, {merge: true});
                  this.favourite = false
                } else {
                    setDoc(doc(db, 'users', getAuth().currentUser.uid), {
                  anime: {
                    [idg]: {
                      favourite: true,
                    },
                  }
                }, {merge: true});
                this.favourite = true
                }
              } else {
                setDoc(doc(db, 'users', getAuth().currentUser.uid), {
              anime: {
                [idg]: {
                  favourite: false,
                },
              }
            }, {merge: true});
            this.favourite = false
              }
          })
         });
        },
    },
    watch: {
        animeTitle() {
          if (!this.awaitingSearch) {
            setTimeout(() => {
              this.loadAnime()
              this.awaitingSearch = false
            }, 500)
          }
            this.awaitingSearch = true
        },
    },
    computed: {
      selectAnimeInMyList() {
        let rst = []
        if (this.myAnimeSearchTitle == "") {
          if (this.myListDisplayBy == 0) {
          rst = this.myList.filter((anime) => anime.mapValue.fields.favourite.booleanValue || anime.mapValue.fields.WatchedStatus.integerValue == 2 || anime.mapValue.fields.WatchedStatus.integerValue == 3 || anime.mapValue.fields.WatchedStatus.integerValue == 4 || anime.mapValue.fields.WatchedStatus.integerValue == 5)
        } else if (this.myListDisplayBy == 1 ) {
          rst = this.myList.filter((anime) => anime.mapValue.fields.favourite.booleanValue && anime.mapValue.fields.WatchedStatus.integerValue == 1)
        } else if (this.myListDisplayBy == 2 ) {
           rst = this.myList.filter((anime) => anime.mapValue.fields.WatchedStatus.integerValue == 2)
        } else if (this.myListDisplayBy == 3) {
          rst = this.myList.filter((anime) => anime.mapValue.fields.WatchedStatus.integerValue == 4)
        } else if (this.myListDisplayBy == 4) {
          rst = this.myList.filter((anime) => anime.mapValue.fields.WatchedStatus.integerValue == 3)
        } else if (this.myListDisplayBy == 5) {
          rst = this.myList.filter((anime) => anime.mapValue.fields.WatchedStatus.integerValue == 5)
        } else if (this.myListDisplayBy == 6) {
          rst = this.myList.filter((anime) => anime.mapValue.fields.favourite.booleanValue)
        }
        } else {
          rst = this.myList.filter((anime) => {
         return anime.mapValue.fields.canonicalTitle.stringValue.toLowerCase().trim().match(this.myAnimeSearchTitle.trim().toLowerCase())
        })
        }
        return rst
      },
      linksLang() {
        let rst = []
        if (this.linkLanguage == "en") {
          rst = this.animeLinks.filter((anime) => anime.lang == "en")
        } else if (this.linkLanguage == "ro") {
          rst = this.animeLinks.filter((anime) => anime.lang == "ro")
        }
        return rst
      }
      /* searchMyList() {
        return this.myList.filter((anime) => {
         return anime.mapValue.fields.canonicalTitle.stringValue.toLowerCase().trim().match(this.myAnimeSearchTitle.trim().toLowerCase())
        })
      }  */
    },
    mounted() {

    }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,600);

* {
  font-family: 'Open Sans', sans-serif;
}

h2 {
  text-align: center;
  font-weight: 400;
}

ul li {
  transition: margin-left 0.3s linear, font-weight 0.2s linear, color 0.3s linear, zoom 0.3s linear;
  -webkit-transition: margin-left 0.3s linear, font-weight 0.2s linear, color 0.3s linear;
  -moz-transition: margin-left 0.3s linear, font-weight 0.2s linear, color 0.3s linear;
  -o-transition: margin-left 0.3s linear, font-weight 0.2s linear, color 0.3s linear;
  -ms-transition: margin-left 0.3s linear, font-weight 0.2s linear, color 0.3s linear;
}

ul li:hover {
  zoom: 1.1;
  color: #ce4343;
}

.animeInList {
  cursor: pointer !important;
}

.linksUlTitle {
  font-size: 1.5em;
}

.linkMaxWidthHeight {
  max-height: 400px !important;
}
.animeListMH {
  max-height: 600px !important;
}
.colcenter-maxwidth {
  max-width: 800px !important;
}
.col-maxwidth {
  max-width: 250px !important;
}
.myListBtn {
  padding: 5px !important;
}

.linkbtn {
  padding: 1px !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  margin: 2px;
}
.animeImg {
  margin: 10px;
  margin-top: 20px;
  width: 70%;
  height: 70%;
  max-width: 340px;
  max-height: 500px;
}

.animeStatus {
  width: 80%;
  margin-right: 3px;
  max-width: 150px;
}

.linkLanguage {
  width: 80%;
  margin-right: 3px;
  max-width: 150px;
  margin-bottom: 2px;
}

.search {
  margin-right: -20px;
}

.searchbar {
  margin-top: 10px;
}

.list-group-item {
  padding: 0px !important;
}

.epSeen {
  max-width: 70px;
}

.animeTitle {
  font-weight: bold;
  font-size: clamp(1rem, 1.3vw, 1.4rem);
}

</style>