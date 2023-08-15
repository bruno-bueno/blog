const url= "https://api-rest-post-diegocandido.herokuapp.com/postagem/";
const carrosselContainer = document.querySelector('#carrosselContainer');
const noticiaGrandeContainer = document.querySelector('#noticiaGrande');
const noticiaPequenaContainer = document.querySelector('#noticiaPequena');
let ativado=false;
let erro=false;
let index=0;

async function getPosts(){
    try{
        const response = await fetch(url+index);
        const data= await response.json();
        console.log(data);
        await espalharPosts(index,data.thumbImage, data.thumbImageAltText, data.title, data.description)
        index++;
        getPosts();
    }catch{
    }

}

async function espalharPosts(index,img,alt,title,description){
    console.log(index)
    if(index<2){
        await criarCarrosel(img,alt,title);
        console.log("criar carrossel")
    }else{
        if(index%2==0){
            criarNoticiaGrande(img,alt,title,description);
            console.log("noticia grande");
        }else{
            criarNoticiaPequena(img,alt,title);
            console.log("noticia pequena");
        }
    }
}


function criarCarrosel(img,alt,title){
    const div = document.createElement('div');
    if(ativado==false){
        div.className = 'carousel-item active carrossel';
        ativado=true;
    }else{
        div.className = 'carousel-item carrossel';
    }
     
    const imagem = document.createElement('img');
    imagem.className = 'd-block w-100 imgCarrossel';
    imagem.src = "https://api-rest-post-diegocandido.herokuapp.com"+img;
    imagem.alt = alt;
 
    const h2 = document.createElement('h2');
    h2.className = 'fs-3';
    h2.textContent = title;
 
    div.appendChild(imagem);
    div.appendChild(h2);
 
    carrosselContainer.appendChild(div);

}


function criarNoticiaGrande(img,alt,title,description){
    const card = document.createElement("div");
    card.className = "card mb-3 w-100 noticiaGrande mt-5";

    const row = document.createElement("div");
    row.className = "row g-0";

    const imgDiv = document.createElement("div");
    imgDiv.className = "col-md-4";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid rounded-start";
    imagem.src = "https://api-rest-post-diegocandido.herokuapp.com"+img;
    imagem.alt = alt;

    imgDiv.appendChild(imagem);

    const col = document.createElement("div");
    col.className = "col-md-8";

    const corpo = document.createElement("div");
    corpo.className = "card-body";

    const titulo = document.createElement("h5");
    titulo.className = "card-title fs-5";
    titulo.textContent = title;

    const descricao = document.createElement("p");
    descricao.className = "card-text fs-6";
    descricao.textContent = description;

    corpo.appendChild(titulo);
    corpo.appendChild(descricao);

    col.appendChild(corpo);

    row.appendChild(imgDiv);
    row.appendChild(col);

    card.appendChild(row);

    noticiaGrandeContainer.appendChild(card);
}

function criarNoticiaPequena(img,alt,title){
    const card = document.createElement("div");
    card.className = "card mt-5 noticiaPequena";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid rounded ";
    imagem.src = "https://api-rest-post-diegocandido.herokuapp.com"+img;
    imagem.alt = alt;

    const titleElement = document.createElement("h5");
    titleElement.className = "card-title fs-5 px-2 rounded";
    titleElement.textContent = title; 

    card.appendChild(imagem);

    card.appendChild(titleElement);

    noticiaPequenaContainer.appendChild(card);
}

getPosts();
