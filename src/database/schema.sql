-- Criação da tabela perfis
CREATE TABLE perfis (
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
CREATE TABLE frentes (
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
CREATE TABLE categorias_ervas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criação da tabela ervas
CREATE TABLE ervas (
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
CREATE TABLE banhos (
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
CREATE TABLE banhos_ervas (
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
CREATE TABLE sobre (
  id INT PRIMARY KEY DEFAULT 1,
  texto TEXT NOT NULL,
  imagem VARCHAR(255),
  status ENUM('ativo', 'inativo') DEFAULT 'ativo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); 