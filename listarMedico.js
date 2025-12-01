carregarDados();
async function carregarDados() {
    try {
        let retorno = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/medicos");
        if (!retorno.ok) {
            throw new Error("falha na requisição");
        }
        retorno = await retorno.json();
        let div = document.querySelector("#listaMedicos");
        let tabela = document.createElement("table");
        let thead = document.createElement("thead");
        let tr = document.createElement("tr");
        let th1 = document.createElement("th");
        let th2 = document.createElement("th");
        let th3 = document.createElement("th");
        let th4 = document.createElement("th");

        th1.innerText = "nome médico";
        th2.innerText = "especialidade";
        th3.innerText = "data de Cadastro";
        th4.innerText = "opções";
        tr.append(th1, th2, th3, th4);
        thead.append(tr);
        tabela.append(thead);
        let tbody = document.createElement("tbody");
        for (let medico of retorno) {
            let listaEspecialidade = await especialidades();
            let trx = document.createElement("tr");
            let nome = document.createElement("td");
            let especialidade = document.createElement("td");
            let dataCadastro = document.createElement("td");
            let opcoes = document.createElement("div");
            let consultasButton = document.createElement("button");
            let alterarButton = document.createElement("button");
            let excluirButton = document.createElement("button");
            consultasButton.setAttribute("data-idMedico", `${medico.id}`);
            alterarButton.setAttribute("data-idMedico", `${medico.id}`);
            excluirButton.setAttribute("data-idMedico", `${medico.id}`);
            consultasButton.addEventListener("click", consultasMedico);
            alterarButton.addEventListener("click", alterarMedico);
            excluirButton.addEventListener("click", excluirMedico);
            consultasButton.innerText = "consultas";
            alterarButton.innerText = "alterar";
            excluirButton.innerText = "excluir";
            opcoes.append(consultasButton, alterarButton, excluirButton);
            nome.innerText = medico.nome;
            let especialidadeNome = listaEspecialidade.filter((especialidade) => (medico.idEspecialidade == especialidade.id))
            especialidadeNome = especialidadeNome[0].nome;
            especialidade.innerText = especialidadeNome;
            dataCadastro.innerText = medico.dataCadastro;
            trx.append(nome, especialidade, dataCadastro, opcoes);
            tbody.append(trx);
        }
        tabela.append(tbody);
        div.append(tabela);

    }
    catch (error) {
        console.log(error.message);
    }
}
async function especialidades() {
    try {
        let especialidade = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/especialidades");
        if (!especialidade.ok) {
            throw new Error("não foi possivel obter especialidades");
        }
        especialidade = await especialidade.json();
        return especialidade;
    }
    catch (error) {
        console.log(error.message);
    }
}
async function consultasMedico(e) {
    console.log(e.target)
}
async function alterarMedico(e) {
    let nome;
    let idEspecialidade; 
    let options = {
        method : "PUT", 
        body:JSON.stringify({
            "nome": nome, 
            "idEspecialidade" : idEspecialidade
        }),
        headers:{
            "Content-type":"application/json."
        }
    }
}
    
async function excluirMedico(e) {
   let idMedico = e.target.getAttribute("data-idMedico");
    let options = {
        method: "DELETE",
        headers: {
            "Content-type" : "application/json."
        }
    }
    try{
    let retorno = await fetch(`https://ifsp.ddns.net/webservices/clinicaMedica/medicos/${idMedico}`, options);
    if(!retorno.ok){
        throw new Error("falha ao excluir medico")
    }
    console.log("sucesso ao excluir")
}
    catch(error){
        console.log(error.message);
    }
}
