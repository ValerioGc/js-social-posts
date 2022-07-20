const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// ContainerDom
const container = document.getElementById('container');

// Array immagini piaciute
const lPic = [];

// Bottone like e contatore
const likesBTN = document.getElementsByClassName(`like-button`);
const likesIN = document.getElementsByClassName('js-likes-counter')

// Ciclo generazione Pagina
for (let i = 0; i < posts.length; i++) {
// Definizione key in variabili
    let date = reverse(posts[i].created);
    let likes = posts[i].likes;
    let id = posts[i].id;
    let author = posts[i].author;
// Definizione key in array>obj in variabili
    let authName = author.name;
    let authImg = author.image;
// Generazione Dinamica contenuti
    container.innerHTML +=
        `   <div class="post">
                <div class="post__header">
                    <div class="post-meta">
                        <div class="post-meta__icon">
                            <img class="profile-pic" src="${authImg}" alt="${authName}">
                        </div>
                        <div class="post-meta__data">
                            <div class="post-meta__author">${authName}</div>
                            <div class="post-meta__time">${date}</div>
                        </div>
                    </div>
                </div>
                <div class="post__text">${posts[i].content}</div>
                <div class="post__image">
                    <img src="${posts[i].media}" alt="Media ${i}">
                </div>
                <div class="post__footer">
                    <div class="likes js-likes">
                        <div class="likes__cta">
                            <a class="like-button js-like-button" href="#" data-postid="${id}">
                                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                <span class="like-button__label">Mi Piace</span>
                            </a>
                        </div>
                        <div class="likes__counter">
                            Piace a <b id="like-counter-${i + 1}" class="js-likes-counter">${likes}</b> persone
                        </div>
                    </div>
                </div>
            </div>
        `
// Controllo valore Immagine
    if (authImg == null) {
        authImg = getInitial(authName);
        let postIcon = document.getElementsByClassName('post-meta__icon');
        postIcon[i].innerHTML =
            `   <div class="usrIn">
                    ${authImg}
                </div>
        `;
    }
    
// Controllo click bottone Mi piace
    let contrLike = true;
// Event listner bottoni
    for (let x = 0; x < likesBTN.length; x++) {    
        let idPost = likesBTN[x].getAttribute('data-postid');
        likesBTN[x].addEventListener('click', 
            function (event){
                event.preventDefault();
                if (contrLike == true) {
                    likes++;
                    console.log('like + =' + ' ' + likes);
                    this.style.color = 'green';
                // Reimposto controllo 
                    contrLike = false;
                } else {
                    likes--;
                    console.log('like -  =' + ' ' + likes);
                    this.style.color = 'black';
                // Reimposto controllo 
                    contrLike = true;             
                }
                likesIN[x].innerHTML = likes;
                // Funzione push/pop array
                pushEl(lPic, idPost);
                console.log(lPic);
            }
        );
    }
}
/*
    Funzioni 
*/
// Funzione creazione array post like
function pushEl ( array, element) {
    if (!array.includes(element)) {
        array.push(element);
    }else {
        array.pop(element);
    }
    return array;
}
// Funzione Conversione formato ora
function reverse(data) {
    let singleLetters = data.split("-");
    let reverseLetters = singleLetters.reverse('');
    let joinLetters = reverseLetters.join("-");
    return joinLetters;
}
// Function Prendi iniziali
function getInitial(nomeCompleto) {
    const nomeDiviso = nomeCompleto.split(' ');
    const initials = nomeDiviso.shift().charAt(0) + nomeDiviso.pop().charAt(0);
    return initials.toUpperCase();
}