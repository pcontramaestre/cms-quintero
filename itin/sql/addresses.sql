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
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
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
  `line1` varchar(100) NOT NULL,
  `line2` varchar(100) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `country` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `is_default` tinyint(4) NOT NULL,
  `is_mailing` tinyint(4) NOT NULL,
  `is_billing` tinyint(4) NOT NULL,
  `is_shipping` tinyint(4) NOT NULL,
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
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `id_code`, `is_active`, `is_user`, `user_id`, `is_customer`, `customer_id`, `is_individual`, `individual_id`, `name`, `line1`, `line2`, `city`, `zip_code`, `country`, `state`, `is_default`, `is_mailing`, `is_billing`, `is_shipping`, `type`, `is_verified`, `status`, `status_date`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(1, '20531cc1-9832-4fbf-9ac5-60892c22a09b', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '7823 W 33rd Ln', NULL, 'Hialeah', '33018', 'US', 'FL', 1, 0, 1, 1, 'NA', 1, 'Active', NULL, NULL, '::1', 'en-US', 'en-US', '0000-00-00 00:00:00', '2024-08-16 04:32:48'),
(2, 'b31e17cc-d221-42e4-85ad-f674ea2da6b9', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', '', '', '', '', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-20', NULL, '::1', 'en-US', 'en-US', '2025-03-20 18:14:31', '2025-03-20 18:14:31'),
(3, 'd02884ee-3216-4136-b17a-22b5216822dc', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', '123123', '123123', 'asdf', 'asdfsadf', 'AG', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-20', NULL, '::1', 'en-US', 'en-US', '2025-03-20 18:26:55', '2025-03-20 18:26:55'),
(4, '3bb5464a-c264-4a88-b23c-1cd861808cd4', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', 'asdf', 'asdf', 'asdf', 'asdf', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-20', NULL, '::1', 'en-US', 'en-US', '2025-03-20 19:29:23', '2025-03-20 19:29:23'),
(5, '8dd9117d-a1e8-49b3-b339-4e67f765534f', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', 'asdf', '', 'adsf', 'asdf', 'VE', 'VE-H', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-20', NULL, '::1', 'en-US', 'en-US', '2025-03-20 22:34:16', '2025-03-20 22:34:16'),
(6, '5fe8f5d0-c3b2-4e0b-9798-fe73930d4388', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', 'asdf', '', 'adsf', 'adfs', 'VE', 'VE-M', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-20', NULL, '::1', 'en-US', 'en-US', '2025-03-20 22:55:54', '2025-03-20 22:55:54'),
(7, 'de05b75f-452a-4310-b122-61f2965214da', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', 'asdf', '', 'adsf', 'adf', 'VE', 'VE-B', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-21 19:25:55', '2025-03-21 19:25:55'),
(8, '80e5c5ef-8c22-4282-a496-d3a0f9a56916', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', 'asdf', '', 'asf', 'asdf', 'VE', 'VE-J', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-21 20:12:53', '2025-03-21 20:12:53'),
(9, 'b53c955e-017f-4eea-bf3c-720fa014a2bf', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', 'asdf', 'asdf', 'asdf', '', 'AR', 'AR-M', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-21 20:34:06', '2025-03-21 20:34:06'),
(10, '23b2f1d5-d87c-4d22-b523-fe1baaac7917', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', 'asdf', 'asdf', 'asdf', '123', 'AR', 'AR-M', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-21 20:34:08', '2025-03-21 20:34:08'),
(11, 'dcfb180a-8eca-4a13-8dc8-d2417e27dcf8', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', '123', '', '123', '123', 'VE', 'VE-B', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-21 20:43:58', '2025-03-21 20:43:58'),
(12, 'f39c53de-6e21-4292-b653-9236a8324632', 1, 1, 0, 1, 2, 1, 2, 'Address Default Name', '123', '', '123123', '123123', 'US', 'AL', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-21 21:11:32', '2025-03-21 21:11:32'),
(13, 'e48d673a-beba-4132-a108-4da67a1983d6', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123', '123', '123', '123', 'US', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-21 22:53:12', '2025-03-21 22:53:12'),
(15, '36985236-f932-4ce4-af88-146379d3368f', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123', '', '123', '123123', 'VE', 'VE-Z', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-22 01:16:41', '2025-03-22 01:16:41'),
(16, 'f8e57d7c-f901-4305-9ea7-b1b2409152c2', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123123', '', '123123', '123123', 'VE', 'VE-C', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-22 01:27:49', '2025-03-22 01:27:49'),
(17, 'cf15a3c5-8e17-48b7-acc9-28eab2d20e1f', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '12312', '123', '123123', '123123', 'VE', 'VE-B', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-22 01:31:02', '2025-03-22 01:31:02'),
(18, 'f23c2d1b-6ea6-47ba-b3b9-eea019761144', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '', '', '', '', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-21', NULL, '::1', 'en-US', 'en-US', '2025-03-22 01:32:38', '2025-03-22 01:32:38'),
(19, 'a889fb3e-02df-409c-b61d-ac7867c695c6', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '', '', '', '123', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-24', NULL, '::1', 'en-US', 'en-US', '2025-03-24 21:06:15', '2025-03-24 21:06:15'),
(20, '68da2665-9032-46f2-9c7b-473a5cb3e242', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123', '', '', '', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-24', NULL, '::1', 'en-US', 'en-US', '2025-03-24 23:10:24', '2025-03-24 23:10:24'),
(21, 'd4ced307-3a17-4c75-9994-4696cafc76d3', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', 'ejemplo4', 'ejemplo5', 'ejemplo6', 'ejemplo7', 'VE', 'VE-C', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-25', NULL, '::1', 'en-US', 'en-US', '2025-03-25 21:46:53', '2025-03-25 21:46:53'),
(22, 'ea9db383-a665-4b10-a403-13ae03faca0f', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123123', '', '123123', '', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-26', NULL, '::1', 'en-US', 'en-US', '2025-03-26 22:35:04', '2025-03-26 22:35:04'),
(23, '65351377-c6e0-44e3-ac83-8fe3a275e305', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '3123123', '', '', '', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-03-31', NULL, '::1', 'en-US', 'en-US', '2025-04-01 01:12:17', '2025-04-01 01:12:17'),
(24, '3aa83e6f-881d-40e6-b07d-030aa47ae664', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', 'asdfsafd', '', 'ffasdf', 'asdfasdfasdf', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-01', NULL, '::1', 'en-US', 'en-US', '2025-04-01 21:48:32', '2025-04-01 21:48:32'),
(25, '272c39f2-8b59-4642-b327-524a1456c84b', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123', '456', 'Miami', '123456', 'US', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-01', NULL, '::1', 'en-US', 'en-US', '2025-04-01 23:46:55', '2025-04-01 23:46:55'),
(26, '03c044fd-2022-48d3-a84a-ebbdefd2cf5e', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123123', '', '12123', '132123', 'US', 'AK', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-01', NULL, '::1', 'en-US', 'en-US', '2025-04-02 02:28:22', '2025-04-02 02:28:22'),
(27, '20525890-c095-45d3-9df8-34d6f311acb6', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123455', '', '12345', '123', 'noneSelected', 'noneSelected', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-01', NULL, '::1', 'en-US', 'en-US', '2025-04-02 02:31:58', '2025-04-02 02:31:58'),
(28, 'd0923aef-1881-4abf-8bb3-0ab479fdc220', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123', '', '123', '12123', 'VE', 'VE-C', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-01', NULL, '::1', 'en-US', 'en-US', '2025-04-02 02:51:05', '2025-04-02 02:51:05'),
(29, 'e55c5b1a-3caf-4173-86fd-744f812d96d0', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '1', '', '1', '1', 'VE', 'VE-D', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-03', NULL, '::1', 'en-US', 'en-US', '2025-04-03 16:05:45', '2025-04-03 16:05:45'),
(30, 'fdf445b5-e2a1-41c2-82ee-3ecc558263e1', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '1', '', '123', '123', 'VE', 'VE-E', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-04', NULL, '::1', 'en-US', 'en-US', '2025-04-04 20:59:00', '2025-04-04 20:59:00'),
(31, '6cacda93-8812-44b0-a78e-cf42b3424ff0', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', 'you', 'and', 'i', '33012', 'VE', 'VE-H', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-10', NULL, '::1', 'en-US', 'en-US', '2025-04-10 15:17:43', '2025-04-10 15:17:43'),
(32, '1df03198-35e2-49bb-bd73-d1a7221077a7', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', '123', NULL, 'Asdf', 'Asdf', 'US', 'IL', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 16:22:07', '2025-04-16 16:22:07'),
(33, '44ead0b3-64bc-4939-90dc-e3705801a498', 1, 1, 1, 1, 1, 1, 1, 'Address Default Name', 'Asdf', NULL, 'Adsf', 'Asdf', 'US', 'KS', 1, 0, 1, 1, 'NA', 0, 'Active', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 16:27:17', '2025-04-16 16:27:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
