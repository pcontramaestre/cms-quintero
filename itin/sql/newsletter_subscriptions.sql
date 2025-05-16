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
-- Table structure for table `newsletter_subscriptions`
--

CREATE TABLE `newsletter_subscriptions` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `subscription_date` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `unsubscription_date` timestamp NULL DEFAULT current_timestamp(),
  `status` varchar(25) NOT NULL,
  `status_date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL,
  `server_language` varchar(5) NOT NULL,
  `form_language` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `newsletter_subscriptions`
--

INSERT INTO `newsletter_subscriptions` (`id`, `id_code`, `is_active`, `subscription_date`, `email`, `unsubscription_date`, `status`, `status_date`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(1, '016b6392-3e38-46a3-9c21-252342c8b25e', 1, '2024-04-06', 'james_lillardlhoc@outlook.com', NULL, 'Active', '2024-04-06', NULL, '191.37.181.98', 'en-US', 'en-US', '2024-04-06 21:48:58', '2024-08-16 12:55:51'),
(861, '23d174d5-a0f5-4c15-9dab-0f2f06bff6ee', 1, '2025-02-20', 'teste@gmail.com', NULL, 'Active', '2025-02-20', NULL, '::1', 'en-US', 'en-US', '2025-02-20 21:15:27', '2025-02-20 21:15:27'),
(862, '582021d1-ce73-4594-89e7-fdf5bb30cc27', 1, '2025-04-16', 'a', NULL, 'Active', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 18:41:28', '2025-04-16 18:41:28'),
(863, 'f77dc2ad-85de-46d2-9de1-f7a74834c9ff', 1, '2025-04-16', 'b@b.com', NULL, 'Active', '2025-04-16', NULL, '::1', 'en-US', 'en-US', '2025-04-16 18:46:12', '2025-04-16 18:46:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `newsletter_subscriptions`
--
ALTER TABLE `newsletter_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `newsletter_subscriptions`
--
ALTER TABLE `newsletter_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=864;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
