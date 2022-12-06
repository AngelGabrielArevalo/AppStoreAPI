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
        'e3bfbe56-41a5-41ad-8f8c-0249572dcd4b',
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
        null
    ),
    (
        'd80b49f8-78d0-464a-85f0-8b3eff4a2c6a',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Fernando',
        'Alonso',
        'ferchu',
        'ferchu@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'USER',
        null
    ),
    (
        '1deab20f-31c8-4684-a8b5-a4b4ebbc649a',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Laura',
        'Lopez',
        'lauri',
        'laulopez@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'ADMIN',
        null
    ),
    (
        'a8f924a9-6d8f-4bd6-92a1-f41eff5a2f83',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Brisa',
        'Perex',
        'brii',
        'briigomez@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        null
    ),
    (
        '3f14c755-46f5-4736-8997-c11e1a464907',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Pablo',
        'Gomez',
        'pablito',
        'pablito@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        null
    ),
    (
        '25987079-eb54-4705-897d-236f9ab9aa12',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Mauricio',
        'Macri',
        'mauri',
        'mmacri@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        null
    ),
    (
        '3d7bc9a1-a501-405e-950c-ba5ecbd8a0c4',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Leonor',
        'Marin',
        'leo',
        'lmarin@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        null
    ),
    (
        '272f7e46-0008-4b88-bc57-e11c96010451',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Patricia',
        'Olena',
        'patri',
        'patriolena@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        null
    ),
    (
        '697d309f-0a2a-406b-a605-11967fe447f2',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Kevin',
        'Lemin',
        'kevinl',
        'kevinlemin@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        null
    ),
    (
        '20286def-737a-4551-bfb9-4e5704f934cb',
        '2022-11-28 22:45:56.058791',
        '2022-11-28 22:45:56.058791',
        'Martin',
        'Lopez',
        'martincho',
        'martin@gmail.com',
        '1234',
        'bsas',
        'bsas',
        'CUSTOMER',
        null
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
        'a37f024f-0938-4d46-9bc0-2fbc981d51c6',
        'a8f924a9-6d8f-4bd6-92a1-f41eff5a2f83',
        'Bartolome Mitre 123',
        '1160332245',
        '22345678',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    ),
    (
        '960f6745-c66d-4c13-a32f-df1085184164',
        '25987079-eb54-4705-897d-236f9ab9aa12',
        'Corvalan 1234',
        '1160332246',
        '32456123',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    ),
    (
        'da4ce9f1-ce08-4282-9599-731fee1ffdc3',
        '3d7bc9a1-a501-405e-950c-ba5ecbd8a0c4',
        'Peron 123',
        '1180332245',
        '40456712',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    ),
    (
        '019a0429-d988-4e84-a80e-7c4bc37291f5',
        '272f7e46-0008-4b88-bc57-e11c96010451',
        'Roma 2343',
        '1160442245',
        '42345123',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    ),
    (
        '5eb55c53-5807-4993-b9b4-a341e814881d',
        '697d309f-0a2a-406b-a605-11967fe447f2',
        'Querandies 1234',
        '1160332245',
        '33456789',
        '2022-11-22 21:47:51.295+00',
        '2022-11-22 21:47:51.295+00'
    ),
    (
        'ec5a74f9-1394-4868-93f6-63038d2432a2',
        '20286def-737a-4551-bfb9-4e5704f934cb',
        'España 123',
        '1160332245',
        '19192111',
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
        'a09f6117-a230-40ba-abef-2b854d2117a7',
        'Vehículos',
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '04e9db73-e46e-46ee-bbfd-63799d0418e7',
        'Supermercado',
        'https://thumbs.dreamstime.com/b/items-del-supermercado-28832872.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '20033adf-a258-4c19-9a0c-ca7fe1aaa815',
        'Tecnología',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Farte-vectorial%2F10885317-elemento-cientifico-para-la-educacion-y-el-laboratorio-de-quimica-experimente-el-simbolo-y-estudie-la-ilustracion-del-vector-del-icono-del-elemento-conjunto-de-equipos-de-fisica-y-objetos-de-tecnologia-de-investigacion-coleccion-de-descubrimientos-cientificos&psig=AOvVaw23niiBVMWnacCPg0EgYdJs&ust=1670071043185000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCy7Mv52vsCFQAAAAAdAAAAABAE',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'fe5fcd38-e03f-4c5f-a91a-73465b4738a8',
        'Hogar y Muebles',
        'https://img.freepik.com/vector-gratis/conjunto-interior-muebles-sala-estar_107791-830.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'a792078d-d595-49f5-b2a5-73423a00fefb',
        'Inmuebles',
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'fafadf22-f231-4399-a9ac-6a5a0e6078f2',
        'Electrodomésticos',
        'https://thumbs.dreamstime.com/b/items-del-supermercado-28832872.jpg',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '3d605438-2d3e-42f0-9eff-853a664dde75',
        'Herramientas',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.vecteezy.com%2Farte-vectorial%2F10885317-elemento-cientifico-para-la-educacion-y-el-laboratorio-de-quimica-experimente-el-simbolo-y-estudie-la-ilustracion-del-vector-del-icono-del-elemento-conjunto-de-equipos-de-fisica-y-objetos-de-tecnologia-de-investigacion-coleccion-de-descubrimientos-cientificos&psig=AOvVaw23niiBVMWnacCPg0EgYdJs&ust=1670071043185000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJCy7Mv52vsCFQAAAAAdAAAAABAE',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'd61048cb-3160-486f-a260-b544f02d22a3',
        'Belleza y cuidado personal',
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
        '639c005b-1fa9-40fe-872a-08f043514905',
        'Chevrolet Spark 1.0 Lt',
        'Chevrolet Spark 1.0 Lt',
        1600000,
        'https://http2.mlstatic.com/D_NQ_NP_917648-MLA52753715804_122022-O.webp',
        'a09f6117-a230-40ba-abef-2b854d2117a7',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'f9b1198f-df8f-47dd-aa56-cc9e3c3ebde2',
        'Turron De Mani Georgalos',
        'Turron De Mani Georgalos Namur Orginial - Mejor Precio',
        100,
        'https://http2.mlstatic.com/D_NQ_NP_744661-MLA51799727476_102022-O.webp',
        '04e9db73-e46e-46ee-bbfd-63799d0418e7',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '1ebbfee3-0dab-4abc-b6cc-54d265d0a581',
        'Café instantáneo',
        'Café instantáneo suave Arlistán frasco 170 g',
        667,
        'https://http2.mlstatic.com/D_NQ_NP_2X_864755-MLA51738013969_092022-F.webp',
        '04e9db73-e46e-46ee-bbfd-63799d0418e7',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'cc50b352-e6b3-4114-b8b3-05c439287537',
        'Pasta De Maní',
        'Pasta De Maní (mani King) X 485gr',
        605,
        'https://http2.mlstatic.com/D_NQ_NP_2X_838047-MLA52444992621_112022-F.webp',
        '04e9db73-e46e-46ee-bbfd-63799d0418e7',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '1fa3a1c3-d997-4c01-bef5-468758e6d3a9',
        'Café au lait',
        'Café au lait en cápsula Nescafé Dolce Gusto 16 u',
        1170,
        'https://http2.mlstatic.com/D_NQ_NP_2X_852928-MLA43773298639_102020-F.webp',
        '04e9db73-e46e-46ee-bbfd-63799d0418e7',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '158b32a6-76cc-4f6c-9ee0-9385d0f76ad3',
        'Notebook',
        'Notebook Asus X515EA slate gray 15.6", Intel Core i5 1135G7 8GB de RAM 256GB SSD, Intel Iris Xe Graphics G7 80EUs 1920x1080px',
        500,
        'https://http2.mlstatic.com/D_NQ_NP_2X_908593-MLA49420869607_032022-F.webp',
        '20033adf-a258-4c19-9a0c-ca7fe1aaa815',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '604e28df-1090-4be7-8353-77bb135b6c19',
        'Silla de comedor',
        'Silla de comedor Baires4 Master, estructura color negro, 4 unidades',
        26690,
        'https://http2.mlstatic.com/D_NQ_NP_2X_840653-MLA49011720182_022022-F.webp',
        'fe5fcd38-e03f-4c5f-a91a-73465b4738a8',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '768d3501-5f45-4cc3-a9ec-4e602876f06b',
        'Aire acondicionado',
        'Aire acondicionado Likon mini split frío/calor 3000 frigorías blanco 220V LKS35WCCR',
        109000,
        'https://http2.mlstatic.com/D_NQ_NP_2X_867429-MLA48124738900_112021-F.webp',
        'fafadf22-f231-4399-a9ac-6a5a0e6078f2',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '532aead8-c679-4ca8-8fec-890a9777c4e0',
        'Taladro inalámbrico',
        'Taladro inalámbrico de 10mm Pektra PKTCD312 18V + accesorio 220V',
        17900,
        'https://http2.mlstatic.com/D_NQ_NP_2X_980764-MLA44666920268_012021-F.webp',
        '3d605438-2d3e-42f0-9eff-853a664dde75',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'eb78799e-07fd-4567-b5b5-61b06fb1fe4c',
        'Mac Mystery Box',
        'Mac Mystery Box',
        20475,
        'https://http2.mlstatic.com/D_NQ_NP_2X_637674-MLA52540992339_112022-F.webp',
        'd61048cb-3160-486f-a260-b544f02d22a3',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        'a056ac18-0895-4238-9bd5-e4a05bac783e',
        'Clinique Set Grab + Go: Beaut Bauble',
        'Clinique Set Grab + Go: Beaut Bauble',
        6271,
        'https://static.vecteezy.com/system/resources/previews/002/031/689/non_2x/blue-sedan-car-vehicle-transportation-icon-vector.jpg',
        'd61048cb-3160-486f-a260-b544f02d22a3',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00'
    ),
    (
        '9067435f-844f-4d3a-abdf-234e6fdbe792',
        'Depiladora Inalámbrica',
        'Depiladora Inalámbrica Tedge Recargable Multi Cabezal',
        3000,
        'https://http2.mlstatic.com/D_NQ_NP_2X_725948-MLA50693001875_072022-F.webp',
        'd61048cb-3160-486f-a260-b544f02d22a3',
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
        'bcddcfff-eaf2-419d-8749-d3c2a2dd1fd4',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        'a37f024f-0938-4d46-9bc0-2fbc981d51c6'
    ),
    (
        '14aa999d-90ef-43fe-86c4-9b100b90e393',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '960f6745-c66d-4c13-a32f-df1085184164'
    ),
    (
        '7cdd00f6-ce31-4ba2-aea1-562d80f4da37',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        'da4ce9f1-ce08-4282-9599-731fee1ffdc3'
    ),
    (
        '1cac650b-8ef6-4fe2-8fda-d873d319d0f3',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '019a0429-d988-4e84-a80e-7c4bc37291f5'
    ),
    (
        'e1bcc4d8-3e93-427a-9c45-ac53a5ae774b',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '5eb55c53-5807-4993-b9b4-a341e814881d'
    ),
    (
        '328bddad-1526-4fb9-93e6-8a4b8b979523',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        'ec5a74f9-1394-4868-93f6-63038d2432a2'
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
        '6c2fb432-f308-4516-ae21-0a6075b4acb2',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        'bcddcfff-eaf2-419d-8749-d3c2a2dd1fd4',
        '639c005b-1fa9-40fe-872a-08f043514905',
        3
    ),
    (
        '13e96e2d-4941-4a90-8ab7-6b9ddd473d6a',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '14aa999d-90ef-43fe-86c4-9b100b90e393',
        'f9b1198f-df8f-47dd-aa56-cc9e3c3ebde2',
        4
    ),
    (
        'c1d5f914-fe85-4c9d-abb0-0318c6a0ccbe',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '7cdd00f6-ce31-4ba2-aea1-562d80f4da37',
        '1ebbfee3-0dab-4abc-b6cc-54d265d0a581',
        3
    ),
    (
        'e11773e1-9fa7-452b-9510-b7f658758768',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '1cac650b-8ef6-4fe2-8fda-d873d319d0f3',
        'cc50b352-e6b3-4114-b8b3-05c439287537',
        4
    ),
    (
        'db3d86ad-84b1-4651-9e7f-c9fd3b7923df',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        'e1bcc4d8-3e93-427a-9c45-ac53a5ae774b',
        '1fa3a1c3-d997-4c01-bef5-468758e6d3a9',
        3
    ),
    (
        '4fd09f94-b626-4f78-96b9-ab93ef5c877a',
        '2022-11-22 21:48:14.555+00',
        '2022-11-22 21:48:14.555+00',
        '328bddad-1526-4fb9-93e6-8a4b8b979523',
        '158b32a6-76cc-4f6c-9ee0-9385d0f76ad3',
        4
    );