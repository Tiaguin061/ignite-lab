# Gateway service

### **Como iniciar o serviço**

1- Ter o Node.JS instalado em sua máquina

2- Utilizando o pacote NPM ou YARN, rode o comando `via CMD`:
```
$ npm install
ou
$ yarn
```
  - Abra o arquivo package.json e certifique-se que o comando esteja certo, se necessário.


3- É necessário ter o docker funcionando para dar continuidade.
  - Baixe o Docker em sua máquina, caso não tenha.
  - O arquivo de docker `docker-compose.yml`(ou outro nome) localizado no diretório raíz do serviço ou do repositório precisa ser iniciado para que o banco de dados funcione, então rode  utilizando o seguitne comando estando no diretório `via CMD`:
  - `$ docker-compose up -d`
  - Com sucesso, todos os containers do aplicativo estará funcionando.

4- É necessário rodar as migrations do banco de dados.
  - Neste aplicativo foi utilizado o `Prisma.JS`, então execute o seguinte comando `via CMD`:
  - ```
    $ npx prisma generate
    $ npx prisma migrate dev
    ou
    $ yarn prisma generate
    $ yarn prisma migrate dev
    ```

5- Certifique-se que os serviços listados no gateway esteja funcionando para evitar errors de conexão.

6- Para rodar o serviço em ambiente de desenvolvimento, execute o seguinte comando `via CMD`:
  ```
  $ npm start:dev
  ou
  $ yarn start:dev
  ```
