/* Descrizione**
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 1 -
 Creiamo il nostro array di oggetti che rappresentano ciascun post. Ogni post dovrà avere le informazioni necessarie per stampare la relativa card:
id del post, numero progressivo da 1 a n
nome autore,
foto autore,
data in formato americano (mm-gg-yyyy),
testo del post,
immagine (non tutti i post devono avere una immagine),
numero di likes.
Non è necessario creare date casuali Per le immagini va bene utilizzare qualsiasi servizio di placeholder ad es. Unsplash (https://unsplash.it/300/300?image=<id>)
[qui, la base dati ve la passo, ma in caso le img che ci sono on funzionino, potete sostituirle in quel modo]
Milestone 2 -
Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed.
Milestone 3 -
Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
**BONUS
Formattare le date in formato italiano (gg/mm/aaaa)
Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).
Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone. */

const myPostBox = document.querySelector(".posts-list");
const likedPostsId = [];

posts.forEach((post)=> formatDate(post.created));
posts.forEach((post)=> createPostTemplate(post));
posts.forEach((post)=> createFallbackImgEl(post));
posts.forEach((post)=> likeDislike(post));



// dichiarazione funzioni

function formatDate(date){
    const [a, b, c, d, e, f, g, h, i, l] = date;
    const formattedDate = i + l + h + f + g + e + a + b + c + d;
    date = formattedDate;
}

function createPostTemplate(post){
    const myPost = document.createElement("div");
    myPost.classList.add("post");
    myPostBox.append(myPost);

    myPost.innerHTML = `
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon img${post.id}">
                <img class="profile-pic" src="${post.author.image}" alt="${post.author.name}">                    
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${post.author.name}</div>
                <div class="post-meta__time">${post.created}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${post.content}</div>
    <div class="post__image">
        <img src="${post.media}" alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#" data-postid="${post.id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
            </div>
        </div> 
    </div>
    `
}

function createFallbackImgEl(post){
    if (post.author.image === null){
        let initialsOfName = "";
        for (let i=0; i < post.author.name.length; i++){
            if (post.author.name[i] == post.author.name[i].toUpperCase() && post.author.name[i] != " "){
                initialsOfName += post.author.name[i];
            }
        }
        const imgBox = document.querySelector(`.img${post.id}`);
        const imgFallbackEl = document.createElement("div");
        imgFallbackEl.innerText = initialsOfName;
        imgBox.append(imgFallbackEl);

        const nullImg = document.querySelector(`.img${post.id} [src="null"]`);
        nullImg.style.display = "none";

        imgFallbackEl.style.width = "60px";
        imgFallbackEl.style.height = "60px";
        imgFallbackEl.style.backgroundColor = "blue";
        imgFallbackEl.style.color = "white";
        imgFallbackEl.style.borderRadius = "50%";
        imgFallbackEl.style.fontSize = "40px";
        imgFallbackEl.style.fontWeight = "600";
        imgFallbackEl.style.textAlign = "center";
    }
}

function likeDislike(post){
    const likeButton = document.querySelector(`[data-postid="${post.id}"]`);

    likeButton.addEventListener("click", iLikeIt);

    function iLikeIt(event){
        event.preventDefault();
        likeButton.classList.add("like-button--liked");
        post.likes++;
        likedPostsId.push(post.id);

        const likesCounter = document.getElementById(`like-counter-${post.id}`);
        likesCounter.innerHTML = post.likes;

        likeButton.removeEventListener("click", iLikeIt);
        likeButton.addEventListener("click", iDontLikeIt);
    }

    function iDontLikeIt(event){
        event.preventDefault();
        likeButton.classList.remove("like-button--liked");
        post.likes--;

        const likesCounter = document.getElementById(`like-counter-${post.id}`);
        likesCounter.innerHTML = post.likes;

        likeButton.removeEventListener("click", iDontLikeIt);
        likeButton.addEventListener("click", iLikeIt);
    }
}