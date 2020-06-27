-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.62 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table mileston_tinycom.companies
CREATE TABLE IF NOT EXISTS `companies` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user` bigint(20) unsigned DEFAULT NULL,
  `referrer` bigint(20) unsigned DEFAULT NULL,
  `code` char(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `domain` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `database` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `database_username` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `database_password` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `setup` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'N',
  `active` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Y',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `companies_code_unique` (`code`),
  KEY `companies_user_index` (`user`),
  KEY `companies_referrer_index` (`referrer`),
  KEY `companies_company_index` (`company`),
  KEY `companies_domain_index` (`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.companies: ~0 rows (approximately)
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.editions
CREATE TABLE IF NOT EXISTS `editions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount_multiplier` decimal(8,2) NOT NULL DEFAULT '1.00',
  `description` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `features` text COLLATE utf8mb4_unicode_ci,
  `active` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Y',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `editions_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.editions: ~1 rows (approximately)
/*!40000 ALTER TABLE `editions` DISABLE KEYS */;
INSERT INTO `editions` (`id`, `name`, `amount_multiplier`, `description`, `features`, `active`, `created_at`, `updated_at`) VALUES
	(1, 'Smart', 1.00, NULL, NULL, 'Y', '2020-06-25 11:41:56', '2020-06-25 11:41:56');
/*!40000 ALTER TABLE `editions` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.failed_jobs: ~0 rows (approximately)
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.features
CREATE TABLE IF NOT EXISTS `features` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `default` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Y',
  `attributes` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `features_name_index` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.features: ~0 rows (approximately)
/*!40000 ALTER TABLE `features` DISABLE KEYS */;
/*!40000 ALTER TABLE `features` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.migrations: ~10 rows (approximately)
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '2014_10_12_000000_create_users_table', 1),
	(2, '2014_10_12_100000_create_password_resets_table', 1),
	(3, '2019_08_19_000000_create_failed_jobs_table', 1),
	(4, '2020_06_02_000000_modify_users_table', 1),
	(5, '2020_06_02_000001_create_companies_table', 1),
	(6, '2020_06_02_000002_create_features_table', 1),
	(7, '2020_06_02_000003_create_editions_table', 1),
	(8, '2020_06_02_000004_create_subscriptions_table', 1),
	(9, '2020_06_02_000005_create_orders_table', 1),
	(10, '2020_06_02_000006_create_payments_table', 1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `company` bigint(20) unsigned DEFAULT NULL,
  `type` enum('Subscription','Addon','Other') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Subscription',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `amount` decimal(8,2) NOT NULL DEFAULT '0.00',
  `reference` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('New','Paid','Cancelled','Overridden') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'New',
  `status_log` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attributes` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_company_index` (`company`),
  KEY `orders_reference_index` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.orders: ~0 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.password_resets
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.password_resets: ~0 rows (approximately)
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reference` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_reference` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` bigint(20) unsigned DEFAULT NULL,
  `amount` decimal(8,2) NOT NULL DEFAULT '0.00',
  `attachment` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request_id` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `request` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `payments_reference_index` (`reference`),
  KEY `payments_order_reference_index` (`order_reference`),
  KEY `payments_order_index` (`order`),
  KEY `payments_request_id_index` (`request_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.payments: ~0 rows (approximately)
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.subscriptions
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `company` bigint(20) unsigned DEFAULT NULL,
  `edition` bigint(20) unsigned DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `order` bigint(20) unsigned DEFAULT NULL,
  `active` enum('Y','N') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Y',
  `status` enum('Current','Upcoming','Expired','Cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Upcoming',
  `status_log` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `subscriptions_company_index` (`company`),
  KEY `subscriptions_edition_index` (`edition`),
  KEY `subscriptions_start_index` (`start`),
  KEY `subscriptions_end_index` (`end`),
  KEY `subscriptions_order_index` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.subscriptions: ~0 rows (approximately)
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;

-- Dumping structure for table mileston_tinycom.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(48) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(16) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('company','referrer','client') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_name_index` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table mileston_tinycom.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `phone`, `type`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Administrator', 'admin@admin.admin', NULL, 'company', NULL, '$2y$10$mwu/5dq6RFfetojjXy2wAOCui1T9oYXYrQ95cHeydAZsGon9CEo52', NULL, '2020-06-25 11:41:54', '2020-06-25 11:41:54');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
