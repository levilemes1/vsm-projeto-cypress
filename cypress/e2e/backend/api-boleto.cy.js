describe('Verificar a geração de boletos', () => {

    const boletos = require('../../fixtures/boletos.json');
    boletos.forEach((newBoleto) => {
        it(`Gerar boleto ${newBoleto.bancoDtoNome}`, () => {
            cy.request({
                method: 'POST',
                url: newBoleto.url,
                headers: {
                    "X-Token": newBoleto.xtoken
                },
                body: {
                    "carteiraDto": {
                        "codigo": newBoleto.carteiraDtoCodigo,
                        "nome": newBoleto.carteiraDtoNome,
                        "codigoDaContaCaixa": newBoleto.carteiraDtoCodigoDaContaCaixa,
                        "layoutCaixa": newBoleto.carteiraDtoLayoutCaixa
                    },
                    "cedenteDto": {
                        "razaoSocial": newBoleto.cedenteDtoRazaoSocial,
                        "cnpj": newBoleto.cedenteDtoCnpj
                    },
                    "sacadoDto": {
                        "nome": newBoleto.sacadoDtoNome,
                        "cpfCnpj": newBoleto.sacadoDtoCpfCnpj,
                        "logradouro": newBoleto.sacadoDtoLogradouro,
                        "numero": newBoleto.sacadoDtoNumero,
                        "bairro": newBoleto.sacadoDtoBairro,
                        "cep": newBoleto.sacadoDtoCep,
                        "cidade": newBoleto.sacadoDtoCidade,
                        "uf": newBoleto.sacadoDtoUf
                    },
                    "contaDto": {
                        "agencia": newBoleto.contaDtoAgencia,
                        "digitoVerificadorAgencia": newBoleto.contaDtoDigitoVerificadorAgencia,
                        "numero": newBoleto.contaDtoNumero,
                        "operacaoCaixa": newBoleto.contaDtoOperacaoCaixa,
                        "postoAtendimentoSicredi": newBoleto.contaDtoPostoAtendimentoSicredi
                    },
                    "bancoDto": {
                        "codigoBanco": newBoleto.bancoDtoCodigoBanco,
                        "nome": newBoleto.bancoDtoNome
                    },
                    "nossoNumero": newBoleto.nossoNumero,
                    "numeroDocumento": newBoleto.numeroDocumento,
                    "dataVencimento": newBoleto.dataVencimento,
                    "valorDebito": newBoleto.valorDebito,
                    "multa": newBoleto.multa,
                    "jurosDia": newBoleto.jurosDia,
                    "valorDeDescontoPorDia": newBoleto.valorDeDescontoPorDia,
                    "dataDescontoPorDia": newBoleto.dataDescontoPorDia,
                    "valorDeAbatimentoQuandoPagoAntes": newBoleto.valorDeAbatimentoQuandoPagoAntes,
                    "dataAbatimentoQuandoPagoAntes": newBoleto.dataAbatimentoQuandoPagoAntes,
                    "primeiraInstrucao": newBoleto.primeiraInstrucao,
                    "segundaIntsrucao": newBoleto.segundaIntsrucao,
                    "terceiraInstrucao": newBoleto.terceiraInstrucao,
                    "quartaInstrucao": newBoleto.quartaInstrucao
                },
            }).then((response) => {
                expect(response.status).to.be.equal(200);
                expect(response.body).is.not.empty;
                expect(response.body).to.have.property('id');
                expect(response.body).to.have.property('key');
                expect(response.body).to.have.property('url');
                console.log(response.body);
            });
        });
    });
});
