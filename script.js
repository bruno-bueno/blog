const urlTodas= "https://api-rest-post-diegocandido.herokuapp.com/postagens";
const url="https://api-rest-post-diegocandido.herokuapp.com/postagem/";
const carrosselContainer = document.querySelector('#carrosselContainer');
const noticiaGrandeContainer = document.querySelector('#noticiaGrande');
const noticiaPequenaContainer = document.querySelector('#noticiaPequena');
let ativado=false;
let erro=false;
let index=0;

async function getPosts(){
    try{
        const response = await fetch(urlTodas);
        const data= await response.json();
        console.log(data);
         
        espalharPosts(data)
        index++;
    }catch{
    }

}

function espalharPosts(data){
    for(let i = 0; i < data.length; i++){
        if(i<2){
            criarCarrosel(data[i], i);
            console.log("criar carrossel")
        }else{
            if(i%2==0){
                criarNoticiaGrande(data[i], i);
                console.log("noticia grande");
            }else{
                criarNoticiaPequena(data[i], i);
                console.log("noticia pequena");
            }
        }
    }
            
}


function criarCarrosel(data, index){
    const div = document.createElement('div');
    if(ativado==false){
        div.className = 'carousel-item active carrossel';
        ativado=true;
    }else{
        div.className = 'carousel-item carrossel';
    }
     
    const imagem = document.createElement('img');
    imagem.className = 'd-block w-100 imgCarrossel';
    imagem.src = "https://api-rest-post-diegocandido.herokuapp.com"+data.thumbImage;
    imagem.alt = data.thumbImageAltText;
 
    const h2 = document.createElement('h2');
    h2.className = 'fs-3';
    h2.textContent = data.title;
 
    div.appendChild(imagem);
    div.appendChild(h2);
    
    div.addEventListener("click", function() {
        console.log(index)
        fetchModal(index);
    })
 
    carrosselContainer.appendChild(div);

}


function criarNoticiaGrande(data, index){
    const card = document.createElement("div");
    card.className = "card mb-3 w-100 noticiaGrande mt-5";

    const row = document.createElement("div");
    row.className = "row g-0";

    const imgDiv = document.createElement("div");
    imgDiv.className = "col-md-4";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid rounded-start";
    imagem.src = "https://api-rest-post-diegocandido.herokuapp.com"+data.thumbImage;
    imagem.alt =  data.thumbImageAltText;

    imgDiv.appendChild(imagem);

    const col = document.createElement("div");
    col.className = "col-md-8";

    const corpo = document.createElement("div");
    corpo.className = "card-body";

    const titulo = document.createElement("h5");
    titulo.className = "card-title fs-5";
    titulo.textContent = data.title;

    const descricao = document.createElement("p");
    descricao.className = "card-text fs-6";
    descricao.textContent = data.description;

    corpo.appendChild(titulo);
    corpo.appendChild(descricao);

    col.appendChild(corpo);

    row.appendChild(imgDiv);
    row.appendChild(col);

    card.appendChild(row);

    card.addEventListener("click", function() {
        console.log(index)
        fetchModal(index);
    })

    noticiaGrandeContainer.appendChild(card);

}

function criarNoticiaPequena(data, index){
    const card = document.createElement("div");
    card.className = "card mt-5 noticiaPequena";

    const imagem = document.createElement("img");
    imagem.className = "img-fluid rounded ";
    imagem.src = "https://api-rest-post-diegocandido.herokuapp.com"+data.thumbImage;
    imagem.alt =  data.thumbImageAltText;

    const titleElement = document.createElement("h5");
    titleElement.className = "card-title fs-5 px-2 rounded";
    titleElement.textContent = data.title; 

    card.appendChild(imagem);

    card.appendChild(titleElement);

    card.addEventListener("click", function() {
        console.log(index)
        fetchModal(index);
    })

    noticiaPequenaContainer.appendChild(card);
}

async function fetchModal(noticia){
    try{
        const response = await fetch(url+noticia);
        const data= await response.json();
        console.log(data);
        modal(data);
    }catch{
        console.error("deu pau")
    }
}

function modal(data){
    var modalTitle = document.querySelector('#exampleModal #titulo');
    var modalBody = document.querySelector('#exampleModal #body');
    
    modalTitle.textContent = data.title;
  
    var imagem = document.createElement('img');
    imagem.className="w-100";
    imagem.src = "https://api-rest-post-diegocandido.herokuapp.com"+data.thumbImage;
    imagem.alt = data.thumbImageAltText;  // Defina o texto alternativo da imagem
  
    var descricao = document.createElement('p');
    descricao.textContent = data.description;
  
    modalBody.innerHTML = '';  // Limpa qualquer conteúdo anterior
    modalBody.appendChild(imagem);
    modalBody.appendChild(descricao);

    var modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
}

getPosts();
