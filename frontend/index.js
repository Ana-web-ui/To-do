const apiUrl = 'http://127.0.0.1:8001/tasks';

async function carregarTarefas() {
    const resposta = await fetch(apiUrl);
    const tarefas = await resposta.json();
    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const item = document.createElement('li');
        item.textContent = tarefa.nome;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.onclick = () => removerTarefa(index);

        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
}

async function adicionarTarefa() {
    const input = document.getElementById('nova-tarefa');
    const nomeTarefa = input.value.trim();

    if (nomeTarefa === '') return;

    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome: nomeTarefa }),
    });

    input.value = '';
    carregarTarefas();
}

async function removerTarefa(id) {
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });
    carregarTarefas();
}

// Carrega as tarefas ao abrir a página
carregarTarefas();
