# clean-ddd-cli

> Construa seus projetos com padrões e estrutura de pastas pré-definidos sem acoplar bibliotecas em seu código.

A **clean-ddd-cli** nasceu com o objetivo de acelerar o desenvolvimento para projetos baseado nas estruturas do _**DDD**_ e _**Arquitetura Limpa**_.

Com a cli você vai ser capaz de criar seus agregados, entidades, valores de objetos, repositórios entre outros de forma simples sem criar dependências com nenhuma biblioteca.

_Mas como não vou depender de biblioteca?_ Para isso nossa cli vai clonar todas as class, interfaces e outros arquivos para uma pasta *core* em seu projeto e quando for criado um agregado por exemplo todas as interfaces e classes abstratas serão importadas desta pasta. Assim seu projeto tem total autonomia de nossa cli, te dando liberdade para editar os arquivos e até mesmo parando de usa-la sem a necessidade de refatoração.

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

 ## Padrões Adotados
 > Antes de qualquer coisa é importante saber que o **DDD** não é sobre tecnologia e vai alem de padrões de projetos e código. Para entender melhor recomendamos os livros [**Implementando DDD**](https://a.co/d/4n1CSUo) e o livro [**DDD: Atacando as complexidades no coração do software**](https://a.co/d/au4GoPQ).

 Em construção...