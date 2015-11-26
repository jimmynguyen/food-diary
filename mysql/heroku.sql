-- CREATE SCHEMA `heroku_017696c102bfc24` ;

-- CREATE TABLE `heroku_017696c102bfc24`.`ingredients` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `name_UNIQUE` (`name` ASC));

-- CREATE TABLE `heroku_017696c102bfc24`.`nutrients` (
--   `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `name_UNIQUE` (`name` ASC));

-- CREATE TABLE `heroku_017696c102bfc24`.`recipes` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   `cost` DECIMAL(65,2) UNSIGNED NULL,
--   `time` DOUBLE UNSIGNED NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE INDEX `name_UNIQUE` (`name` ASC));

-- CREATE TABLE `heroku_017696c102bfc24`.`recipe_nutrients` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `recipe_id` INT NOT NULL,
--   `nutrient_id` INT NOT NULL,
--   `quantity` DOUBLE NOT NULL,
--   `units` VARCHAR(45) NULL,
--   PRIMARY KEY (`id`));

-- CREATE TABLE `heroku_017696c102bfc24`.`recipe_ingredients` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `recipe_id` INT NOT NULL,
--   `ingredient_id` INT NOT NULL,
--   `quantity` DOUBLE NOT NULL,
--   `units` VARCHAR(45) NULL,
--   PRIMARY KEY (`id`));

-- CREATE TABLE `heroku_017696c102bfc24`.`recipe_instructions` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `recipe_id` INT NOT NULL,
--   `step_number` INT NOT NULL,
--   `description` NVARCHAR(128) NOT NULL,
--   PRIMARY KEY (`id`));
