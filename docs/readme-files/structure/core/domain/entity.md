# Entidades de Domínio
As entidades de domínio são objetos do negócio que possuem um estado e comportamentos específicos, e são responsáveis ​​por garantir a consistência dos dados e a conformidade com as regras de negócios e políticas do negócio. Eles são usados ​​para representar objetos do mundo real e garantir a integridade dos dados no sistema.

Para implementação das entidades temos a classe abstrata `Entity`, que será estendida quando for criada a sua entidade.

A `Entity` é composta pelos seguintes parâmetros padrões:
  - **_id**: Identificador único da entidade
  - **_baseDates**: Datas padrões: `created_at`, `updated_at`, `deleted_at`
  - **_erros**: Objeto `Map` para acumular erros ao executar métodos.
  - **_props**: Objeto onde serão adicionadas as propriedades da entidade

Vamos imaginar que estamos desenvolvendo um módulo de estoque de um mercado, nele teremos os produtos que serão representados pela entidade `ProductEntity`, este produto terá as seguintes propriedades: 
 - name
 - value
 - quantity
 - maxQuantity
 - barCode

Ele também terá ose seguintes métodos:
 - pickUp
 - add

Antes de continuarmos para a implementação quero que você preste atenção nos métodos, no DDD os métodos de uma entidade representam ações.
Vamos pegar como exemplo os métodos `pickUp` e `add`, ambos quando forem implementados irão atualizar o `quantity`. Seria muito mais simples usar um método como `setQuantity` para atualizar a quantidade, porem se formos pensar em um estoque físico a pessoa sempre vai **pegar** ou **adicionar** items do estoque e não simplesmente alterar a quantidade.

## Implementação
Vamos dar inicio com a base da entidade que é criada ao rodar o comando `create entity`.

```typescript
import { Entity } from "../../../core/domain";
import { BaseDates } from "../../../core/domain/types";

class ProductEntity extends Entity<ProductProps> {
  static create(props: ProductProps, id?: string, baseDates?: BaseDates){
    return new ProductEntity(props, id, baseDates)
  }
}

type ProductProps = {}

export { ProductEntity, ProductProps }
```
A base da entidade é uma classe simples, o que poder ser um pouco diferente é o método estático `create`, ele é responsável por gerar a entidade. Será por ele que vamos passar as propriedades quando formos instanciar nosso produtos.

## Props
Vamos começar a implementar nossa entidade, para isso vamos adicionar as propriedades dela.

```typescript
type ProductProps = {
  name: string;
  value: number;
  quantity: number;
  barCode: string;
}
```
Com as propriedades definidas podemos seguir para a implementação de nossos métodos.

## Métodos
Os métodos de uma entidade como dito antes representam ações e são responsáveis por implementar as regras que regem essas ações. Vamos implementar o método de `pickUp` abaixo do método `create`:

```typescript
public pickUp(quantity: number){
  if(quantity > this.props.quantity) throw new InvalidQuantityDomainError(
    'Ordered quantity is greater than stock.'
  )

  this._props.quantity = this._props.quantity - quantity
}
```
Vamos entender o que foi implementado aqui, nosso método é responsável por pegar uma quantidade de produtos que estão em estoque. Como no mundo físico só podemos pegar a quantidade que temos no estoque, então isso se reflete como uma regra do negócio na nossa implementação que seria o nosso `if` comparando a quantidade solicitada com a quantidade de produtos.
Você vai notar que se a quantidade solicitada for maior do que a em estoque iremos disparar um `DomainError`, note que aqui como temos apenas uma validação não precisamos acumular os erros no `_errors`.
Passando as validações podemos dar continuidade e subtrair a quantidade do estoque.

Nosso método `add` é bem semelhante:

```typescript
public pickUp(quantity: number){
  const total = quantity + this.props.quantity
  if( total > this.props.maxQuantity ) throw new InvalidQuantityDomainError(
    'The total quantity exceeds the maximum allowed.'
  )

  this._props.quantity = this._props.quantity + quantity
}
```
Agora validamos se ao adicionar a quantidade será excedido o máximo que podemos ter do produto em nosso estoque.

## Conclusão
Entidades refletem objetos do mundo real com suas regras e intenções, mantenha suas entidades curtas e objetivas.

Quando um outro desenvolvedor tiver que usar sua entidade ele deve bater o olho nos nomes do métodos e entender que ele se refere há uma ação que o usuário executa.

Evite a utilização ampla de métodos no formato `set` que não representam com clareza o por aqui está acontecendo.