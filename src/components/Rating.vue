<template>
  <div class="rating" v-if="rating && rating.average">
    <div class="stars">
      <i :class="Math.floor(rating.average / 2) >= i ? 'fas fa-star' : 'far fa-star'" v-for="i in 5" :key="i"></i>
    </div>
    <span>({{ rating.average }})</span>
  </div>
</template>

<script>
  export default {
    props: {
      rating: Object
    }
  }
</script>

<style lang="scss">
  .rating {
    display: flex;
    align-items: center;

    .stars {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: .25rem;
      margin-right: .5rem;
    }
  }
</style>