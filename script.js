// VARIÁVEIS
let currentTheme = "dark";
let menuOpen = false;

// FUNÇÃO PARA TROCAR DE TEMA
function changeTheme() {
    // ENCONTRAR O ESTILO DO DOCUMENTO
    const rootVars = document.documentElement.style;

    // DEFINIR AS NOVAS PROPRIEDADES BASEADO NO VALOR DA VARIÁVEL "currentTheme"
    const newGradient = getComputedStyle(document.documentElement).getPropertyValue('--'+currentTheme+'-gradient');             // NOVO GRADIENTE
    const newText = getComputedStyle(document.documentElement).getPropertyValue('--'+currentTheme+'-text');                     // NOVA COR DE TEXTO
    const newSecondaryText = getComputedStyle(document.documentElement).getPropertyValue('--'+currentTheme+'-secondary-text');  // NOVA COR DE TEXTO SECUNDÁRIO
    const newMainBorder = getComputedStyle(document.documentElement).getPropertyValue('--'+currentTheme+'-border');             // NOVA COR DE BORDA
    const newHighlight = getComputedStyle(document.documentElement).getPropertyValue('--'+currentTheme+'-highlight');           // NOVO DESTAQUE
    
    // ALTERAR AS VARIÁVEIS :root
    rootVars.setProperty('--main-gradient', newGradient);               // TROCAR GRADIENTE
    rootVars.setProperty('--main-text', newText);                       // TROCAR COR DE TEXTO
    rootVars.setProperty('--main-secondary-text', newSecondaryText);    // TROCAR COR DE TEXTO SECUNDÁRIO
    rootVars.setProperty('--main-border', newMainBorder);               // TROCAR COR DA BORDA
    rootVars.setProperty('--main-highlight', newHighlight);             // TROCAR DESTAQUE

    // TROCAR IMAGENS BASEADO NO TEMA
    document.getElementById("theme-button").innerHTML = '<img src="imagens/'+currentTheme+'-mode.png">';        // TROCAR IMAGEM DO BOTÃO DE TEMA
    document.getElementById("side-theme-button").innerHTML = '<img src="imagens/'+currentTheme+'-mode.png">';   // TROCAR IMAGEM DO BOTÃO DE TEMA DA BARRA LATERAL
    document.getElementById("menu-button").innerHTML = '<img src="imagens/menu-'+currentTheme+'.png">';         // TROCAR IMAGEM DO BOTÃO DE MENU

    // TROCAR IMAGEM DO LINK PARA O GITHUB
    document.getElementById("github-button").innerHTML = '<img src="imagens/github-'+currentTheme+'.png"> <a href="https://github.com/Amanankaa" title="Meu GitHub">GitHub</a>';
    // TROCAR IMAGEM DO LINK PARA O LINKEDIN
    document.getElementById("linkedin-button").innerHTML = '<img src="imagens/linkedin-'+currentTheme+'.png"> <a href="https://www.linkedin.com/in/n%C3%ADcolas-krenchiglova-micaloski-7abb8427a/" title="Meu LinkedIn">LinkedIn</a>';
}

// FUNÇÃO PARA O CLIQUE DO BOTÃO DE TEMA
function themeButtonClick() {
    // CASO O TEMA ATUAL SEJA ESCURO, TROCAR PARA O CLARO, CASO CONTRÁRIO, TROCAR PARA O ESCURO
    if (currentTheme == 'dark') {
        currentTheme = 'light';
    } else {
        currentTheme = 'dark';
    }

    // ALTERAR O TEMA
    changeTheme();
}

// FUNÇÃO PARA FECHAR MENSAGEM
function closeMessage() {
    // ENCONTRAR A MENSAGEM NO DOCUMENTO
    const msg = document.getElementById("msg");

    // APLICAR A CLASSE DE ANIMAÇÃO
    msg.classList.add("close-message-animation");

    // ESPERAR 200 MILISSEGUNDOS E REMOVER A MENSAGEM
    setTimeout(function() {msg.remove()}, 200);
}

// FUNÇÃO PARA CRIAR MENSAGEM
function createMessage(mode, title, message) {
    // CASO O DOCUMENTO JÁ TENHA UMA MENSAGEM SENDO EXIBIDA, REMOVÊ-LA
    if (document.getElementById("msg")) document.getElementById("msg").remove();

    // DEFINIR A COR DA MENSAGEM BASEADO NO MODO ("success" OU "error")
    const messageColor = getComputedStyle(document.documentElement).getPropertyValue('--'+mode+'-background');
    // CRIAR A DIV DA MENSAGEM:
    /*
    <div class="mensagem" onclick="closeMessage()" id="msg" style="background: COR-DA-MENSAGEM"> 
        <img src="imagens/MODO-icon.png"> 

        <section> 
            <h1>TÍTULO</h1> 
            <p>MENSAGEM</p> 
        </section> 
    </div>
    */
    const newMessage = '<div class="mensagem" onclick="closeMessage()" id="msg" style="background: '+messageColor+'"> <img src="imagens/'+mode+'-icon.png"> <section> <h1>'+title+'</h1> <p>'+message+'</p> </section> </div>';
    // INSERIR DIV NO CORPO
    document.body.insertAdjacentHTML("beforeend", newMessage);
}

// FUNÇÃO PARA O CLIQUE DO BOTÃO DE ENVIAR MENSAGEM
function enviarButtonClick() {
    // ENCONTRAR OS INPUTS DO FORMULÁRIO
    const nome = document.getElementById("nome-input");         // ENCONTRAR O CAMPO DO NOME
    const email = document.getElementById("email-input");       // ENCONTRAR O CAMPO DO E-MAIL
    const assunto = document.getElementById("assunto-input");   // ENCONTRAR O CAMPO DO ASSUNTO
    const mensagem = document.getElementById("mensagem-input"); // ENCONTRAR O CAMPO DA MENSAGEM

    // VERIFICAR SE CADA UM DOS CAMPOS ESTÃO VAZIOS E, CASO SIM, EXIBIR UMA MENSAGEM DE ERRO EQUIVALENTE, RETORNANDO A FUNÇÃO EM SEGUIDA
    // VERIFICAR CAMPO DO NOME
    if (nome.value.length == 0) {
        createMessage("error", "Campo Não Preenchido!", "O campo 'Nome' precisa estar preenchido para enviar uma mensagem.");
        return;
    }

    // VERIFICAR CAMPO DO E-MAIL
    if (email.value.length == 0) {
        createMessage("error", "Campo Não Preenchido!", "O campo 'E-Mail' precisa estar preenchido para enviar uma mensagem.");
        return;
    }

    // VERIFICAR CAMPO DO ASSUNTO
    if (assunto.value.length == 0) {
        createMessage("error", "Campo Não Preenchido!", "O campo 'Assunto' precisa estar preenchido para enviar uma mensagem.");
        return;
    }

    // VERIFICAR CAMPO DA MENSAGEM
    if (mensagem.value.length == 0) {
        createMessage("error", "Campo Não Preenchido!", "O campo 'Mensagem' precisa estar preenchido para enviar uma mensagem.");
        return;
    }

    // VALIDAR O E-MAIL E ENVIAR UMA MENSAGEM DE ERRO CASO NÃO SEJA VÁLIDO, RETORNANDO A FUNÇÃO EM SEGUIDA
    if (!email.checkValidity()) {
        createMessage("error", "E-Mail Inválido!", "O E-Mail digitado não é válido.");
        return;
    }

    // CRIAR UMA MENSAGEM DE SUCESSO
    createMessage("success", "Mensagem Enviada!", "A sua mensagem foi enviada com sucesso!");

    // REDEFINIR OS CAMPOS
    nome.value = "";
    email.value = "";
    assunto.value = "";
    mensagem.value = "";
}

// FUNÇÃO PARA O CLIQUE DO BOTÃO DE MENU
function menuButtonClick() {
    // ENCONTRAR O MENU, INCLUINDO O BOTÃO E A BARRA LATERAL
    const menu = document.getElementById("menu");

    // DECLARAR A VARIÁVEL PARA POSICIONAR O MENU
    let finalPosition;
    // ALTERAR O VALOR DO MENU
    menuOpen = !menuOpen;

    // TOCAR A ANIMAÇÃO CORRETA BASEADO NO ESTADO DO MENU E ALTERAR O VALOR DA POSIÇÃO FINAL PARA O VALOR EQUIVALENTE
    if (menuOpen) {
        menu.classList.add("open-menu-animation");
        finalPosition = "0";
    } else {
        menu.classList.add("close-menu-animation");
        finalPosition = "-205";
    }

    // ESPERAR 200 MILISSEGUNDOS E ENTÃO FIXAR A POSIÇÃO DO MENU E REMOVER AS CLASSES DE ANIMAÇÃO
    setTimeout(function() {
        menu.style.right = finalPosition+"px";
        menu.classList.remove("open-menu-animation");
        menu.classList.remove("close-menu-animation");
    }, 200);
}