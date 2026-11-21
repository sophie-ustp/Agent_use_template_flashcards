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

// Formats minutes and seconds for the workout display.
function formatDuration(minutes, seconds) {
  const durationParts = [];

  if (minutes > 0) {
    durationParts.push(minutes + " " + (minutes === 1 ? "minute" : "minutes"));
  }

  if (seconds > 0) {
    durationParts.push(seconds + " " + (seconds === 1 ? "second" : "seconds"));
  }

  if (durationParts.length === 0) {
    return "0 seconds";
  }

  return durationParts.join(" ");
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
  durationText.textContent = exerciseDuration;

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
      restText.textContent = "Rest: " + restTime;
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

  const exerciseMinutesInput = document.getElementById("exercise-minutes");
  const exerciseSecondsInput = document.getElementById("exercise-seconds");
  const restMinutesInput = document.getElementById("rest-minutes");
  const restSecondsInput = document.getElementById("rest-seconds");
  const exerciseMinutes = Number(exerciseMinutesInput.value);
  const exerciseSeconds = Number(exerciseSecondsInput.value);
  const exerciseDurationInSeconds = (exerciseMinutes * 60) + exerciseSeconds;
  const restMinutes = Number(restMinutesInput.value);
  const restSeconds = Number(restSecondsInput.value);
  const restTimeInSeconds = (restMinutes * 60) + restSeconds;

  exerciseMinutesInput.setCustomValidity("");
  exerciseSecondsInput.setCustomValidity("");
  restMinutesInput.setCustomValidity("");
  restSecondsInput.setCustomValidity("");

  if (exerciseDurationInSeconds < 1 || exerciseDurationInSeconds > 500) {
    exerciseSecondsInput.setCustomValidity(
      "Choose a total duration from 1 to 500 seconds."
    );
    exerciseSecondsInput.reportValidity();
    return;
  }

  if (restTimeInSeconds > 300) {
    restSecondsInput.setCustomValidity(
      "Choose a total rest time from 0 to 300 seconds."
    );
    restSecondsInput.reportValidity();
    return;
  }

  generatedExercises = selectExercises(selectedWorkout.value);
  displayWorkout(
    formatDuration(exerciseMinutes, exerciseSeconds),
    formatDuration(restMinutes, restSeconds)
  );
}

// Generates another random workout with the current settings.
function handleGenerateAgain() {
  const selectedWorkout = workoutForm.querySelector(
    'input[name="workout-type"]:checked'
  );
  const exerciseMinutes = Number(document.getElementById("exercise-minutes").value);
  const exerciseSeconds = Number(document.getElementById("exercise-seconds").value);
  const restMinutes = Number(document.getElementById("rest-minutes").value);
  const restSeconds = Number(document.getElementById("rest-seconds").value);

  generatedExercises = selectExercises(selectedWorkout.value);
  displayWorkout(
    formatDuration(exerciseMinutes, exerciseSeconds),
    formatDuration(restMinutes, restSeconds)
  );
}

// Returns to the settings view and keeps the entered values.
function handleBackToGenerator() {
  workoutView.hidden = true;
  workoutForm.hidden = false;
}

workoutForm.addEventListener("submit", handleGenerateWorkout);
generateAgainButton.addEventListener("click", handleGenerateAgain);
backButton.addEventListener("click", handleBackToGenerator);