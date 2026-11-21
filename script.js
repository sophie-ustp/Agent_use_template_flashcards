const workoutForm = document.getElementById("workout-form");
const workoutView = document.getElementById("workout-view");
const exerciseList = document.getElementById("exercise-list");
const generateAgainButton = document.getElementById("generate-again-button");
const backButton = document.getElementById("back-button");

const exercisePicture = "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
    '<rect width="100" height="100" fill="#ffe4ec"/>' +
    '<circle cx="50" cy="28" r="10" fill="#d63384"/>' +
    '<path d="M44 42h12l5 28H39l5-28zm-17 10h14v8H27zm36 0h14v8H63zm-30 8h10v8H33zm34 0h10v8H67z" fill="#d63384"/>' +
    '</svg>'
  );

const exercises = [
  { name: "Squats", category: "full-body", picture: exercisePicture },
  { name: "Push-ups", category: "full-body", picture: exercisePicture },
  { name: "Lunges", category: "full-body", picture: exercisePicture },
  { name: "Plank", category: "full-body", picture: exercisePicture },
  { name: "Jumping Jacks", category: "full-body", picture: exercisePicture },
  { name: "Shoulder Taps", category: "upper-body", picture: exercisePicture },
  { name: "Tricep Dips", category: "upper-body", picture: exercisePicture },
  { name: "Pike Push-ups", category: "upper-body", picture: exercisePicture },
  { name: "Arm Circles", category: "upper-body", picture: exercisePicture },
  { name: "Superman Hold", category: "upper-body", picture: exercisePicture },
  { name: "Reverse Lunges", category: "lower-body", picture: exercisePicture },
  { name: "Glute Bridges", category: "lower-body", picture: exercisePicture },
  { name: "Calf Raises", category: "lower-body", picture: exercisePicture },
  { name: "Wall Sit", category: "lower-body", picture: exercisePicture },
  { name: "Step-ups", category: "lower-body", picture: exercisePicture }
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

// Creates one list item for the workout display.
function createExerciseItem(exercise, exerciseDuration) {
  const listItem = document.createElement("li");

  const exerciseName = document.createElement("h3");
  exerciseName.textContent = exercise.name;

  const exerciseImage = document.createElement("img");
  exerciseImage.src = exercise.picture;
  exerciseImage.alt = exercise.name;

  const durationText = document.createElement("p");
  durationText.textContent = exerciseDuration + " seconds";

  listItem.appendChild(exerciseName);
  listItem.appendChild(exerciseImage);
  listItem.appendChild(durationText);
  return listItem;
}

// Displays the selected exercises and rest time in the second view.
function displayWorkout(exerciseDuration, restTime) {
  exerciseList.textContent = "";

  for (let index = 0; index < generatedExercises.length; index = index + 1) {
    const exercise = generatedExercises[index];
    const listItem = createExerciseItem(exercise, exerciseDuration);

    if (index < generatedExercises.length - 1) {
      const restText = document.createElement("p");
      restText.className = "rest-time";
      restText.textContent = "Rest: " + restTime + " seconds";
      listItem.appendChild(restText);
    }

    exerciseList.appendChild(listItem);
  }

  workoutForm.hidden = true;
  workoutView.hidden = false;
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

  const exerciseDurationInput = document.getElementById("exercise-duration");
  const restTimeInput = document.getElementById("rest-time");
  const exerciseDuration = exerciseDurationInput.value;
  const restTime = restTimeInput.value;

  generatedExercises = selectExercises(selectedWorkout.value);
  displayWorkout(exerciseDuration, restTime);
}

// Generates another random workout with the current settings.
function handleGenerateAgain() {
  const selectedWorkout = workoutForm.querySelector(
    'input[name="workout-type"]:checked'
  );
  const exerciseDuration = document.getElementById("exercise-duration").value;
  const restTime = document.getElementById("rest-time").value;

  generatedExercises = selectExercises(selectedWorkout.value);
  displayWorkout(exerciseDuration, restTime);
}

// Returns to the settings view and keeps the entered values.
function handleBackToGenerator() {
  workoutView.hidden = true;
  workoutForm.hidden = false;
}

workoutForm.addEventListener("submit", handleGenerateWorkout);
generateAgainButton.addEventListener("click", handleGenerateAgain);
backButton.addEventListener("click", handleBackToGenerator);