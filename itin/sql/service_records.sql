-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 06:42 PM
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
-- Table structure for table `service_records`
--

CREATE TABLE `service_records` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `service_id` int(11) NOT NULL,
  `purchase_date` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `service_type` varchar(20) NOT NULL,
  `service_for` varchar(10) NOT NULL,
  `individual_id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `start_date` date DEFAULT NULL,
  `estimate_completion_date` date DEFAULT NULL,
  `folder_path` varchar(255) NOT NULL,
  `status` varchar(35) NOT NULL,
  `status_date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `is_subscription` tinyint(1) NOT NULL DEFAULT 0,
  `plan` varchar(100) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `renewal_period` varchar(10) DEFAULT NULL,
  `last_renewal` date DEFAULT NULL,
  `autorenew` tinyint(1) NOT NULL DEFAULT 0,
  `ip_address` varchar(255) NOT NULL,
  `server_language` varchar(5) NOT NULL,
  `form_language` varchar(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `service_records`
--
ALTER TABLE `service_records`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `service_records`
--
ALTER TABLE `service_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
