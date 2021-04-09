### Obtener estadísticas

```graphql
query{
    pairs{
        player,
        estado,
        gameScore
    }
}
```
### Obtener estadísticas por estado

```graphql
query{
    pairs(status:"guardada"){
        player,
        estado,
        gameScore
    }
}
```

### Obtener estadística de un jugador

```graphql
query{
    pair(key:"674236f3-cbb1-4616-a46d-cc8e05e7416d"){
    key,
    value{
        estado,
        gameScore
    }
}  
}
```

### Obtener estadística de un jugador por estado

```graphql
query{
    pair(key:"674236f3-cbb1-4616-a46d-cc8e05e7416d"){
    key,
    value{
        estado(status:"terminada"),
        gameScore
    }
}  
}
```

### Mutation

```graphql
mutation{
    createStat(player:"nuevo.jugador",gameScore:9500)
}
```