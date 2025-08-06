const fs = require('fs');

const subjectNames = [
  "Math", "History", "Geography", "Art", "Philosophy",
  "Biology", "Physics", "Economics", "Music", "PE", "Computer Science"
];

const firstNames = [
  "Alexandra", "Brooke", "James", "Emily", "Michael", "Sarah", "Daniel",
  "Jessica", "David", "Ashley", "Chris", "Megan", "Matthew", "Olivia",
  "Andrew", "Hannah", "Joshua", "Samantha", "Joseph", "Taylor", "Ryan",
  "Lauren", "John", "Victoria", "Brandon", "Rachel", "Justin", "Natalie",
  "Ethan", "Nicole", "Alexander", "Amber", "Samuel", "Courtney", "Benjamin",
  "Katherine", "Zachary", "Kayla", "Tyler", "Allison", "Christian", "Morgan",
  "Jonathan", "Jasmine", "Aaron", "Stephanie", "Eric", "Madison"
];

const lastNames = [
  "Sullivan", "Williams", "Smith", "Johnson", "Brown", "Jones", "Miller",
  "Davis", "Garcia", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
  "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez",
  "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott",
  "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker",
  "Hall", "Rivera", "Campbell", "Mitchell"
];


function randomScore() {
  // 40% chance to be null (no score)
  return Math.random() < 0.4 ? null : Math.floor(Math.random() * 51) + 50; // scores between 50-100
}

function randomDate(startYear = 2000, endYear = 2005) {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
  const month = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);
  const day = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
  return `${year}-${month}-${day}`;
}

function randomName() {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function randomEmail(name) {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com", "school.edu"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const emailName = name.toLowerCase().replace(/ /g, ".");
  return `${emailName}@${domain}`;
}

function generateStudent(id) {
  const name = randomName();
  const email = randomEmail(name);
  const birthDate = randomDate();
  
  // Pick 7 subjects randomly from subjectNames
  let subjects = [];
  // Shuffle subjectNames and take first 7
  const shuffled = subjectNames.sort(() => 0.5 - Math.random());
  for (let i = 0; i < 7; i++) {
    subjects.push({
      name: shuffled[i],
      score: randomScore()
    });
  }

  return {
    id,
    name,
    email,
    birthDate,
    subjects
  };
}

const students = [];
for(let i = 1; i <= 121; i++) {
  students.push(generateStudent(i));
}

const db = { students };

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));

console.log('db.json generated with 121 students.');
