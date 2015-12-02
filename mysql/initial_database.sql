-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: us-cdbr-iron-east-03.cleardb.net    Database: heroku_017696c102bfc24
-- ------------------------------------------------------
-- Server version	5.5.45-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'chicken'),(2,'italian salad dressing'),(3,'shredded mozzarella'),(4,'parmesan cheese'),(5,'pasta sauce'),(6,'seasoned bread'),(7,'basil leaves'),(8,'black pepper'),(9,'bread crumbs'),(10,'cooked spaghetti'),(11,'flat-leaf parsley'),(12,'garlic'),(13,'ground beef'),(14,'ground pork'),(15,'milk'),(16,'olive oil'),(17,'onion'),(18,'salt'),(19,'sugar'),(20,'tomatoes'),(21,'eggs');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nutrients`
--

DROP TABLE IF EXISTS `nutrients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nutrients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nutrients`
--

LOCK TABLES `nutrients` WRITE;
/*!40000 ALTER TABLE `nutrients` DISABLE KEYS */;
INSERT INTO `nutrients` VALUES (1,'Calories'),(2,'Fat'),(3,'Saturated Fat'),(4,'Carbohydrates'),(5,'Sugar'),(6,'Cholesterol'),(7,'Sodium'),(8,'Protein'),(9,'Vitamin B3'),(10,'Selenium'),(11,'Vitamin B6'),(12,'Phosphorus'),(13,'Zinc'),(14,'Vitamin B5'),(15,'Vitamin B2'),(16,'Vitamin B12'),(17,'Potassium'),(18,'Calcium'),(19,'Magnesium'),(20,'Iron'),(21,'Vitamin B1'),(22,'Vitamin A'),(23,'Vitamin E'),(24,'Vitamin K'),(25,'Copper'),(26,'Vitamin C'),(27,'Folate'),(28,'Vitamin D'),(29,'Manganese'),(30,'Fiber');
/*!40000 ALTER TABLE `nutrients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipe_ingredients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) NOT NULL,
  `ingredient_id` int(11) NOT NULL,
  `quantity` double NOT NULL,
  `units` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES (1,1,1,1,''),(2,1,2,1,'servings'),(3,1,3,2,'ounces'),(4,1,4,1,'servings'),(5,1,5,3,'ounces'),(6,1,6,1,'servings'),(7,2,7,8,''),(8,2,8,8,'servings'),(9,2,9,0.75,'cups'),(10,2,10,2,'pounds'),(11,2,11,0.25,'cups'),(12,2,12,3,'cloves'),(13,2,13,0.75,'pounds'),(14,2,14,0.75,'pounds'),(15,2,15,8,'servings'),(16,2,16,0.5,'cups'),(17,2,17,1,''),(18,2,4,0.75,'cups'),(19,2,18,0.25,'teaspoons'),(20,2,19,1,'teaspoon'),(21,2,20,28,''),(22,2,21,2,'');
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_instructions`
--

DROP TABLE IF EXISTS `recipe_instructions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipe_instructions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) NOT NULL,
  `step_number` int(11) NOT NULL,
  `description` varchar(128) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_instructions`
--

LOCK TABLES `recipe_instructions` WRITE;
/*!40000 ALTER TABLE `recipe_instructions` DISABLE KEYS */;
INSERT INTO `recipe_instructions` VALUES (1,1,1,'Dip chicken pieces in Italian dressing and roll in bread crumbs.'),(2,1,2,'Place on liner pan.'),(3,1,3,'Nu-Wave 8 minutes per side (or until done).'),(4,1,4,'Open oven and spoon sauce on each piece and sprinkle with cheese.'),(5,1,5,'Cook 2 more minutes.'),(6,2,1,'In a bowl, combine the breadcrumbs with the meat and two eggs.'),(7,2,2,'Add plenty of freshly grated Parmesan.'),(8,2,3,'Add some parsley and garlic.'),(9,2,4,'Add plenty of freshly ground black pepper and a little salt.'),(10,2,5,'Mix it all together.'),(11,2,6,'Scoop out balls, roll them up neatly, and place them on a pan.'),(12,2,7,'Stick the pan in the freezer for about 5 or 10 minutes.'),(13,2,8,'Heat up some olive oil in a heavy pot or skillet.'),(14,2,9,'When the oil\'s hot, add about eight of the meatballs.'),(15,2,10,'Cook the for a couple of minutes, turning them brown on all sides.'),(16,2,11,'Remove the meatballs when they\'re brown on the outside but not done on the inside.'),(17,2,12,'Repeat with all the meatballs until they\'re all browned and delicious.'),(18,2,13,'Keep the same pot over medium-high heat.'),(19,2,14,'Throw in the chopped up onions and garlic.'),(20,2,15,'Stir around and cook for a couple of minutes.'),(21,2,16,'Crush up tomatoes and pour them into the pot.'),(22,2,17,'Add some red pepper flakes.'),(23,2,18,'Stir in the parsley.'),(24,2,19,'Add salt, pepper, and a little bit of sugar.'),(25,2,20,'Heat it up and cook the sauce for about 20 minutes.'),(26,2,21,'Add the meatballs.'),(27,2,22,'Stir them into the sauce.'),(28,2,23,'Allow the sauce to simmer for about 30 more minutes.'),(29,2,24,'Stir the sauce very gently a couple of times.'),(30,2,25,'Cook the spaghetti.'),(31,2,26,'Pile on the sauce and parmesan.');
/*!40000 ALTER TABLE `recipe_instructions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_nutrients`
--

DROP TABLE IF EXISTS `recipe_nutrients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipe_nutrients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_id` int(11) NOT NULL,
  `nutrient_id` int(11) NOT NULL,
  `quantity` double NOT NULL,
  `units` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_nutrients`
--

LOCK TABLES `recipe_nutrients` WRITE;
/*!40000 ALTER TABLE `recipe_nutrients` DISABLE KEYS */;
INSERT INTO `recipe_nutrients` VALUES (1,1,1,3251,'NULL'),(2,1,2,227,'grams'),(3,1,3,70,'grams'),(4,1,4,10,'grams'),(5,1,5,7,'grams'),(6,1,6,1067,'milligrams'),(7,1,7,2508,'milligrams'),(8,1,8,273,'grams'),(9,1,9,91,'milligrams'),(10,1,10,209,'micrograms'),(11,1,11,4,'milligrams'),(12,1,12,2400,'milligrams'),(13,1,13,20,'milligrams'),(14,1,14,12,'milligrams'),(15,1,15,1,'milligrams'),(16,1,16,5,'micrograms'),(17,1,17,2903,'milligrams'),(18,1,18,805,'milligrams'),(19,1,19,307,'milligrams'),(20,1,20,13,'milligrams'),(21,1,21,0.87,'milligrams'),(22,1,22,2868,'International Units'),(23,1,23,6,'milligrams'),(24,1,24,40,'micrograms'),(25,1,25,0.76,'milligrams'),(26,1,26,27,'milligrams'),(27,1,27,96,'micrograms'),(28,1,28,3,'micrograms'),(29,1,29,0.39,'milligrams'),(30,1,30,1,'grams'),(31,2,1,865,'NULL'),(32,2,2,45,'grams'),(33,2,3,15,'grams'),(34,2,4,77,'grams'),(35,2,5,28,'grams'),(36,2,6,132,'milligrams'),(37,2,7,499,'milligrams'),(38,2,8,39,'grams'),(39,2,9,8,'milligrams'),(40,2,10,64,'micrograms'),(41,2,11,0.94,'milligrams'),(42,2,12,650,'milligrams'),(43,2,13,5,'milligrams'),(44,2,14,2,'milligrams'),(45,2,15,0.83,'milligrams'),(46,2,16,2,'micrograms'),(47,2,17,1945,'milligrams'),(48,2,18,495,'milligrams'),(49,2,19,131,'milligrams'),(50,2,20,5,'milligrams'),(51,2,21,0.78,'milligrams'),(52,2,22,5123,'International Units'),(53,2,23,5,'milligrams'),(54,2,24,8,'micrograms'),(55,2,25,0.58,'milligrams'),(56,2,26,76,'milligrams'),(57,2,27,127,'micrograms'),(58,2,28,3,'micrograms'),(59,2,29,131,'milligrams'),(60,2,30,9,'grams');
/*!40000 ALTER TABLE `recipe_nutrients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recipes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `cost` decimal(65,2) unsigned DEFAULT NULL,
  `time` double unsigned DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,'Chicken Parmesan',10.93,23,NULL),(2,'Spaghetti and Meatballs',3.20,85,NULL);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(65) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'jimmynewtrong@gmail.com','340bcd1ac5aa113c7bcdd07d42efe3e1'),(42,'jimmy.nguyen@gatech.edu','0cc175b9c0f1b6a831c399e269772661'),(52,'a@a.com','0cc175b9c0f1b6a831c399e269772661');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-02  8:30:40
