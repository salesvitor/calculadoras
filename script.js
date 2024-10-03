// Função para substituir vírgula por ponto antes de converter o valor para número
function parseInput(input) {
    return parseFloat(input.replace(",", "."));
}

function formatarValorBRL(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularINSS(salarioBruto) {
    let inss = 0;
    let faixainss1 = 1412;
    let faixainss2 = 2666.68;
    let faixainss3 = 4000.03;
    let faixainss4 = 7786.02;
    if (salarioBruto <= faixainss1) {
        inss = salarioBruto * 0.075;
    } else if (salarioBruto <= faixainss2) {
        inss = faixainss1 * 0.075 + (salarioBruto - faixainss1) * 0.09;
    } else if (salarioBruto <= faixainss3) {
        inss = faixainss1 * 0.075 + (faixainss2 - faixainss1) * 0.09 + (salarioBruto - faixainss2) * 0.12;
    } else if (salarioBruto <= faixainss4) {
        inss = faixainss1 * 0.075 + (faixainss2 - faixainss1) * 0.09 + (faixainss3 - faixainss2) * 0.12 + (salarioBruto - faixainss3) * 0.14;
    } else {
        inss = faixainss1 * 0.075 + (faixainss2 - faixainss1) * 0.09 + (faixainss3 - faixainss2) * 0.12 + (faixainss4 - faixainss3) * 0.14;
    }
    return inss;
}

function calcularIRPF(baseIRPF) {
    let irpf = 0;
    let faixairpf1 = 2259.20;
    let faixairpf2 = 2826.65;
    let faixairpf3 = 3751.05;
    let faixairpf4 = 4664.68; 
    if (baseIRPF <= faixairpf1) {
        irpf = 0;
    } else if (baseIRPF <= faixairpf2) {
        irpf = (baseIRPF - faixairpf1) * 0.075;
    } else if (baseIRPF <= faixairpf3) {
        irpf = (faixairpf2 - faixairpf1) * 0.075 + (baseIRPF - faixairpf2) * 0.15;
    } else if (baseIRPF <= faixairpf4) {
        irpf = (faixairpf2 - faixairpf1) * 0.075 + (faixairpf3 - faixairpf2) * 0.15 + (baseIRPF - faixairpf3) * 0.225;
    } else {
        irpf = (faixairpf2 - faixairpf1) * 0.075 + (faixairpf3 - faixairpf2) * 0.15 + (faixairpf4 - faixairpf3) * 0.225 + (baseIRPF - faixairpf4) * 0.275;
    }
    return irpf;
}

function calcularSalarioLiquido() {
    // Captura os valores dos campos, com tratamento para campos vazios e substituição de vírgula por ponto
    let salarioBruto = parseInput(document.getElementById("salariobruto").value) || 0;
    let dependentes = parseInt(document.getElementById("dependentes").value) || 0;
    let pensao = parseInput(document.getElementById("pensao").value) || 0;
    let previdenciaPrivada = parseInput(document.getElementById("previdenciaprivada").value) || 0;
    let outrosDescontos = parseInput(document.getElementById("outrosdescontos").value) || 0;

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

    // Exibe a tabela de resultado, formatando valores no padrão brasileiro
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
                    <td>${formatarValorBRL(salarioBruto)}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>INSS</td>
                    <td></td>
                    <td>${formatarValorBRL(inss)}</td>
                </tr>
                <tr>
                    <td>IRPF</td>
                    <td></td>
                    <td>${formatarValorBRL(irpf)}</td>
                </tr>
                <tr>
                    <td>Pensão Alimentícia</td>
                    <td></td>
                    <td>${formatarValorBRL(pensao)}</td>
                </tr>
                <tr>
                    <td>Previdência Privada</td>
                    <td></td>
                    <td>${formatarValorBRL(previdenciaPrivada)}</td>
                </tr>
                <tr>
                    <td>Outros Descontos</td>
                    <td></td>
                    <td>${formatarValorBRL(outrosDescontos)}</td>
                </tr>
                <tr class="font-weight-bold">
                    <td>Salário Líquido</td>
                    <td colspan="2">${formatarValorBRL(salarioLiquido)}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    `;
}