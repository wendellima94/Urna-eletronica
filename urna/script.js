let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

const comecarEtapa = () => {
  let etapa = etapas[etapaAtual];

  let numeroHtml = '';
  numero = '';
  votoBranco = false;

  for(let i=0;i<etapa.numeros;i++) {
    if (i === 0) {
      numeroHtml += '<div class="numero pisca"></div>'
    } else {
      numeroHtml += '<div class="numero"></div>'
    }
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHtml;
}

const atualizaInterface = () => {
  let etapa = etapas[etapaAtual]
  let candidado = etapa.candidatos.filter((item) => {
    if(item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  if(candidado.length > 0) {
    candidado = candidado[0];
    seuVotoPara.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidado.nome}</br> Partido: ${candidado.partido}`
  
    let fotosHtml = '';
    for(let i in candidado.fotos) {
      if(candidado.fotos[i].small){
        fotosHtml += `<div class="d-1-image small"><img src="images/${candidado.fotos[i].url}" alt="">${candidado.fotos[i].legenda}</div>`
      } else {
        fotosHtml += `<div class="d-1-image"><img src="images/${candidado.fotos[i].url}" alt="">${candidado.fotos[i].legenda}</div>`
      }
    }
    lateral.innerHTML = fotosHtml ;
  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block' ;
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
  }
}

const cliclou = (n) => {
  let elementoNumero = document.querySelector('.numero.pisca')
  if(elementoNumero !== null) {
    elementoNumero.innerHTML = n;
    numero =`${numero}${n}`

    elementoNumero.classList.remove('pisca');
    if(elementoNumero.nextElementSibling !== null) {
      elementoNumero.nextElementSibling.classList.add('pisca');
    } else {
      atualizaInterface();
    }
  }
}

const branco = () => {
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block' ;
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

const corrige = () => {
  comecarEtapa()
}

const confirma = () => {
  let etapa = etapas[etapaAtual]

  let votoConfirmado = false;

  if(votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    });
  } else if (numero.length === etapa.numeros){
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    });
  }

  if(votoConfirmado) {
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
      console.log(votos)
    }
  }
}
comecarEtapa()