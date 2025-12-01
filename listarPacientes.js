carregarpacientes();



async function carregarpacientes() {
    let pacientes = await fetch("https://ifsp.ddns.net/webservices/clinicaMedica/pacientes");
    pacientes = await pacientes.json();
    let div = document.querySelector("#listaPacientes");
    let tabela = document.createElement("table");
    let thead = document.createElement("thead");
    let tr = document.createElement("tr");
    let th1 = document.createElement("th");
    let th2 = document.createElement("th");
    let th3 = document.createElement("th");
    th1.innerText = "nome paciente";
    th2.innerText = "data de Nascimento";
    th3.innerText = "opções";
    tr.append(th1, th2, th3);
    thead.append(tr);
    tabela.append(thead);
    let tbody = document.createElement("tbody");
    for (let paciente of pacientes) {
        let trx = document.createElement("tr");
        
        let consultasButtons = document.createElement("button");
        consultasButtons.innerText = "ver consultas"
        consultasButtons.setAttribute("data-idPaciente", `${paciente.id}`);
        consultasButtons.addEventListener("click", verConsultas);

        let excluirButton = document.createElement("button");
        excluirButton.innerText = "excluir"
        excluirButton.setAttribute("data-idPaciente", `${paciente.id}`);
        excluirButton.addEventListener("click", excluirPaciente);
        
        let alterarButton = document.createElement("button");
        alterarButton.innerText = "alterar";
        alterarButton.setAttribute("data-idPaciente", `${paciente.id}`);
        alterarButton.addEventListener("click", alterarPaciente);
        let divx = document.createElement("div")
        divx.append(consultasButtons, alterarButton, excluirButton);
        let nome = document.createElement("td");
        let dataNascimento = document.createElement("td");
        nome.innerText = paciente.nome;
        dataNascimento.innerText = paciente.dataNascimento;
        trx.append(nome, dataNascimento,divx);
        tbody.append(trx);
    }
    tabela.append(tbody);
    div.append(tabela);

}
async function excluirPaciente(e){
    let options = {
        method : "DELETE",
        headers :
        {
            "Content-type": "application/json."
        }
    };
    let id = e.target.getAttribute("data-idPaciente");
    try{
        let retorno = await fetch(`https://ifsp.ddns.net/webservices/clinicaMedica/pacientes/${id}`, options);
        if(!retorno.ok){
            throw new Error("falha ao excluir");
        }
        console.log("sucesso ao excluir");
    }
    catch(error){
        console.log(error.message);
    }
}
async function alterarPaciente(e){
    let nome;
    let dataNascimento
    let options = {
        method : "PUT",
        body:JSON.stringify({
            "nome": nome,
            "dataNascimento": dataNascimento
        }),
        headers:{
            "Content-type":"application/json."
        }
    }

}
async function verConsultas(e){
    console.log(e.target.getAttribute("data-idPaciente"))
}

