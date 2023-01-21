# Começando

## Requisitos

> É necessário ter um projeto iniciado com TypeScript

---

## Iniciando

> Todos os comandos abaixo podem ser usado através dos gerenciadores **npx** ou **yarn**

<br>

### Base do projeto

Instale como dependência de desenvolvimento

```bash
# npm
npm install --save-dev clean-ddd-cli
```

A partir de agora você pode começar a utilizar a CLI para reestruturar seu projeto, você pode seguir o exemplo a seguir para criar um módulo **user**

---

Primeiramente vamos precisar rodar um **init** para criar os arquivos core do projeto.

```bash
npx clean-ddd-cli init
```

> o comando init sempre deve ser rodado, pois os comando a seguir dependem dos arquivos core que serão adicionado ao seu projeto.

---

### Domínio

Vamos criar o domínio do nosso projeto, o módulo será **_user_** composto por um **agregado account, uma entidade profile e um valor de objeto address.**

```bash
# Comando para criar o agregado
npx clean-ddd-cli create aggregate -n account -m user

# Comando para criar a entidade
npx clean-ddd-cli create entity -n profile -m user

# Comando para criar o valor de objeto
npx clean-ddd-cli create value-object -n address -m user
```

#### Flags

> As duas flag são sempre **obrigatórias**

- -n: nome
- -m: modulo

---

### Casos de Uso

Agora podemos criar nossos casos de uso

```bash
npx clean-ddd-cli create use-case -n create-accout show-account block-account reset-password-account -m user
```

> o comando de criação de **use-case** aceita criar diversos items apenas passando o nome deles depois do **-n**

#### Flags

> As duas flag são sempre **obrigatórias**

- -n: nome
  - Aceita diversos parâmetros
- -m: modulo

---

### Mappers

Iremos criar os nossos **mappers** para posteriormente usar e nossos repositórios

```bash
# Mapper para o agregado
npx clean-ddd-cli create mapper -t aggregate -n account -m user

# Mapper para a entidade
npx clean-ddd-cli create mapper -t entity -n profile -m user

# Mapper para o valor de objeto
npx clean-ddd-cli create mapper -t value-object -n address -m user
```

#### Flags

> As duas flag são sempre **obrigatórias**

- -t: type
  - aggregate
  - entity
  - value-object
- -n: nome
- -m: modulo

---

### Repositório

Para finalizar vamos criar nosso repositório

```bash
# Repositório para o agregado
npx clean-ddd-cli create repository -n account -m user
```

#### Flags

> As duas flag são sempre **obrigatórias**

- -n: nome
- -m: modulo
