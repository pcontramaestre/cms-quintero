-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 06:40 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointments_server`
--

-- --------------------------------------------------------

--
-- Table structure for table `emails`
--

CREATE TABLE `emails` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `is_user` tinyint(4) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_customer` tinyint(4) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `is_individual` tinyint(4) NOT NULL,
  `individual_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(100) NOT NULL,
  `is_default` tinyint(4) NOT NULL,
  `type` varchar(25) NOT NULL,
  `is_verified` tinyint(4) NOT NULL,
  `status` varchar(25) NOT NULL,
  `status_date` date DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL,
  `server_language` varchar(5) NOT NULL,
  `form_language` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emails`
--

INSERT INTO `emails` (`id`, `id_code`, `is_active`, `is_user`, `user_id`, `is_customer`, `customer_id`, `is_individual`, `individual_id`, `name`, `address`, `is_default`, `type`, `is_verified`, `status`, `status_date`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(1, 'ab37dc89-0f30-4099-86d2-fb4275e4baa1', 1, 1, 1, 1, 1, 1, 1, 'Email Default Name', 'testing1@quinteroandassociates.com', 1, 'NA', 1, 'Active', '2024-02-19', NULL, '::1', 'en-US', 'en-US', '0000-00-00 00:00:00', '2024-08-16 04:30:56');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
