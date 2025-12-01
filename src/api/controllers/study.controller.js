const { getSupabaseClient } = require('../../infrastructure/database/supabase');

const getAllStudySessions = async (req, res, next) => {
  try {
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*');

    if (error) {
      return res.status(400).json({
        error: {
          message: error.message,
          status: 400
        }
      });
    }

    res.status(200).json({
      studySessions: data
    });
  } catch (error) {
    next(error);
  }
};

const getStudySessionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('study_sessions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({
        error: {
          message: 'Study session not found',
          status: 404
        }
      });
    }

    res.status(200).json({
      studySession: data
    });
  } catch (error) {
    next(error);
  }
};

const createStudySession = async (req, res, next) => {
  try {
    const studySessionData = req.body;
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('study_sessions')
      .insert([studySessionData])
      .select();

    if (error) {
      return res.status(400).json({
        error: {
          message: error.message,
          status: 400
        }
      });
    }

    res.status(201).json({
      message: 'Study session created successfully',
      studySession: data[0]
    });
  } catch (error) {
    next(error);
  }
};

const updateStudySession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const studySessionData = req.body;
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
      .from('study_sessions')
      .update(studySessionData)
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({
        error: {
          message: error.message,
          status: 400
        }
      });
    }

    res.status(200).json({
      message: 'Study session updated successfully',
      studySession: data[0]
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudySession = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supabase = getSupabaseClient();
    
    const { error } = await supabase
      .from('study_sessions')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({
        error: {
          message: error.message,
          status: 400
        }
      });
    }

    res.status(200).json({
      message: 'Study session deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllStudySessions,
  getStudySessionById,
  createStudySession,
  updateStudySession,
  deleteStudySession
};
