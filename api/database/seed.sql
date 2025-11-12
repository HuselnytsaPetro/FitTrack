-- Seed data for workouts and exercises

-- Insert workouts
INSERT INTO workouts (name, description, category, difficulty_level, estimated_duration, image_url) VALUES
('Full-Body HIIT', 'High-intensity interval training targeting all major muscle groups', 'HIIT', 'Intermediate', 45, 'src/assets/training1.jpg'),
('Strength Training', 'Compound lifts with progressive overload for maximum strength gains', 'Strength', 'Advanced', 60, 'src/assets/training2.jpg'),
('Mobility Flow', 'Hip and shoulder routine to restore range of motion', 'Mobility', 'All Levels', 20, 'src/assets/training3.jpg'),
('Hypertrophy Focus', 'Muscle building with optimal volume and intensity', 'Hypertrophy', 'Intermediate', 50, 'src/assets/training4.jpg'),
('Conditioning', 'Build endurance and work capacity', 'Conditioning', 'Beginner', 30, 'src/assets/training5.jpg')
ON CONFLICT DO NOTHING;

-- Insert exercises for Full-Body HIIT (workout_id = 1)
INSERT INTO exercises (workout_id, name, description, duration, order_index) VALUES
(1, 'Jump Squats', 'Explosive squat jumps for lower body power', 10, 1),
(1, 'Mountain Climbers', 'Core and cardio exercise in plank position', 10, 2),
(1, 'Burpees', 'Full body explosive movement', 10, 3);

-- Insert exercises for Strength Training (workout_id = 2)
INSERT INTO exercises (workout_id, name, description, duration, order_index) VALUES
(2, 'Squats', 'Barbell back squats for leg strength', 15, 1),
(2, 'Deadlifts', 'Conventional deadlifts for posterior chain', 15, 2),
(2, 'Bench Press', 'Barbell bench press for chest development', 12, 3),
(2, 'Rows', 'Barbell rows for back thickness', 12, 4);

-- Insert exercises for Mobility Flow (workout_id = 3)
INSERT INTO exercises (workout_id, name, description, duration, order_index) VALUES
(3, 'Cat-Cow', 'Spinal mobility exercise', 5, 1),
(3, 'Shoulder Circles', 'Shoulder joint mobility', 5, 2),
(3, 'Hip Flexor Stretch', 'Deep hip flexor stretch', 5, 3);

-- Insert exercises for Hypertrophy Focus (workout_id = 4)
INSERT INTO exercises (workout_id, name, description, duration, order_index) VALUES
(4, 'Dumbbell Press', 'Dumbbell chest press for muscle growth', 12, 1),
(4, 'Leg Press', 'Machine leg press for quad development', 12, 2),
(4, 'Lateral Raises', 'Dumbbell lateral raises for shoulders', 10, 3),
(4, 'Curls', 'Bicep curls for arm development', 10, 4);

-- Insert exercises for Conditioning (workout_id = 5)
INSERT INTO exercises (workout_id, name, description, duration, order_index) VALUES
(5, 'Rowing', 'Rowing machine for cardio endurance', 10, 1),
(5, 'Rope Skips', 'Jump rope for coordination and cardio', 8, 2),
(5, 'Sled Pushes', 'Sled pushing for power endurance', 10, 3);
