# pac-info

Aplicativo desenvolvido para o Segundo Encontro Nacional de Dados Abertos.
O aplicativo pode ser acessado [aqui](http://pac-info.herokuapp.com).

![printscreen](http://img35.imageshack.us/img35/9914/qz0m.png)


#### Objetivo
O objetivo desse aplicativo é mostrar, de uma maneira simples, onde o dinheiro do
PAC (Programa de aceleração do crescimento) está sendo investido. Nele nós conseguimos
ver o progresso, distribuição e estágio dos investimentos, baseado nos dados do último
balanço disponibilizado pelo governo. Você também consegue ver os detalhes de empreendimentos perto
da sua localização.

#### Origem dos dados
Os dados foram obtidos no [site do governo](http://dados.gov.br/dataset/obras-do-pac-programa-de-aceleracao-do-crescimento).

#### Autores
* [Brian Thomas Storti](http://github.com/brianstorti)
* [Carlos Chiconato](http://github.com/cachiconato)
* [Thiago Felix](http://github.com/thiagofelix)

#### Como contribuir
* Clone o repositório `git clone git@github.com:brianstorti/pac-info.git`.
* Inicie e atualize o submodule `data`: `git submodule init && git submodule update`.
* Com o mongodb rodando, execute o script de importação dos dados: `sh data/import-to-mongodb.sh`.
* Para trabalhar no backend (api que usa o rails-api), rode `rails s`. Isso deve subir o `thin` na porta 3000.
  Você pode ver o arquivo de rotas (`config/routes.rb`) para mais informações de como acessar a api.
* Para trabalhar no frontend, entre no diretório `front-end` e rode `grunt server`.
* Abra um pull request com as suas alterações.
