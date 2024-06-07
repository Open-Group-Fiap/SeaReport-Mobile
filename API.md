## ENDPOINTS DA API

1. ### USUÁRIO

    1. #### `POST /user`

        Criar um novo usuário.

        Corpo da requisição:

        ```json
        {
            "username": "joao_silva",
            "password": "Joao@123",
            "phoneNumber": "+5511987654321",
            "auth": {
                "id": "yO8WwMFkN5Za9zZ6jncW7zxlJTh1",
                "email": "joao_silva@gmail.com"
            }
        }
        ```

    2. #### `POST /user/auth`

        Efetuar login de usuário.

        Corpo da requisição:

        ```json
        {
            "id": "yO8WwMFkN5Za9zZ6jncW7zxlJTh1",
            "email": "joao_silva@gmail.com"
        }
        ```

2. ### RELATÓRIO

    1. #### `POST /report`

        Salvar um novo relatório.

        Corpo da requisição:

        ```json
        {
            "description": "Denuncia de incidente de derramamento de óleo",
            "userId": 1,
            "category": 2,
            "location": {
                "longitude": -17.950722,
                "latitude": -38.718196
            }
        }
        ```

    2. #### `GET /report/user/{userId}`

        Obter relatórios por ID de usuário.

3. ### POSTAGEM

    1. #### `GET /post`

        Obter todas as postagens.

4. ### LIKE

    1. #### `POST /likes`

        Salvar um novo like.

        Corpo da requisição:

        ```json
        {
            "idUser": 1,
            "idPost": 2
        }
        ```

    2. #### `GET /user/{userId}/post/{postId}`

        Obter likes por ID de usuário e ID da postagem.

    3. #### `DELETE /likes/{id}`

        Excluir um like pelo seu ID.
