-- Create database if not exists
CREATE DATABASE IF NOT EXISTS data_record;

-- Use the database
USE data_record;

-- Create files table
CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    url VARCHAR(500) NOT NULL,
    level VARCHAR(50) NOT NULL,
    course_type VARCHAR(50) NOT NULL DEFAULT 'unknown',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add index for faster queries
ALTER TABLE files ADD INDEX idx_level_course_type (level, course_type);