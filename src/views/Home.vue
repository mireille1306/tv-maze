<template>

  <div class="home">
    <Hero 
      v-if="!loading"
      :image="filteredEpisodes.length < 1 ? showInformation.image.original : currentEpisode.image.original"
      :background="filteredEpisodes.length < 1 ? showInformation.image.original : currentEpisode.image.original" 
      :rating="showInformation.rating"
      :seriesTitle="showInformation.name" 
      :episodeTitle="currentEpisode.name" 
      :summary="currentEpisode.summary"
      :episode="currentEpisode.number" 
      :season="currentEpisode.season" 
      :genres="currentEpisode.genres"
      :detailPage="false"
      :detailButton="true" />
    <Settings />
    <List />
  </div>
</template>

<script>
  // @ is an alias to /src
  import axios from 'axios';
  import {
    mapState
  } from 'vuex';

  import Hero from "@/components/Hero";
  import List from "@/components/List";
  import Settings from "@/components/Settings";

  export default {
    name: 'Home',
    components: {
      Hero,
      List,
      Settings
    },
    computed: {
      ...mapState({
        seriesId: state => state.episodes.seriesId,
        filteredEpisodes: state => state.episodes.filteredEpisodes,
        showInformation: state => state.episodes.showInformation,
        currentEpisode: state => state.episodes.filteredEpisodes[state.episodes.index],
        loading: state => state.episodes.loading
      })
    },
    mounted() {
      this.getData(this.processData);
    },
    methods: {
      /**
       * Get the tv show data
       */
      getData(callback) {
        axios.get(`http://api.tvmaze.com/shows/${this.seriesId}?embed=episodes`).then(result => {
          callback(result);
        }).catch(error => {
          this.error = true;
          console.error(error);
        })
      },

      /**
       * Process the results of the API call and store in VUEX
       */
      processData(result) {
        const episodes = result.data._embedded.episodes;

        this.$store.commit('episodes/setState', {
          key: 'filteredEpisodes',
          value: episodes
        });
        this.$store.commit('episodes/setState', {
          key: 'episodes',
          value: episodes
        });
        this.$store.commit('episodes/setState', {
          key: 'showInformation',
          value: (({
            genres,
            name,
            rating,
            language,
            image,
            premiered
          }) => ({
            genres,
            name,
            rating,
            language,
            image,
            premiered
          }))(result.data)
        });
        this.$store.commit('episodes/setState', {
          key: 'totalSeasons',
          value: episodes[episodes.length - 1].season
        });
        this.$store.commit('episodes/setState', {
          key: 'loading',
          value: false
        })
      }
    }
  }
</script>