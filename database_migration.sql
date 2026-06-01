-- SQL Migration Script for Pidify Database
-- This script adds the course_type column to separate files by course

-- Add course_type column if it doesn't exist
ALTER TABLE files ADD COLUMN course_type VARCHAR(50) DEFAULT 'unknown' AFTER level;

-- Add index for faster queries (optional but recommended)
ALTER TABLE files ADD INDEX idx_level_course_type (level, course_type);

-- Verify the table structure
DESCRIBE files;
