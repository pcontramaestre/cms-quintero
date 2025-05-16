-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 06:43 PM
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
-- Table structure for table `receipts_itin`
--

CREATE TABLE `receipts_itin` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `order_id` int(11) NOT NULL,
  `receipt_date` date NOT NULL,
  `amount_paid` decimal(10,2) NOT NULL,
  `payment_method` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
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
-- Dumping data for table `receipts_itin`
--

INSERT INTO `receipts_itin` (`id`, `id_code`, `is_active`, `order_id`, `receipt_date`, `amount_paid`, `payment_method`, `transaction_id`, `status`, `status_date`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(1, '5f047cab-67fb-4cca-80f9-fbb8da82edee', 1, 11, '2025-03-11', 20.00, NULL, NULL, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-11 23:53:11', '2025-03-11 23:53:11'),
(2, 'a9daca88-3e3b-4c8f-b3f4-1e4c4fcd91d3', 1, 14, '2025-03-11', 20.00, NULL, NULL, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-12 01:14:14', '2025-03-12 01:14:14'),
(3, '098de6b8-520d-4111-a944-2d38c0934837', 1, 15, '2025-03-11', 20.00, NULL, NULL, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-12 02:21:24', '2025-03-12 02:21:24'),
(4, 'f2cedb6d-3623-480f-9e98-6eb9b0227f5f', 1, 16, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 20:55:41', '2025-03-12 20:55:41'),
(5, 'cebeb193-16ea-4073-9f60-b7cd9a729fd1', 1, 19, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:05:23', '2025-03-12 21:05:23'),
(6, 'ba568a79-b04b-4d2d-b304-312ed52d10c9', 1, 20, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:16:30', '2025-03-12 21:16:30'),
(7, '091f44cf-d5ce-4549-8ba3-fe626be5c300', 1, 21, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:19:37', '2025-03-12 21:19:37'),
(8, 'f2975fe7-972c-4e21-a690-05588b7f1baf', 1, 22, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:30:40', '2025-03-12 21:30:40'),
(9, 'f2e8593b-379b-49b5-b44f-db5abb75307b', 1, 23, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:36:48', '2025-03-12 21:36:48'),
(10, 'cc892e51-8132-42fc-a948-98c57fb562d9', 1, 26, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:54:10', '2025-03-12 21:54:10'),
(11, '5918da9c-4803-43ee-8ee2-80379f97805a', 1, 27, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 22:04:56', '2025-03-12 22:04:56'),
(12, '0b712f23-89c9-4ac5-9712-be1d538967af', 1, 28, '2025-03-12', 20.00, NULL, NULL, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 22:08:56', '2025-03-12 22:08:56'),
(13, 'fc58c251-92c1-4c19-8636-250f597f4244', 1, 29, '2025-03-17', 20.00, NULL, NULL, 'Received', '2025-03-17', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:01:44', '2025-03-17 22:01:44'),
(14, '02c2e84d-d466-4add-a151-d666ba011e59', 1, 30, '2025-03-17', 20.00, NULL, NULL, 'Received', '2025-03-17', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:13:16', '2025-03-17 22:13:16'),
(15, '73f81373-e8e4-4443-84e7-2b50d84ddd43', 1, 31, '2025-03-17', 20.00, NULL, NULL, 'Received', '2025-03-17', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:15:11', '2025-03-17 22:15:11'),
(16, '3b953073-dcf3-41ed-9b4f-dd0a7172ef0b', 1, 33, '2025-04-16', 150.00, NULL, NULL, 'Received', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 15:46:11', '2025-04-16 15:46:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `receipts_itin`
--
ALTER TABLE `receipts_itin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `receipts_itin`
--
ALTER TABLE `receipts_itin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
