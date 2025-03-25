-- Script completo para configuração do banco de dados ylespace-ceremony

-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS ylespace_ceremony;

-- Criação do usuário e concessão de privilégios
CREATE USER IF NOT EXISTS 'ylespace_user'@'localhost' IDENTIFIED BY 'ylespace123';
GRANT ALL PRIVILEGES ON ylespace_ceremony.* TO 'ylespace_user'@'localhost';
FLUSH PRIVILEGES;

-- Seleciona o banco de dados para uso
USE ylespace_ceremony;

-- Criação da tabela perfis
CREATE TABLE IF NOT EXISTS perfis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  orixa VARCHAR(100) NOT NULL,
  nascimento DATE NOT NULL,
  batizado DATE NOT NULL,
  imagem VARCHAR(255),
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela frentes
CREATE TABLE IF NOT EXISTS frentes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  imagem VARCHAR(255),
  ordem_exibicao INT NOT NULL,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela categorias_ervas
CREATE TABLE IF NOT EXISTS categorias_ervas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela ervas
CREATE TABLE IF NOT EXISTS ervas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  subtitulo VARCHAR(200) NOT NULL,
  texto TEXT NOT NULL,
  imagem VARCHAR(255),
  categoria_id INT,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias_ervas(id) ON DELETE SET NULL
);

-- Criação da tabela banhos
CREATE TABLE IF NOT EXISTS banhos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  subtitulo VARCHAR(200) NOT NULL,
  descricao TEXT,
  modo_preparo TEXT,
  imagem VARCHAR(255),
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela de relacionamento banhos_ervas
CREATE TABLE IF NOT EXISTS banhos_ervas (
  banho_id INT,
  erva_id INT,
  quantidade VARCHAR(50),
  modo_uso TEXT,
  PRIMARY KEY (banho_id, erva_id),
  FOREIGN KEY (banho_id) REFERENCES banhos(id) ON DELETE CASCADE,
  FOREIGN KEY (erva_id) REFERENCES ervas(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela sobre
CREATE TABLE IF NOT EXISTS sobre (
  id INT PRIMARY KEY DEFAULT 1,
  texto TEXT NOT NULL,
  imagem VARCHAR(255),
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela de usuários para autenticação
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserção de um usuário admin padrão (senha: admin123)
INSERT INTO usuarios (nome, email, senha, role) VALUES 
('Administrador', 'admin@ylespace.com', '$2b$10$X/XQvjlmhS6xh.RH8zqCq.Ql5wYtgP1VC9tJnJqh1rFgSW0m5gvHe', 'admin');

-- Inserção de dados iniciais para a tabela sobre
INSERT INTO sobre (texto, imagem) VALUES 
('YleSpace Ceremony é um espaço dedicado à celebração e preservação das tradições e rituais sagrados. Nossa missão é conectar pessoas com a sabedoria ancestral através de ervas, banhos e conhecimentos tradicionais.', 'sobre.jpg');

SELECT 'Banco de dados configurado com sucesso!' AS mensagem;