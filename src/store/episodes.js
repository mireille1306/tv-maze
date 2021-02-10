const moduleList = {
  namespaced: true,
  state: () => ({
    seriesId: 4,
    episodes: [],
    filteredEpisodes: [],
    showInformation: {},
    loading: true,
    noResults: false,
    index: 0,
    sorting: '',
    totalSeasons: 0
  }),
  mutations: {
    /**
     * Set a state
     * @param {object} state: vuex store state
     * @param {object} data: object with key and value to store in state
     */
    setState(state, data) {
      state[data.key] = data.value;
    }
  },
  actions: {
    /**
     * Filter the episodes
     * @param {object} vm: vuex store
     * @param {object} filters: selected filters
     */
    filterList (vm, filters) {
       vm.state.filteredEpisodes = vm.state.episodes.filter(e => {
        if (filters.season > 0 && e.season !== filters.season) return false;
        if (filters.query.length && e.name.toLowerCase().indexOf(filters.query.toLowerCase()) === -1) return false;
         return true;
       });
       vm.commit('setState', {key: 'noResults', value: vm.state.filteredEpisodes.length < 1});
    },
    
    /**
     * Sort the episodes
     * @param {object} vm: vuex store
     * @param {string} sorting: selected sorting type
     */
    sortList (vm, sorting) {
        vm.commit('setState', {key: 'sorting', value: sorting});

      vm.state.filteredEpisodes.sort((a,b) => {
        if (sorting === 'a-z') return a.name.localeCompare(b.name);
        if (sorting === 'z-a') return b.name.localeCompare(a.name);
        if (sorting === 'oldestFirst') return (a.season + a.number.toString()) - (b.season + b.number.toString());
        if (sorting === 'newestFirst') return (b.season + b.number.toString()) - (a.season + a.number.toString());
      })

    }
  }
}

export default moduleList;