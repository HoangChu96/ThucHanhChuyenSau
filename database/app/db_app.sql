-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2018 lúc 07:16 PM
-- Phiên bản máy phục vụ: 10.1.32-MariaDB
-- Phiên bản PHP: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `db_app`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bill`
--

CREATE TABLE `bill` (
  `id` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `date_order` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` float NOT NULL DEFAULT '0',
  `note` text,
  `status` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `bill`
--

INSERT INTO `bill` (`id`, `id_customer`, `date_order`, `total`, `note`, `status`) VALUES
(56, 9, '2018-06-18 02:29:07', 245, NULL, 0),
(57, 8, '2018-06-19 05:24:21', 380, NULL, 0),
(58, 8, '2018-06-19 05:28:20', 380, NULL, 0),
(59, 8, '2018-06-19 05:41:01', 380, NULL, 0),
(60, 8, '2018-06-19 05:44:34', 380, NULL, 0),
(61, 8, '2018-06-19 05:47:18', 380, NULL, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bill_detail`
--

CREATE TABLE `bill_detail` (
  `id` int(11) NOT NULL,
  `id_bill` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` float DEFAULT '0',
  `price` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `bill_detail`
--

INSERT INTO `bill_detail` (`id`, `id_bill`, `id_product`, `quantity`, `price`) VALUES
(40, 56, 29, 0, 124),
(41, 56, 30, 0, 121),
(42, 57, 29, 0, 124),
(43, 57, 30, 0, 121),
(44, 57, 34, 0, 135),
(45, 58, 29, 0, 124),
(46, 58, 30, 0, 121),
(47, 58, 34, 0, 135),
(48, 59, 29, 0, 124),
(49, 59, 30, 0, 121),
(50, 59, 34, 0, 135),
(51, 60, 29, 0, 124),
(52, 60, 30, 0, 121),
(53, 60, 34, 0, 135),
(54, 61, 29, 0, 124),
(55, 61, 30, 0, 121),
(56, 61, 34, 0, 135);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `id_product` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`id`, `link`, `id_product`) VALUES
(54, '54.jpg', 29),
(55, '55.jpg', 30),
(56, '56.jpg', 31),
(57, '57.jpg', 32),
(58, '58.jpg', 33),
(59, '59.jpg', 34),
(60, '60.jpg', 35),
(61, '61.jpg', 32),
(62, '62.jpg', 37),
(63, '63.jpg', 38),
(64, '64.jpg', 39),
(65, '65.jpg', 39),
(66, '66.jpg', 41),
(67, '67.jpg', 42),
(70, '70.jpg', 43),
(71, '71.jpg', 44),
(72, '72.jpg', 45),
(73, '75.jpg', 46),
(74, '76.jpg', 47),
(75, '77.jpg', 48),
(78, '78.jpg', 49),
(79, '79.jpg', 50),
(80, '80.jpg', 51),
(81, '81.jpg', 52),
(82, '82.jpg', 53),
(83, '83.jpg', 54),
(84, '84.jpg', 55),
(85, '85.jpg', 56),
(86, '86.jpg', 57),
(87, '87.jpg', 58),
(88, '88.jpg', 59),
(89, '89.jpg', 60),
(90, '90.jpg', 61),
(91, '91.jpg', 62),
(92, '92.jpg', 63),
(93, '93.jpg', 64),
(94, '94.jpg', 65),
(95, '95.jpg', 66),
(96, '96.jpg', 67),
(97, '97.jpg', 67),
(98, '98.jpg', 69),
(99, '99.jpg', 70),
(100, '100.jpg', 71),
(101, '101.jpg', 72),
(102, '102.jpg', 73),
(103, '103.jpg', 74),
(104, '104.jpg', 75),
(105, '105.jpg', 76),
(106, '106.jpg', 77),
(107, '107.jpg', 78),
(108, '108.jpg', 79),
(109, '109.jpg', 80),
(110, '110.jpg', 81),
(111, '111.jpg', 82),
(112, '112.jpg', 84),
(113, '113.jpg', 85),
(114, '114.jpg', 86),
(115, '115.jpg', 87),
(116, '116.jpg', 88),
(117, '117.jpg', 89),
(118, '118.jpg', 90),
(119, '119.jpg', 91),
(120, '120.jpg', 92),
(121, '121.jpg', 93),
(122, '122.jpg', 94),
(123, '123.jpg', 95),
(124, '124.jpg', 96),
(125, '125.jpg', 97),
(126, '126.jpg', 29),
(127, '127.jpg', 29),
(128, '128.jpg', 29),
(129, '129.jpg', 30),
(130, '130.jpg', 30),
(131, '131.jpg', 30),
(134, '132.jpg', 31),
(135, '133.jpg', 31),
(136, '134.jpg', 31),
(137, '137.jpg', 32),
(138, '138.jpg', 32),
(139, '139.jpg', 32),
(140, '140.jpg', 33),
(141, '141.jpg', 33),
(142, '142.jpg', 33),
(143, '143.jpg', 34),
(144, '144.jpg', 34),
(145, '145.jpg', 34),
(146, '146.jpg', 35),
(147, '147.jpg', 35),
(148, '148.jpg', 35),
(149, '149.jpg', 37),
(150, '150.jpg', 37),
(151, '151.jpg', 37),
(152, '152.jpg', 38),
(153, '153.jpg', 38),
(154, '154.jpg', 38),
(155, '155.jpg', 39),
(156, '156.jpg', 39),
(157, '157.jpg', 39),
(158, '158.jpg', 41),
(159, '159.jpg', 41),
(160, '160.jpg', 41),
(161, '161.jpg', 42),
(162, '162.jpg', 42),
(163, '163.jpg', 42),
(164, '164.jpg', 43),
(165, '165.jpg', 43),
(166, '166.jpg', 43),
(167, '167.jpg', 44),
(168, '168.jpg', 44),
(169, '169.jpg', 44),
(170, '170.jpg', 45),
(171, '171.jpg', 45),
(172, '172.jpg', 45),
(173, '173.jpg', 46),
(174, '174.jpg', 46),
(175, '175.jpg', 46),
(176, '166.jpg', 47),
(177, '167.jpg', 47),
(178, '168.jpg', 47),
(179, '169.jpg', 48),
(180, '170.jpg', 48),
(181, '171.jpg', 48),
(182, '172.jpg', 49),
(183, '173.jpg', 49),
(184, '174.jpg', 49),
(185, '175.jpg', 50),
(186, '176.jpg', 50),
(187, '177.jpg', 50),
(188, '178.jpg', 51),
(189, '179.jpg', 51),
(190, '180.jpg', 51);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `id_type` int(11) DEFAULT NULL,
  `price` float DEFAULT '0',
  `color` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `new` tinyint(4) NOT NULL DEFAULT '0',
  `inCollection` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `id_type`, `price`, `color`, `description`, `new`, `inCollection`) VALUES
(29, 'Nike Free Trainer 5.0 V6 Men - Black', 4, 124, 'Khaki', '\r\nNike Free Trainer 5.0 V6 Men - Black\r\nNike Free Trainer 5.0 is a training shoe that provides firm footing while still allowing for natural rhythmic movement, meeting maximum demands when exercising with high intensity.\r\nAdvantages:\r\nFlexibility is enhanced by the groove of the outsole, which allows the foot to move naturally in all directions.\r\n- Lightweight, lightweight Flywire technology that minimizes weight and supports foot support.\r\n- The upper part is made of fine textile net, support from many sides when moving fast.', 0, 0),
(30, '\r\nNike Free Trainer 5.0 V6 AMP South - Oklahoma', 4, 121, 'Fuchsia', 'Nike Free Trainer 5.0 V6 AMP South - Oklahoma\r\nThe Nike Free Trainer 5.0 V6 AMP - Oklahoma is a product of the Nike Week Zero collection - designed in color, featuring the logo of 13 teams from the top 13 US universities. unique color separation completely. This is a training shoe that is suitable for practicing many sports at the same time, providing stability to your feet while still allowing your feet to move smoothly. high.\r\nAdvantages:\r\nFlexibility is enhanced by the groove of the outsole, which allows the foot to move naturally in all directions.\r\n- Lightweight, lightweight Flywire technology that minimizes weight and supports foot support.\r\n- The upper part is made of fine textile net, support from many sides when moving fast.', 1, 0),
(31, '\r\nNike Air Force 1 Low Shoes (Gray)', 4, 133, 'LimeGreen', 'Looking for that next great dress to take on summer getaways or just out to weekend brunch? We\'ve got you covered with this breezy, floral print maxi. Flirty ruffles dance along the skirt, while soft tassel-kissed straps tie the look together.', 1, 0),
(32, 'Giày Nike Air Jordan 1 Mid - green moss', 4, 143, 'Wheat', '\r\nNike Air Force 1 Low Shoes (Gray)\r\nNike Air Force 1 Low is a low-neck version of the legendary Nike Air Force 1 shoe. It has been one of the iconic and permanent sneakers for more than 30 years.\r\n\r\nNike Air Force 1 Low has a beautiful, classic design and when you wear it you feel really comfortable with the Nike air purse. This is a shoe that is named after the aircraft of the presidents of the United States and it is so great.', 1, 0),
(33, '\r\nNike Air Force 1 Low Shoes (Green)', 4, 157, 'DarkOliveGreen', '\r\nNike Air Force 1 Low Shoes (Green)\r\nNike Air Force 1 Low shoes are one of the iconic sneakers and have lasted more than 30 years.\r\n\r\nNike Air Force 1 Low has a beautiful, classic design and when you wear it you feel really comfortable with the Nike air purse. This is a shoe that is named after the aircraft of the presidents of the United States and it is so great.', 0, 0),
(34, 'Nike Air Force 1 Low Shoes (Black)', 4, 135, 'DarkGreen', 'Nike Air Force 1 Low Shoes (Black)\r\nNike Air Force 1 Low shoes are one of the iconic sneakers and have lasted more than 30 years.\r\n\r\nNike Air Force 1 Low has a beautiful, classic design and when you wear it you feel really comfortable with the Nike air purse. This is a shoe that is named after the aircraft of the presidents of the United States and it is so great.', 1, 1),
(35, 'Nike Air Force 1 Low (Red)', 4, 107, 'Tan', '\r\nNike Air Force 1 Low (Red)\r\nNike Air Force 1 Low shoes are one of the iconic sneakers and have lasted more than 30 years.\r\n\r\nNike Air Force 1 Low has a beautiful, classic design and when you wear it you feel really comfortable with the Nike air purse. This is a shoe that is named after the aircraft of the presidents of the United States and it is so great.', 0, 0),
(37, 'Nike Air Jordans 1 mid-wrist', 4, 149, 'Orchid', 'Nike Air Jordans 1 Mid - one of the legendary shoes of Nike.\r\nWith high quality leather embracing your feet in a soft and comfortable way combining fashionable high-fashioned designs. Nike Air Jordans 1 Mid can be used for everyday purposes, going out or going for a sport like basketball.', 0, 1),
(38, 'Nike Air Jordans 1 Mid - White', 4, 146, 'DarkGoldenRod', 'Nike Air Jordans 1 Mid - one of the legendary shoes of Nike.\r\nWith high quality leather embracing your feet in a soft and comfortable way combining fashionable high-fashioned designs. Nike Air Jordans 1 Mid can be used for everyday purposes, going out or going for a sport like basketball', 1, 0),
(39, '\r\nAir Jordan Retro 1 Mid (Black)', 4, 122, 'Magenta', '\r\nAir Jordan Retro 1 Mid (Black)\r\nAir Jordan Retro 1 Mid was first introduced in 1985, and is one of the legendary Nike shoes, and over the past 30 years, Air Jordan Retro 1 Mid has made millions of people passionate.\r\n\r\nAir Jordan Retro 1 Mid has a classic design and is never outdated. Feelings on feet are very smooth and comfortable. You can use the Air Jordan Retro 1 Mid in sporting activities, basketball and is perfectly suited for outings.', 0, 0),
(41, '\r\nAir Jordan 1 Retro Low OG Male - White', 4, 132, 'Cyan', '\r\nNike Air Jordans 1 Retro Low OG is the legendary Nike shoe.\r\n\r\nThe Nike Air Jordan 1 is one of the most sought after, and the Nike Air Jordan 1 Retro Low OG is even more impressive. Nike Swoosh.\r\nSo far, Nike Air Jordans 1 Retro Low OG is still popular and popular in the market.', 0, 1),
(42, 'high slit maxi', 4, 134, 'LightGreen', 'A classic maxi silhouette gets a sexy update in this daring number. Detailed with a dramatic side slit, this one\'s all about showing off those legs. Love accessories? The solid hue is the perfect blank slate to build a signature, unforgettable look.', 0, 0),
(43, 'Air Jordan 5 AM Nike Shoes (Black White)', 4, 117, 'Green', 'Nike Air Jordan 5 AM shoes are sleek, powerful, and supportive to good workouts thanks to the high technology integrated from the Nike manufacturer. In addition, it is a very fashionable training shoes, you can use Air Jordan 5 AM for sports activities and also for daily use.', 1, 0),
(44, 'Air Jordan 5 AM Nike Shoes (Black)', 4, 142, 'IndianRed', '\r\nNike Air Jordan 5 AM shoes are sleek, powerful, and supportive to good workouts thanks to the high technology integrated from the Nike manufacturer. In addition, it is a very fashionable training shoes, you can use Air Jordan 5 AM for sports activities and also for daily use.', 0, 0),
(45, '\r\nNike Air Max 2017 South - Gray White', 4, 141, 'Cyan', '\r\nThe Nike Air Max 2017 is an upgraded shoe from the 2016 classic, which is considered to be the most distinctive pair of shoes ever made.\r\n\r\nWith the familiar Air Max full-length base, the Nike Air Max 2017 still offers a smooth, elastic and flexible sole that feels like flying when moving. The Air Max 2017 is specially upgraded to the upper part of the Air Max 2016, the Swoosh logo is no longer in the front and the Flywire thread is hidden, making the Nike Air Max 2017 look more eye-catching and attractive.\r\n\r\nWith new refinements in design, Nike Air Max 2017 shoes are the top choice for you the most stylish look.', 0, 1),
(46, 'Nike Air Max 2017 Shoes - Black', 4, 117, 'RoyalBlue', 'Nike Air Max 2017 South - Black\r\nThe Nike Air Max 2017 is an upgraded shoe from the 2016 classic, which is considered to be the most distinctive pair of shoes ever made.\r\n\r\nWith the familiar Air Max full-length base, the Nike Air Max 2017 still offers a smooth, elastic and flexible sole that feels like flying when moving. The Air Max 2017 is specially upgraded to the upper part of the Air Max 2016, the Swoosh logo is no longer in the front and the Flywire thread is hidden, making the Nike Air Max 2017 look more eye-catching and attractive.\r\n\r\nWith new refinements in design, Nike Air Max 2017 shoes are the top choice for you the most stylish look.', 0, 0),
(47, 'Nike Air Max 2017 Men - Red Black', 4, 124, 'MediumSeaGreen', 'The Nike Air Max 2017 is an upgraded shoe from the 2016 classic, which is considered to be the most distinctive pair of shoes ever made.\r\n\r\nWith the familiar Air Max full-length base, the Nike Air Max 2017 still offers a smooth, elastic and flexible sole that feels like flying when moving. The Air Max 2017 is specially upgraded to the upper part of the Air Max 2016, the Swoosh logo is no longer in the front and the Flywire thread is hidden, making the Nike Air Max 2017 look more eye-catching and attractive.\r\n\r\nWith new refinements in design, Nike Air Max 2017 shoes are the top choice for you the most stylish look.', 1, 0),
(48, 'Nike Air Zoom Odyssey 2 Shoes - Gray', 4, 109, 'Gainsboro', 'Nike Air Zoom Odyssey 2 Shoes - Gray\r\nNike Air Zoom Odyssey 2 is an impressive Nike airbrush that incorporates advanced technology.\r\nThe Odyssey 2 is equipped with a midsole with two airbags in the front and at the heel, along with a three times increased foam density providing ideal spring and balance. In addition, the Nike Air Zoom Odyssey 2 sports a Dynamic Support frame, reducing the risk of cheek flapping, protecting each step of the foot. Plus, with durable lightweight mesh fabric, the Flywire yarns are sturdy, the outsole with deep grooves ensures you stay steady and stable on all surfaces.', 1, 0),
(49, 'Nike Air Zoom Odyssey 2 Shoes - Gray', 4, 133, 'DarkSeaGreen', '\r\nNike Air Zoom Odyssey 2 Shoes - Gray\r\nNike Air Zoom Odyssey 2 is an impressive Nike airbrush that incorporates advanced technology.\r\nThe Odyssey 2 is equipped with a midsole with two airbags in the front and at the heel, along with a three times increased foam density providing ideal spring and balance. In addition, the Nike Air Zoom Odyssey 2 sports a Dynamic Support frame, reducing the risk of cheek flapping, protecting each step of the foot. Plus, with durable lightweight mesh fabric, the Flywire yarns are sturdy, the outsole with deep grooves ensures you stay steady and stable on all surfaces.', 1, 1),
(50, 'Nike Air Zoom Odyssey 2 Shoes - Gray Black', 4, 118, 'Tomato', 'Nike Air Zoom Odyssey 2 is an impressive Nike airbrush that incorporates advanced technology.\r\nThe Odyssey 2 is equipped with a midsole with two airbags in the front and at the heel, along with a three times increased foam density providing ideal spring and balance. In addition, the Nike Air Zoom Odyssey 2 sports a Dynamic Support frame, reducing the risk of cheek flapping, protecting each step of the foot. Plus, with durable lightweight mesh fabric, the Flywire yarns are sturdy, the outsole with deep grooves ensures you stay steady and stable on all surfaces.', 1, 0),
(51, 'floral surplic', 4, 152, 'DarkGrey', 'Silky fabric drapes over your frame comfortably, while a floral print adds feminine flair to your look. A gathered waist cinches your silhouette and commands attention. Pair with heels and statement jewelry for a stunning desk-to-dinner ensemble.', 0, 0),
(52, 'mock neck keyh', 4, 127, 'Red', 'A flattering shape in a soft, silky fabric gains an architectural edge with wide pleating at the neckline. At the center, a keyhole slit reveals a dramatic hint of skin. Add a stretch belt to play up the structured side of this fun and flirty dress.', 1, 1),
(53, 'faux wrap chif', 4, 137, 'Tomato', 'Boasting one-piece styling for ease and a faux wrap cut that\'s all about some slinkiness, this romper\'s the right answer for those \"what am I wearing to the party\" moments. Just add heels and make it your moment.', 0, 0),
(54, 'pieced lace zi', 4, 148, 'DarkGoldenRod', 'This fitted dress packs some seriousness sexiness into its body-loving, at-the-knee silhouette. Sultry pieced lace and a full-length front zipper make a daring, sizzling team that, when paired with heels, can\'t help but get you noticed.', 0, 0),
(55, 'lace trim surp', 4, 107, 'Khaki', 'Keep up that confidence on the breeziest evenings with this one-piece. It features the feminine charm of a wrap skirt with the coverage of shorts underneath. Pair its sexy plunging neckline with a lacy bralette to really turn up the heat.', 1, 0),
(56, 'lace trapeze d', 4, 113, 'Thistle', 'Covered in lace, this casual-chic dress works wherever you need it to. Dress it up with heels and a necklace for going out, or flat strappy sandals and a light layer when you need some cool go-to street style.', 0, 1),
(57, 'mock neck keyh', 4, 145, 'Sienna', 'The simple beauty of this mock neck dress paired with the surprising sexiness of its front keyhole cut-out will make it your favorite new canvas for all kinds of accessories. Wear it with heels to steal the spotlight at a party or flirty night out.', 1, 0),
(58, 'ruched slash n', 4, 105, 'DarkCyan', 'A slash of sexiness complements the crew neck of this double-take-worthy dress, finished in dramatic ruching for total style crush status. Soft, stretchy and super versatile, this one might just become your new slinky-sophisticated obsession.', 1, 0),
(59, 'stripe lace-up', 4, 113, 'Black', 'Silky fabric hugs your curves for a sleek, sexy silhouette. Classic stripes combine with a modern lace-up neckline to enliven your looks. Pair with heels and sparkly jewelry to make a statement at the office or out on the town.', 0, 1),
(60, 'cold shoulder ', 4, 147, 'LightCoral', 'A flowy trapeze hem sways with your every move and makes your stems look miles long. All-over lace adds feminine allure, while a cold shoulder cut bares a little skin. Pair with sandals for a romantic on-the-town ensemble.', 0, 0),
(61, 'tiered lace fi', 4, 119, 'White', 'Spring soirées, summer weddings, dinner dates - get a dress that does it all. Made from lovely lace with a silky lining, this flattering piece is equal parts elegant and versatile. Try it with heels and statement jewelry, and be absolutely stunning.', 0, 0),
(62, 'floral smocked', 4, 113, 'ForestGreen', 'This little cutie is the perfect combination of sugar and spice. A sweet floral print and swishy skirt add feminine flair to your look, while a smocked bodice and off-the-shoulder neckline provide a so-hot twist.', 0, 0),
(63, 'ADIDAS BUSENITZ PRO - FOOTWEAR', 5, 108, 'SpringGreen', '\r\nAdidas Busenitz Pro Shoes - Gray Black\r\nAdidas Busenitz Pro was designed by legendary Dennis Busenitz. The material is made of suede and the rubber base of Busenitz Pro for high durability. This is a shoe design that is simple and can be used in many everyday activities.', 0, 1),
(64, '\r\nADIDAS BUSENITZ PRO - FOOTWEAR', 5, 101, 'MediumAquaMarine', '\r\nAdidas Busenitz Pro Shoes - Brown\r\nAdidas Busenitz Pro was designed by legendary Dennis Busenitz.\r\n\r\nThe material is made of suede and the rubber base of Busenitz Pro for high durability. Each needle is very detailed, sharp detail, stability is the top criteria of the shoes. This is a shoe design that is simple and can be used in many everyday activities.', 0, 0),
(65, 'ADIDAS BUSENITZ PRO MEN SHOES - BLACK', 5, 144, 'Tomato', 'Adidas Busenitz Pro Shoes - Black Brown\r\nAdidas Busenitz Pro was designed by legendary Dennis Busenitz.\r\n\r\nThe material is made of suede and the rubber base of Busenitz Pro for high durability. Each needle is very detailed, sharp detail, stability is the top criteria of the shoes. This is a shoe design that is simple and can be used in many everyday activities.', 1, 0),
(66, 'ADIDAS BUSENITZ VULC RX NAM - NAVY SHOES\r\n', 5, 135, 'Ivory', '\r\nAdidas Busenitz Vulc RX Men\'s - Navy\r\nAdidas Busenitz Vulc RX was designed by legendary Dennis Busenitz.\r\n\r\nThe material is made of suede and the rubber base of Busenitz Pro for high durability. Each needle is very detailed, sharp detail, stability is the top criteria of the shoes. This is a shoe design that is simple and can be used in many everyday activities.', 0, 0),
(67, 'ADIDAS BUSENITZ VULC RX MEN SHOES - WHITE RED', 5, 147, 'Maroon', 'Adidas Busenitz Vulc RX Men - White\r\nAdidas Busenitz Vulc RX was designed by legendary Dennis Busenitz.\r\n\r\nThe material is made of suede and the rubber base of Busenitz Pro for high durability. Each needle is very detailed, sharp detail, stability is the top criteria of the shoes. This is a shoe design that is simple and can be used in many everyday activities.', 1, 0),
(69, 'ADIDAS AEROBOUNCE BLACK - BLACK', 5, 107, 'Khaki', 'Adidas Aerobounce Shoes - Black\r\nAdidas Aerobounce shoes - Beautiful running shoes both in design and power to run.\r\nBOUNCE is now adidas adidas favored when combining this line with the new design. If you are not a high earner but want a good quality pair of shoes, then adidas Aerobounce shoes is your choice.\r\nThe advantage of the name Bounce is \"turn, bounce\", the BOUNCE to bring you to each level of emotion when running, quite smooth, good jet, high stability. With these adidas Aerobounce shoes, the shape is quite nice, contrasting colors feel like there is light reflecting light. Still a breathable fabric upper, the lines on the sole makes the shoes become stronger, more boring than ever.\r\nAdidas Aerobounce shoes with neutral colors suitable for all outfits. You are a shinobi, this is the experience you need.', 0, 0),
(70, 'ADIDAS DURAMO 8 NAM SHOES - BLACK', 5, 115, 'Maroon', '\r\nAdidas Duramo 8 Shoes - Black White\r\nThe adidas Duramo 8 is a pair of running shoes that are equipped with a CLOUDFOAM midsole and a TPU chassis that provides a firm grip on the foot, providing a comfortable spring balance and support in every stride. Adidas Duramo 8 long-lasting adidas footwear keeps the feet cool and durable.', 1, 0),
(71, 'ADIDAS GAZELLE MEN\'S SHOES - NAVY', 5, 154, 'BlanchedAlmond', 'Adidas Gazelle South - Navy\r\nAdidas Gazelle is a fashion model that has appeared since 1991 and is loved for its simplicity and sophistication. Adidas creates elegant and classic look for shoes by keeping the design, material and color of the first version. The three stripe white stripes with the heel label also reminds of the style of the 90s. With modern shoe technology, adidas Gazelle shoes will bring you the feeling of comfort and confidence at all times. place.', 0, 0),
(72, 'ADIDAS GAZELLE BLACK SHOES - BLACK', 5, 147, 'SandyBrown', '\r\nAdidas Gazelle Nam - Black Black\r\nAdidas Gazelle is a fashion model that has appeared since 1991 and is loved for its simplicity and sophistication.\r\nAdidas deftly improves this pair of adidas Gazelle with slippery material, quite eye catching, bringing fashionable style. The three stripe white stripes with the heel label also reminds of the style of the 90s. With modern shoe technology, adidas Gazelle shoes will bring you the feeling of comfort and confidence at all times. place.\r\n', 0, 1),
(73, 'PUMA SMASH NAM - GREEN BLUE', 6, 112, 'LightSteelBlue', 'Puma Smash Men - Green Moss\r\nPuma Smash shoes have the look of a classic tennis shoes but have been refined and look extremely modern with the upper layer of synthetic leather, durable and elegant. If you need a pair of shoes to bring everyday simple and eye catching, Puma Smash is the best choice.', 0, 0),
(74, '\r\nBASKET CLASSIC LFS BLACK - BLACK', 6, 141, 'Pink', '\r\nPuma Basket Classic LFS Male - Black\r\nPuma Basket Classic LFS shoes with extremely slim and beautiful designs have appeared since the 60s, so far, it has been improved and became a very modern fashion shoes. The shoes are made of premium leather on the upper and the sole of the rubber sole is extremely soft and smooth. The Puma logo is located at the back of the heel and the heel of the shoe adds fashion to your style.', 1, 1),
(75, '\r\nBASKET CLASSIC LFS SOUTH PUMA - WHITE', 6, 148, 'Salmon', 'Puma Basket Classic LFS Male - White\r\nPuma Basket Classic LFS shoes with extremely slim and beautiful designs have appeared since the 60s, so far, it has been improved and became a very modern fashion shoes. The shoes are made of premium leather on the upper and the sole of the rubber sole is extremely soft and smooth. The Puma logo is located at the back of the heel and the heel of the shoe adds fashion to your style.', 0, 0),
(76, 'CARSON 2 RIPSTOP BLACK - BLACK SHOES', 6, 156, 'LimeGreen', 'Puma Carson 2 Ripstop Men\'s - Black\r\nPuma Carson 2 Ripstop design is beautiful, very personal and extremely fashionable. The shoes are very light and give you a really comfortable feeling when using your shoe.', 1, 0),
(77, 'PSUA TSUGI BLAZE NAM - BLACK GOLD', 6, 118, 'PeachPuff', '\r\nPuma Tsuga Blaze Men - Black Gold\r\nPuma Tsugi Blaze - Puma\'s new move on running shoes.\r\nFrom 2015 Puma has officially launched IGNITE running shoes. With advanced technology, the highlight of the Puma Tsugi Blaze is made of foam (Ignite foam) to take advantage of the elasticity, renewable energy that makes every movement easy and light. than. Sturdy padding outsole is specially designed to be slightly longer, increasing the grip, for a firm footing. Moreover, the Puma Tsugi Blaze is quite eye-catching in combining the youthful, youthful-looking colors that are suitable for street-based individuals.', 0, 1),
(78, 'PUMA BASKET CLASSIC CROC WHITE', 6, 144, 'MediumSeaGreen', '\r\nPuma Basket Classic CROC White\r\nPuma Basket Classic CROC White with soft shiny leather, natural strands give the shoes a shine.\r\n\r\nThese puma shoes are not only attracted to the upper shiny, beautiful, but also the outline of the road. The striking white color of the Puma Basket Classic Classic CROC White can make it easier for you to coordinate. Simply a pair of jeans and a monochrome T-shirt, along with the Puma Basket Classic CROC White was outstanding on the street.', 1, 1),
(79, '\r\nPUMA SMASH SHOES SD NAM - GREEN', 6, 141, 'Pink', '\r\nPuma Smash SD Male Shoes - Green Moss\r\nThe Puma Smash SD features a classic tennis shoes but has been refined and looks extremely modern with the upper part of a suede fabric that is durable and elegant. If you need a pair of casual shoes to catch your eye, Puma Smash SD is the right choice.', 1, 1),
(80, 'SHOES SUEDE BADGE NAM - CLEAN', 6, 148, 'Salmon', '\r\nPuma Suede Badge Male - Gray\r\nPuma Suede Badge with extremely compact and beautiful design has appeared since the 1960s, so far, it has been improved and became a very modern fashion shoes. The shoes use elegant velvet fabric on the upper and the sole of the pure rubber sole is extremely soft and smooth. The Puma logo is located at the back of the heel and the heel of the shoe adds fashion to your style.', 0, 0),
(81, '\r\nBASKET CLASSIC NAM - NAVY SHOES', 6, 156, 'LimeGreen', 'Puma Basket Classic Male - Navy\r\nPuma Basket Classic shoes with extremely compact and beautiful design has appeared since the 60s, so far, it has been improved and became a very modern fashion shoes. The shoes are made of premium leather on the upper and the sole of the rubber sole is extremely soft and smooth. The Puma logo is located at the back of the heel and the heel of the shoe adds fashion to your style.', 1, 0),
(82, 'SHOES SUEDE CLASSIC DEBOSSED MEN - GREEN', 6, 118, 'PeachPuff', 'Giày PUMA Suede Classic Debossed Nam - Xanh\r\nGiày PUMA Suede Classic Debossed được thiết kế đẹp mắt, phổ biến từ lâu mà có thể bắt gặp ở sân bóng rổ từ những năm 60, sàn hiphop những năm 90 và nay là trên những vỉa hè phố. Đôi giày sử dụng chất liệu da lộn mềm mịn và có kiểu dáng thể thao, được đánh giá là kiểu giày sneaker mang tính biểu tượng của thương hiệu Puma được duy trì đến ngày nay. ', 0, 1),
(83, 'SUEDE BADGE BLACK SHOES', 6, 144, 'MediumSeaGreen', '\r\nPuma Suede Badge Men - Black White\r\nPuma Suede Badge with extremely compact and beautiful design has appeared since the 1960s, so far, it has been improved and became a very modern fashion shoes. The shoes use elegant velvet fabric on the upper and the sole of the pure rubber sole is extremely soft and smooth. The Puma logo is located at the back of the heel and the heel of the shoe adds fashion to your style.', 1, 1),
(84, '\r\nASICS GEL-KAYANO 24 MEN SHOES - NAVY GREEN', 7, 115, 'Maroon', '\r\nAsics Gel-Kayano 24 Shoes - Blue navy\r\nAsics Gel-Kayano 24 is a shoe designed for long races. Special shoes with unbelievably lightweight design, the comfort comes from the exceptionally durable buffer with FlyteFoam technology, both lightweight and flexible with surprising support. In addition, the Asics Gel-Kayano 24 is also designed to help flip the cheek in the foot, for each foot is stable and stable.', 1, 0),
(85, '\r\nASICS GEL-NIMBUS® 19 PANTS - GREEN GREEN', 7, 154, 'BlanchedAlmond', '\r\nAsics GEL-Nimbus® 19 Shoes - Blue\r\nAsics GEL-Nimbus® 19 is a pair of shoes that incorporates FlyteFoam ™ technology after a complete change, providing optimal comfort and an elastic buffer for the user\'s feet. The unique 3D mesh weave, no seam, can be flexible with each foot movement most naturally.', 0, 0),
(86, '\r\nASICS GEL-NIMBUS® 19 NAM - GREEN SHOES', 7, 147, 'SandyBrown', '\r\nAsics GEL-Nimbus® 19 Shoes - Blue Green\r\nAsics GEL-Nimbus® 19 is a pair of shoes that incorporates FlyteFoam ™ technology after a complete change, providing optimal comfort and an elastic buffer for the user\'s feet. The unique 3D mesh weave, no seam, can be flexible with each foot movement most naturally.', 0, 1),
(87, 'ASICS GEL-KAYANO 24 MEN SHOES - BLACK', 7, 112, 'LightSteelBlue', 'Asics Gel-Kayano 24 Shoes - Gray Black\r\nAsics Gel-Kayano 24 is a shoe designed for long races. Special shoes with unbelievably lightweight design, the comfort comes from the exceptionally durable buffer with FlyteFoam technology, both lightweight and flexible with surprising support. In addition, the Asics Gel-Kayano 24 is also designed to help flip the cheek in the foot, for each foot is stable and stable.', 0, 0),
(88, '\r\nASICS GEL-KAYANO 24 MEN SHOES - GOLDEN BLACK', 7, 141, 'Pink', 'Asics Gel-Kayano 24 Shoes - Black Gold\r\nAsics Gel-Kayano 24 is a shoe designed for long races. Special shoes with unbelievably lightweight design, the comfort comes from the exceptionally durable buffer with FlyteFoam technology, both lightweight and flexible with surprising support. In addition, the Asics Gel-Kayano 24 is also designed to help flip the cheek in the foot, for each foot is stable and stable.', 1, 1),
(89, '\r\nASICS GT-1000 5 MEN SHOES - NAVY GREEN', 7, 148, 'Salmon', '\r\nAsics Shoes GT-1000 5 Men - Blue navy\r\nAsics GT-1000 5 is a standard daily running shoe that provides support for your feet, giving you a breakthrough on the road.\r\n\r\nAs the latest version, using the SPEVA soleplate with the support of Duomax technology, the Asics GT-1000 5 shoe offers a smooth fit, sufficient support to meet the training needs. day. The use of the Guidance system for shoes always has the flexibility and balance. In addition, the upper of the net cloth shoes, ultra light and airy.', 0, 0),
(90, 'ASICS GT-1000 5 MEN - GREEN SHOES', 7, 156, 'LimeGreen', '\r\nAsics Shoes GT-1000 5 Male - Green Orange\r\nAsics GT-1000 5 is a standard daily running shoe that provides support for your feet, giving you a breakthrough on the road.\r\n\r\nAs the latest version, using the SPEVA soleplate with the support of Duomax technology, the Asics GT-1000 5 shoe offers a smooth fit, sufficient support to meet the training needs. day. The use of the Guidance system for shoes always has the flexibility and balance. In addition, the upper of the net cloth shoes, ultra light and airy', 1, 0),
(91, 'ASICS GT-1000 5 MEN SHOES - GREEN', 7, 118, 'PeachPuff', 'Asics Shoes GT-1000 5 Male - Gray Gray\r\nAsics GT-1000 5 is a standard daily running shoe that provides support for your feet, giving you a breakthrough on the road.\r\n\r\nAs the latest version, using the SPEVA soleplate with the support of Duomax technology, the Asics GT-1000 5 shoe offers a smooth fit, sufficient support to meet the training needs. day. The use of the Guidance system for shoes always has the flexibility and balance. In addition, the upper of the net cloth shoes, ultra light and airy.', 0, 1),
(92, '\r\nASICS GEL-FUJIENDURANCE SHOES - BLACK', 7, 144, 'MediumSeaGreen', '\r\nAsics GEL-FujiEndurance Men\'s Shoes - Black Red\r\nAsics GEL-FujiEndurance is one of Asics\'s leading high-end outdoor shoes. Shades with PlasmaGuard ™ technology are water resistant to mud when it rains, but without loss of breathability and flexibility for the feet. Asics GEL-FujiEndurance shoe is specially designed to be worn on rugged roads or natural trails with excellent grip. With Asics GEL-FujiEndurance shoes, you can be sure of a steady and steady climb on both sloping and sloping roads.', 1, 1),
(93, 'ASICS GEL-CLASSIC MEN\'S SHOES - CLEAN', 7, 141, 'Pink', 'Asics GEL-Classic Men\'s Shoes - Gray\r\nAsics GEL-Classic is a classic style shoe and is one of the original archives of the Asics brand. The shoes have the look of the fans refer to the GEL-Trendy shoes from the 90s of the previous century. However, it has been improved from material to technology to bring comfort to the user.', 1, 1),
(94, '\r\nASICS GEL-RESPECTOR MEN\'S SHOES - GOLDEN BLACK', 7, 148, 'Salmon', '\r\nAsics GEL-Respector Men\'s Shoes - Black Gold\r\nAsics GEL-Respector is a trendsetter in the Asics Tiger line of brand new materials. However, the sole of the shoe remains the same, in particular: the midsole is designed to be extremely complex with the increased thickness from low to high, the heel to be extended to increase support and durability. for shoes. The exterior of the model is identical to the design of the GEL-Respector line, providing stability and stability on all surfaces.', 0, 0),
(95, 'ASICS GEL-LYTE SPEED SHOES', 7, 156, 'LimeGreen', 'Asics Shoes GEL-Lyte Speed ​​South\r\nAsics GEL-Lyte Speed ​​shoes are recognized by the people around the world as a classic sneaker that you can not ignore.\r\n\r\nAsics GEL-Lyte Speed ​​is an extremely innovative and groundbreaking shoe in design and manufacturing technology. Dual-sided shoe design allows for easy and easy shoe placement. The Midsole is designed to be extremely complex with the thickness increasing from low to high.\r\n\r\n With its unique, Asics GEL-Lyte Speed ​​shoe has contributed to the famous Asics shoe brand from Japan resounding around the globe.', 1, 0),
(96, '\r\nASICS GEL-SAGA MEN\'S SHOES - CLEAN', 7, 118, 'PeachPuff', '\r\nAsics GEL-Saga Men\'s Shoes - Gray\r\nAsics GEL-Saga shoes are designed as impressive and beautiful as the brand Asics. The highlight of this shoe is that the upper suede upper is soft, waterproof and moisture resistant, so you can use your shoes even on rainy wet days. I\'m afraid the shoes smell moldy inside. In addition, the outsole of Asics GEL-Saga shoe is also very prominent color because the purpose of the manufacturer is to remind users of the color of the \"bloom season\".', 0, 1),
(97, 'TENNIS NAM ASICS GEL SOLUTION 6 - BLACK CAM', 7, 144, 'MediumSeaGreen', 'Nam Asics Gel Solution 6 - Black Orange\r\nAsics Gel Solution 6 Tennis Racer incorporates GEL, I.G.S, P-Guard Toe & Flexion Fit technology for a slightly lighter, quieter, more stable and comfortable fit, making it the perfect choice for tennis players.\r\n\r\nHighlights:\r\n\r\n- Design: GEL technology increases stability, sponge layer in the heel of the foot comfortably, creating quiet - shock reduction.\r\n\r\n- Shoe sole: The bottom sole is a tear-resistant rubber layer that increases stability and adaptation on the surface of the yard.\r\n\r\nIn addition, Asics Gel Solution Speed ​​3 tennis shoes incorporate I.G.S technology to keep the heel firm, P-Guard Toe technology for toe protection, Flexion Fit technology for comfortable, breathable shoes.', 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_type`
--

CREATE TABLE `product_type` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `image` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `product_type`
--

INSERT INTO `product_type` (`id`, `name`, `image`) VALUES
(4, 'Nike', 'nike.jpg'),
(5, 'Adidas', 'adidas2.jpg'),
(6, 'Puma', 'puma.jpg'),
(7, 'Asics', 'asics.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `phone`, `address`) VALUES
(8, 'chutuhoang@gmail.com', '202cb962ac59075b964b07152d234b70', 'Chu tu hoang', '0168236855', 'nguyen trai, ha dong, ha noi'),
(9, 'hoangchutu@gmail.com', '698d51a19d8a121ce581499d7b701668', 'hhh', NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`id`),
  ADD KEY `f1` (`id_customer`);

--
-- Chỉ mục cho bảng `bill_detail`
--
ALTER TABLE `bill_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `f2` (`id_bill`),
  ADD KEY `f3` (`id_product`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `f5` (`id_product`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `f4` (`id_type`);

--
-- Chỉ mục cho bảng `product_type`
--
ALTER TABLE `product_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bill`
--
ALTER TABLE `bill`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT cho bảng `bill_detail`
--
ALTER TABLE `bill_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT cho bảng `product_type`
--
ALTER TABLE `product_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `f1` FOREIGN KEY (`id_customer`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `bill_detail`
--
ALTER TABLE `bill_detail`
  ADD CONSTRAINT `f2` FOREIGN KEY (`id_bill`) REFERENCES `bill` (`id`),
  ADD CONSTRAINT `f3` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `f5` FOREIGN KEY (`id_product`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `f4` FOREIGN KEY (`id_type`) REFERENCES `product_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
