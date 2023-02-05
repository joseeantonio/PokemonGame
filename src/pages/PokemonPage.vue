<template>
  <h4>La puntuacion maxima alcanzada ha sido {{maxPuntuacion}}</h4>
  <h4>Puntuacion : {{puntuacion}}</h4>
  <h1>Te quedan {{tiempo}} segundos</h1>
  <h1 v-if="!pokemon">Cargando</h1>
  <div v-else="pokemon">
    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOption v-if="opciones" :pokemons="pokemonArray" @selection="checkPokemon"/>
    <h2 class="nombrePokemon" v-else>El nombre del pokemon es {{pokemon.name}}</h2>
    <template v-if="showPokemon">
      <h3>{{message}}</h3>
      <button class="btn btn-outline-primary" @click="newGame">{{this.msjboton}}</button>
    </template>
  </div>
</template>

<script>
  import PokemonPicture from "@/components/PokemonPicture.vue";
  import PokemonOption from "@/components/PokemonOption.vue";
  import getPokemonOptions from "@/helpers/getPokemonOptions";


  export default {
    components: {PokemonPicture,PokemonOption},
    data() {
      return {
        pokemon: null,
        pokemonArray: [],
        showPokemon: false,
        message: '',
        puntuacion: 0,
        contador:0,
        tiempo:10,
        opciones:true,
        maxPuntuacion:0,
        msjboton:''
      }
    },methods: {
      async mixedpokemons() {
        debugger
        this.pokemonArray = await getPokemonOptions()
        const randomPokemon = Math.floor(Math.random()*4)
        this.pokemon = this.pokemonArray[randomPokemon]
        console.log(this.pokemon)
      },checkPokemon(pokemonId){
        this.showPokemon = true
        this.opciones=false
        if (this.puntuacion>this.maxPuntuacion){this.maxPuntuacion = this.puntuacion}
        if (pokemonId===false){
          this.puntuacion = 0
          this.message = 'Se mas rapido la proxima vez'
          this.msjboton = 'Volver a jugar'
        }else {
          if (pokemonId === this.pokemon.id) {
            this.puntuacion +=1
            this.message = 'Has acertado'
            this.msjboton = 'Siguiente ronda'
          }else {
            this.puntuacion = 0
            this.message = 'No has acertado'
            this.msjboton = 'Volver a jugar'
          }
        }
      },
      newGame(){
        this.pokemon= null,
            this.pokemonArray= [],
            this.showPokemon= false,
            this.message= '',
            this.tiempo = 10,
            this.opciones = true,
            this.mixedpokemons()
      },
      contadorfuncion(){
        debugger
        if (this.contador<this.tiempo){
          if (this.showPokemon===false){this.tiempo-=1}
        }else {
          this.checkPokemon(false)
          clearInterval()
          return
        }
      },
    },
    created() {
      const self = this
      setInterval(function (){
          self.contadorfuncion()
      },1000)
    }
    ,
    mounted() {
      this.mixedpokemons()
    }
  }
</script>

<style>
*{
  text-align: center;
}
</style>