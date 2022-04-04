git-flow
========

[О git-flow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/)

[Другая, более наглядная статья](https://danielkummer.github.io/git-flow-cheatsheet/index.ru_RU.html)

[Установка git-flow](https://github.com/nvie/gitflow/wiki/Installation)

[FAQ](http://github.com/nvie/gitflow/wiki/FAQ)

### Создание feature/hotfix веток

* Для просмотра/начала/завершения feature веток, используете:
```shell   
  git flow feature
  git flow feature start <name> [<base>]
  git flow feature finish <name>
```

* Для того, чтобы запушить/запулить ветку, используйте:
```shell   
  git flow feature publish <name>
  git flow feature pull <remote> <name>
```

* Для просмотра/начала/завершения hotfix веток, используете:
```shell   
 git flow hotfix
 git flow hotfix start <release> [<base>]
 git flow hotfix finish <release>
```
