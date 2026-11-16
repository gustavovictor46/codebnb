import bcrypt from 'bcryptjs';

try {
    process.loadEnvFile();
} catch {
    console.error('   ❌ parceria ... arquivo .env não encontrado');
    process.exit(1);
}

const { criptografar } = await import('../src/lib/cripto.js');
const { prisma } = await import('../src/lib/prisma.js');

// Seed completo com 4 registros para cada tabela correspondente ao schema
const dados = {
    usuario: [
        { nome: 'admin', senha: bcrypt.hashSync('admin123', 10) },
        { nome: 'joao_silva', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'maria_souza', senha: bcrypt.hashSync('senha123', 10) },
        { nome: 'pedro_santos', senha: bcrypt.hashSync('senha123', 10) }
    ],
    cliente: [
        { nome: 'Ana Oliveira', cpf: criptografar('111.111.111-11'), celular: '(11) 91111-1111' },
        { nome: 'Bruno Costa', cpf: criptografar('222.222.222-22'), celular: '(11) 92222-2222' },
        { nome: 'Carlos Mendes', cpf: criptografar('333.333.333-33'), celular: '(11) 93333-3333' },
        { nome: 'Diana Rocha', cpf: criptografar('444.444.444-44'), celular: '(11) 94444-4444' }
    ],
    imoveis: [
        { endereco: 'Rua das Flores, 123 - Centro', cliente_id: 1 },
        { endereco: 'Avenida Brasil, 1500 - Bela Vista', cliente_id: 2 },
        { endereco: 'Praça da Sé, 45 - Sé', cliente_id: 3 },
        { endereco: 'Alameda Santos, 987 - Cerqueira César', cliente_id: 4 }
    ],
    alugueis: [
        { data: new Date('2026-01-15T10:00:00Z'), imoveis_id: 1 },
        { data: new Date('2026-02-20T14:30:00Z'), imoveis_id: 2 },
        { data: new Date('2026-05-10T09:15:00Z'), imoveis_id: 3 },
        { data: new Date('2026-11-05T16:45:00Z'), imoveis_id: 4 }
    ],
};

// Pegamos as tabelas na ordem inversa (alugueis, imoveis, cliente, usuario) 
// para evitar problemas de restrição de chave estrangeira (embora o CASCADE já ajude)
const tabelas = Object.keys(dados).reverse().join(', ');

await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tabelas} RESTART IDENTITY CASCADE`);
console.log('   🧹 registros anteriores apagados (ids reiniciados)');

// Inserindo os dados respeitando a ordem correta das dependências (chaves estrangeiras)
for (const [tabela, data] of Object.entries(dados)) {
    const { count } = await prisma[tabela].createMany({ data });
    console.log(`   ✅ ${tabela}: ${count} registros inseridos com sucesso`);
}

await prisma.$disconnect();