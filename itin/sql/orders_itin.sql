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
-- Table structure for table `orders_itin`
--

CREATE TABLE `orders_itin` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `provider_id` int(11) DEFAULT NULL,
  `service_record_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  `status_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ip_address` varchar(255) NOT NULL,
  `server_language` varchar(5) NOT NULL,
  `form_language` varchar(5) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders_itin`
--

INSERT INTO `orders_itin` (`id`, `id_code`, `is_active`, `customer_id`, `provider_id`, `service_record_id`, `amount`, `status`, `status_date`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(8, 'e7a30eaa-da48-4468-813f-b37d8525c6e1', 1, 1, 1, 1, 20.00, 'Received', '2025-03-11 00:43:23', '::1', 'en-US', 'en-US', '2025-03-11 00:43:23', '2025-03-11 00:43:23'),
(9, '5854698e-6e4f-4184-8d97-72b944b59fcb', 1, 1, 1, 2, 20.00, 'Received', '2025-03-11 19:11:20', '::1', 'en-US', 'en-US', '2025-03-11 19:11:20', '2025-03-11 19:11:20'),
(10, 'dc105faa-f23e-4de6-913d-b9cd25d23858', 1, 1, 2, 3, 20.00, 'Closed', '2025-03-11 23:50:54', '::1', 'en-US', 'en-US', '2025-03-11 23:50:54', '2025-03-11 23:50:54'),
(11, 'dc25da20-2668-4130-ac5d-c4063cb667c6', 1, 1, 3, 4, 20.00, 'Received', '2025-03-11 23:53:11', '::1', 'en-US', 'en-US', '2025-03-11 23:53:11', '2025-03-11 23:53:11'),
(12, 'ea484a64-db8d-4dff-aa71-ddabad8ac6ee', 1, 1, NULL, 5, 20.00, 'Received', '2025-03-12 01:12:03', '::1', 'en-US', 'en-US', '2025-03-12 01:12:03', '2025-03-12 01:12:03'),
(13, '8d8e26ab-ba28-483c-b60f-e4d2538bf31e', 1, 1, NULL, 6, 20.00, 'Received', '2025-03-12 01:13:28', '::1', 'en-US', 'en-US', '2025-03-12 01:13:28', '2025-03-12 01:13:28'),
(14, '87e7d054-3585-4061-98c2-15fbc0c6d2be', 1, 1, NULL, 7, 20.00, 'Received', '2025-03-12 01:14:14', '::1', 'en-US', 'en-US', '2025-03-12 01:14:14', '2025-03-12 01:14:14'),
(15, 'cbe2f05d-0e8e-4514-83a1-2de563ce0238', 1, 1, NULL, 8, 20.00, 'Received', '2025-03-12 02:21:24', '::1', 'en-US', 'en-US', '2025-03-12 02:21:24', '2025-03-12 02:21:24'),
(16, 'ad77cd33-141a-4c15-97fe-fb73af1909ca', 1, 1, NULL, 11, 20.00, 'Received', '2025-03-12 20:55:41', '::1', 'en-US', 'en-US', '2025-03-12 20:55:41', '2025-03-12 20:55:41'),
(17, 'c0211f8a-17bf-413d-aaed-a41c545a9847', 1, 1, NULL, 12, 20.00, 'Received', '2025-03-12 20:57:11', '::1', 'en-US', 'en-US', '2025-03-12 20:57:11', '2025-03-12 20:57:11'),
(18, 'ca33d8c5-a650-410b-a835-d1acb82e4292', 1, 1, NULL, 13, 20.00, 'Received', '2025-03-12 21:03:25', '::1', 'en-US', 'en-US', '2025-03-12 21:03:25', '2025-03-12 21:03:25'),
(19, 'd65b9e6d-582a-4845-8791-a8419899bfe9', 1, 1, NULL, 14, 20.00, 'Received', '2025-03-12 21:05:23', '::1', 'en-US', 'en-US', '2025-03-12 21:05:23', '2025-03-12 21:05:23'),
(20, 'e3c4da4d-ffa5-4a20-bc3d-64b0bfd7515f', 1, 1, NULL, 15, 20.00, 'Received', '2025-03-12 21:16:30', '::1', 'en-US', 'en-US', '2025-03-12 21:16:30', '2025-03-12 21:16:30'),
(21, '0d937d57-42f1-47d0-a41e-1c4c8a5a33c5', 1, 1, NULL, 16, 20.00, 'Received', '2025-03-12 21:19:37', '::1', 'en-US', 'en-US', '2025-03-12 21:19:37', '2025-03-12 21:19:37'),
(22, '2637ded6-86be-4658-8dc4-c8a17f840849', 1, 1, NULL, 17, 20.00, 'Received', '2025-03-12 21:30:40', '::1', 'en-US', 'en-US', '2025-03-12 21:30:40', '2025-03-12 21:30:40'),
(23, '65d7feb1-a46e-40e1-a062-43ae0cbab79f', 1, 1, NULL, 18, 20.00, 'Received', '2025-03-12 21:36:48', '::1', 'en-US', 'en-US', '2025-03-12 21:36:48', '2025-03-12 21:36:48'),
(24, '816824f3-27f4-4b09-b860-e157504b8b0c', 1, 1, NULL, 19, 20.00, 'Received', '2025-03-12 21:39:07', '::1', 'en-US', 'en-US', '2025-03-12 21:39:07', '2025-03-12 21:39:07'),
(25, '47f25001-e1fc-42e7-86db-2119fb123723', 1, 1, NULL, 20, 20.00, 'Received', '2025-03-12 21:41:53', '::1', 'en-US', 'en-US', '2025-03-12 21:41:53', '2025-03-12 21:41:53'),
(26, '7827123f-2966-4137-8046-bde022396824', 1, 1, NULL, 21, 20.00, 'Received', '2025-03-12 21:54:10', '::1', 'en-US', 'en-US', '2025-03-12 21:54:10', '2025-03-12 21:54:10'),
(27, 'c1f3a753-bfc4-42f5-85c2-9dcfefecf9e5', 1, 1, NULL, 22, 20.00, 'Received', '2025-03-12 22:04:56', '::1', 'en-US', 'en-US', '2025-03-12 22:04:56', '2025-03-12 22:04:56'),
(28, 'aef7cd6f-6ea0-4125-a153-cd5197533c74', 1, 1, NULL, 23, 20.00, 'Received', '2025-03-12 22:08:56', '::1', 'en-US', 'en-US', '2025-03-12 22:08:56', '2025-03-12 22:08:56'),
(29, '6cfe6931-518c-409c-b3d1-6fd40267bbc7', 1, 1, NULL, 25, 20.00, 'Received', '2025-03-17 22:01:44', '::1', 'en-US', 'en-US', '2025-03-17 22:01:44', '2025-03-17 22:01:44'),
(30, '48d0858b-7480-448b-b577-9b5e9cf7981e', 1, 1, NULL, 26, 20.00, 'Received', '2025-03-17 22:13:16', '::1', 'en-US', 'en-US', '2025-03-17 22:13:16', '2025-03-17 22:13:16'),
(31, '4d067a35-038a-49e3-bde2-0cc480d1ccc3', 1, 1, NULL, 27, 20.00, 'Received', '2025-03-17 22:15:11', '::1', 'en-US', 'en-US', '2025-03-17 22:15:11', '2025-03-17 22:15:11'),
(32, '1f396e0c-3b99-4af6-a420-10115d89de1b', 1, 1, NULL, 38, 20.00, 'Received', '2025-04-16 15:44:18', '::1', 'en-US', 'en-US', '2025-04-16 15:44:18', '2025-04-16 15:44:18'),
(33, '46fb0dd2-15ed-46a4-a91e-89cce4334838', 1, 1, NULL, 39, 150.00, 'Received', '2025-04-16 15:46:10', '::1', 'en-US', 'en-US', '2025-04-16 15:46:10', '2025-04-16 15:46:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders_itin`
--
ALTER TABLE `orders_itin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders_itin`
--
ALTER TABLE `orders_itin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
