const cards = document.querySelectorAll('.memory-card')


let hasFlippedCard = false;
let lockboard = false;
let firstcard, secondcart

function flipcard() {
    if(lockboard) return;
    if(this === firstcard) return;
    this.classList.toggle('flip')

    if (!hasFlippedCard) {

        hasFlippedCard = true;
        firstcard = this;
    }
    else {
        hasFlippedCard = false;
        secondcart = this;
        let iscard = firstcard.dataset.framework === secondcart.dataset.framework;
        iscard ? disableCards() : unflipCards();
    }
}
function disableCards() {
    firstcard.removeEventListener('click',flipcard);
    secondcart.removeEventListener('click',flipcard);
    resetBoard();
}

function unflipCards() {
    lockboard = true;
    setTimeout(() => {
        firstcard.classList.remove('flip')
        secondcart.classList.remove('flip')
        lockboard = false;
        resetBoard();
    }, 1000);
}
function resetBoard(){
    [hasFlippedCard,lockboard] = [false,false];
    [firstcard,secondcart] = [null,null]
}
(function shuffle(){
    cards.forEach(card=>{
        let randomOps = Math.floor(Math.random()*12);
        card.style.order=randomOps;
    })
})();
cards.forEach(card => card.addEventListener('click', flipcard))