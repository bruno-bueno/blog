const url= "https://api-rest-post-diegocandido.herokuapp.com/postagem/";
const carrosselContainer = document.querySelector('#carrosselContainer');
const noticiaGrandeContainer = document.querySelector('#noticiaGrande');
const noticiaPequenaContainer = document.querySelector('#noticiaPequena');
let ativado=false;
let erro=false;

async function getPosts(){
    let index=0;
    do{
        try{
            const response = await fetch(url+index);
            //console.log(response);
            const data= await response.json();
            //console.log(data)
            await espalharPosts(index,data.thumbImage, data.thumbImageAltText, data.title)
            index++;
        }catch{
            erro=true
        }
    }while(!erro);
}

async function espalharPosts(index,img,alt,title){
    console.log(index)
    if(index<2){
        await criarCarrosel(img,alt,title);
        console.log("criar carrossel")
    }else{
        if(index%2==0){
            criarNoticiaGrande();
            console.log("noticia grande");
        }else{
            criarNoticiaPequena();
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
    h2.className = 'fs-4';
    h2.textContent = title;
 
    div.appendChild(imagem);
    div.appendChild(h2);
 
    carrosselContainer.appendChild(div);

}


function criarNoticiaGrande(){

}

function criarNoticiaPequena(){

}

getPosts();
