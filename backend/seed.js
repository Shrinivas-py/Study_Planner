require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('./models/Subject');
const Topic = require('./models/Topic');
const Question = require('./models/Question');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected for seeding...');

  await Subject.deleteMany();
  await Topic.deleteMany();
  await Question.deleteMany();

  const math = await Subject.create({ name: 'Mathematics', applicableGrades: [9, 10] });
  const science = await Subject.create({ name: 'Science', applicableGrades: [9, 10] });

  const algebra = await Topic.create({ subjectId: math._id, name: 'Algebra', difficulty: 2 });
  const geometry = await Topic.create({ subjectId: math._id, name: 'Geometry', difficulty: 3 });
  const trigonometry = await Topic.create({ subjectId: math._id, name: 'Trigonometry', difficulty: 4 });
  const physics = await Topic.create({ subjectId: science._id, name: 'Physics - Motion', difficulty: 3 });
  const chemistry = await Topic.create({ subjectId: science._id, name: 'Chemistry - Atoms', difficulty: 2 });

  await Question.create([
    // Algebra - difficulty 1 to 5
    { topicId: algebra._id, text: 'Simplify: 3x + 2x', options: ['5x','6x','x','5x^2'], correctAnswerIndex: 0, difficulty: 1 },
    { topicId: algebra._id, text: 'Solve: x + 5 = 9', options: ['x=3','x=4','x=5','x=14'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: algebra._id, text: 'Solve: 2x + 3 = 7', options: ['x=1','x=2','x=3','x=4'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: algebra._id, text: 'Solve: 3x - 4 = 11', options: ['x=3','x=4','x=5','x=6'], correctAnswerIndex: 2, difficulty: 2 },
    { topicId: algebra._id, text: 'Solve: x^2 = 16', options: ['x=2','x=4','x=8','x=16'], correctAnswerIndex: 1, difficulty: 3 },
    { topicId: algebra._id, text: 'Factorize: x^2 - 9', options: ['(x-3)(x+3)','(x-9)(x+1)','(x-3)^2','(x+3)^2'], correctAnswerIndex: 0, difficulty: 3 },
    { topicId: algebra._id, text: 'Solve: 2x^2 - 8 = 0', options: ['x=1','x=2','x=4','x=8'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: algebra._id, text: 'Solve for x: (x-2)(x+3) = 0', options: ['x=2 or -3','x=-2 or 3','x=2 or 3','x=-2 or -3'], correctAnswerIndex: 0, difficulty: 4 },
    { topicId: algebra._id, text: 'Solve: x^2 - 5x + 6 = 0', options: ['x=2,3','x=1,6','x=-2,-3','x=2,-3'], correctAnswerIndex: 0, difficulty: 5 },

    // Geometry
    { topicId: geometry._id, text: 'Number of sides in a hexagon?', options: ['5','6','7','8'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: geometry._id, text: 'Sum of angles in a triangle?', options: ['90','180','270','360'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: geometry._id, text: 'Area of a circle formula?', options: ['πr','πr^2','2πr','πd'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: geometry._id, text: 'Perimeter of a square with side 5?', options: ['10','15','20','25'], correctAnswerIndex: 2, difficulty: 2 },
    { topicId: geometry._id, text: 'Area of a triangle with base 6, height 4?', options: ['10','12','24','20'], correctAnswerIndex: 1, difficulty: 3 },
    { topicId: geometry._id, text: 'Sum of interior angles of a pentagon?', options: ['360','450','540','720'], correctAnswerIndex: 2, difficulty: 3 },
    { topicId: geometry._id, text: 'Volume of a cube with side 3?', options: ['9','18','27','81'], correctAnswerIndex: 2, difficulty: 4 },
    { topicId: geometry._id, text: 'Diagonal of a square with side 4?', options: ['4','4√2','8','16'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: geometry._id, text: 'Surface area of a sphere with radius r?', options: ['πr^2','2πr^2','4πr^2','πr^3'], correctAnswerIndex: 2, difficulty: 5 },

    // Trigonometry
    { topicId: trigonometry._id, text: 'sin(0°) = ?', options: ['0','0.5','1','undefined'], correctAnswerIndex: 0, difficulty: 2 },
    { topicId: trigonometry._id, text: 'cos(0°) = ?', options: ['0','1','-1','0.5'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: trigonometry._id, text: 'sin(90°) = ?', options: ['0','0.5','1','undefined'], correctAnswerIndex: 2, difficulty: 3 },
    { topicId: trigonometry._id, text: 'tan(45°) = ?', options: ['0','0.5','1','undefined'], correctAnswerIndex: 2, difficulty: 3 },
    { topicId: trigonometry._id, text: 'Value of sin^2θ + cos^2θ?', options: ['0','1','2','θ'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: trigonometry._id, text: 'cos(60°) = ?', options: ['0','0.5','1','√3/2'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: trigonometry._id, text: 'If sinθ = 0.6, what is cosθ (θ acute)?', options: ['0.4','0.6','0.8','1.0'], correctAnswerIndex: 2, difficulty: 5 },

    // Physics
    { topicId: physics._id, text: 'SI unit of speed?', options: ['m/s','km/h','m/s^2','N'], correctAnswerIndex: 0, difficulty: 1 },
    { topicId: physics._id, text: 'SI unit of force?', options: ['Joule','Newton','Watt','Pascal'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: physics._id, text: 'Formula for acceleration?', options: ['v/t','(v-u)/t','u*t','v*t'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: physics._id, text: 'Formula for force?', options: ['F=ma','F=mv','F=m/a','F=at'], correctAnswerIndex: 0, difficulty: 2 },
    { topicId: physics._id, text: 'An object at rest has velocity?', options: ['1 m/s','0 m/s','10 m/s','Undefined'], correctAnswerIndex: 1, difficulty: 3 },
    { topicId: physics._id, text: 'Formula for kinetic energy?', options: ['mgh','1/2 mv^2','mv','ma'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: physics._id, text: 'A car accelerates from 0 to 20m/s in 4s. Acceleration?', options: ['4 m/s^2','5 m/s^2','8 m/s^2','20 m/s^2'], correctAnswerIndex: 1, difficulty: 5 },

    // Chemistry
    { topicId: chemistry._id, text: 'Number of protons in Hydrogen?', options: ['0','1','2','3'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: chemistry._id, text: 'Which particle has no charge?', options: ['Proton','Electron','Neutron','Ion'], correctAnswerIndex: 2, difficulty: 1 },
    { topicId: chemistry._id, text: 'Atomic number represents?', options: ['Neutrons','Protons','Mass','Electrons+Neutrons'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: chemistry._id, text: 'Which particle orbits the nucleus?', options: ['Proton','Neutron','Electron','Photon'], correctAnswerIndex: 2, difficulty: 2 },
    { topicId: chemistry._id, text: 'Mass number = protons + ?', options: ['Electrons','Neutrons','Ions','Isotopes'], correctAnswerIndex: 1, difficulty: 3 },
    { topicId: chemistry._id, text: 'Isotopes differ in number of?', options: ['Protons','Electrons','Neutrons','Charge'], correctAnswerIndex: 2, difficulty: 4 },
    { topicId: chemistry._id, text: 'An atom with 6 protons and 8 neutrons has mass number?', options: ['6','8','14','12'], correctAnswerIndex: 2, difficulty: 5 },
  ]);

  // ---- English subject ----
  const english = await Subject.create({ name: 'English', applicableGrades: [9, 10] });
  const grammar = await Topic.create({ subjectId: english._id, name: 'Grammar', difficulty: 2 });
  const comprehension = await Topic.create({ subjectId: english._id, name: 'Reading Comprehension', difficulty: 3 });

  await Question.create([
    // Grammar
    { topicId: grammar._id, text: 'Choose the correct form: "She ___ to school every day."', options: ['go','goes','going','gone'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: grammar._id, text: 'Identify the noun: "The dog ran quickly."', options: ['ran','quickly','dog','the'], correctAnswerIndex: 2, difficulty: 1 },
    { topicId: grammar._id, text: 'Choose the correct past tense of "go".', options: ['goed','went','gone','going'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: grammar._id, text: 'Which sentence is grammatically correct?', options: ['He don\'t like tea.','He doesn\'t likes tea.','He doesn\'t like tea.','He not like tea.'], correctAnswerIndex: 2, difficulty: 2 },
    { topicId: grammar._id, text: 'Identify the adverb: "She sang beautifully."', options: ['sang','she','beautifully','the'], correctAnswerIndex: 2, difficulty: 3 },
    { topicId: grammar._id, text: 'Choose the correct passive voice: "The chef cooks the meal."', options: ['The meal cooked by chef.','The meal is cooked by the chef.','The meal was cook by chef.','The meal is cooking by chef.'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: grammar._id, text: 'Which is a compound-complex sentence?', options: ['I ate.', 'I ate, and I slept.', 'Although tired, I ate, and then I slept.', 'I was tired.'], correctAnswerIndex: 2, difficulty: 5 },

    // Reading Comprehension
    { topicId: comprehension._id, text: 'A synonym for "happy" is:', options: ['sad','joyful','angry','tired'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: comprehension._id, text: 'An antonym for "difficult" is:', options: ['hard','easy','tough','complex'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: comprehension._id, text: 'The main idea of a paragraph is usually found in the:', options: ['last word','topic sentence','footnote','title only'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: comprehension._id, text: 'An author\'s tone refers to their:', options: ['handwriting','attitude toward the subject','vocabulary size','paragraph length'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: comprehension._id, text: 'Inferring means:', options: ['reading aloud','concluding from evidence, not stated directly','copying text','skipping paragraphs'], correctAnswerIndex: 1, difficulty: 3 },
    { topicId: comprehension._id, text: 'A text structured by cause and effect primarily explains:', options: ['a sequence of events','why something happens and its results','character descriptions','rhyme schemes'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: comprehension._id, text: 'Identifying an author\'s bias requires evaluating:', options: ['font style','word choice and selective emphasis','number of pages','chapter titles'], correctAnswerIndex: 1, difficulty: 5 },
  ]);


  // ---- History subject ----
  const history = await Subject.create({ name: 'History', applicableGrades: [9, 10] });
  const worldWars = await Topic.create({ subjectId: history._id, name: 'World Wars', difficulty: 3 });

  await Question.create([
    { topicId: worldWars._id, text: 'World War I began in which year?', options: ['1912','1914','1918','1920'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: worldWars._id, text: 'Which event triggered WWI?', options: ['Pearl Harbor attack','Assassination of Archduke Franz Ferdinand','Fall of Berlin Wall','Treaty of Versailles'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: worldWars._id, text: 'World War II ended in which year?', options: ['1943','1944','1945','1946'], correctAnswerIndex: 2, difficulty: 2 },
    { topicId: worldWars._id, text: 'Which alliance did Germany, Italy, and Japan form in WWII?', options: ['Allies','Axis Powers','Triple Entente','Warsaw Pact'], correctAnswerIndex: 1, difficulty: 3 },
    { topicId: worldWars._id, text: 'The Treaty of Versailles primarily punished which country after WWI?', options: ['France','Britain','Germany','Russia'], correctAnswerIndex: 2, difficulty: 4 },
    { topicId: worldWars._id, text: 'Which conference planned the post-WWII division of Europe?', options: ['Paris Peace Conference','Yalta Conference','Geneva Convention','Congress of Vienna'], correctAnswerIndex: 1, difficulty: 5 },
  ]);

  // ---- Computer Science subject ----
  const cs = await Subject.create({ name: 'Computer Science', applicableGrades: [9, 10] });
  const programmingBasics = await Topic.create({ subjectId: cs._id, name: 'Programming Basics', difficulty: 2 });

  await Question.create([
    { topicId: programmingBasics._id, text: 'Which symbol is used for single-line comments in JavaScript?', options: ['#','//','<!--','**'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: programmingBasics._id, text: 'What does "loop" mean in programming?', options: ['A type of variable','Repeating a block of code','A syntax error','A data type'], correctAnswerIndex: 1, difficulty: 1 },
    { topicId: programmingBasics._id, text: 'Which data type stores true/false values?', options: ['String','Integer','Boolean','Array'], correctAnswerIndex: 2, difficulty: 2 },
    { topicId: programmingBasics._id, text: 'What does a "function" do in code?', options: ['Stores a single value','Groups reusable code that performs a task','Deletes variables','Only prints text'], correctAnswerIndex: 1, difficulty: 2 },
    { topicId: programmingBasics._id, text: 'What is the time complexity of searching an unsorted array linearly?', options: ['O(1)','O(log n)','O(n)','O(n^2)'], correctAnswerIndex: 2, difficulty: 3 },
    { topicId: programmingBasics._id, text: 'Which data structure uses LIFO (Last In First Out)?', options: ['Queue','Stack','Array','Linked List'], correctAnswerIndex: 1, difficulty: 4 },
    { topicId: programmingBasics._id, text: 'What is recursion?', options: ['A loop with no end','A function calling itself to solve a problem','A type of variable','An error in code'], correctAnswerIndex: 1, difficulty: 5 },
  ]);

  console.log('Seeding complete! 5 subjects, 9 topics, questions with difficulty spread 1-5.');
  process.exit();
};

seed();