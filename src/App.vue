<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap');

:root {
  --dark-first: rgb(13, 13, 46);
  --dark-second: rgb(23, 9, 34);
  --dark-second-30: rgba(23, 9, 34, 0.3);
  --black-80: rgba(0,0,0,0.8);
  --white: #fff;
  --white-95: rgba(255,255,255,0.95);
  --white-90: rgba(255,255,255,0.9);
  --white-80: rgba(255,255,255,0.8);
  --white-75: rgba(255,255,255,0.75);
  --white-50: rgba(255,255,255,0.5);
  --white-25: rgba(255,255,255,0.25);
  --white-10: rgba(255,255,255,0.1);
}

html,
body {
  margin: 0;
  background: var(--dark-second);
}

* {
  box-sizing: border-box;
}

h1 {
  font-size: 3rem;
  line-height: 3.5rem;
}

h2 {
  font-size: 2rem;
  line-height: 2.5rem;
}

h3 {
  font-size: 1.25rem;
  line-height: 1.5rem;
}

img {
  max-width: 100%;
}

.btn {
  text-decoration: none;
  background: var(--white-95);
  color: rgb(13, 13, 46);
  padding: 0.75rem 1.5rem;
  display: inline-grid;
  grid-template-columns: 1fr auto;
  gap: .5rem;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  transition: ease-out all .2s;

  .icon {
    transition: ease-out all .2s;
  }

  &:active,
  &:hover {
    gap: 1rem;
  }
}

.btn-small {
  @extend .btn;
  padding: .5rem 1rem; 
}

.label {
  background: var(--white-90);
  color: var(--dark-first);
  font-weight: 400;
  text-transform: uppercase;
  font-size: .75rem;
  padding: .25rem .5rem;
  margin-right: .25rem;
  border-radius: 2px;
}

#app {
  font-family: 'Lato', sans-serif;
  color: var(--white);
  min-height: 100vh;
  
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
}

a {
  color: var(--white);
}

dl {
  display: grid;
}

dd {
  font-weight: 300;
  margin: 0 0 1rem 0;
}

dt {
  margin: 0;
}

[v-cloak] { 
  display:none; 
}

@media (min-width: 992px) {

  dl {
    grid-template-columns: 100px auto;
    gap: 1rem;
  }

  dd {
    margin: 0;
  }

  .container {
    padding-left: 30px;
    padding-right: 30px;
  }
}
</style>
