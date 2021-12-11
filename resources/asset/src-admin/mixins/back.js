import BackButton from "./../components/BackButton";
export const backRoute = {
  props: ['back'],
  components: { BackButton },
  computed: {
    hasBack(){ return !!this.back },
    backRoute(){ return this.hasBack ? this.getBackRoute() : null }
  },
  methods: {
    getBackRoute(){
      let back = this.back;
      if(_.isString(back)) return { name:back }
      if(_.isArray(back)) return { name:back[0],params:{ id:back[1] } }
      return null;
    }
  }
}
