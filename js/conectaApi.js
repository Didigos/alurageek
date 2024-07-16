async function listaProdutos() {
    const conexao = await fetch('http://localhost:3000/produtos');
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function criaProduto(titulo, descricao, imagem, preco) {
    const conexao = await fetch('http://localhost:3000/produtos', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: descricao,
            imagem: imagem,
            preco: preco
        })
    });

    const conexaoPostConvertida = await conexao.json();
    return conexaoPostConvertida;
}

async function deletaProduto(id) {
    const conexao = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE"
    });

    const conexaoDeleteConvertida = await conexao.json(); // Corrigido: await para aguardar a conversão para JSON
    return conexaoDeleteConvertida;
}

// Executando a função listaProdutos() ao importar o módulo
listaProdutos();

// Exportando as funções
export const conectaApi = {
    listaProdutos,
    criaProduto,
    deletaProduto
};
