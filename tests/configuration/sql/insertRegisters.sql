INSERT INTO
    "public"."users" (
        "id",
        "created_at",
        "updated_at",
        "name",
        "last_name",
        "user_name",
        "email",
        "password",
        "city",
        "province",
        "role",
        "recovery_token"
    )
VALUES
    (
        '1c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Angel',
        'Arevalo',
        'angelgabriel',
        'angel@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'ADMIN',
        'token'
    ),
    (
        '1c3e1c21-9bae-4049-8474-2e36578377be',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Fernando',
        'Alonso',
        'ferchu',
        'ferchu@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        'token'
    ),
    (
        '1c3e1c21-9bae-4049-8475-2e36578377be',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Laura',
        'Lopez',
        'lauri',
        'laulopez@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'USER',
        'token'
    ),
    (
        '1c9e1c44-9bae-4049-8475-2e36578377be',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Felipina',
        'Martanza',
        'lauri12345',
        'laulopezdfgdfg@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'USER',
        'token'
    );

INSERT INTO
    "public"."customers" (
        "id",
        "user_id",
        "adress",
        "phone",
        "dni",
        "updated_at",
        "created_at"
    )
VALUES
    (
        '2c3e1c21-9bae-4049-8473-2e36578377be',
        '1c3e1c21-9bae-4049-8473-2e36578377be',
        'AvenidaX123',
        '1123451212',
        '12123123',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    ),
    (
        '3c3e1c21-9bae-4049-8473-2e36578377be',
        '1c3e1c21-9bae-4049-8474-2e36578377be',
        'AvenidaX123',
        '2123451212',
        '22123123',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    ),
    (
        '4c3e1c21-9bae-4049-8473-2e36578377be',
        '1c3e1c21-9bae-4049-8475-2e36578377be',
        'AvenidaX123',
        '3123451212',
        '32123123',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    );

INSERT INTO
    "public"."categories" (
        "id",
        "name",
        "image",
        "created_at",
        "updated_at"
    )
VALUES
    (
        '5c3e1c21-9bae-4049-8473-2e36578377be',
        'vehiculos',
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '6c3e1c21-9bae-4049-8473-2e36578377be',
        'supermercado',
        'https://thumbs.dreamstime.com/b/items-del-supermercado-28832872.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '7c3e1c21-9bae-4049-8473-2e36578377be',
        'tecnologia',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Farte-vectorial%2F10885317-elemento-cientifico-para-la-educacion-y-el-laboratorio-de-quimica-experimente-el-simbolo-y-estudie-la-ilustracion-del-vector-del-icono-del-elemento-conjunto-de-equipos-de-fisica-y-objetos-de-tecnologia-de-investigacion-coleccion-de-descubrimientos-cientificos&psig=AOvVaw23niiBVMWnacCPg0EgYdJs&ust=1670071043185000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCy7Mv52vsCFQAAAAAdAAAAABAE',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '8c3e1c21-9bae-4049-8473-2e36578377be',
        'hogar y muebles',
        'https://img.freepik.com/vector-gratis/conjunto-interior-muebles-sala-estar_107791-830.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    );

INSERT INTO
    "public"."products" (
        "id",
        "name",
        "description",
        "price",
        "image",
        "category_id",
        "created_at",
        "updated_at"
    )
VALUES
    (
        '5c4e1c21-9bae-4049-8473-2e36578377be',
        'Onda Civic',
        'Auto 0KM',
        10000,
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        '5c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '6c4e1c21-9bae-4049-8473-2e36578377be',
        'Pan',
        'Pan Flauta',
        500,
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        '6c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '7c4e1c21-9bae-4049-8473-2e36578377be',
        'Auriculares',
        'Auriculares Gamers',
        2000,
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        '7c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '8c4e1c21-9bae-4049-8473-2e36578377be',
        'Heladera',
        'Heladera mas frezeer',
        15000,
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        '8c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    );

INSERT INTO
    "public"."orders" (
        "id",
        "created_at",
        "updated_at",
        "customer_id"
    )
VALUES
    (
        '5c4e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '2c3e1c21-9bae-4049-8473-2e36578377be'
    ),
    (
        '3c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '2c3e1c21-9bae-4049-8473-2e36578377be'
    ),
    (
        '4c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '2c3e1c21-9bae-4049-8473-2e36578377be'
    );

INSERT INTO
    "public"."orders-products" (
        "id",
        "created_at",
        "updated_at",
        "order_id",
        "product_id",
        "amount"
    )
VALUES
    (
        '5c4e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '5c4e1c21-9bae-4049-8473-2e36578377be',
        '5c4e1c21-9bae-4049-8473-2e36578377be',
        3
    ),
    (
        '3c3e1c21-9bae-4049-8473-2e36578377be',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '3c3e1c21-9bae-4049-8473-2e36578377be',
        '6c4e1c21-9bae-4049-8473-2e36578377be',
        4
    );