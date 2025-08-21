const fs = require('fs');

const courses = [
  {
    name: "Science",
    subjects: [
        "Math",
        "Biology",
        "Physics",
        "Chemistry",     
        "Geography",
        "Computer Science",
        "Philosophy"
    ]
  },
  {
    name: "Arts",
    subjects: [
        "History",
        "Geography",
        "Art",
        "Philosophy",
        "Music",
        "PE",
        "Economics"
    ]
  },
  {
    name: "General Studies",
    subjects: [
        "Math",
        "History",
        "Geography",
        "Economics",
        "Music",
        "PE",
        "Computer Science"
    ]
  },
  {
    name: "Physical Education",
    subjects: [
        "PE",
        "Biology",
        "Physics",
        "Math",
        "History",
        "Geography",
        "Philosophy"
    ]
  }
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
  return Math.random() < 0.4 ? null : Math.floor(Math.random() * 6) + 5;
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

  const course = courses[Math.floor(Math.random() * courses.length)];
  
  const subjects = course.subjects.map(subjectName => ({
    name: subjectName,
    score: randomScore()
  }));

    return {
        id,
        name,
        email,
        birthDate,
        course: course,
        subjects
    };
}

const totalStudents = parseInt(process.argv[2], 10) || 120;

const students = [];
for (let i = 0; i < totalStudents; i++) {
    students.push(generateStudent(i));
}

const db = { students };
db.courses = courses;

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));

console.log(`db.json generated with ${totalStudents} students.`);
