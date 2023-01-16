# Comandos
Aqui você vai encontrar todos os comandos que poderão ser utilizados para gerar os padrões e estruturas disponibilizadas pela **cli**

## init
O comando `init` é responsável por criar todos os arquivos **core** na pasta `src` do seu projeto,
estes arquivos serão usados como base para os próximos comandos.
```bash
npx clean-ddd-cli init
```
Após rodar o comando você poderá ver a seguinte estrutura de pastas em seu projeto.
```txt
.
└── src
    └── core
        ├── domain
        │   ├── errors
        │   ├── events
        │   └── types
        │
        ├── infra
        │   └── http
        │
        ├── protocols
        │
        ├── shares
        │   └── logic
        │
        └── test
            └── mock
```

---
## create aggregate
O comando `create aggregate` irá criar um agregado de domínio em uma pasta domain dentro de um módulo, para rodar este comando será preciso usar duas flags: 
    - `-m` indica há qual módulo este agregado pertence
    - `-n` indica o nome do agregado
```bash
npx clean-ddd-cli create aggregate -m user -n account
```
Ao rodar este comando você terá um _AccountAggregate_ na pasta `domain` no módulo _user_ 

---
## create entity
O comando `create entity` irá criar uma entidade de domínio em uma pasta domain dentro de um módulo, para rodar este comando será preciso usar duas flags: 
    - `-m` indica há qual módulo esta entidade pertence
    - `-n` indica o nome do entidade
```bash
npx clean-ddd-cli create entity -m user -n profile
```
Ao rodar este comando você terá um _ProfileEntity_ na pasta `domain` no módulo _user_ 

---
## create value-object
O comando `create value-object` irá criar um valor de objeto em uma pasta domain/value-object dentro de um módulo, para rodar este comando será preciso usar duas flags: 
- `-m` indica há qual módulo este value-object pertence
- `-n` indica o nome do value-object
```bash
npx clean-ddd-cli create value-object -m user -n address
```
Ao rodar este comando você terá um _Address_ na pasta `domain/value-object` no módulo _user_ 

---
## create mapper
O comando `create mapper` irá criar um mapper de uma class de domain na pasta mapper dentro de um módulo, para rodar este comando será preciso usar duas flags:
- `-m` indica há qual módulo este mapper pertence
- `-n` indica o nome do mapper
- `-t` indica o tipo do mapper que será criado. Opções: `aggregate`, `entity`, `value-object`
```bash
npx clean-ddd-cli create mapper -n address -m user -t value-object
```
Ao rodar este comando você terá um _AddressMapper_ na pasta `mapper` no módulo _user_ 

---
## create repository
O comando `create repository` irá criar um repositório do seu agregado pasta repository dentro de um módulo, para rodar este comando será preciso usar duas flags:
- `-m` indica há qual módulo este repositório pertence
- `-n` indica o nome do repositório
```bash
npx clean-ddd-cli create repository -n account -m user
```
Ao rodar este comando você terá a seguinte estrutura criada:
```txt
.
└── src
    └── modules
        └── repository
             ├── implementation
             │    └── account.repository.ts
             │
             ├── in-memory
             │    └── account.repository.ts
             │
             └── account.repository.interface.ts
```


---
## create use-case
O comando `create use-case` irá criar uma estrutura completa para o seu caso de uso, para rodar este comando será preciso usar duas flags: 
- `-m` indica há qual módulo o caso de uso pertence
- `-n` indica o nome que será usado nos arquivos do caso de uso, você pode passar vários valores para criar múltiplos casos de uso em um único comando
```bash
npx clean-ddd-cli create use-case -m user -n create-user create-profile
```
Ao rodar este comando você terá a seguinte estrutura criada:
```txt
.
└── src
    └── modules
        ├── createUser
        │    ├── controller.ts
        │    ├── dto.ts
        │    ├── type.ts
        │    ├── use-case.ts
        │    └── index.ts
        │
        └── create-profile
             ├── controller.ts
             ├── dto.ts
             ├── type.ts
             ├── use-case.ts
             └── index.ts
```