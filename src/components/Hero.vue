<template>
  <div class="hero" id="hero">
    <div class="hero-content">
      <div class="hero-information container">
        <router-link v-if="detailPage" to="/" class="btn btn-back">
          <i class="fas fa-arrow-left icon"></i>
          Go back
        </router-link>
        <div class="hero-info">
          <figure class="hero-poster">
            <img :src="image" />
          </figure>
          <div class="hero-text">
            <Rating :rating="rating" />
            <h1>{{ detailPage ? episodeTitle : seriesTitle }}</h1>
            <div class="hero-details">
              <span>
                Season {{season}} | Episode {{ episode }}
              </span>
              <span v-if="!detailPage">
                {{ episodeTitle }}
              </span>
            </div>
            <div class="episode-summary" v-html="truncateSummary(summary, 160)"></div>
            <router-link v-if="detailButton" :to="`detail?season=${season}&number=${episode}`" class="btn">
              Learn more 
              <i class="fas fa-arrow-right icon"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-bg" :style="{backgroundImage: `url(${background})`}"></div>
  </div>
</template>

<script>
  import Rating from './Rating';

  export default {
    props: {
      image: String, 
      background: String, 
      rating: Object, 
      seriesTitle: String, 
      episodeTitle: String, 
      summary: String, 
      episode: Number, 
      season: Number,
      genres: Array,
      detailButton: Boolean,
      detailPage: Boolean
    },
    components: {
      Rating
    },
    methods: {
      /**
       * Limit a string with three dots
       * @param {string} string: The string that should be truncated
       * @param {number} chars: Amount of characters
       */
      truncateSummary (string, chars) {
        return this.detailPage ? string : string.slice(0, chars) + '...';
      }
    }
  }
</script>

<style lang="scss">
  .hero {
    position: relative;
    min-height: 400px;
    font-weight: 300;
  }

  .hero-bg {
    position: absolute;
    background-size: cover;
    background-position: center center;
    top: 0;
    left: 0;
    width: 100%;
    height: 130%;
    overflow: hidden;
    -webkit-filter: blur(8px);

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, var(--dark-second) 5%, var(--dark-second-30));
    }
  }

  .hero-content {
     position: relative;
     z-index: 1;
  }

  .btn-back {
    margin-top: 1rem;
  }

  .hero-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

  }

  .hero-poster {
    flex: 0 0 100%;
    height: 260px;
    margin: 1rem 0;
    background: var(--white-25);

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    >* {
      max-width: 768px;
    }

    h1 {
      font-size: 3rem;
      line-height: 3.5rem;
      font-weight: 900;
      margin: .25rem 0 .5rem;
    }

    .hero-details {
      font-size: 1.25rem;
      margin: 0 0 1rem;

      span {
        &:nth-child(1) {
          margin-right: 1rem;
        }

        &:nth-child(2) {
          font-weight: 400;
        }
      }
    }

    .episode-summary {

      p {
        margin: 0 0 1rem;
        line-height: 1.75rem;
        font-size: 1.25rem;
      }
    }
  }

  @media (min-width: 768px) {
    .hero-content {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      padding: 2rem 0;

      .container {
        height: 100%;
      }
    }

    .hero-poster {
      flex: 0 0 200px;
      margin: 0 1rem 0 0;
    }
    .hero-info {
      flex-wrap: nowrap;
      height: 100%;
    }
  }
</style>