require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const assessmentRoutes = require('./routes/assessmentRoutes');
app.use('/api/assessments', assessmentRoutes);

const roadmapRoutes = require('./routes/roadmapRoutes');
app.use('/api/roadmap', roadmapRoutes);

const subjectRoutes = require('./routes/subjectRoutes');
app.use('/api/subjects', subjectRoutes);

app.get('/api/health', (req,res)=>{
    res.json({status : 'ok'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log("Server running on Port 5000 properly");
});