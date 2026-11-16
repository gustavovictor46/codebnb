import { excluir, salvar } from '@actions/alugueis';
import Crud from '@components/Crud';
import { descriptografar } from '@lib/cripto';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Data', dataIndex: 'data' },
    { title: 'Endereco', dataIndex: 'imovel_endereco' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
    { title: 'CPF', dataIndex: 'cliente_cpf' },
];

export default async function Alugueis() {
    const [alugueis, imoveis] = await Promise.all([
        prisma.alugueis.findMany({
            orderBy: { data: 'asc' },
            include: { imoveis: { include: { cliente: true } } },
        }),
        prisma.imoveis.findMany({ orderBy: { endereco: 'asc' }, include: { cliente: true } }),
    ]);

    const registros = alugueis.map(({ id, data, imoveis_id, imoveis }) => ({
        id,
        imoveis_id,
        data: data.toISOString().slice(0, 10),
        imovel_endereco: imoveis.endereco,
        cliente_nome: imoveis.cliente.nome,
        cliente_cpf: descriptografar(imoveis.cliente.cpf),
    }));

    const campos = [
        { name: 'data', label: 'Data', tipo: 'date' },
        {
            name: 'imoveis_id',
            label: 'Imóvel',
            opcoes: imoveis.map((i) => ({ value: i.id, label: `${i.endereco} (${i.cliente.nome})` })),
        },
    ];

    return <Crud titulo="Alugueis" {...{ colunas, campos, registros, salvar, excluir }} />;
}