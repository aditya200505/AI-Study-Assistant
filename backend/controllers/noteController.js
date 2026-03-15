const Note = require('../models/Note');
const Subject = require('../models/Subject');

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Summarize notes using OpenAI
// @route   POST /api/notes/summarize
// @access  Private
const summarizeNotes = async (req, res) => {
  try {
    const { title, content, subjectId } = req.body;

    if (!content || content.length < 10) {
      return res.status(400).json({ message: 'Content is too short to summarize' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful study assistant. Summarize the provided lecture notes into a concise, well-structured summary that highlights key concepts and definitions. Use bullet points where appropriate."
        },
        {
          role: "user",
          content: `Title: ${title}\nNotes: ${content}`
        }
      ],
      max_tokens: 500,
    });

    const summary = response.choices[0].message.content;

    const createdNote = await Note.create({
      userId: req.user.id,
      subjectId,
      title,
      content,
      summary: summary
    });

    res.status(201).json(createdNote);

  } catch (error) {
    console.error("OpenAI Error:", error);
    if (error.status === 429 || error.code === 'insufficient_quota' || (error.message && error.message.includes('quota'))) {
      res.status(429).json({ message: 'AI Quota Exceeded. Please check your OpenAI billing details or provide a new API key in the .env file.' });
    } else {
      res.status(500).json({ message: 'Failed to generate summary with AI' });
    }
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { userId: req.user.id },
      include: [{ model: Subject, as: 'subject', attributes: ['subjectName', 'color'] }]
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  summarizeNotes,
  getNotes
};
