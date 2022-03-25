let ts = '1646960091'; // = Math.floor(Date.now() / 1000)

const timeStamp = '1646960091';
const apiKey = "6743e1cbd20007c611988f36076f2ad0";
const md5 = "b1d69cebf11cebc9858cc290355d1993";
let limite = 100;

fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=${limite}`
).then((response) => {
    return response.json();
}).then((jsonParsed) =>{
    console.log(jsonParsed);

    const creditosHTML = jsonParsed.attributionHTML

    criarFooter(creditosHTML);

    jsonParsed.data.results.forEach(element =>{

        const srcImage = element.thumbnail.path + "." + element.thumbnail.extension;
        const nameHero = element.name;
        let descricao = element.description;
        if (descricao.length == 0){
            descricao = ("Without Description")
        }
        const comics = element.comics.items;
        const series = element.series.items;

        criar(srcImage, nameHero, descricao, comics, series);
        

    })

})

let criar = (srcImage, nameHero, descricao, comics, series) => {

    let div = document.createElement("div");
    let img = document.createElement("img");
    let nome = document.createElement("h2");
    let description = document.createElement("p");
    let divPrincipal = document.getElementById("root");
    
    divPrincipal.classList.add("content")
    divPrincipal.appendChild(div);
    div.appendChild(img);
    
    img.src = srcImage;
    img.classList.add("fotoHeroi");

    div.classList.add("container");

    div.appendChild(nome);
    nome.textContent = nameHero;  
    nome.classList.add("titulo");

    let construir = () => {

        let divHero = document.createElement("div");
        divHero.classList.add("divHero");

        let heroTitulo = document.createElement("div");
        heroTitulo.classList.add("heroTitulo");

        let fundo = document.createElement("div");
        fundo.classList.add("fundo");
        
        let heroName = document.createElement("h2");
        heroName.classList.add("heroName");
        heroName.textContent = nameHero;

        let fecharCard = document.createElement("button");
        fecharCard.classList.add("fecharCard");
        fecharCard.id= "botaoCard";
        fecharCard.textContent = "X"

        let imageHero = document.createElement("img");
        imageHero.classList.add("imageHero");
        imageHero.src = srcImage;

        let divDescription = document.createElement("div");
        divDescription.classList.add("divItems");

        let tituloDescription = document.createElement("h3");
        tituloDescription.classList.add("tituloComics")
        tituloDescription.textContent = "Hero Description"
        divDescription.appendChild(tituloDescription);

        let descriptionHero = document.createElement("p");
        descriptionHero.classList.add("descriptionHero");
        descriptionHero.textContent = descricao;
        divDescription.appendChild(descriptionHero);

        let divComics = document.createElement("div");
        divComics.classList.add("divItems");

        let tituloComics = document.createElement("h3");
        tituloComics.classList.add('tituloComics');
        tituloComics.textContent = "Hero Comics";
        divComics.appendChild(tituloComics);

        let divSeries = document.createElement("div");
        divSeries.classList.add("divItems");

        let tituloSeries = document.createElement("h3");
        tituloSeries.classList.add("tituloComics");
        tituloSeries.textContent = "Hero Series";
        divSeries.appendChild(tituloSeries);


        divPrincipal.appendChild(fundo);
        divPrincipal.appendChild(divHero);
        divHero.appendChild(heroTitulo);
        heroTitulo.appendChild(heroName);
        heroTitulo.appendChild(fecharCard);
        divHero.appendChild(imageHero);
        divHero.appendChild(divDescription);
        divHero.appendChild(divComics);
        divHero.appendChild(divSeries);
        let i = 0;
        while(i < comics.length) {
            let comicsName = document.createElement("p");
            comicsName.classList.add("heroItems");
            comicsName.textContent = comics[i].name;
            divComics.appendChild(comicsName);
            i++;
        }

        let s = 0;
        while(s < series.length) {
            let seriesName = document.createElement("p");
            seriesName.classList.add("heroItems");
            seriesName.textContent = series[s].name;
            divSeries.appendChild(seriesName);
            s++
        }
                
        setTimeout(function(){
            divHero.classList.add("visivel");
            fundo.classList.add("visivel")
        }, 0)

        let desconstruir = () => {
            divHero.classList.remove('visivel');
            fundo.classList.remove('visivel');
            divPrincipal.removeChild(fundo)
            divPrincipal.removeChild(divHero);
        }

        fecharCard.addEventListener("click", desconstruir);
        fundo.addEventListener("click", desconstruir);
    }

    
    
    div.addEventListener("click", construir);
}

let footer = document.getElementById("footer");

let criarFooter = (HTML) =>{
    
    let div1 = document.createElement("div");
    div1.innerHTML = `
        <div class='creditos'=>
            <div>
                <p>Developed by Matheus de Brito Leoncio Salim using a marvel API</p>
            </div>
            <div id="contatos">
                <ul>
                    <li><a href="https://github.com/matheusdebrito" class="link"><img class="icone" alt="icone" src="assets/github.png" target="_blank"></a></li>
                    <li><a href="https://www.linkedin.com/in/matheus-de-brito/" class="link"><img class="icone" alt="icone" src="assets/linkedin.png" target="_blank"></a></li>
                    <li><a href="mailto:matheusdebrito81@gmail.com" class="link" target="_blank"><img class="icone" alt="icone" src="assets/gmail.png"></a></li>
                    <li><a href="https://api.whatsapp.com/send?1=pt_BR&phone=5521964878569" class="link" target="_blank"><img class="icone" alt="icone" src="assets/whatsapp.png"></a></li>
                </ul>
            </div>
        </div>
    `
    footer.appendChild(div1);
    
    let div2 = document.createElement("div");
    footer.appendChild(div2);
    div2.innerHTML = HTML;
}
