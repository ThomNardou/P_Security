-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : ven. 19 avr. 2024 à 14:15
-- Version du serveur : 8.0.30
-- Version de PHP : 8.0.27

DROP DATABASE IF EXISTS `db_shop`;
CREATE DATABASE IF NOT EXISTS `db_shop`;

USE `db_shop`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_shop`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_users`
--

CREATE TABLE `t_users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `t_users`
--

INSERT INTO `t_users` (`id`, `name`, `email`, `password`, `salt`, `isAdmin`) VALUES
(1, 'Toto', 'toto@gmail.com', 'coucou', '1234567890', 0),
(3, 'Tuti', 'tuti@gmail.com', 'ssgsrehsrhsrh', 'bshsrjhsegsrh', 0),
(7, 'hsrhsrhs', 'couhahah4rcou@gmail.com', 'OtQ98Y8aZhcosrhsrhsrhsrhucou', 'OtQ98Y8aZh', 0),
(8, 'srhsrhsrhsrh', 'bsdfbsfnbsfn@gmail.com', 'zMHs3alPRPsfnsfnsdn', 'zMHs3alPRP', 0),
(9, 'rhrhrgreh', 'bsbsrhsrhsrhsrhsrh@gmail.com', 'dyQ4Mzgee6sfnsfnsdn', 'dyQ4Mzgee6', 0),
(11, 'rhrhrgreh', 'sgsegsegsrg@gmail.com', 'nAbc9edSp4gsegsgsegs', 'nAbc9edSp4', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_index` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
