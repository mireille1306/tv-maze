<template>
  <div class="no-results" :class="{'active' : active}">
    <span>No results</span>
    <p>No results found, reset the filter or try some different settings</p>
  </div>
</template>

<script>
  export default {
    props: {
      active: Boolean
    }
  }
</script>

<style lang="scss">
  .no-results {
    transform: translateX(-100%);
    opacity: 0;
    transition: ease translate .2s, ease opacity .5s;

    &.active {
      transform: translateX(0);
      opacity: 1;
    }

    span {
      font-size: 1.5rem;
      font-weight: 400;
    }

    p {
      font-size: 1rem;
      font-weight: 300;
    }
  }

  @media (min-width: 768px) {

    .no-results {

      span {
        font-size: 2rem;
      }

      p {
        font-size: 1.25rem;
      }
    }
  }
</style>