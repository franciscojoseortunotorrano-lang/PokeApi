console.log("estudio en el ces vegamedia");

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const arrayPromesas = [];

    // 1. Guardamos todas las promesas de petición en un arreglo
    for (let i = 495; i < 650; i++) {
        arrayPromesas.push(fetchData(i));
    }

    // 2. Esperamos a que TODAS se completen (conserva el orden del bucle)
    const listaPokemones = await Promise.all(arrayPromesas);

    // 3. Pintamos en pantalla uno por uno en orden
    listaPokemones.forEach(pokemon => {
        if (pokemon) pintarCard(pokemon);
    });
}

async function fetchData(id) {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
        const data = await res.json();
        return data; // Retornamos los datos para que Promise.all los reciba
    } catch (error) {
        console.log(error);
    }
}

/*function init(){
    const aleatorio=getRandomInt(495,650);
    for(i = 495; i <650 ; i++ ){
        
        fetchData(i);
    }
    
}*/

//Retoma un entero aleatorio entre min y max (no incluido max)
function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max-min)) +min;
}

/*async function fetchData(id) {
    try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon/"+id);
        const data = await res.json()
        pintarCard(data);


    } catch (error) {
        console.log(error);
    }
}*/

function pintarCard(pokemon){
    console.log(pokemon)
    const flex = document.querySelector(".flex")
    const template = document.querySelector("#template-card").content

    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.sprites.other.dream_world.front_default)

    clone.querySelector('.card-header').setAttribute('src', "./images/"+pokemon.types[0].type.name+".svg")
    
    clone.querySelector(".card-body-title").innerHTML =
    `${pokemon.name} <span>${pokemon.stats[0].base_stat} Hp</span>`;
    
    clone.querySelector(".card-body-text").textContent = "total: "+(parseInt(pokemon.stats[0].base_stat) + parseInt(pokemon.stats[1].base_stat) + parseInt(pokemon.stats[2].base_stat) + parseInt(pokemon.stats[3].base_stat) + parseInt(pokemon.stats[4].base_stat) + parseInt(pokemon.stats[5].base_stat));
    
    clone.querySelectorAll(".card-footer-social h3")[0].textContent = pokemon.stats[1].base_stat;
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = pokemon.stats[2].base_stat;
    clone.querySelectorAll(".card-footer-social h3")[2].textContent = pokemon.stats[3].base_stat;
    clone.querySelectorAll(".card-footer-social h3")[3].textContent = pokemon.stats[4].base_stat;
    clone.querySelectorAll(".card-footer-social h3")[4].textContent = pokemon.stats[5].base_stat;
    
    fragment.appendChild(clone)
    flex.appendChild(fragment)

}


