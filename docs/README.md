# clean-ddd-cli

> Construa seus projetos com padrões e estrutura de pastas pré-definidos sem acoplar bibliotecas em seu código.

A **clean-ddd-cli** nasceu com o objetivo de acelerar o desenvolvimento para projetos baseado nas estruturas do _**DDD**_ e _**Arquitetura Limpa**_.

Com a cli você vai ser capaz de criar seus agregados, entidades, valores de objetos, repositórios entre outros de forma simples sem criar dependências com nenhuma biblioteca.

_Mas como não vou depender de biblioteca?_ Para isso nossa cli vai clonar todas as class, interfaces e outros arquivos para uma pasta _core_ em seu projeto e quando for criado um agregado por exemplo todas as interfaces e classes abstratas serão importadas desta pasta. Assim seu projeto tem total autonomia de nossa cli, te dando liberdade para editar os arquivos e até mesmo parando de usa-la sem a necessidade de refatoração.

## Instalando

Você pode instalar a cli tanto como dependência de desenvolvimento em seu projeto, globalmente ou executar diretamente com os seguintes comandos:

```bash
 # Global
 npm install -g clean-ddd-cli
```

```bash
  # Dependência de desenvolvimento
  npm install -D clean-ddd-cli
```

```bash
  # Rotando diretamente
  npx clean-ddd-cli
```

## Sobre o DDD

!> Antes de qualquer coisa é importante saber que o **DDD** não é sobre tecnologia e vai alem de padrões de projetos e código. Para entender melhor recomendamos os livros [**Implementando DDD**](https://a.co/d/4n1CSUo) e o livro [**DDD: Atacando as complexidades no coração do software**](https://a.co/d/au4GoPQ). Você também pode ver os artigos do [**Khalil Stmmler**](https://khalilstemmler.com/articles/categories/domain-driven-design/) para entender mais sobre o **DDD**

DDD (Design Orientado ao Domínio) é uma abordagem de desenvolvimento de software que se concentra na modelagem do domínio de negócios para criar uma melhor compreensão do espaço de problema e projetar uma solução mais manutenível e escalável.

### Domínios

O conceito de domínios auxilia há organizar a lógica de negócios em três tipos de domínios:

1. **Domínio Principal**: Este é a parte mais importante do negócio e contém o conhecimento específico do negócio que é único e difícil de encontrar em outros lugares. Ele é o foco principal do desenvolvimento e é geralmente composto por entidades complexas e regras de negócios.

2. **Domínio de Suporte**: Este é um domínio que é importante para o negócio, mas não é tão importante quanto o domínio principal. Ele pode incluir funcionalidades comuns, como autenticação e autorização, que são compartilhadas entre diferentes projetos.

3. **Domínio de Genérico**: Este é um domínio que fornece um conjunto de funcionalidades e recursos que são compartilhados entre diferentes projetos ou sistemas. Ele é responsável por fornecer suporte ao funcionamento do sistema, mas não é diretamente relacionado à lógica de negócios.

> Para auxiliar nesta separação utilizamos o conceito de módulos, desta forma você pode isolar seus domínios mesmo em um monólito e utilizar estratégias como _domain events_ para fazer a comunicação entre os módulos sem gerar acoplamento entre os mesmos.

### Agregados

Um agregado é uma coleção de entidades relacionadas que formam uma unidade lógica de negócios. O objetivo dos agregados é fornecer uma abstração para a lógica de negócios complexa, tornando-a mais fácil de ser compreendida e implementada.

Um agregado é composto por uma entidade raiz, que é a entidade principal do agregado, e por entidades associadas, que são entidades que estão relacionadas à entidade raiz. Cada agregado tem um conjunto de regras de negócios que se aplicam a ele, e essas regras são implementadas pela entidade raiz.

Os agregados também possuem uma responsabilidade de garantir a consistência das entidades associadas, garantindo que as regras de negócios sejam cumpridas. Eles também garantem que as entidades associadas sejam atualizadas corretamente quando a entidade raiz é modificada.

Os agregados são projetados para ser auto-suficientes e independentes, eles não devem depender de outros agregados para funcionar corretamente. Eles também são projetados para serem expostos para o mundo exterior através de uma interface de serviço (utilizamos os casos de uso para expor nossos métodos), permitindo que outras partes do sistema acessem suas funcionalidades sem precisar conhecer sua implementação interna.

Além disso, os agregados são projetados para ser pequenos o suficiente para serem carregados e persistidos em uma única transação, garantindo a consistência e a integridade dos dados.

> Temos uma classe abstrata na pasta core para auxiliar na implementação dos agregados, dessa forma algumas coisas padrões da implementação não serão re-implementadas a cada agregado.

### Entidades

Uma entidade é um objeto do mundo real que tem uma identidade única e pode ser diferenciado de outros objetos semelhantes. Elas representam os objetos do negócio, como clientes, produtos, pedidos, etc.

As entidades são os objetos principais do domínio e possuem uma lógica de negócios específica, como regras de validação e cálculos. Elas também possuem um conjunto de atributos que descrevem seu estado, e esses atributos são geralmente armazenados em um banco de dados.

As entidades podem mudar seu estado ao longo do tempo, e essas alterações são geralmente persistidas em um banco de dados. Elas são consideradas como objetos ativos que possuem lógica de negócios e se comportam de acordo com regras específicas, e as entidades são um dos principais conceitos do DDD.

> Temos uma classe abstrata na pasta core para auxiliar na implementação das entidades, dessa forma algumas coisas padrões da implementação não serão re-implementadas a cada entidade.

### Valores de Objeto

Os valores de objeto são objetos que não possuem uma identidade única e são usados ​​principalmente para armazenar dados simples. Eles não possuem lógica de negócios e são simplesmente usados ​​para representar dados que não precisam ser tratados como objetos de negócios.

Os valores de objeto são geralmente imutáveis, ou seja, uma vez criados, eles não podem ser modificados. Se algum valor precisar ser alterado, um novo objeto deve ser criado. Eles são tipicamente usados ​​para representar dados simples, como números, datas, endereços, etc.

Os valores de objeto são diferentes das entidades, que possuem uma identidade única e uma lógica de negócios específica, como regras de validação e cálculos. Enquanto entidades são consideradas como objetos ativos, os valores de objeto são passivos e simplesmente representam dados.

É importante notar que os valores de objeto são usados ​​em conjunto com as entidades, eles são usados ​​para representar atributos das entidades, mas eles não têm uma identidade única e não possuem lógica de negócios.

> **Importante!** mesmo valores de objeto podem precisar de ID para sua persistência principalmente em bancos relacionais e isso não faz ele deixar de ser um valor de objeto. Também é importante entender que quando é necessário ter um ID ele não faz parte do valor em sí, logo ele não é usado na comparação entre dois valores de objeto.

> Temos uma classe abstrata na pasta core para auxiliar na implementação dos valores de objeto, dessa forma algumas coisas padrões da implementação não serão re-implementadas a cada valor de objeto.

### Serviços e Serviços de Aplicação

Os serviços de aplicação são usados ​​para implementar as regras de negócios e as operações de domínio. Eles são geralmente implementados como use cases e são responsáveis ​​por interpretar as solicitações dos clientes externos e traduzi-las em operações que podem ser executadas pelos agregados. Esses use cases garantem a consistência dos dados e garantem que as operações sejam realizadas de acordo com as regras de negócios.

Os serviços, por outro lado, são usados ​​para implementar operações que não são específicas de um domínio específico, mas que são compartilhados por vários domínios. Eles são usados ​​para acessar recursos externos, como bancos de dados, serviços de terceiros, etc.

Os serviços de aplicação são usados ​​para implementar regras de negócios e operações específicas do domínio, enquanto os serviços são usados ​​para implementar operações que são compartilhadas por vários domínios. Ambos os tipos de serviços são importantes para garantir a consistência dos dados e a implementação correta das regras de negócios.

> Como utilizamos alguns dos conceito da arquitetura limpa, juntamos os dois tipos de serviços nos casos de uso. Eles ficam repoisáveis por carregar os agregados, executar suas operações e aplicar as regras de sistema necessárias.

> Utilizamos interfaces para os casos de uso manterem um padrão de implementação

### Controllers

Os controllers são geralmente implementados na camada de apresentação e são responsáveis ​​por interpretar as solicitações dos usuários e traduzi-las em operações que podem ser executadas pelos serviços de aplicação. Eles também são responsáveis ​​por coletar dados de entrada do usuário, como formulários, e passá-los para os serviços de aplicação para processamento.

> Utilizamos interfaces para os controllers manterem um padrão de implementação

### Repositórios

Os repositórios são usados ​​para acessar e gerenciar dados relacionados a entidades do domínio. Eles são usados ​​para abstrair a camada de persistência (como banco de dados) e fornecer uma interface simples e consistente para acessar os dados.

Os repositórios são responsáveis ​​por garantir que as entidades do domínio sejam armazenadas e recuperadas de forma consistente e garantir que as operações de persistência sejam realizadas de acordo com as regras de negócios. Eles também são usados ​​para garantir a consistência dos dados e a conformidade com as políticas e procedimentos do negócio.

> Utilizamos interfaces para os repositórios manterem um padrão de implementação

> Criamos três arquivos para a implementação do repositório, uma interface especifica para que possa incluir novos métodos, um repositório em memória para poder usar em testes unitários e a implementação para que possa ser feito o acesso ao banco de dados.

### Mappers

Os mappers (também chamados de conversores) são usados ​​para converter entidades do domínio para e a partir de representações de dados externas, como objetos de banco de dados, objetos de transporte de dados (DTOs) ou objetos de comunicação de API.

Os mappers são importantes porque as entidades do domínio podem ter uma estrutura de dados diferente das representações externas. Por exemplo, uma entidade do domínio pode ter relacionamentos complexos, enquanto a representação externa pode ser uma tabela simples. Os mappers são usados ​​para garantir que as informações da entidade do domínio sejam convertidas corretamente para e a partir das representações externas.

Os mappers são geralmente implementados como classes separadas e podem ser gerados automaticamente com bibliotecas ou frameworks. Eles geralmente têm métodos para converter entidades do domínio para representações externas e vice-versa. Eles também podem incluir outras funcionalidades, como a capacidade de carregar relacionamentos de objetos relacionados ou de realizar transformações de dados.

> Utilizamos interfaces para os mappers manterem um padrão de implementação

## Dependências

![](https://img.shields.io/badge/string--replace--stream-%5E0.0.2-brightgreen) <br>
![](https://img.shields.io/badge/yargs-%5E17.6.2-brightgreen)
