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
-- Table structure for table `itin_summaries`
--

CREATE TABLE `itin_summaries` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `itin_application_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `individual_id` int(11) NOT NULL,
  `service_record_id` int(11) NOT NULL,
  `application_date` date NOT NULL,
  `w7` tinyint(4) NOT NULL,
  `caa` tinyint(4) NOT NULL,
  `tax_return` tinyint(4) NOT NULL,
  `form_a_company` tinyint(4) NOT NULL,
  `itin_type` varchar(25) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `shipping` tinyint(4) NOT NULL,
  `shipping_date` varchar(10) DEFAULT NULL,
  `carrier` varchar(20) DEFAULT NULL,
  `tracking` varchar(25) DEFAULT NULL,
  `status` varchar(25) NOT NULL,
  `status_date` date DEFAULT NULL,
  `documents` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL,
  `server_language` varchar(5) NOT NULL,
  `form_language` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `itin_summaries`
--

INSERT INTO `itin_summaries` (`id`, `id_code`, `is_active`, `itin_application_id`, `customer_id`, `individual_id`, `service_record_id`, `application_date`, `w7`, `caa`, `tax_return`, `form_a_company`, `itin_type`, `reason`, `shipping`, `shipping_date`, `carrier`, `tracking`, `status`, `status_date`, `documents`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(15, 'ae33853d-fc48-4ca1-9a0e-e6dd5a8e50b6', 1, 34, 1, 1, 1, '2025-03-10', 1, 1, 1, 1, 'new', 'g', 1, '2025-03-10', 'USPS', '001002003', 'Received', '2025-03-10', '20250310_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-11 00:43:23', '2025-03-14 21:49:57'),
(16, '603dd18e-0fc4-4077-aed4-2fce721ad078', 1, 35, 1, 1, 2, '2025-03-11', 1, 1, 1, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-11', '20250311_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-11 19:11:20', '2025-03-14 20:57:54'),
(17, '54010286-277f-48cc-b28b-daee2c48f4e6', 1, 36, 1, 1, 3, '2025-03-11', 1, 1, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-11', '20250311_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-11 23:50:54', '2025-03-14 20:57:56'),
(18, '57c3af88-7950-42a5-bb26-0e0d37770cad', 1, 37, 1, 1, 4, '2025-03-11', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-11', '20250311_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-11 23:53:11', '2025-03-11 23:53:11'),
(19, 'c6a4fa4b-e9f4-4b74-8868-3f8c534cbc31', 1, 38, 1, 1, 5, '2025-03-11', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-11', '20250311_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 01:12:03', '2025-03-12 01:12:03'),
(20, '727f9c43-7a5f-4d13-867a-c13a65341daa', 1, 39, 1, 1, 6, '2025-03-11', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-11', '20250311_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 01:13:28', '2025-03-12 01:13:28'),
(21, '7e2a2511-4748-44fd-94a8-ea0823d01adf', 1, 40, 1, 1, 7, '2025-03-11', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-11', '20250311_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 01:14:14', '2025-03-12 01:14:14'),
(22, '81f6ea0f-4b89-45ef-9465-ece42704107a', 1, 41, 1, 1, 8, '2025-03-11', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-11', '20250311_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 02:21:24', '2025-03-12 02:21:24'),
(23, 'bcd7864a-271a-4534-ba34-15cec675c701', 1, 43, 1, 1, 10, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 20:54:22', '2025-03-12 20:54:22'),
(24, '6c09cad5-bd0d-4401-82df-46ac75aa00b8', 1, 44, 1, 1, 11, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 20:55:41', '2025-03-12 20:55:41'),
(25, '06485d86-2024-4bc5-b6bc-3dd95a1687ae', 1, 45, 1, 1, 12, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 20:57:11', '2025-03-12 20:57:11'),
(26, 'e9f449be-48fb-4dd9-8f60-03f87118ad38', 1, 46, 1, 1, 13, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:03:25', '2025-03-12 21:03:25'),
(27, '7e2fa1c1-3279-4795-881c-2bc9ee8ad1ef', 1, 47, 1, 1, 14, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:05:23', '2025-03-12 21:05:23'),
(28, 'c62323e0-b1bf-4041-bd53-e0d2e0b1ff99', 1, 48, 1, 1, 15, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:16:30', '2025-03-12 21:16:30'),
(29, '93047b39-1006-447a-8120-f158fda3180c', 1, 49, 1, 1, 16, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:19:37', '2025-03-12 21:19:37'),
(30, 'cb2be5e2-deaf-4212-ac7f-d6a4a9b42fed', 1, 50, 1, 1, 17, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:30:40', '2025-03-12 21:30:40'),
(31, '6de3bbae-7cc4-49dc-8291-e8ed01395d66', 1, 51, 1, 1, 18, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:36:48', '2025-03-12 21:36:48'),
(32, '6cf3a8ee-f1b3-4ed5-8e48-afeb26d188d6', 1, 52, 1, 1, 19, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:39:07', '2025-03-12 21:39:07'),
(33, '534dd204-9736-4141-9839-998e399c7f42', 1, 53, 1, 1, 20, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:41:53', '2025-03-12 21:41:53'),
(34, 'de8b7660-1b05-4a2f-a320-323b0796a515', 1, 54, 1, 1, 21, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 21:54:10', '2025-03-12 21:54:10'),
(35, 'e38ebe63-cf91-4cc4-83c0-2b9a641ff15e', 1, 55, 1, 1, 22, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 22:04:56', '2025-03-12 22:04:56'),
(36, '21a51bbf-2797-4d32-b322-e6a30375d6f5', 1, 56, 1, 1, 23, '2025-03-12', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-12', '20250312_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-12 22:08:56', '2025-03-12 22:08:56'),
(37, '01431a1e-961f-4425-8a0e-8985f8812a05', 1, 58, 1, 1, 25, '2025-03-17', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-17', '20250317_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:01:44', '2025-03-17 22:01:44'),
(38, 'c7490390-e4fb-4008-9cca-274de5c3165b', 1, 59, 1, 1, 26, '2025-03-17', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-17', '20250317_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:13:16', '2025-03-17 22:13:16'),
(39, '89f42a3e-8fb7-45e8-95e8-3f3d866f655c', 1, 60, 1, 1, 27, '2025-03-17', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-03-17', '20250317_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-03-17 22:15:11', '2025-03-17 22:15:11'),
(40, '78b60571-205c-48fe-ae9e-434d86d0ec53', 1, 61, 1, 1, 31, '2025-04-14', 1, 1, 1, 0, 'new', 'g', 1, NULL, NULL, NULL, 'Received', '2025-04-14', '20250414_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-14 14:46:52', '2025-04-14 14:46:52'),
(41, '093b6f8e-cd58-470e-9d6c-df995e201c4f', 1, 62, 1, 1, 32, '2025-04-14', 1, 1, 1, 0, 'new', 'a', 1, NULL, NULL, NULL, 'Received', '2025-04-14', '20250414_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-14 20:28:38', '2025-04-14 20:28:38'),
(42, '32c85d19-f891-4899-a4d2-d5ad32c6889a', 1, 63, 1, 1, 33, '2025-04-14', 1, 1, 1, 0, 'new', 'd', 1, NULL, NULL, NULL, 'Received', '2025-04-14', '20250414_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-14 20:34:01', '2025-04-14 20:34:01'),
(43, 'c2416721-6fed-49ce-8e88-058afad07336', 1, 64, 1, 1, 34, '2025-04-14', 1, 1, 1, 0, 'new', 'e', 1, NULL, NULL, NULL, 'Received', '2025-04-14', '20250414_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-14 20:40:04', '2025-04-14 20:40:04'),
(44, 'ae2cef49-2742-4b23-9ace-2ae9e8a813ab', 1, 65, 1, 1, 35, '2025-04-14', 1, 1, 1, 0, 'new', 'h', 1, NULL, NULL, NULL, 'Received', '2025-04-14', '20250414_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-14 20:58:39', '2025-04-14 20:58:39'),
(45, '4d7f0008-50ba-4c34-b0bf-aceb99f0f32e', 1, 67, 1, 1, 37, '2025-04-16', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-04-16', '20250416_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-16 15:39:35', '2025-04-16 15:39:35'),
(46, '15056e39-8be4-4cd3-abf7-01d9956d406a', 1, 68, 1, 1, 38, '2025-04-16', 1, 0, 0, 0, 'new', 'g', 0, NULL, NULL, NULL, 'Received', '2025-04-16', '20250416_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-16 15:44:18', '2025-04-16 15:44:18'),
(47, 'c87a066a-c5d4-4d51-a848-5ab36615deb2', 1, 69, 1, 1, 39, '2025-04-16', 1, 1, 1, 0, 'new', 'g', 1, NULL, NULL, NULL, 'Received', '2025-04-16', '20250416_ITIN', NULL, '::1', 'en-US', 'en-US', '2025-04-16 15:46:10', '2025-04-16 15:46:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itin_summaries`
--
ALTER TABLE `itin_summaries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itin_summaries`
--
ALTER TABLE `itin_summaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
