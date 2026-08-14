function calculateMastery(correctCount, totalCount){
    if(totalCount==0) return 0;
    return Math.round((correctCount/totalCount)*100);
}
function classifyTopic(masteryScore){
    if(masteryScore>=75) return 'strong';
    if(masteryScore>=40) return 'moderate';
    return 'weak';
}
function calculatePriority(masteryScore, difficulty){
    const masteryGap = 100 - masteryScore;
    return Math.round(masteryGap*(difficulty || 1));
}
function getActivityType(classification){
    if(classification==='weak') return 'concept-revision';
    if(classification==='moderate') return 'mixed-practice';
    return 'advanced-challenge';
}
function generateRoadmap(topicPerformances, topicsMap){
    const roadmapTopics = topicPerformances.map((perf)=>{
        const topic = topicsMap[perf.topicId.toString()];
        const masteryScore = calculateMastery(perf.correctCount, perf.totalCount);
        const classification = classifyTopic(masteryScore);
        const priority = calculatePriority(masteryScore, topic?.difficulty);
        return {
            topicId: perf.topicId,
            masteryScore,
            classification, 
            priority,
            activityType: getActivityType(classification),
            status : 'pending',
        };
    });

    roadmapTopics.sort((a,b)=>b.priority - a.priority);
    return roadmapTopics;
}

module.exports = {
    calculateMastery,
    classifyTopic,
    calculatePriority,
    getActivityType,
    generateRoadmap,
};