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
-- Table structure for table `invoices_itin`
--

CREATE TABLE `invoices_itin` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `order_id` int(11) NOT NULL,
  `invoice_date` date NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `tax_amount` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
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
-- Dumping data for table `invoices_itin`
--

INSERT INTO `invoices_itin` (`id`, `id_code`, `is_active`, `order_id`, `invoice_date`, `total_amount`, `tax_amount`, `subtotal`, `status`, `status_date`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(1, '36826ca7-714b-494d-82a6-ba9935461e13', 1, 11, '2025-03-11', 20.00, 0.00, 20.00, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-11 23:53:11', '2025-03-11 23:57:20'),
(2, 'e9c5de52-5d86-44a7-b37d-3ba41a86a051', 1, 12, '2025-03-11', 20.00, 0.00, 20.00, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-12 01:12:03', '2025-03-12 01:12:03'),
(3, '38a4b5ba-8357-4dba-b034-c093da844ff5', 1, 13, '2025-03-11', 20.00, 0.00, 20.00, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-12 01:13:28', '2025-03-12 01:13:28'),
(4, '3c22f79e-6f5c-4571-aa1d-5e547881d8c2', 1, 14, '2025-03-11', 20.00, 0.00, 20.00, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-12 01:14:14', '2025-03-12 01:14:14'),
(5, '9c7f4015-b265-4f63-ad4b-41bfc2f8b95b', 1, 15, '2025-03-11', 20.00, 0.00, 20.00, 'Received', '2025-03-11', NULL, '::1', 'en-US', 'en-US', '2025-03-12 02:21:24', '2025-03-12 02:21:24'),
(6, '297b54c3-dfb4-49b0-af9e-ac5c83d41979', 1, 16, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 20:55:41', '2025-03-12 20:55:41'),
(7, 'b3bc1369-02d3-4ca6-bd8b-939da8000bcb', 1, 17, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 20:57:11', '2025-03-12 20:57:11'),
(8, '447ef068-c11e-45bd-895e-aa48a70b49fc', 1, 18, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:03:25', '2025-03-12 21:03:25'),
(9, 'af38b338-4493-4a51-8230-75f424f9632f', 1, 19, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:05:23', '2025-03-12 21:05:23'),
(10, 'fd24f412-ba9c-4aa4-8ded-895e113f7c4a', 1, 20, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:16:30', '2025-03-12 21:16:30'),
(11, 'f34afbf4-1d1a-40c0-a7e3-8c0f7e454689', 1, 21, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:19:37', '2025-03-12 21:19:37'),
(12, '2004cc22-6fed-46af-852d-efbc7761ba36', 1, 22, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:30:40', '2025-03-12 21:30:40'),
(13, '9906dd40-e4d0-45cd-8184-995622bfb2e5', 1, 23, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:36:48', '2025-03-12 21:36:48'),
(14, 'd5109597-62ff-49c2-bb46-89353f9ddb5f', 1, 24, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:39:07', '2025-03-12 21:39:07'),
(15, '8b7731f7-16a2-4115-bd13-c77cae7a9b84', 1, 25, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:41:53', '2025-03-12 21:41:53'),
(16, '9fb176b7-0b42-4792-89bb-6d3294a6975c', 1, 26, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:54:10', '2025-03-12 21:54:10'),
(17, '63632641-b8eb-4969-bf33-5c2d9b7fe763', 1, 27, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 22:04:56', '2025-03-12 22:04:56'),
(18, '9c7e167d-edf0-46c5-b3cf-2dfe333b1763', 1, 28, '2025-03-12', 20.00, 0.00, 20.00, 'Received', '2025-03-12', NULL, '::1', 'en-US', 'en-US', '2025-03-12 22:08:56', '2025-03-12 22:08:56'),
(19, 'abb2086d-19fe-4b94-9e8e-dd9479824c38', 1, 29, '2025-03-17', 20.00, 0.00, 20.00, 'Received', '2025-03-17', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:01:44', '2025-03-17 22:01:44'),
(20, '504fdea1-e25d-4ff4-91ae-992012013a59', 1, 30, '2025-03-17', 20.00, 0.00, 20.00, 'Received', '2025-03-17', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:13:16', '2025-03-17 22:13:16'),
(21, '997d83ef-0d81-4de4-b88c-f79c50012704', 1, 31, '2025-03-17', 20.00, 0.00, 20.00, 'Received', '2025-03-17', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:15:11', '2025-03-17 22:15:11'),
(22, '49a90645-0260-4f32-bd94-7846625746a1', 1, 33, '2025-04-16', 150.00, 0.00, 150.00, 'Received', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 15:46:10', '2025-04-16 15:46:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoices_itin`
--
ALTER TABLE `invoices_itin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoices_itin`
--
ALTER TABLE `invoices_itin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
