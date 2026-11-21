const workoutForm = document.getElementById("workout-form");
const workoutStatus = document.getElementById("workout-status");

const exercises = [
  { name: "Squats", category: "full-body" },
  { name: "Push-ups", category: "full-body" },
  { name: "Lunges", category: "full-body" },
  { name: "Plank", category: "full-body" },
  { name: "Jumping Jacks", category: "full-body" },
  { name: "Shoulder Taps", category: "upper-body" },
  { name: "Tricep Dips", category: "upper-body" },
  { name: "Pike Push-ups", category: "upper-body" },
  { name: "Arm Circles", category: "upper-body" },
  { name: "Superman Hold", category: "upper-body" },
  { name: "Reverse Lunges", category: "lower-body" },
  { name: "Glute Bridges", category: "lower-body" },
  { name: "Calf Raises", category: "lower-body" },
  { name: "Wall Sit", category: "lower-body" },
  { name: "Step-ups", category: "lower-body" }
];

let generatedExercises = [];

// Selects five different exercises from the chosen category.
function selectExercises(workoutType) {
  const matchingExercises = [];

  for (const exercise of exercises) {
    if (exercise.category === workoutType) {
      matchingExercises.push(exercise);
    }
  }

  for (let index = matchingExercises.length - 1; index > 0; index = index - 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentExercise = matchingExercises[index];
    matchingExercises[index] = matchingExercises[randomIndex];
    matchingExercises[randomIndex] = currentExercise;
  }

  return matchingExercises.slice(0, 5);
}

// Generates a selection after the form passes its required field checks.
function handleGenerateWorkout(event) {
  event.preventDefault();
  const selectedWorkout = workoutForm.querySelector(
    'input[name="workout-type"]:checked'
  );

  if (selectedWorkout === null) {
    return;
  }

  generatedExercises = selectExercises(selectedWorkout.value);
  workoutStatus.textContent = "Workout generated: " +
    generatedExercises.length + " exercises selected.";
}

workoutForm.addEventListener("submit", handleGenerateWorkout);