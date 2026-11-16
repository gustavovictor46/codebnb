import { excluir, salvar } from '@actions/imoveis';
import Crud from '@components/Crud';
import { prisma } from '@lib/prisma';

const colunas = [
    { title: 'Endereço', dataIndex: 'endereco' },
    { title: 'Cliente', dataIndex: 'cliente_nome' },
];

export default async function Imoveis() {
    const [imoveis, clientes] = await Promise.all([
        prisma.imoveis.findMany({ orderBy: { endereco: 'asc' }, include: { cliente: true } }),
        prisma.cliente.findMany({ orderBy: { nome: 'asc' } }),
    ]);

    const registros = imoveis.map(({ cliente, ...imovel }) => ({ ...imovel, cliente_nome: cliente.nome }));

    const campos = [
        { name: 'endereco', label: 'Endereço' },
        { name: 'cliente_id', label: 'Cliente', opcoes: clientes.map((c) => ({ value: c.id, label: c.nome })) },
    ];

    return <Crud titulo="Imóveis" {...{ colunas, campos, registros, salvar, excluir }} />;
}