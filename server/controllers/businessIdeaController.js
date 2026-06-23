const BusinessIdea = require('../models/BusinessIdea');
const Roadmap = require('../models/Roadmap');
const User = require('../models/User');

// @route GET /api/ideas
exports.getAll = async (req, res, next) => {
  try {
    const ideas = await BusinessIdea.find({ status: 'active' })
      .populate('matchedSkills')
      .populate('matchedInterests');
    res.json({ success: true, data: ideas });
  } catch (error) { next(error); }
};

// @route GET /api/ideas/:id
exports.getById = async (req, res, next) => {
  try {
    const idea = await BusinessIdea.findById(req.params.id)
      .populate('matchedSkills')
      .populate('matchedInterests');
    if (!idea) return res.status(404).json({ success: false, message: 'Business idea not found' });
    
    const roadmap = await Roadmap.findOne({ businessIdeaId: idea._id });
    
    res.json({ success: true, data: idea, roadmap });
  } catch (error) { next(error); }
};

// @route POST /api/ideas/recommend
exports.recommend = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const userSkillIds = user.skills.map(s => s.toString());
    const userInterestIds = user.interests.map(i => i.toString());
    
    const allIdeas = await BusinessIdea.find({ status: 'active' })
      .populate('matchedSkills')
      .populate('matchedInterests');
    
    // Score each idea based on skill/interest overlap
    const scored = allIdeas.map(idea => {
      const skillMatch = idea.matchedSkills.filter(s => 
        userSkillIds.includes(s._id.toString())
      ).length;
      const interestMatch = idea.matchedInterests.filter(i => 
        userInterestIds.includes(i._id.toString())
      ).length;
      
      const totalPossible = idea.matchedSkills.length + idea.matchedInterests.length;
      const totalMatched = skillMatch + interestMatch;
      const matchScore = totalPossible > 0 
        ? Math.round((totalMatched / totalPossible) * 100) 
        : 50; // default score if no matches defined

      // Budget filter bonus
      let budgetBonus = 0;
      if (user.budget >= idea.costEstimate.min) {
        budgetBonus = 5;
      }

      return {
        ...idea.toObject(),
        matchScore: Math.min(matchScore + budgetBonus, 99),
        skillMatches: skillMatch,
        interestMatches: interestMatch
      };
    });
    
    // Sort by match score descending
    scored.sort((a, b) => b.matchScore - a.matchScore);
    
    res.json({ success: true, data: scored });
  } catch (error) { next(error); }
};

// @route POST /api/ideas (admin)
exports.create = async (req, res, next) => {
  try {
    const idea = await BusinessIdea.create(req.body);
    res.status(201).json({ success: true, data: idea });
  } catch (error) { next(error); }
};

// @route PUT /api/ideas/:id (admin)
exports.update = async (req, res, next) => {
  try {
    const idea = await BusinessIdea.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!idea) return res.status(404).json({ success: false, message: 'Business idea not found' });
    res.json({ success: true, data: idea });
  } catch (error) { next(error); }
};

// @route DELETE /api/ideas/:id (admin)
exports.remove = async (req, res, next) => {
  try {
    await BusinessIdea.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Business idea deleted' });
  } catch (error) { next(error); }
};
