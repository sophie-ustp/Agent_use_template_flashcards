
# Spec: Circuit Training Generator

## Goal (one or two sentences)
A simple two-page website where the user can select a workout type (Full Body, Upper Body, or Lower Body) and choose the exercise duration in seconds. The website then generates a random circuit workout with 5 exercises, including pictures, exercise duration, and rest time.

## Users
Just me, on a laptop browser.

## Features (numbered, so prompts can refer to them)

Feature1. Add a section called "Select workout type" with three radio buttons:
- Full Body
- Upper Body
- Lower Body

The user can only select one workout type at a time.

Feature2. Add a number input field called "Select exercise duration". The user can enter how many seconds each exercise should last (1–500 seconds).

Feature3. Add a number input field called "Rest time between exercises". The user can enter the rest time in seconds (0–300 seconds).

Feature4. Add a button called "Generate Workout". When clicked, the website randomly selects 5 exercises based on the selected workout type.

Feature5. Display the generated workout in a second view with:
- A numbered list of 5 exercises
- The name of each exercise
- The duration of each exercise in seconds
- A picture showing each exercise
- The rest time between exercises

Feature6. Store a predefined list of exercises in JavaScript. Each exercise should have a name, workout category, and picture. The generator randomly selects 5 different exercises without duplicates.

Feature7. Add a "Generate Again" button to create a new random workout using the same settings.

Feature8. Add a "Back" button to return to the first view and change the workout settings.

## Acceptance criteria (how I know a feature works)

- Feature1: The user must select one workout type before generating a workout. Only one option can be selected at a time.
- Feature2: The exercise duration field cannot be empty. Only whole numbers between 1 and 500 are accepted.
- Feature3: The rest time field cannot be empty. Only whole numbers between 0 and 300 are accepted.
- Feature4: Clicking "Generate Workout" displays exactly 5 randomly selected exercises matching the chosen workout type.
- Feature5: Each exercise displays its name, duration, and picture. Rest time is displayed between exercises, but not after the final exercise.
- Feature6: No exercise appears twice in the same workout. Each workout category must contain at least 5 possible exercises.
- Feature7: Clicking "Generate Again" creates another random selection of 5 exercises. The workout may contain some of the same exercises.
- Feature8: Clicking "Back" returns the user to the settings view and keeps the previously entered values.
- The website works in a laptop browser without a server or database.

## Out of scope (do NOT build)

- No user accounts or login
- No database
- No workout history
- No calorie tracking
- No automatic exercise timer
- No mobile app
- No external APIs
- No AI-generated exercises
- No advanced training plans

## Look & feel

Simple, clean, and readable website

- Maximum width: 600 px
- White background

