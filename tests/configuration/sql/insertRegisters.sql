INSERT INTO "public"."users" ("id", "created_at", "updated_at", "name", "last_name", "user_name", "email", "password", "city","province","role", "recovery_token") VALUES
('1c3e1c21-9bae-4049-8473-2e36578377be', '2022-11-28 22:45:56.058791', '2022-11-28 22:45:56.058791', 'Angel', 'Arevalo', 'angelgabriel', 'angel@gmail.com', '1234',  'bsas', 'bsas', 'ADMIN', 'token');
INSERT INTO "public"."users" ("id", "created_at", "updated_at", "name", "last_name", "user_name", "email", "password", "city","province","role", "recovery_token") VALUES
('1c3e1c21-9bae-4049-8474-2e36578377be', '2022-11-28 22:45:56.058791', '2022-11-28 22:45:56.058791', 'Fernando', 'Alonso', 'ferchu', 'ferchu@gmail.com', '1234',  'bsas', 'bsas', 'CUSTOMER', 'token');
INSERT INTO "public"."users" ("id", "created_at", "updated_at", "name", "last_name", "user_name", "email", "password", "city","province","role", "recovery_token") VALUES
('1c3e1c21-9bae-4049-8475-2e36578377be', '2022-11-28 22:45:56.058791', '2022-11-28 22:45:56.058791', 'Laura', 'Lopez', 'lauri', 'laulopez@gmail.com', '1234',  'bsas', 'bsas', 'USER', 'token');
INSERT INTO "public"."users" ("id", "created_at", "updated_at", "name", "last_name", "user_name", "email", "password", "city","province","role", "recovery_token") VALUES
('1c9e1c44-9bae-4049-8475-2e36578377be', '2022-11-28 22:45:56.058791', '2022-11-28 22:45:56.058791', 'Felipina', 'Martanza', 'lauri', 'laulopezdfgdfg@gmail.com', '1234',  'bsas', 'bsas', 'USER', 'token');

INSERT INTO "public"."customers" ("id", "user_id", "adress", "phone", "dni", "updated_at", "created_at") VALUES
('2c3e1c21-9bae-4049-8473-2e36578377be', '1c3e1c21-9bae-4049-8473-2e36578377be', 'AvenidaX123', '1123451212','12123123', '2022-11-22 21:47:51.295+00', '2022-11-22 21:47:51.295+00');
INSERT INTO "public"."customers" ("id", "user_id", "adress", "phone", "dni", "updated_at", "created_at") VALUES
('3c3e1c21-9bae-4049-8473-2e36578377be', '1c3e1c21-9bae-4049-8474-2e36578377be', 'AvenidaX123', '1123451212','12123123', '2022-11-22 21:47:51.295+00', '2022-11-22 21:47:51.295+00');
INSERT INTO "public"."customers" ("id", "user_id", "adress", "phone", "dni", "updated_at", "created_at") VALUES
('4c3e1c21-9bae-4049-8473-2e36578377be', '1c3e1c21-9bae-4049-8475-2e36578377be', 'AvenidaX123', '1123451212','12123123', '2022-11-22 21:47:51.295+00', '2022-11-22 21:47:51.295+00');