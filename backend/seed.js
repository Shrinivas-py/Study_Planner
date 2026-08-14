require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('./models/Subject');
const Topic = require('./models/Topic');
const Question = require('./models/Question');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected for seeding');

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
    {topicId: algebra._id, text: 'Solve: 2x + 3 = 7', options: ['x=1','x=2','x=3','x=4'], correctAnswerIndex: 1, difficulty: 2},
    {topicId: algebra._id, text: 'Simplify: 3x + 2x', options: ['5x','6x','x','5x^2'], correctAnswerIndex: 0, difficulty: 1},
    {topicId: algebra._id, text: 'Solve: x^2 = 16', options: ['x=2','x=4','x=8','x=16'], correctAnswerIndex: 1, difficulty: 2},

    {topicId: geometry._id, text: 'Sum of angles in a triangle?', options: ['90','180','270','360'], correctAnswerIndex: 1, difficulty: 1},
    {topicId: geometry._id, text: 'Area of a circle formula?', options: ['πr','πr^2','2πr','πd'], correctAnswerIndex: 1, difficulty: 2},
    {topicId: geometry._id, text: 'Number of sides in a hexagon?', options: ['5','6','7','8'], correctAnswerIndex: 1, difficulty: 1},
    {topicId: trigonometry._id, text: 'sin(90°) = ?', options: ['0','0.5','1','undefined'], correctAnswerIndex: 2, difficulty: 3},
    {topicId: trigonometry._id, text: 'cos(0°) = ?', options: ['0','1','-1','0.5'], correctAnswerIndex: 1, difficulty: 3},

    {topicId: physics._id, text: 'SI unit of speed?', options: ['m/s','km/h','m/s^2','N'], correctAnswerIndex: 0, difficulty: 2},
    {topicId: physics._id, text: 'Formula for acceleration?', options: ['v/t','(v-u)/t','u*t','v*t'], correctAnswerIndex: 1, difficulty: 3},

    { topicId: chemistry._id, text: 'Number of protons in Hydrogen?', options: ['0','1','2','3'], correctAnswerIndex: 1, difficulty: 1},
    { topicId: chemistry._id, text: 'Which particle has no charge?', options: ['Proton','Electron','Neutron','Ion'], correctAnswerIndex: 2, difficulty: 2},
  ]);

  console.log('Seeding complete! 2 subjects, 5 topics, 12 questions.');
  process.exit();
};

seed();