CREATE DATABASE saep_db;
\c saep_db

CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(100) NOT NULL UNIQUE,
    celular VARCHAR(20)
);

CREATE TABLE imoveis (
    id SERIAL PRIMARY KEY,
    endereco VARCHAR(200) NOT NULL,
    cliente_id INTEGER NOT NULL REFERENCES cliente (id)
);

CREATE TABLE alugueis (
    id SERIAL PRIMARY KEY,
    data DATE NOT NULL,
    imoveis_id INTEGER NOT NULL REFERENCES imoveis (id)
);

INSERT INTO usuario (nome, senha) VALUES ('admin', '$2b$10$v9kKRtINjRjRtkHjgB8I3OWIL/WrQLr76AhioXpIvUBr09/lnZejG');
INSERT INTO usuario (nome, senha) VALUES ('joao_silva', '$2b$10$GGV/rZlr79qTDyj4l6IxruTjaumL8Qp8Nm8PpcI91.XCFULEt2Td2');
INSERT INTO usuario (nome, senha) VALUES ('maria_souza', '$2b$10$aL.9FSk.WUTsUOAn374VYe/suZmVS2zE2qClBgyCYOzyjMXYu.8NK');
INSERT INTO usuario (nome, senha) VALUES ('pedro_santos', '$2b$10$zStgg2O1P76b7zmbJdJKUuELLUI5sd.s3H5Fp3paDvQ9PAt.z9QZO');

INSERT INTO cliente (nome, cpf, celular) VALUES ('Ana Oliveira', 'd7380180d9e74c7b503a1916979a8ea3', '(11) 91111-1111');
INSERT INTO cliente (nome, cpf, celular) VALUES ('Bruno Costa', '741b895083d9adc5a0c9c19e3cb5d542', '(11) 92222-2222');
INSERT INTO cliente (nome, cpf, celular) VALUES ('Carlos Mendes', 'dfbcca59c81e1974b0e8dd3393ee81dc', '(11) 93333-3333');
INSERT INTO cliente (nome, cpf, celular) VALUES ('Diana Rocha', '9768ffd29e47e9bbe76079a1af2b3e0f', '(11) 94444-4444');

INSERT INTO imoveis (endereco, cliente_id) VALUES ('Rua das Flores, 123 - Centro', 1);
INSERT INTO imoveis (endereco, cliente_id) VALUES ('Avenida Brasil, 1500 - Bela Vista', 2);
INSERT INTO imoveis (endereco, cliente_id) VALUES ('Praça da Sé, 45 - Sé', 3);
INSERT INTO imoveis (endereco, cliente_id) VALUES ('Alameda Santos, 987 - Cerqueira César', 4);

INSERT INTO alugueis (data, imoveis_id) VALUES ('2026-01-15', 1);
INSERT INTO alugueis (data, imoveis_id) VALUES ('2026-02-20', 2);
INSERT INTO alugueis (data, imoveis_id) VALUES ('2026-05-10', 3);
INSERT INTO alugueis (data, imoveis_id) VALUES ('2026-11-05', 4);
