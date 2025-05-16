-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 08:49 PM
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
-- Table structure for table `phones`
--

CREATE TABLE `phones` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_user` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_customer` tinyint(1) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `is_individual` tinyint(1) NOT NULL,
  `individual_id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT 'Phone Default Name',
  `country_code` varchar(2) NOT NULL,
  `country_phone_code` varchar(7) NOT NULL,
  `number` varchar(20) NOT NULL,
  `is_default` tinyint(4) NOT NULL,
  `is_mobile` tinyint(4) NOT NULL,
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
-- Dumping data for table `phones`
--

INSERT INTO `phones` (`id`, `id_code`, `is_active`, `is_user`, `user_id`, `is_customer`, `customer_id`, `is_individual`, `individual_id`, `name`, `country_code`, `country_phone_code`, `number`, `is_default`, `is_mobile`, `type`, `is_verified`, `status`, `status_date`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(1, '05d8ca13-6aa4-4208-bae2-bd62b7966385', 1, 1, 1, 1, 1, 1, 1, 'Phone Default Name', '', 'noneSel', '', 1, 1, 'NA', 0, 'Active', '2025-04-01', NULL, '::1', 'en-US', 'en-US', '2025-04-02 00:23:26', '2025-04-04 21:00:15'),
(2, 'f603cb61-069a-4fe2-b4a7-2848d82f3116', 1, 1, 1, 1, 1, 1, 1, 'Phone Default Name', 'US', '1', '131', 1, 1, 'NA', 0, 'Active', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 18:41:28', '2025-04-16 18:41:28'),
(3, 'c1c73df0-1ae0-431f-b489-23df2465d1de', 1, 1, 1, 1, 1, 1, 1, 'Phone Default Name', 'US', '1', '123123123', 1, 1, 'NA', 0, 'Active', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 18:46:12', '2025-04-16 18:46:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `phones`
--
ALTER TABLE `phones`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phones`
--
ALTER TABLE `phones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
