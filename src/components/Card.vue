<template>
  <router-link class="card" :to="`detail?season=${item.season}&number=${item.number}`">
    <figure>
      <img :src="item.image.original" alt="">
    </figure>
    <div class="card-text">
      <h3>{{ item.name }}</h3>
      <span>Season {{ item.season }} | <strong>Episode {{ item.number }}</strong></span>
      <span>{{ item.runtime }} minutes</span>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      item: Object
    }
  }
</script>

<style lang="scss">
  .card {
    flex: 0 0 260px;
    scroll-snap-align: center;
    cursor: pointer;
    text-decoration: none;

    &:hover {

      img {
        transform: scale(1.1);
      }
    }

    figure {
      margin: 0;
      width: 100%;
      height: 180px;
      overflow: hidden;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: ease-out all .3s;
    }
  }

  .card-text {
    padding: .5rem;

    span {
      color: var(--white-75);
      display: block;

      &:nth-of-type(1) {
        margin-bottom: .25rem;
      }

      &:nth-of-type(2) {
        font-size: .75rem;
        margin-bottom: 1rem;
      }
    }

    h3 {
      margin: 1rem 0 .5rem;
    }
  }
</style>