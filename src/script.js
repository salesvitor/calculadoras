function calcularINSS(salarioBruto) {
    let inss = 0;
    if (salarioBruto <= 1412.00) {
        inss = salarioBruto * 0.075;
    } else if (salarioBruto <= 2666.68) {
        inss = 1412.00 * 0.075 + (salarioBruto - 1412.00) * 0.09;
    } else if (salarioBruto <= 4000.03) {
        inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (salarioBruto - 2666.68) * 0.12;
    } else if (salarioBruto <= 7786.02) {
        inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salarioBruto - 4000.03) * 0.14;
    } else {
        inss = 1412.00 * 0.075 + (2666.68 - 1412.00) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14;
    }
    return inss;
}

function calcularIRPF(baseIRPF) {
    let irpf = 0;
    if (baseIRPF <= 2259.20) {
        irpf = 0;
    } else if (baseIRPF <= 2826.65) {
        irpf = (baseIRPF - 2259.20) * 0.075;
    } else if (baseIRPF <= 3751.05) {
        irpf = (2826.65 - 2259.20) * 0.075 + (baseIRPF - 2826.65) * 0.15;
    } else if (baseIRPF <= 4664.68) {
        irpf = (2826.65 - 2259.20) * 0.075 + (3751.05 - 2826.65) * 0.15 + (baseIRPF - 3751.05) * 0.225;
    } else {
        irpf = (2826.65 - 2259.20) * 0.075 + (3751.05 - 2826.65) * 0.15 + (4664.68 - 3751.05) * 0.225 + (baseIRPF - 4664.68) * 0.275;
    }
    return irpf;
}

function calcularSalarioLiquido() {
    // Captura os valores dos campos, com tratamento para campos vazios
    let salarioBruto = parseFloat(document.getElementById("salariobruto").value) || 0;
    let dependentes = parseInt(document.getElementById("dependentes").value) || 0;
    let pensao = parseFloat(document.getElementById("pensao").value) || 0;
    let previdenciaPrivada = parseFloat(document.getElementById("previdenciaprivada").value) || 0;
    let outrosDescontos = parseFloat(document.getElementById("outrosdescontos").value) || 0;

    // Definir dedução por dependente
    const deducaoDependente = 189.59;

    // Cálculo do INSS
    let inss = calcularINSS(salarioBruto);

    // Base para IRPF: salário bruto - INSS - dedução por dependentes - previdência privada
    let baseIRPF = salarioBruto - inss - (dependentes * deducaoDependente) - previdenciaPrivada;

    // Cálculo do IRPF
    let irpf = calcularIRPF(baseIRPF);

    // Cálculo de descontos totais
    let totalDescontos = inss + irpf + pensao + previdenciaPrivada + outrosDescontos;

    // Cálculo do salário líquido
    let salarioLiquido = salarioBruto - totalDescontos;

    // Exibe a tabela de resultado
    document.getElementById("resultadoTabela").innerHTML = `
        <table class="table table-bordered mt-4">
            <thead class="thead-light">
                <tr>
                    <th>Descrição</th>
                    <th>Proventos (R$)</th>
                    <th>Descontos (R$)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Salário Bruto</td>
                    <td>${salarioBruto.toFixed(2)}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>INSS</td>
                    <td></td>
                    <td>${inss.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>IRPF</td>
                    <td></td>
                    <td>${irpf.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Pensão Alimentícia</td>
                    <td></td>
                    <td>${pensao.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Previdência Privada</td>
                    <td></td>
                    <td>${previdenciaPrivada.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Outros Descontos</td>
                    <td></td>
                    <td>${outrosDescontos.toFixed(2)}</td>
                </tr>
                <tr class="font-weight-bold">
                    <td>Salário Líquido</td>
                    <td>${salarioLiquido.toFixed(2)}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    `;
}