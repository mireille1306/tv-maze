<template>
  <div class="details">
    <Hero :image="episodeDetails && episodeDetails.image && episodeDetails.image.original"
      :background="showDetails && showDetails.image && showDetails.image.original" :rating="showDetails.rating"
      :seriesTitle="showDetails.name" :episodeTitle="episodeDetails.name" :summary="episodeDetails.summary"
      :episode="episodeDetails.number" :season="episodeDetails.season" :genres="showDetails.genres"
      :detailPage="true" />

    <div class="container details-container">
      <h2>{{ showDetails.name }}</h2>
      <h3>Details</h3>
      <dl class="show-details" v-if="showDetails">
        <dt>Language</dt>
        <dd>{{ showDetails.language }}</dd>
        <dt>Genres</dt>
        <dd>{{ showDetails.genres && showDetails.genres.join(', ') }}</dd>
        <dt>Premiered</dt>
        <dd>{{ showDetails.premiered }}</dd>
        <dt>Status</dt>
        <dd>{{ showDetails.ended }}</dd>
        <dt>Official site</dt>
        <dd>
          <a :href="showDetails.officialSite">{{ showDetails.officialSite }}</a>
        </dd>
      </dl>
      <h3>Cast</h3>
      <div class="cast-list">
        <div v-for="(person, i) in cast" :key="i">
          <img :src="person.person.image.medium" alt="">
          <div>
            <span>{{ person.person.name }}</span>
            <span>{{ person.person.birthday }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';

  import Hero from '@/components/Hero';

  export default {
    data() {
      return {
        episodeDetails: {},
        showDetails: {},
        cast: []
      }
    },
    components: {
      Hero
    },
    computed: {
      ...mapState({
        seriesId: state => state.episodes.seriesId
      })
    },
    mounted() {
      this.getEpisodeData();
      this.getShowData();
      this.getCastData();
    },
    methods: {
      /**
       * Get the episode details
       */
      getEpisodeData() {
        axios.get(
          `http://api.tvmaze.com/shows/${this.seriesId}/episodebynumber?season=${this.$route.query.season}&number=${this.$route.query.number}?embed=show`
        ).then(result => {
          this.episodeDetails = result.data;
        })
      },

      /**
       * Get the show details
       */
      getShowData() {
        axios.get(`http://api.tvmaze.com/shows/${this.seriesId}`).then(result => {
          this.showDetails = result.data;
        })
      },

      /**
       * Get the cast details
       */
      getCastData() {
        axios.get(`http://api.tvmaze.com/shows/${this.seriesId}/cast`).then(result => {
          this.cast = result.data;
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .details-content {
    position: relative;
    z-index: 1;
  }

  .details-container {
    position: relative;
  }

  .show-details {
    margin: 0 0 3rem;
  }

  .cast-list {
    display: inline-grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 3rem;
    row-gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 0 3rem;

    >* {
      display: grid;
      grid-template-columns: 80px auto;
      align-items: center;
    }

    img {
      width: 60px;
      height: 80px;
      object-fit: cover;
      object-position: center;
      margin-right: 1frem;
    }

    span {
      display: block;

      &:nth-child(1) {
        font-size: 1.25rem;
      }

      &:nth-child(2) {
        font-size: .9rem;
        font-weight: 300;
      }
    }
  }
</style>