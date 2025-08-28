-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-08-2025 a las 19:21:54
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
(4, 'S. M. TRANS. LITORAL', 3),
(46, 'ASOC. TRANS. MINI SUR', 1),
(47, 'ASOC. TRANS. TRUFI AGATA', 1),
(48, 'ASOC. TRANS. TRUFI BOLONIA', 1),
(49, 'ASOC. TRANS. CALLE 17 DE OBRAJES', 1),
(50, 'ASOC. TRANS. TRUFI VILLA PABON', 1),
(51, 'ASOC. SIND. TAXI TRUFI ALTO OBRAJES', 1),
(52, 'ASOC. TRANS TRUFI ALCOREZA', 1),
(53, 'ASOC. TRANS TRUFI FORTALEZA', 1),
(54, 'ASOC. TRANS. A. VILLA COPACABANA', 1),
(55, 'COOP. KUPINI S.L.', 1),
(56, 'ASOC. TRANS. TRICOLOR', 1),
(57, 'ASOC. SIND. 24 DE ABRIL', 1),
(58, 'ASOC. RADIOTAXIS LA PAZ', 1),
(59, 'ASOC. LINEA LILA EL ALTO', 1),
(60, 'ASOC. MUJERES AL VOLANTE', 1),
(61, 'ASOC. 10 DE DICIEMBRE', 1),
(62, 'ASOC. 6 DE MAYO', 1),
(63, 'ASOC. TRUFIS SEC', 1),
(64, 'ASOC. TRANS. LIBRE LOS PINOS', 1),
(65, 'S. SAN CRITOBAL', 2),
(66, 'S. PEDRO DOMINGO MURILLO', 2),
(67, 'S. 18 DE DICIEMBRE', 2),
(68, 'S. CIUDAD SATELITE', 2),
(69, 'S. SEÑOR DE MAYO', 2),
(70, 'S. ARCO IRIS', 2),
(71, 'S. PORVENIR', 2),
(72, 'S. TRANS. VIACHA', 2),
(73, 'S.  27 DE ABRIL', 2),
(74, 'S. SAGRADO CORAZON DE JESUS', 2),
(76, 'S. SEÑOR DE LAGUNAS', 2),
(77, 'S. 16 DE JULIO', 2),
(78, 'S. UNION Y PROGRESO', 2),
(79, 'S. 21 DE SEPTIEMBRE', 2),
(80, 'S. VIRGEN DE COPACABANA', 2),
(81, 'S. 1RO DE MAYO', 2),
(82, 'S. COTRANSTUR', 2),
(83, 'S. TRANS. LAJA', 2),
(84, 'S. JOSE BALLIVIAN', 2),
(85, 'S. NACIONES UNIDAS', 2),
(86, 'S. SAN AGUSTIN', 2),
(87, 'TAXIS 1RO DE MAYO', 2),
(88, 'AEROPUERTO RAFAEL PABON', 2),
(89, 'AEROPUERTO 78', 2),
(90, 'TAXIFONO ANDINO', 2),
(91, 'TURISMO LA PAZ', 2),
(92, 'S. M. TRANSPORTE USIMACON', 3),
(93, 'S. M. TRANS. EDUARDO AVAROA', 3),
(94, 'S. M. TRANS. VILLA VICTORIA', 3),
(95, 'S. M. TRANS. URBANO ANTOFAGASTA', 3),
(97, 'S. M. TRANS. RIO ABAJO PALCA', 3),
(98, 'S. M. TRANS. VIRGEN DE FATIMA', 3),
(99, 'S. M. TRANS. EL PROGRESO - TRUFI 1', 3),
(100, 'S. M. TRANS. COPACABANA - TRUFI 4', 3),
(101, 'S. M. TRANS. SIMON BOLIVAR', 3),
(102, 'S. M. TRANS. SIMON BOLIVAR-TRUFI 5', 3),
(103, 'S. M. TRANS. SAN JUAN', 3),
(104, 'S. M. TRANS. MIRAFLORES', 3),
(105, 'S. M. TRANS. LA PAZ', 3),
(106, 'S. M. TRANS. 24 DE JUNIO ALTO OBRAJES', 3),
(107, 'S. M. TRANS. SEÑOR DE EXALTACION', 3),
(108, 'S. M. TRANS. 14 DE SEPTIEMBRE CHASQUIPAMAPA', 3),
(109, 'S. M. TRANS. 23 DE MARZO', 3),
(110, 'S. M. TRANS. 8 DE DICIEMBRE', 3),
(111, 'S. M. TRANS. 27 DE MAYO', 3),
(112, 'S. M. TRANS. ACHOCALLA', 3),
(113, 'S. M. TRANS. MATER. CONST. Z. SUR SIMITRAMAC', 3),
(114, 'S. M. TRANS. AVAROA ACHOCALLA', 3),
(115, 'S. M. TRANS. LAS DELICIAS CENTRAL', 3),
(116, 'S. M. TRANS. FLOR DEL VALLE CHIC-CHINCH-HAMPATURI', 3),
(117, 'S. M. TRANS. ADEPCOCA', 3),
(118, 'S. M. TRANS. PIONEROS DE LA TERMINAL', 3),
(119, 'T.A.E. TRANS ASOCIADOS ESCOLARES', 3),
(120, 'S. VIRGEN DE LA NIEVES', 3),
(121, 'COO. TRANS. MIXTO 22 DE JUNIO', 3),
(122, 'ASOC. ROJOS INMORTALES', 3),
(123, 'S. DEL NORTE', 3),
(124, 'ASOC. SAN SIMON', 3),
(125, 'T.E.M.S. TRANS. ESCOLAR DEL SUR', 3),
(126, 'S. M. TRANS. 19 DE MARZO LOBOS', 3),
(127, 'TRANS. SERVICE CHASKA ÑAWI', 3),
(128, 'ASOC. M. TRANS. TRUFI 17 DE OBRAJES', 3),
(129, 'ASOC. COND. TRANS. VALLE HERMOSO NOCTÁMBULOS', 3);

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
(50, 4, 'Gisas Chavez', 'Gisas', 'Chavez', 'prueba2@gmail.com', '0.png', 'portada.jpg', '2025-07-23 14:39:43', '2025-07-23 14:40:03', NULL, NULL, NULL, '2025-07-23 14:40:03', '2025-07-23 14:39:43', 1, NULL, NULL, 0, '$2y$10$zp.c06ExvUEMlA8r2DIB1ecjQf.itHU30e3Gm85dBN.KT.2xedqlm'),
(105, 4, 'webs', 'Mario', 'Mamani', '', 'default_avatar.png', 'portada.jpg', '2025-08-13 14:20:00', '2025-08-26 14:41:03', '79849848', 'La Paz', 'Alomas', NULL, '2025-08-13 14:20:00', 0, 'Boliviano', '6959815', NULL, '$2y$10$3RCEBVu7p7hnb/KGDE8lzuNqAMveKNM3jT/52ESdgf0MNYgV5DHnq'),
(108, 1, 'admin', NULL, NULL, NULL, 'default_avatar.png', 'portada.jpg', '2025-08-14 13:51:33', '2025-08-19 03:09:36', NULL, NULL, NULL, NULL, '2025-08-14 13:51:33', 1, NULL, 'T3c8h5eSfsC1N2025', NULL, '$2y$10$3ZMe1PJpqO7NsE.pudKnveIULbLWMKhZOj6Zpe6vgw4p3rSYmVCUa'),
(116, 4, 'web', 'Pedro', 'Mendoza', '', 'default_avatar.png', 'portada.jpg', '2025-08-18 14:25:05', '2025-08-26 14:40:20', '79849849', 'La Paz', 'Alamos', NULL, '2025-08-18 14:25:05', 0, 'Boliviano', '6984949', NULL, '$2y$10$uzc/VCJMjeVr/GnzArrVLeJAQwxRnq2Cz0v/ueqcIkMjDfxbfrmvO'),
(127, 4, 'webs', 'Marios', 'Floress', '', 'default_avatar.png', 'portada.jpg', '2025-08-20 14:37:46', '2025-08-26 14:40:35', '79465498', 'La Paz', 'Alamos', NULL, '2025-08-20 14:37:46', 1, 'Boliviano', '6848498', NULL, '$2y$10$R.aamJvSG9LDGk9MtUGjnOHOj0Jxu3OkGHZY7E4y.VYznvj9b6Ibu'),
(128, 4, 'webs', 'Luis', 'Nina', '', 'default_avatar.png', 'portada.jpg', '2025-08-20 15:02:08', '2025-08-26 14:40:41', '76548984', 'La Paz', 'Landaeta', NULL, '2025-08-20 15:02:08', 1, 'Boliviano', '9958447', NULL, '$2y$10$BTCCiXPhzGpecLMecE.Jvehu8Hl2j18Z94uw4d0Mge0f1bluL24P.'),
(136, 4, 'web', 'Mamani', 'Alberht', 'viej_@hotmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-25 14:08:22', '2025-08-26 14:40:47', '76546546', 'La Paz', 'Alaos', NULL, '2025-08-25 14:08:22', 1, 'Bolvivino', '6212121', NULL, '$2y$10$a0AK1d6X2b0rGdali//0w.NLpnpPjKNcDNMQqmIKhq1Rj60jXSUb.'),
(137, 4, 'web', 'Mario', 'Pereira´', 'suejo_@hotmail.com', 'default_avatar.png', 'portada.jpg', '2025-08-25 17:34:43', '2025-08-26 14:40:54', '75468498', 'La Paz', 'Alamos', NULL, '2025-08-25 17:34:43', 1, 'Boliviano', '6631561', NULL, '$2y$10$zOcLruBXkVhFe7NaUVON.eYeN2a1I4o4v8OJCeul.FZqV0PpH.JtG'),
(138, 4, 'web', 'Pedro', 'Mamani', '', 'default_avatar.png', 'portada.jpg', '2025-08-26 14:15:53', '2025-08-26 14:41:10', '76546546', 'La Paz', 'Alamos', NULL, '2025-08-26 14:15:53', 0, 'Boliviano', '6646846', NULL, '$2y$10$26KC838gQMdgZ4EWeTdG9.avIYRdqWan1oPOzOkaRS3fqBxQuBdbO'),
(139, 4, 'web', 'Pavel', 'Andrade', '', 'default_avatar.png', 'portada.jpg', '2025-08-26 15:41:32', '2025-08-26 15:41:32', '76546848', 'santa_cruz', 'Alamos', NULL, '2025-08-26 15:41:32', 1, 'Boliviano', '6984984', NULL, '$2y$10$yIoyvP1V1i/4E07TBEAPSOYxgWhH36PlH8Z8XGUhpl4GVBnGvaNQm'),
(140, 4, 'web', 'Frans', 'Flores', '', 'default_avatar.png', 'portada.jpg', '2025-08-26 15:46:55', '2025-08-26 15:46:55', '79849849', 'ORURO', 'Alamos', NULL, '2025-08-26 15:46:55', 1, 'Boliviano', '6984698', NULL, '$2y$10$1vHSprYE7isYhGnKp.axeumMMOrnpceKcawTACn5FbINwOE8Qlx.e'),
(141, 4, 'web', 'Pedro', 'Mamani', '', 'default_avatar.png', 'portada.jpg', '2025-08-26 17:16:35', '2025-08-26 17:19:01', '76516416', 'TARIJA', 'Alamos', NULL, '2025-08-26 17:16:35', 1, 'Boliviano', '6258910', NULL, '$2y$10$OMVV724ygia6iwUfaFmDQ.u52rTGT6Kje7dm1YJn6tSW11CEZRSRy');

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
  `nombre_usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `id_federaciones` int(11) DEFAULT NULL,
  `id_sindicatos` int(11) DEFAULT NULL,
  `id_usuarios` int(11) NOT NULL,
  `clasevehiculo` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `tipoV`, `marcaV`, `anioV`, `placa`, `id_federaciones`, `id_sindicatos`, `id_usuarios`, `clasevehiculo`) VALUES
(203, 'TRUFI', 'NISSAN', 2018, '4568SQG', 3, 4, 108, 'PUBLICO'),
(229, 'MINIBUS', 'TOYOTA', 2024, '7852BBG', 1, 49, 127, 'PUBLICO'),
(230, 'MINIBUS', 'PEGASUS', 2024, '4568QWE', 1, 1, 140, 'PUBLICO'),
(231, 'MICRO', 'PEGASUS', 2024, '878DAS', NULL, NULL, 140, 'PARTICULAR'),
(232, 'CARRY', 'TOYOTA', 2020, '2221MKI', NULL, NULL, 141, 'PARTICULAR');

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
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `placa` (`placa`),
  ADD KEY `fk_vehiculo_federacion` (`id_federaciones`),
  ADD KEY `fk_vehiculo_sindicato` (`id_sindicatos`),
  ADD KEY `id_usuarios` (`id_usuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `federaciones`
--
ALTER TABLE `federaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `sindicatos`
--
ALTER TABLE `sindicatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sindicatos`
--
ALTER TABLE `sindicatos`
  ADD CONSTRAINT `fk_sindicato_federacion` FOREIGN KEY (`id_federaciones`) REFERENCES `federaciones` (`id`);

--
-- Filtros para la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD CONSTRAINT `fk_vehiculo_federacion` FOREIGN KEY (`id_federaciones`) REFERENCES `federaciones` (`id`),
  ADD CONSTRAINT `fk_vehiculo_sindicato` FOREIGN KEY (`id_sindicatos`) REFERENCES `sindicatos` (`id`),
  ADD CONSTRAINT `fk_vehiculos_usuarios` FOREIGN KEY (`id_usuarios`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
