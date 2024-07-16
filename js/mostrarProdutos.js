import { conectaApi } from './conectaApi.js'

const lista = document.querySelector("[data-lista]");
const formulario = document.querySelector('[data-formulario]')

function constroiProduto(id, titulo, descricao, imagem, preco) {

    const produto = document.createElement("li");
    produto.className = "produto";
    produto.innerHTML = `

    <div class="produt_img">
        <img src="${imagem}" alt="${titulo}">                
    </div>
    <h1 class="produto_titulo">${titulo}</h1>
    <div class="produto_preco">
        <h2>$ ${preco}</h2>
        <div class="delete_icon"><img src="./img/trash_icon.png" alt="lixeira" data-id="${id}"></div>
    </div>

`

    const botaoDelete = produto.querySelector('.delete_icon');
    botaoDelete.addEventListener('click', async (evento) => {
        const idProduto = evento.target.getAttribute('data-id');
        console.log('ID do produto:', idProduto); // Adicionado para debug
        if (idProduto) {
            await conectaApi.deletaProduto(idProduto);
            produto.remove(); // Remove o produto da interface após excluí-lo
        } else {
            console.error('ID do produto não encontrado.');
        }
    });

    return produto;
}

async function listaProduto() {
    const listaApi = await conectaApi.listaProdutos()
    listaApi.forEach(elemento => lista.appendChild(
        constroiProduto(elemento.id, elemento.titulo, elemento.descricao, elemento.imagem, elemento.preco)));
} listaProduto();




async function criarProduto(evento) {
    evento.preventDefault();

    const titulo = document.querySelector("[data-titulo]").value;
    const descricao = document.querySelector("[data-descricao]").value;
    const imagem = document.querySelector("[data-imagem]").value;
    const preco = document.querySelector("[data-preco]").value;

    await conectaApi.criaProduto(titulo, descricao, imagem, preco);

    alert('Envio concluido!')
}

formulario.addEventListener("submit", evento => criarProduto(evento));