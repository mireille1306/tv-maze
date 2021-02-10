<template>
  <div class="container">
    <div class="list-wrapper">
      <nav class="list-nav">
        <div class="list-nav-left" :class="{'active' : index > 0 && filteredEpisodes.length > 1}" @click="navigate(-1)">
          <i class="fas fa-chevron-left"></i>
        </div>
        <div class="list-nav-right"
          :class="{'active' : index < filteredEpisodes.length - 1 && filteredEpisodes.length > 1}"
          @click="navigate(+1)">
          <i class="fas fa-chevron-right"></i>
        </div>
      </nav>
      <div class="list" ref="list" :style="{transform: `translateX(-${listTranslateStyle}px)`}">
        <Card :item="item" @click.native="setIndex(i)" v-for="(item, i) in filteredEpisodes" :key="item.id" />
      </div>
      <NoResults :active="filteredEpisodes.length < 1 && !loading" />
    </div>
  </div>
</template>

<script>
  import Card from './Card';
  import NoResults from './NoResults';

  import {
    mapState
  } from 'vuex';

  export default {
    components: {
      Card,
      NoResults
    },
    mounted() {
      this.navigateWithArrowKeys();
    },
    data() {
      return {
        season: 1
      }
    },
    computed: {
      ...mapState({
        filteredEpisodes: state => state.episodes.filteredEpisodes,
        index: state => state.episodes.index,
        loading: state => state.episodes.loading
      }),
      listTranslateStyle() {
        return this.index * 260;
      }
    },
    watch: {
      /**
       * Reset index when user filters
       */
      filteredEpisodes: {
        handler() {
          this.setIndex(0);
        },
        deep: true
      }
    },
    methods: {
      /**
       * Set the index of the current item
       * @param {number} index: the index of the clicked/selected item
       */
      setIndex(index) {
        this.$store.commit('episodes/setState', {
          key: 'index',
          value: index
        });
      },

      /**
       * Navigate to the previous or next item
       * @param {number} dir: either +1 or -1, depending on the direction
       */
      navigate(dir) {
        this.setIndex(this.index + dir);
      },

      /**
       * Navigate with the arrow keys
       */
      navigateWithArrowKeys() {
        window.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft' && this.index > 0) this.navigate(-1);
          if (event.key === 'ArrowRight' && this.index < this.filteredEpisodes.length - 1) this.navigate(+1);
        })
      }
    }
  }
</script>

<style lang="scss">
  .list-wrapper {
    position: relative;
    margin: 2rem 0;
    overflow: hidden;
  }

  .list {
    transition: ease all .3s;
    display: flex;

    &::-webkit-scrollbar {
      height: 0;
      background: transparent;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: var(--white-25);
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: var(--white-50);
    }
  }

  .list-nav-left,
  .list-nav-right {
    background: var(--black-80);
    position: absolute;
    top: 0;
    height: 180px;
    width: 50px;
    cursor: pointer;
    z-index: 1;
    transition: ease-out .2s all;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
      transform: translateX(0);
    }
  }

  .list-nav-left {
    left: 0;
    transform: translateX(-50px);
  }

  .list-nav-right {
    right: 0;
    transform: translateX(50px);
  }
</style>