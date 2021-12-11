import './../scss/main.scss'

var inputMessage = document.querySelector('#message')
var send = document.querySelector('#send')
var iconSend = document.querySelector('#sendIcon')
var name = document.querySelector('#name')
var next = document.querySelector('#next')
var chatBot = document.querySelector('#chatBot')
var enterName = document.querySelector('#enterName')
var divMessage = document.querySelector('#divMessage')
var messageWelcome = document.querySelector('#messageWelcome')
var messageIA = document.querySelector('.message-IA')
var index = 0

const user = {
    name: ''
}

const Adara = {
    name: 'Adara'
}

send.disabled = true
next.disabled = true

fetch('http://127.0.0.1:8000/api/getToken', {
    method: 'GET',
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}).then(res => res.json())
.catch(error => alert('Opps algo salió mal...'))
.then(response => document.querySelector('input[name=_token]').value =  response.response)

inputMessage.onkeyup = () => {
    if(inputMessage.value.trim() != ""){
        iconSend.style.fill = '#bc178ced'
        send.style.cursor = 'pointer'
        send.disabled = false
    }else{
        iconSend.style.fill = '#707070'
        send.style.cursor = 'default'
        send.disabled = true
    }
}

name.onkeyup = () => {
    if(name.value.trim() != "" && name.value.trim().length > 2 && name.value.trim().toLowerCase() != Adara.name.toLowerCase()){
        next.disabled = false
        user.name = name.value
    }else{
        next.disabled = true
    }
}

send.onclick = () => {
    insertMessage(user.name, inputMessage.value, false)
}

inputMessage.onkeypress = function (e) {
    if (e.keyCode == 13) {
        insertMessage(user.name, inputMessage.value, false)
    }
}

const insertMessage = (entity, message, spinner) => {
    let newMessage = ""
    let cardMessages = document.querySelector('.card-body')
    if(entity != Adara.name && message.trim() != ""){
        newMessage = '<div class="messages message-User" id="'+entity+'-'+index+'"><p><strong>'+entity+': </strong>'+message+'</p></div>'
        inputMessage.value = ""
        iconSend.style.fill = '#707070'
        send.style.cursor = 'default'
        send.disabled = true
        inputMessage.disabled = true
        setTimeout ( () => connect(entity, message), 800)
    }else if(entity == 'Adara'){
        if(spinner){
            newMessage = message
        }else{
            newMessage = '<div class="messages message-IA" id="'+entity+'-'+index+'"><p><strong>'+entity+': </strong>'+message+'</p></div>'
        }
    }else{
        send.disabled = true
    }
    cardMessages.innerHTML += newMessage
    if(!spinner){
        var idMessage = document.querySelector("#"+entity+'-'+index)
        setTimeout ( () => cardMessages.scrollTop = cardMessages.scrollHeight, 800)
        setTimeout ( () => idMessage.classList.add("active"), 300)
    }
    index=index+1
}

next.onclick = () => {
    console.log('asd')
    showChat()
}

name.onkeypress = function (e) {
    if (e.keyCode == 13) {
        showChat()
    }
}

function showChat(){
    console.log('asd')
    if(name.value.trim() != "" && name.value.trim().length > 2){
        console.log('asd')
        chatBot.classList.add("active")
        inputMessage.classList.add("active")
        enterName.classList.add("inactive")
        document.querySelector('#name').remove()
        inputMessage.focus()
        setTimeout ( () => divMessage.style.zIndex = 1, 1000)
        messageWelcome.innerHTML = '<strong>Adara:</strong>'+ " Hola "+user.name+'! soy Adara, en que te puedo ayudar?'
        messageIA.classList.add("active")
    }
}

function connect(user, message){
    var url = 'http://127.0.0.1:8000/api/chatBot'
    var data = {user: user, message: message}

    insertLoadin()

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-CSRF-Token": document.querySelector('input[name=_token]').value
        }
    }).then(res => res.json())
    .catch(error => alert('Opps algo salió mal...'))
    .then(response => responseIA(response) )
}

function responseIA(response){
    setTimeout ( () => document.querySelector('.spinner').remove(), 800)
    insertMessage(Adara.name, response.response, false)
    send.disabled = false
    setTimeout ( () => inputMessage.disabled = false, 1000)
    setTimeout ( () => inputMessage.focus(), 1000)
}

function insertLoadin(){
    var spinner = '<div class="message-IA"><svg xmlns="http://www.w3.org/2000/svg" class="spinner" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff" width="74px" height="74px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><defs><clipPath id="ldio-ln4pybw5ac9-cp" clipPathUnits="userSpaceOnUse"><rect x="0" y="50" width="100" height="50"></rect></clipPath><pattern id="ldio-ln4pybw5ac9-pattern" patternUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect x="0" y="0" width="100" height="100" fill="#eedf49"></rect><circle cx="13" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 138;0 -38" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.121212121212121s" repeatCount="indefinite"></animateTransform></circle><circle cx="98" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 105;0 -5" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.6363636363636365s" repeatCount="indefinite"></animateTransform></circle><circle cx="49" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 141;0 -41" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.606060606060606s" repeatCount="indefinite"></animateTransform></circle><circle cx="8" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 122;0 -22" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.5454545454545454s" repeatCount="indefinite"></animateTransform></circle><circle cx="69" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 120;0 -20" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.5454545454545454s" repeatCount="indefinite"></animateTransform></circle><circle cx="59" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 118;0 -18" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.42424242424242425s" repeatCount="indefinite"></animateTransform></circle><circle cx="32" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 112;0 -12" keyTimes="0;1" dur="3.0303030303030303s" begin="-2s" repeatCount="indefinite"></animateTransform></circle><circle cx="12" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 138;0 -38" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.5454545454545454s" repeatCount="indefinite"></animateTransform></circle><circle cx="53" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 121;0 -21" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.9393939393939394s" repeatCount="indefinite"></animateTransform></circle><circle cx="3" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 143;0 -43" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.6363636363636365s" repeatCount="indefinite"></animateTransform></circle><circle cx="7" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 118;0 -18" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.1515151515151514s" repeatCount="indefinite"></animateTransform></circle><circle cx="62" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 148;0 -48" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.8484848484848486s" repeatCount="indefinite"></animateTransform></circle><circle cx="94" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 121;0 -21" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.21212121212121213s" repeatCount="indefinite"></animateTransform></circle><circle cx="56" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 118;0 -18" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.8484848484848485s" repeatCount="indefinite"></animateTransform></circle><circle cx="79" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 129;0 -29" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.393939393939394s" repeatCount="indefinite"></animateTransform></circle><circle cx="76" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 120;0 -20" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.1818181818181819s" repeatCount="indefinite"></animateTransform></circle><circle cx="84" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 126;0 -26" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.1515151515151514s" repeatCount="indefinite"></animateTransform></circle><circle cx="16" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 132;0 -32" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.0303030303030303s" repeatCount="indefinite"></animateTransform></circle><circle cx="49" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 108;0 -8" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.3333333333333333s" repeatCount="indefinite"></animateTransform</circle><circle cx="98" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 151;0 -51" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.8484848484848484s" repeatCount="indefinite"></animateTransform></circle><circle cx="3" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 144;0 -44" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.8484848484848484s" repeatCount="indefinite"></animateTransform></circle><circle cx="93" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 140;0 -40" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.5454545454545454s" repeatCount="indefinite"></animateTransform></circle><circle cx="68" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 113;0 -13" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.9393939393939394s" repeatCount="indefinite"></animateTransform></circle><circle cx="14" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 108;0 -8" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.09090909090909091s" repeatCount="indefinite"></animateTransform></circle><circle cx="79" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 140;0 -40" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.36363636363636365s" repeatCount="indefinite"></animateTransform></circle><circle cx="13" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 130;0 -30" keyTimes="0;1" dur="3.0303030303030303s" begin="-1s" repeatCount="indefinite"></animateTransform></circle><circle cx="14" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 142;0 -42" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.1818181818181819s" repeatCount="indefinite"></animateTransform></circle><circle cx="5" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 142;0 -42" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.6666666666666667s" repeatCount="indefinite"></animateTransform></circle><circle cx="66" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 106;0 -6" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.42424242424242425s" repeatCount="indefinite"></animateTransform></circle><circle cx="52" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 108;0 -8" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.5151515151515151s" repeatCount="indefinite"></animateTransform></circle><circle cx="93" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 106;0 -6" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.2424242424242424s" repeatCount="indefinite"></animateTransform></circle><circle cx="62" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 133;0 -33" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.5454545454545454s" repeatCount="indefinite"></animateTransform></circle><circle cx="8" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 118;0 -18" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.24242424242424243s" repeatCount="indefinite"></animateTransform></circle><circle cx="42" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 127;0 -27" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.9393939393939394s" repeatCount="indefinite"></animateTransform></circle><circle cx="49" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 147;0 -47" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.30303030303030304s" repeatCount="indefinite"></animateTransform></circle><circle cx="52" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 133;0 -33" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.1515151515151514s" repeatCount="indefinite"></animateTransform></circle><circle cx="44" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 104;0 -4" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.0606060606060606s" repeatCount="indefinite"></animateTransform></circle><circle cx="99" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 143;0 -43" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.24242424242424243s" repeatCount="indefinite"></animateTransform></circle><circle cx="54" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 108;0 -8" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.4848484848484849s" repeatCount="indefinite"></animateTransform></circle><circle cx="22" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 150;0 -50" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.7272727272727273s" repeatCount="indefinite"></animateTransform></circle><circle cx="61" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 132;0 -32" keyTimes="0;1" dur="3.0303030303030303s" begin="-2.9696969696969697s" repeatCount="indefinite"></animateTransform></circle><circle cx="58" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 144;0 -44" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.2121212121212122s" repeatCount="indefinite"></animateTransform></circle><circle cx="38" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 121;0 -21" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.9696969696969697s" repeatCount="indefinite"></animateTransform></circle><circle cx="46" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 136;0 -36" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.09090909090909091s" repeatCount="indefinite"></animateTransform></circle><circle cx="22" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 127;0 -27" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.15151515151515152s" repeatCount="indefinite"></animateTransform></circle><circle cx="84" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 119;0 -19" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.3636363636363635s" repeatCount="indefinite"></animateTransform></circle><circle cx="17" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 117;0 -17" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.42424242424242425s" repeatCount="indefinite"></animateTransform></circle><circle cx="31" cy="0" r="2" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 137;0 -37" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.45454545454545453s" repeatCount="indefinite"></animateTransform></circle><circle cx="48" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 119;0 -19" keyTimes="0;1" dur="3.0303030303030303s" begin="-1.4848484848484849s" repeatCount="indefinite"></animateTransform></circle><circle cx="12" cy="0" r="3" fill="#ffffff"><animateTransform attributeName="transform" type="translate" values="0 151;0 -51" keyTimes="0;1" dur="3.0303030303030303s" begin="-0.12121212121212122s" repeatCount="indefinite"></animateTransform></circle></pattern></defs><path fill="url(#ldio-ln4pybw5ac9-pattern)" clip-path="url(#ldio-ln4pybw5ac9-cp)" d="M59,37.3V18.9c3-0.8,5.1-3.6,5.1-6.8C64.1,8.2,61,5,57.1,5H42.9c-3.9,0-7.1,3.2-7.1,7.1c0,3.2,2.2,6,5.1,6.8v18.4c-11.9,3.8-20.6,15-20.6,28.2C20.4,81.8,33.7,95,50,95s29.6-13.2,29.6-29.6C79.6,52.2,70.9,41.1,59,37.3z"></path><path fill="none" stroke="#e15b8b" stroke-width="5" d="M59,37.3V18.9c3-0.8,5.1-3.6,5.1-6.8C64.1,8.2,61,5,57.1,5H42.9c-3.9,0-7.1,3.2-7.1,7.1c0,3.2,2.2,6,5.1,6.8v18.4c-11.9,3.8-20.6,15-20.6,28.2C20.4,81.8,33.7,95,50,95s29.6-13.2,29.6-29.6C79.6,52.2,70.9,41.1,59,37.3z"></path></svg></div>'
    insertMessage(Adara.name, spinner, true)
}