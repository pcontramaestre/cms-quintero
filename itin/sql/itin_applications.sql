-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2025 at 06:38 PM
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
-- Table structure for table `itin_applications`
--

CREATE TABLE `itin_applications` (
  `id` int(11) NOT NULL,
  `id_code` char(36) NOT NULL,
  `is_active` tinyint(4) NOT NULL,
  `application_date` date NOT NULL,
  `itin_type` varchar(5) NOT NULL,
  `reason` varchar(125) NOT NULL,
  `treaty_country_for_nonresident` varchar(255) DEFAULT NULL,
  `treaty_article_for_nonresident` varchar(255) DEFAULT NULL,
  `relationship_to_us_citizen` varchar(255) DEFAULT NULL,
  `relative_info` varchar(255) DEFAULT NULL,
  `spouse_info` varchar(255) DEFAULT NULL,
  `treaty_country_for_nonresident_spr` varchar(255) DEFAULT NULL,
  `treaty_article_for_nonresident_spr` varchar(255) DEFAULT NULL,
  `other_info` varchar(255) DEFAULT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `first_name_at_birth` varchar(50) DEFAULT NULL,
  `middle_name_at_birth` varchar(50) DEFAULT NULL,
  `last_name_at_birth` varchar(100) DEFAULT NULL,
  `us_address_line1` varchar(100) NOT NULL,
  `us_city` varchar(50) NOT NULL,
  `us_state` varchar(50) NOT NULL,
  `us_zip_code` varchar(20) NOT NULL,
  `us_phone` varchar(20) NOT NULL,
  `non_us_address_line1` varchar(100) DEFAULT NULL,
  `non_us_city` varchar(50) DEFAULT NULL,
  `non_us_state` varchar(50) DEFAULT NULL,
  `non_us_country` varchar(50) DEFAULT NULL,
  `non_us_zip_code` varchar(20) DEFAULT NULL,
  `non_us_country_phone_code` varchar(10) DEFAULT NULL,
  `non_us_phone` varchar(20) DEFAULT NULL,
  `date_of_birth` date NOT NULL,
  `country_of_birth` varchar(50) NOT NULL,
  `birth_city` varchar(50) NOT NULL,
  `birth_state` varchar(50) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `country_of_citizenship` varchar(50) NOT NULL,
  `foreign_tax_id` varchar(15) DEFAULT NULL,
  `us_visa_type` varchar(5) DEFAULT NULL,
  `us_visa_number` varchar(10) DEFAULT NULL,
  `us_visa_exp_date` date DEFAULT NULL,
  `passport` varchar(20) DEFAULT NULL,
  `passport_issued_by` varchar(255) DEFAULT NULL,
  `passport_number` varchar(255) DEFAULT NULL,
  `passport_exp_date` date DEFAULT NULL,
  `drivers_license` varchar(20) DEFAULT NULL,
  `drivers_license_issued_by` varchar(255) DEFAULT NULL,
  `drivers_license_number` varchar(255) DEFAULT NULL,
  `drivers_license_exp_date` date DEFAULT NULL,
  `state_id` varchar(20) DEFAULT NULL,
  `state_id_issued_by` varchar(255) DEFAULT NULL,
  `state_id_number` varchar(255) DEFAULT NULL,
  `state_id_exp_date` date DEFAULT NULL,
  `uscis_documentation` varchar(255) DEFAULT NULL,
  `uscis_documentation_type` varchar(255) DEFAULT NULL,
  `uscis_documentation_issued_by` varchar(255) DEFAULT NULL,
  `uscis_documentation_number` varchar(255) DEFAULT NULL,
  `uscis_documentation_exp_date` date DEFAULT NULL,
  `other_documentation` varchar(255) DEFAULT NULL,
  `other_documentation_type` varchar(255) DEFAULT NULL,
  `other_documentation_issued_by` varchar(255) DEFAULT NULL,
  `other_documentation_number` varchar(255) DEFAULT NULL,
  `other_documentation_exp_date` date DEFAULT NULL,
  `issued_by` varchar(255) DEFAULT NULL,
  `id_no` varchar(20) DEFAULT NULL,
  `exp_date` date DEFAULT NULL,
  `entry_date` date DEFAULT NULL,
  `itin_or_irsn` varchar(15) NOT NULL,
  `itin_or_irsn_no` varchar(15) DEFAULT NULL,
  `itin_or_irs_first_name` varchar(255) DEFAULT NULL,
  `itin_or_irs_middle_name` varchar(255) DEFAULT NULL,
  `itin_or_irs_last_name` varchar(255) DEFAULT NULL,
  `college_univ_company` varchar(255) DEFAULT NULL,
  `college_univ_company_city` varchar(255) DEFAULT NULL,
  `college_univ_company_state` varchar(255) DEFAULT NULL,
  `length_of_stay` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `payer_id` varchar(255) NOT NULL,
  `billing` decimal(10,2) NOT NULL,
  `status` varchar(25) NOT NULL,
  `status_date` date NOT NULL,
  `notes` text DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL,
  `server_language` varchar(5) NOT NULL,
  `form_language` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `itin_applications`
--

INSERT INTO `itin_applications` (`id`, `id_code`, `is_active`, `application_date`, `itin_type`, `reason`, `treaty_country_for_nonresident`, `treaty_article_for_nonresident`, `relationship_to_us_citizen`, `relative_info`, `spouse_info`, `treaty_country_for_nonresident_spr`, `treaty_article_for_nonresident_spr`, `other_info`, `first_name`, `middle_name`, `last_name`, `first_name_at_birth`, `middle_name_at_birth`, `last_name_at_birth`, `us_address_line1`, `us_city`, `us_state`, `us_zip_code`, `us_phone`, `non_us_address_line1`, `non_us_city`, `non_us_state`, `non_us_country`, `non_us_zip_code`, `non_us_country_phone_code`, `non_us_phone`, `date_of_birth`, `country_of_birth`, `birth_city`, `birth_state`, `gender`, `country_of_citizenship`, `foreign_tax_id`, `us_visa_type`, `us_visa_number`, `us_visa_exp_date`, `passport`, `passport_issued_by`, `passport_number`, `passport_exp_date`, `drivers_license`, `drivers_license_issued_by`, `drivers_license_number`, `drivers_license_exp_date`, `state_id`, `state_id_issued_by`, `state_id_number`, `state_id_exp_date`, `uscis_documentation`, `uscis_documentation_type`, `uscis_documentation_issued_by`, `uscis_documentation_number`, `uscis_documentation_exp_date`, `other_documentation`, `other_documentation_type`, `other_documentation_issued_by`, `other_documentation_number`, `other_documentation_exp_date`, `issued_by`, `id_no`, `exp_date`, `entry_date`, `itin_or_irsn`, `itin_or_irsn_no`, `itin_or_irs_first_name`, `itin_or_irs_middle_name`, `itin_or_irs_last_name`, `college_univ_company`, `college_univ_company_city`, `college_univ_company_state`, `length_of_stay`, `email`, `payer_id`, `billing`, `status`, `status_date`, `notes`, `ip_address`, `server_language`, `form_language`, `created_at`, `updated_at`) VALUES
(34, 'b516ef68-5ff1-41d6-b70d-2787f8663b2d', 1, '2025-03-10', 'renew', 'a', '', '', '', '', '', '', '', '', '123', '', 'asdf', '', '', '', 'Asdf', 'Asdf', 'AL', 'Asdfsadf', '213123', '', '', '', '', '', '', '', '2025-03-12', 'AG', '', '', 'male', 'VE', '', '', '', NULL, '1', 'BR', '123123', '2025-03-09', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67cf86fb953cb', 20.00, 'Received', '2025-03-10', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-11 00:43:22', '2025-03-14 21:37:46'),
(35, '15f35288-a24b-4d01-9683-a75d62eb27f5', 1, '2025-03-11', 'new', 'b', '', '', '', '', '', '', '', '', 'asfd', '', 'asdf', '', '', '', '123', 'Asdfasdf', 'AL', '123', '123456', '', '', '', '', '', '', '', '2025-03-06', 'AD', '', '', 'male', 'US', '', '', '', NULL, '1', 'AG', '123123', '2025-04-04', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d08aa08bcb6', 20.00, 'Received', '2025-03-11', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-11 19:11:19', '2025-03-14 21:37:49'),
(36, '2803630d-8cd1-49bb-8138-333df1bbe8f1', 1, '2025-03-11', 'new', 'c', '', '', '', '', '', '', '', '', '1234', '', '1234', '', '', '', 'Asf', 'Asdf', 'AL', 'Asdf', '123123', '', '', '', '', '', '', '', '2025-03-06', 'AO', '', '', 'male', 'VE', '', '', '', NULL, '1', 'VE', '123123', '2025-03-09', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d0cc2ce9c37', 20.00, 'Received', '2025-03-11', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-11 23:50:53', '2025-03-14 21:37:51'),
(37, 'f5ee4321-76c8-46f7-a03e-9db04099f0ee', 1, '2025-03-11', 'new', 'd', '', '', '', '', '', '', '', '', '123123', '', '123123', '', '', '', 'Asdfasdf', 'Asdfasdf', 'AL', 'A', '123123', '', '', '', '', '', '', '', '2025-03-05', 'AO', '', '', 'male', 'CN', '', '', '', NULL, '1', 'AM', '123', '2025-04-02', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d0ccaae3c13', 20.00, 'Received', '2025-03-11', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-11 23:53:11', '2025-03-14 21:37:53'),
(38, '54e6191b-fa7d-45b2-bc64-274799baa2d9', 1, '2025-03-11', 'new', 'e', '', '', '', '', '', '', '', '', 'asdf', '', 'asdf', '', '', '', 'Asdf', 'Asdf', 'AL', 'Asdf', '123', '', '', '', '', '', '', '', '2025-03-22', 'AO', '', '', 'male', 'VE', '', '', '', NULL, '1', 'AG', '123123', '2025-03-27', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d0df4396b2d', 20.00, 'Received', '2025-03-11', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 01:12:03', '2025-03-14 21:37:56'),
(39, '04be9c68-fe3c-4a56-9915-e8fb4b51711f', 1, '2025-03-11', 'new', 'f', '', '', '', '', '', '', '', '', '1231', '', '123123', '', '', '', 'Asdf', 'Asdf', 'AL', 'Asdf', '123', '', '', '', '', '', '', '', '2025-04-05', 'DZ', '', '', 'male', 'BR', '', '', '', NULL, '1', 'SA', '123123', '2025-03-12', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d0df9570277', 20.00, 'Received', '2025-03-11', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 01:13:28', '2025-03-14 21:37:58'),
(40, 'bb5f3e42-3a1d-4827-85b0-2f9d4f4910e9', 1, '2025-03-11', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', 'Asdf', 'Asdf', 'AL', 'Asdf', '123', '', '', '', '', '', '', '', '2025-03-15', 'AR', '', '', 'male', 'BR', '', '', '', NULL, '1', 'VE', '123123', '2025-04-04', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d0dfc5484d3', 20.00, 'Received', '2025-03-11', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 01:14:14', '2025-03-12 01:14:14'),
(41, '700f2833-53df-468e-a9cf-86d42c394299', 1, '2025-03-11', 'new', 'h', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', '123123', 'Asdfasdf', 'AL', 'Asdfsadf', '123123', '', '', '', '', '', '', '', '2025-03-04', 'AI', '', '', 'male', 'VE', '', '', '', NULL, '1', 'ES', '123123', '2025-03-12', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d0ef830324b', 20.00, 'Received', '2025-03-11', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 02:21:23', '2025-03-14 21:38:00'),
(42, 'fd4957d2-d090-49fd-93c6-28dd9011e770', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', 'Asdf', 'Asdfasdf', 'AL', '123123', '123123', '', '', '', '', '', '', '', '2025-04-02', 'SA', '', '', 'male', 'VE', '', '', '', NULL, '1', 'ES', '123123', '2025-03-27', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1d75cb8a61', 0.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 20:53:14', '2025-03-12 20:53:14'),
(43, '7baa1b58-d5ad-45f4-84fc-513c9d2ffabf', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', 'asdf', '', 'asdf', '', '', '', 'Asdfasdf', 'Asdfasdf', 'AL', 'Asdsadf', '123123', '', '', '', '', '', '', '', '2025-03-14', 'SA', '', '', 'male', 'US', '', '', '', NULL, '1', 'DZ', '123123', '2025-03-29', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1f453a6fcb', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 20:54:22', '2025-03-12 20:54:22'),
(44, 'b2f6ef98-7f25-441c-8eb0-a30a6f3c8df0', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', '123', 'Asdf', 'AL', 'Asdf', '123', '', '', '', '', '', '', '', '2025-03-13', 'AI', '', '', 'male', 'VE', '', '', '', NULL, '1', 'SA', '123123', '2025-03-20', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1f49ba7da0', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 20:55:41', '2025-03-12 20:55:41'),
(45, 'c38c394c-a8dd-4a92-96fc-a9946f18ba6a', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', '123', 'Asdf', 'AL', 'Asdf', '123', '', '', '', '', '', '', '', '2025-04-03', 'DZ', '', '', 'male', 'ES', '', '', '', NULL, '1', 'SA', '123123', '2025-03-05', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1f501c766f', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 20:57:11', '2025-03-12 20:57:11'),
(46, '12091f96-29f4-4d19-b4b4-2d813d73396b', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', '123', 'Asdf', 'AL', '123', '123', '', '', '', '', '', '', '', '2025-03-28', 'SA', '', '', 'male', 'US', '', '', '', NULL, '1', 'AU', '123', '2025-03-21', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1f67cd244e', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:03:25', '2025-03-12 21:03:25'),
(47, '745d16e9-17a4-4948-b272-036cf3da759f', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', 'Asdf', 'Asdfa', 'AL', 'Asdf', '123123', '', '', '', '', '', '', '', '2025-03-20', 'DZ', '', '', 'male', 'VE', '', '', '', NULL, '1', 'US', '123123', '2025-04-02', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1f6ef6a01b', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:05:23', '2025-03-12 21:05:23'),
(48, '87fb242b-c09b-4771-9f6b-0b5ac6bcaf33', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', 'asdf', '', 'asdf', '', '', '', '123', 'Asdf', 'AL', 'A', '123123', '', '', '', '', '', '', '', '2025-03-26', 'AG', '', '', 'male', 'VE', '', '', '', NULL, '1', 'AM', '123123', '2025-04-04', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1f971f3139', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:16:30', '2025-03-12 21:16:30'),
(49, '7b63b04c-3dc5-46ee-9d47-4d66027ebbb5', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', 'asdf', '', 'asdf', '', '', '', 'Adsf', 'Asdf', 'AL', 'Asdf', '123123', '', '', '', '', '', '', '', '2025-02-27', 'AG', '', '', 'male', 'US', '', '', '', NULL, '1', 'SA', '123123', '2025-03-26', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1fa47d88b4', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:19:37', '2025-03-12 21:19:37'),
(50, '267e843a-3f8d-43e9-a0d0-8980593132fa', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123123', '', '123123', '', '', '', 'Asdf', 'Asdfasdf', 'AL', 'Asdfasdf', '123123', '', '', '', '', '', '', '', '2025-03-18', 'AI', '', '', 'male', 'VE', '', '', '', NULL, '1', 'AI', '123123', '2025-03-03', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1fcde74438', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:30:40', '2025-03-12 21:30:40'),
(51, 'a83a4ace-5e40-4b9e-9c09-4a5aa5f1ef2b', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123123', '', '123123', '', '', '', 'Asdfasdf', 'Asdfasdf', 'AL', 'Sadfasdf', '123123', '', '', '', '', '', '', '', '2025-03-10', 'AG', '', '', 'male', 'VE', '', '', '', NULL, '1', 'SA', '123123', '2025-04-01', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1fe4d2467e', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:36:48', '2025-03-12 21:36:48'),
(52, '9f812b00-891d-497a-b06a-165c79cdc860', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123123123', '', '123123123', '', '', '', '123123', 'Asdf', 'AL', '123123', '123123', '', '', '', '', '', '', '', '2025-03-27', 'DZ', '', '', 'male', 'ES', '', '', '', NULL, '1', 'AG', '123123', '2025-03-20', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1feb1434b4', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:39:07', '2025-03-12 21:39:07'),
(53, 'c47fb3c7-5ec4-47f5-bd8a-0cd84a74cd72', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', 'asdfasdf', '', 'asdfasdf', '', '', '', '123123', 'Asdf', 'AL', 'Asdfsadf', '123', '', '', '', '', '', '', '', '2025-04-05', 'DZ', '', '', 'male', 'VE', '', '', '', NULL, '1', 'SA', '123123', '2025-03-20', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d1ff7b34979', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:41:53', '2025-03-12 21:41:53'),
(54, '781ab48c-654e-486f-95ef-4a68fd574db4', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123123', '', '123123', '', '', '', 'Asdfsadf', 'Sadfasdf', 'AL', 'Sadfsadf', '123123', '', '', '', '', '', '', '', '2025-03-27', 'AR', '', '', 'male', 'US', '', '', '', NULL, '1', 'AW', '123123', '2025-03-27', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d2025ef2e6f', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 21:54:10', '2025-03-12 21:54:10'),
(55, '519b9857-bdda-4c53-a328-c0999358e2aa', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123123', '', '123123', '', '', '', 'Asdfasdf', 'Asdf', 'AL', 'Asdfadsf', '123123', '', '', '', '', '', '', '', '2025-03-31', 'AM', '', '', 'male', 'BR', '', '', '', NULL, '1', 'AG', '123123', '2025-03-18', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d204dfe0823', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 22:04:56', '2025-03-12 22:04:56'),
(56, '87fd8aa8-289a-4f1e-9ae9-cb5262b6badc', 1, '2025-03-12', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', '123123', 'Asdfasd', 'AL', '12312', '123123', '', '', '', '', '', '', '', '2025-04-04', 'AR', '', '', 'male', 'VE', '', '', '', NULL, '1', 'SA', '123123', '2025-04-01', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d205b35bd0d', 20.00, 'Received', '2025-03-12', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-12 22:08:56', '2025-03-12 22:08:56'),
(57, 'a04abe38-ec0d-43a1-a04c-080710e06f6a', 1, '2025-03-17', 'new', 'g', '', '', '', '', '', '', '', '', 'a', '', 'a', '', '', '', '123', 'Asdf', 'ID', '123', '123', '', '', '', 'CN', '', '+86', '', '2025-03-14', 'CL', '', '', 'male', 'VE', '', '', '', NULL, '1', 'AR', '123', '2025-03-30', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d89994534cb', 0.00, 'Received', '2025-03-17', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-17 22:00:14', '2025-03-17 22:00:14'),
(58, 'ca0b63af-944f-4f87-b033-64fd6e98cad1', 1, '2025-03-17', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', '123', 'Asdf', 'KY', 'Asdf', '123', '', '', '', '', '', '', '', '2025-03-21', 'AG', '', '', 'male', 'US', '', '', '', NULL, '1', 'AW', '12345', '2025-03-18', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d89b9dcd6d4', 20.00, 'Received', '2025-03-17', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-17 22:01:44', '2025-03-17 22:01:44'),
(59, 'a5728bb7-f662-4556-873e-599f469fa5dc', 1, '2025-03-17', 'new', 'g', '', '', '', '', '', '', '', '', 'asdf', '', 'asdf', '', '', '', 'Aguas', 'Asdfasdf', 'AL', '123', '123123', 'Aguas', 'Aguaso', 'VE-L', 'VE', '123', '+58', '12345', '2025-03-27', 'VE', 'Carabella', 'VE-G', 'male', 'US, VE', '123', '', '123', '2025-03-24', '1', 'ES', '123', '2025-04-03', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, '2025-03-03', 'itin', '123123', 'asdf', 'asdf', 'asdf', 'Asdfdsaf', 'Dasfsadf', 'KY', '123', 'a@a.com', '67d89e15bb492', 20.00, 'Received', '2025-03-17', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-17 22:13:16', '2025-03-17 22:13:16'),
(60, '9c4beff5-07c4-4225-be97-8c02a61f1c11', 1, '2025-03-17', 'new', 'g', '', '', '', '', '', '', '', '', 'asdf', '', 'asdf', '', '', '', 'Asdf', 'Asdf', 'ID', 'Asf', '123', '', '', '', '', '', '', '', '2025-02-27', 'SA', '', '', 'male', 'VE', '', '', '', NULL, '1', 'DZ', '123', '2025-03-26', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67d89ec5a5c9a', 20.00, 'Received', '2025-03-17', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-03-17 22:15:11', '2025-03-17 22:15:11'),
(61, '13829af5-837c-4011-a822-6814fc7fddc7', 1, '2025-04-14', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', 'Asdf', 'Asdf', 'AL', 'Asdf', '123123', '', '', '', '', '', '', '', '2025-04-10', 'VE', '', 'VE-G', 'male', 'VE', '', '', '', NULL, '1', 'AO', '123123', '2025-05-07', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67fd1fa8e6af0', 150.00, 'Received', '2025-04-14', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-14 14:46:51', '2025-04-14 14:46:51'),
(62, '6f437af6-6c30-4633-b322-d3d3ed04ae4b', 1, '2025-04-14', 'new', 'a', 'Country', 'Article', '', '', '', '', '', '', 'Ablaze', '', 'Ablaze', '', '', '', 'Ablaze', 'Ablaze', 'ID', 'Ablaze', '123', '', '', '', '', '', '', '', '2025-04-04', 'DE', '', '', 'male', 'US', '', '', '', NULL, '1', 'AL', '12355', '2025-04-08', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67fd6fb47dab0', 150.00, 'Received', '2025-04-14', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-14 20:28:37', '2025-04-14 20:28:37'),
(63, '5609d1e5-ec76-4264-be59-f50d33bcfb6e', 1, '2025-04-14', 'new', 'd', '', '', 'Alien', 'Alien Junior', '', '', '', '', '123', '123', '123123123', '123123123', '123123', '123123', '123123', 'Fasdfsa', 'AL', '123123', '123123', '123123', '123', 'VE-Y', 'VE', '123123123', '+58', '123123123', '2025-04-11', 'US', 'Asdfasdf', 'GA', 'male', 'US, VE', '123123123', '', '123123123', '2025-04-23', '1', 'AR', '123123123', '2025-04-23', '1', '1', '1', '2025-06-24', '', NULL, NULL, NULL, '1', '1', '1', '1', '2024-08-20', '', NULL, NULL, NULL, NULL, '', '', NULL, '2025-04-25', 'irsn', '123123123', '123', '', '123', '123123123', '', 'CO', '123123', 'a@a.com', '67fd6be8413f7', 150.00, 'Received', '2025-04-14', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-14 20:34:01', '2025-04-15 01:21:03'),
(64, '8ca8f2b4-e07e-4c3b-8b86-caf0a23d7ffd', 1, '2025-04-14', 'new', 'e', '', '', '', '', '13223123', '', '', '', '123', '', '123', '', '', '', '123', 'Asdf', 'AL', '3123', '123123', '', '', '', '', '', '', '', '2025-04-10', 'VE', '', 'VE-I', 'male', 'US', '12345', '', '', '2025-04-08', '1', 'SA', '123123', '2025-04-14', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, '2025-04-15', 'Not disclosure', '', '', '', '', '123123', '', 'GA', '', 'a@a.com', '67fd70201151f', 150.00, 'Received', '2025-04-14', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-14 20:40:04', '2025-04-14 20:40:04'),
(65, '48e20b40-d97d-44fb-9051-c7faac6d227f', 1, '2025-04-14', 'new', 'h', '', '', '', '', '', '', '', 'trying to speak', '123132', '', '123', '', '', '', 'Asdfasdf', 'Asdf', 'AL', '123123', '123123', '', '', '', '', '', '', '', '2025-04-10', 'SA', '', '', 'male', 'US', '', '', '', NULL, '1', 'AR', '123123', '2025-04-23', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67fd76c529160', 150.00, 'Received', '2025-04-14', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-14 20:58:39', '2025-04-14 20:58:39'),
(66, '3c56c457-e98f-4b3e-b644-0acab1b8832a', 1, '2025-04-16', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', 'Asdf', 'Asdf', 'AL', '123', '123123', '', '', '', '', '', '', '', '2025-04-17', 'VE', 'Asdfasdf', 'VE-Y', 'male', 'US', '123123', '', '', NULL, '1', 'BR', '123', '2025-04-21', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '1', '123123', 'DZ', '123132', '2025-04-22', '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67ffcd5fee635', 0.00, 'Received', '2025-04-16', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-16 15:33:16', '2025-04-16 15:33:16'),
(67, 'e07645fd-b4a9-4b33-9013-865144bdc4d0', 1, '2025-04-16', 'new', 'g', '', '', '', '', '', '', '', '', '123123', '', '123', '', '', '', '123123', 'Asdfasfd', 'AL', '123123', '12132', '', '', '', '', '', '', '', '2025-04-16', 'AG', '', '', 'male', 'VE', '', '', '', NULL, '1', 'AG', '123', '2025-04-17', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67ffcf01c71cc', 20.00, 'Received', '2025-04-16', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-16 15:39:35', '2025-04-16 15:39:35'),
(68, 'e3309cab-298e-4dd2-9675-0ecd3dce4b97', 1, '2025-04-16', 'new', 'g', '', '', '', '', '', '', '', '', 'asdf', '', 'asdf', '', '', '', '123123', 'Asdfsadf', 'AL', 'Asfasdf', '123123', '', '', '', '', '', '', '', '2025-04-30', 'AF', '', '', 'male', 'VE', '', '', '', NULL, '1', 'AG', '123', '2025-05-01', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67ffd01e3787b', 20.00, 'Received', '2025-04-16', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-16 15:44:18', '2025-04-16 15:44:18'),
(69, 'd6008761-0717-4a3b-aaa9-2991a08dccd5', 1, '2025-04-16', 'new', 'g', '', '', '', '', '', '', '', '', 'asdfsadf', '', 'asdfasdf', '', '', '', '123', 'Asdfadsf', 'AL', 'Asdfasdf', '123123', '', '', '', '', '', '', '', '2025-04-29', 'AR', '', '', 'male', 'US', '', '', '', NULL, '1', 'AM', '123', '2025-05-07', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a@a.com', '67ffd09cdf77a', 150.00, 'Received', '2025-04-16', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-16 15:46:10', '2025-04-16 15:46:10'),
(70, 'f31c676a-e409-4271-bd78-4ebb87a2be23', 1, '2025-04-16', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', '123', 'Asdf', 'IL', 'Asdf', '123', '', '', '', '', '', '', '', '2025-04-24', 'AD', '', '', 'male', 'VE', '', '', '', NULL, '1', 'ES', '123123', '2025-04-16', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a', '67ffd8f0165c5', 400.00, 'Received', '2025-04-16', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-16 16:22:07', '2025-04-16 16:22:07'),
(71, '3ee916b3-de7a-4a5e-b1cb-570c2b84186b', 1, '2025-04-16', 'new', 'g', '', '', '', '', '', '', '', '', '123', '', '123', '', '', '', 'Asdf', 'Adsf', 'KS', 'Asdf', '123', '', '', '', '', '', '', '', '2025-04-24', 'ES', '', '', 'male', 'BR', '', '', '', NULL, '1', 'SA', '123', '2025-04-25', '', NULL, NULL, NULL, '', NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', NULL, NULL, NULL, NULL, '', '', NULL, NULL, 'Not disclosure', '', '', '', '', '', '', '', '', 'a', '67ffda2e454c0', 400.00, 'Received', '2025-04-16', 'Not disclosure', '::1', 'en-US', 'en-US', '2025-04-16 16:27:17', '2025-04-16 16:27:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `itin_applications`
--
ALTER TABLE `itin_applications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `itin_applications`
--
ALTER TABLE `itin_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
