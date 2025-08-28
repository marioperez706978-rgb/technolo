-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-08-2025 a las 17:13:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `technology`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `federaciones`
--

CREATE TABLE `federaciones` (
  `id` int(11) NOT NULL,
  `nombrefe` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `federaciones`
--

INSERT INTO `federaciones` (`id`, `nombrefe`) VALUES
(1, 'A.T.L.'),
(3, 'CHUQUIAGO MARKA'),
(2, 'NUESTRA SEÑORA DE LA PAZ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sindicatos`
--

CREATE TABLE `sindicatos` (
  `id` int(11) NOT NULL,
  `nombresi` varchar(150) NOT NULL,
  `id_federaciones` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sindicatos`
--

INSERT INTO `sindicatos` (`id`, `nombresi`, `id_federaciones`) VALUES
(1, 'ASOC. TRANS. SEÑOR DE MAYO', 1),
(2, 'S.SANCRISTOBAL', 2),
(4, 'S. M. TRANS. LITORAL', 3),
(5, 'S. PEDRO DOMINGO MURILLO', 2),
(6, 'S. 18 DE DICIEMBRE', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `rol_id` int(11) DEFAULT 4,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `correo_electronico` varchar(100) DEFAULT NULL,
  `avatar` varchar(100) DEFAULT 'default_avatar.png',
  `portada` varchar(255) DEFAULT 'portada.jpg',
  `creado_en` timestamp NULL DEFAULT current_timestamp(),
  `actualizado_en` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `telefono` varchar(20) DEFAULT NULL,
  `departamento` varchar(100) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `ultima_sesion` timestamp NULL DEFAULT NULL,
  `fecha_registro` timestamp NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) DEFAULT 1,
  `nacionalidad` varchar(100) DEFAULT NULL,
  `ci` varchar(50) DEFAULT NULL,
  `usuario_creador` int(11) DEFAULT NULL,
  `contrasena_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `rol_id`, `nombre_usuario`, `nombre`, `apellido`, `correo_electronico`, `avatar`, `portada`, `creado_en`, `actualizado_en`, `telefono`, `departamento`, `direccion`, `ultima_sesion`, `fecha_registro`, `activo`, `nacionalidad`, `ci`, `usuario_creador`, `contrasena_hash`) VALUES
(19, 4, 'Marco Antonio Uscamayta', 'Marco Antonio', 'Uscamayta', 'maus279000@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-06-11 21:41:11', '2025-07-29 16:31:38', NULL, NULL, NULL, '2025-07-29 16:31:38', '2025-06-11 21:41:11', 1, NULL, NULL, 0, '$2y$10$TWpJMp0AJ7jVXt1CQ5004..iUkHxk3VH2p5SIX.AbdFPg/6H4WLoy'),
(20, 4, 'Marco Antonio 22', 'Marco Antonio', '22', 'maus2790@gmail.com', '0.png', 'portada.jpg', '2025-06-16 22:14:53', '2025-07-29 14:58:07', NULL, NULL, NULL, '2025-07-29 14:58:07', '2025-06-16 22:14:53', 1, NULL, NULL, 0, '$2y$10$xICkxQvRf5e3mn4GS5srD.d8IPVuvgf.SVllPEwc8hAGFw5TUwcfa'),
(21, 4, 'MARCO USCAMAYTA SUCAZACA', 'MARCO', 'USCAMAYTA SUCAZACA', 'maus2700@gmail.com', '0.png', 'portada.jpg', '2025-06-17 14:31:22', '2025-06-26 16:34:00', NULL, NULL, NULL, '2025-06-26 16:34:00', '2025-06-17 14:31:22', 1, NULL, NULL, 0, '$2y$10$Pa5A6BQCeLK6wUTU48.FCeMAv9d6SMlxTCDZIoddNyEXdAGRmp8Sy'),
(22, 4, 'ramiro pinto', 'ramiro', 'pinto', 'ramipintoriveros@gmail.com', '0.png', 'portada.jpg', '2025-06-17 14:50:14', '2025-06-20 23:09:55', NULL, NULL, NULL, '2025-06-20 23:09:55', '2025-06-17 14:50:14', 1, NULL, NULL, 0, '$2y$10$B51I1oJPUyoi9HN/oTxyiO/iXBRvGlkgNnxeNcJ.wcrotHEfiNYFW'),
(36, 7, 'jose Perez', '', '', 'cpanel@gmail.com', '', 'portada.jpg', '2025-06-23 13:32:21', '2025-07-29 13:52:42', '', '', '', '2025-07-29 13:52:42', '2025-06-23 13:32:21', 0, '', '', 0, '$2y$10$/cZe.NoZbm.QLnBgT3tW7.VMyrYxEly2c3aYIDrfbbGixUuGNshbe'),
(43, 9, 'marco', '', '', 'marco123@gmail.com', '', 'portada.jpg', '2025-06-27 21:45:35', '2025-07-04 18:14:32', '11111', '', '', '2025-07-04 18:14:32', '2025-06-27 21:45:35', 1, '', '55555', NULL, '$2y$10$x.PMf6ik8KZMKdOuGXAFp.7OtqYOWvSeuJTdjr3VADuuXTHr0xJlS'),
(50, 4, 'Gisas Chavez', 'Gisas', 'Chavez', 'prueba2@gmail.com', '0.png', 'portada.jpg', '2025-07-23 14:39:43', '2025-07-23 14:40:03', NULL, NULL, NULL, '2025-07-23 14:40:03', '2025-07-23 14:39:43', 1, NULL, NULL, 0, '$2y$10$zp.c06ExvUEMlA8r2DIB1ecjQf.itHU30e3Gm85dBN.KT.2xedqlm'),
(55, 4, 'josue', 'josue', 'torrez', 'joauw@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-07-31 05:27:03', '2025-07-31 14:50:24', '74859636', 'oruro', 'z los alamos', NULL, '2025-07-31 05:27:03', 1, 'boliviano', '9685236', NULL, '$2y$10$/fbYwT22bFzUVIfdGW4uceNWlE0d2mTLKQ3ts5t1ABrqSav/L13uW'),
(56, 4, 'jobs', 'jobs', 'torrez', 'suejo_@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-07-31 14:53:27', '2025-07-31 14:53:27', '78541236', 'la paz', 'z.cotahuma 12 de octubre', NULL, '2025-07-31 14:53:27', 1, 'boliviano', '9958441', NULL, '1234'),
(57, 1, 'admin', 'Jos', 'Torrez', 'comepiso8@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 08:34:06', '2025-08-01 08:34:06', '74278996', 'La Paz', 'Cotahuma', NULL, '2025-08-01 08:34:06', 1, 'Boliviana', '12345678', NULL, '$2y$10$UT7mOs1TXJPVJciFy8OcPOT.W09L33sR.hoJQbeGweCdMDuVRK212'),
(69, 4, 'luc', 'lucas', 'flores', 'luacs@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 11:15:28', '2025-08-01 11:15:28', '74859632', 'la paz', 'alaoms', NULL, '2025-08-01 11:15:28', 1, 'boliva', '9685354', NULL, '$2y$10$CJQ1dlFMOE3n.BvwMANaUOl94GrwNYy7.TcctUmi9rUYt1k3ZVuBu'),
(70, 4, 'marioo', 'mario', 'arbelo', 'mario@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 11:17:50', '2025-08-01 11:17:50', '74859632', 'la paz', 'alamos', NULL, '2025-08-01 11:17:50', 1, 'boliviano', '9685215', NULL, '$2y$10$DB/n0/qJ..E6DenRWt1x7uQiBlCOXtvMYrkOu41sVJLYBfXguCFm2'),
(71, 4, 'cris', 'cristian', 'cabas', 'cris@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 13:36:19', '2025-08-01 13:43:54', '74859632', 'La Paz', 'Cotahuma', NULL, '2025-08-01 13:36:19', 1, 'Boliviano', '9965823', NULL, '$2y$10$qa5K0tGUV85fumnlJmPWhOC3F/y1doua8QwgM869XQT9AeuERPtpe'),
(72, 4, 'mariop', 'mario', 'peña', 'mario@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 14:04:17', '2025-08-01 14:04:17', '78952486', 'La Paz', 'Cotahuma', NULL, '2025-08-01 14:04:17', 1, 'Bolivia', '8521479', NULL, '$2y$10$jYTI6uOqH3gop8XZts2Ho.6H3vlk9KiYFdWXjycK23Ox6kUODJtSi'),
(73, 4, 'pedro', 'pedro', 'castañeta', 'pedro@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 14:10:15', '2025-08-01 14:10:15', '78596325', 'oruro', 'palmasola', NULL, '2025-08-01 14:10:15', 1, 'bolivia', '9658236', NULL, '$2y$10$4Aa0ceAWahvLxhmK.OEMyuXx6K6rzYXqB0uacz.P/euAmzUuFm8si'),
(74, 4, 'franz', 'franz', 'flores', 'franz@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 14:10:28', '2025-08-01 14:10:28', '78541269', 'La Paz', 'alamos', NULL, '2025-08-01 14:10:28', 1, 'Bolivia', '985326', NULL, '$2y$10$i.eZq0osTGYI34DP2V/Ia.qlUmxHVzSfyVGVAwsIEiIspurPDza7i'),
(75, 4, 'fred', 'fredy', 'grover', 'fredy@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 14:12:58', '2025-08-01 14:12:58', '78541236', 'La Paz', 'alamos', NULL, '2025-08-01 14:12:58', 1, 'Bolivia', '9685236', NULL, '$2y$10$ew08VY4IHZOW.R/U58LwfuwVhmBJjsTeZXsxKmAYay6ArwrNlgTuG'),
(76, 4, 'maria', 'maria', 'muños', 'maria@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 14:29:21', '2025-08-01 14:29:21', '78541269', 'la paz', 'alamos', NULL, '2025-08-01 14:29:21', 1, 'bolivia', '9856325', NULL, '$2y$10$/TXnwq.RmWe8.ANM649ey.BoUJePLBV/RnDvgRoFeGBJEKinO1NRy'),
(77, 4, 'albert', 'albert cabas', 'mena', 'albert@gmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-01 14:33:32', '2025-08-01 15:11:53', '78541266', 'potosi', 'alamos', NULL, '2025-08-01 14:33:32', 1, 'boliva', '9958752', NULL, '$2y$10$MvTl.3wI7yQViHUbFF9e2er50QtXBBD5JZybaCz47t05VWqCv.o72');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariosp`
--

CREATE TABLE `usuariosp` (
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo_electronico` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `direccion` text NOT NULL,
  `nacionalidad` varchar(100) NOT NULL,
  `ci` varchar(50) NOT NULL,
  `contrasena_hash` varchar(255) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `tipoV` varchar(30) NOT NULL,
  `marcaV` varchar(30) NOT NULL,
  `anioV` int(4) NOT NULL,
  `placa` varchar(7) NOT NULL,
  `id_federaciones` int(11) NOT NULL,
  `id_sindicatos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariosp`
--

INSERT INTO `usuariosp` (`nombre`, `apellido`, `correo_electronico`, `telefono`, `departamento`, `direccion`, `nacionalidad`, `ci`, `contrasena_hash`, `nombre_usuario`, `tipoV`, `marcaV`, `anioV`, `placa`, `id_federaciones`, `id_sindicatos`) VALUES
('asdasd', 'asdasdasd', 'aefaefafea@gaks.com', '75348343', 'hzdgtgsdt', 'adawd e', 'hfjfyjfj', '4834834', '$2y$10$hHBMqbYKt5mOVrmY4H7yY.lO0qr2XpaUpqRwSuIrqKv3N6vGe2Dii', 'sss', 'minibus', 'che', 2015, '815ASD', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `tipoV` varchar(30) NOT NULL,
  `marcaV` varchar(30) NOT NULL,
  `anioV` int(4) NOT NULL,
  `placa` varchar(7) NOT NULL,
  `id_federaciones` int(11) NOT NULL,
  `id_sindicatos` int(11) NOT NULL,
  `id_usuarios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `tipoV`, `marcaV`, `anioV`, `placa`, `id_federaciones`, `id_sindicatos`, `id_usuarios`) VALUES
(1, 'Auto', 'Toyota', 1953, '8521ASD', 1, 1, 55),
(2, 'microbus', 'foton', 1988, '7845SAX', 2, 2, 56),
(14, 'taxi', 'BMW', 2009, '789ASS', 2, 2, 69),
(15, 'minibus', 'ford', 2023, '4567SDS', 2, 2, 70),
(16, 'MICROBUS', 'TOYOTA', 2013, '7854QWE', 2, 2, 71),
(17, 'minibus', 'Hyundai', 2004, '7854ASP', 2, 6, 72),
(18, 'rtaxi', 'jac', 2010, '7854ASD', 2, 6, 73),
(19, 'taxi', 'mazda', 2022, '7894WER', 2, 6, 74),
(20, 'minibus', 'lexus', 2012, '5214ASD', 2, 6, 75),
(21, 'trufi', 'che', 2014, '8521ASD', 2, 6, 76),
(22, 'MICROBUS', 'SUZUKI', 2015, '4568QWE', 3, 4, 77);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `federaciones`
--
ALTER TABLE `federaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombrefe` (`nombrefe`);

--
-- Indices de la tabla `sindicatos`
--
ALTER TABLE `sindicatos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombresi` (`nombresi`),
  ADD KEY `fk_sindicato_federacion` (`id_federaciones`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuariosp`
--
ALTER TABLE `usuariosp`
  ADD KEY `fk_usuariosp_federacion` (`id_federaciones`),
  ADD KEY `fk_usuariosp_sindicato` (`id_sindicatos`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_usuarios` (`id_usuarios`),
  ADD KEY `fk_vehiculo_federacion` (`id_federaciones`),
  ADD KEY `fk_vehiculo_sindicato` (`id_sindicatos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `federaciones`
--
ALTER TABLE `federaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sindicatos`
--
ALTER TABLE `sindicatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sindicatos`
--
ALTER TABLE `sindicatos`
  ADD CONSTRAINT `fk_sindicato_federacion` FOREIGN KEY (`id_federaciones`) REFERENCES `federaciones` (`id`);

--
-- Filtros para la tabla `usuariosp`
--
ALTER TABLE `usuariosp`
  ADD CONSTRAINT `fk_usuariosp_federacion` FOREIGN KEY (`id_federaciones`) REFERENCES `federaciones` (`id`),
  ADD CONSTRAINT `fk_usuariosp_sindicato` FOREIGN KEY (`id_sindicatos`) REFERENCES `sindicatos` (`id`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_vehiculo_federacion` FOREIGN KEY (`id_federaciones`) REFERENCES `federaciones` (`id`),
  ADD CONSTRAINT `fk_vehiculo_sindicato` FOREIGN KEY (`id_sindicatos`) REFERENCES `sindicatos` (`id`),
  ADD CONSTRAINT `vehiculos_ibfk_3` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
