<template>
  <div class="container">
    <div class="settings" v-if="episodes && episodes[episodes.length - 1]">
      <input type="text" placeholder="Search" v-model="filter.query" @keyup="filteredEpisodes()">
      <select name="" v-model="filter.season" @change="filteredEpisodes()">
        <option :value="0" default>All seasons</option>
        <option :value="i" v-for="i in totalSeasons" :key="i">Season {{ i }}</option>
      </select>
      <select name="" id="" v-model="sortingValue" @change="sortList()">
        <option value="a-z">A-Z</option>
        <option value="z-a">Z-A</option>
        <option value="newestFirst">Newest first</option>
        <option value="oldestFirst">Oldest first</option>
      </select>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({
        episodes: state => state.episodes.episodes,
        sorting: state => state.episodes.sorting,
        totalSeasons: state => state.episodes.totalSeasons
      })
    },
    data() {
      return {
        filter: {
          query: '',
          season: 0
        },
        sortingValue: ''
      }
    },

    watch: {
      sorting(val) {
        this.sortingValue = val;
      }
    },

    mounted() {
      this.$store.commit('episodes/setState', {
        key: 'sorting',
        value: 'oldestFirst'
      });
    },

    methods: {
      /**
       * Filter the episodes
       */
      filteredEpisodes() {
        this.$store.dispatch('episodes/filterList', this.filter);
      },

      /**
       * Sort the episodes
       */
      sortList() {
        this.$store.dispatch('episodes/sortList', this.sortingValue);
      }
    }
  }
</script>

<style lang="scss">
  .settings {
    background: var(--white-10);
    padding: 2rem;
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1rem;
    margin: 2rem 0 0 0;

    input[type="text"] {
      padding: 1rem 1.5rem;
      -webkit-appearance: none;
      background: var(--white);
      font-size: 1rem;
      border: 0;
      font-family: 'Lato', sans-serif;
      color: var(--dark-first);
      transition: ease all 0.2s;

      &:focus {
        outline: 2px solid var(--white-50);
      }
    }

    select {
      -webkit-appearance: none;
      background: var(--white);
      padding: 1rem 1.5rem;
      font-size: 1rem;
      border: 0;
      color: var(--dark-first);
      font-family: 'Lato', sans-serif;
      transition: ease all 0.2s;

      &:focus {
        outline: 2px solid var(--white-50);
      }
    }
  }

  @media (min-width: 768px) {
    .settings {
      grid-template-columns: auto 200px 150px;
      margin: 0;
    }
  }
</style>