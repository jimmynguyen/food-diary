-- CREATE SCHEMA `food_diary` ;

-- CREATE TABLE `food_diary`.`ingredients` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `name_UNIQUE` (`name` ASC));

-- CREATE TABLE `food_diary`.`nutrients` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `name_UNIQUE` (`name` ASC));

-- CREATE TABLE `food_diary`.`recipes` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   `cost` DECIMAL(65,2) UNSIGNED NULL,
--   `time` DOUBLE UNSIGNED NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `name_UNIQUE` (`name` ASC));

-- CREATE TABLE `food_diary`.`recipe_nutrients` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `recipe_id` INT NOT NULL,
--   `nutrient_id` INT NOT NULL,
--   `quantity` DOUBLE NOT NULL,
--   `units` VARCHAR(45) NULL,
--   PRIMARY KEY (`id`));

-- CREATE TABLE `food_diary`.`recipe_ingredients` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `recipe_id` INT NOT NULL,
--   `ingredient_id` INT NOT NULL,
--   `quantity` DOUBLE NOT NULL,
--   `units` VARCHAR(45) NULL,
--   PRIMARY KEY (`id`));

-- CREATE TABLE `food_diary`.`recipe_instructions` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `recipe_id` INT NOT NULL,
--   `step_number` INT NOT NULL,
--   `description` NVARCHAR(128) NOT NULL,
--   PRIMARY KEY (`id`));
