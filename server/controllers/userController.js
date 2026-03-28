import supabase from '../config/supabaseClient.js';
export const getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      return res.status(400).json({
        success: false,
        error: error.message
      })
    }

    return res.json({
      success: true,
      count: data.length,
      data
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    })
  }
}
export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }])
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      user: data[0]
    });

  } catch (error) {
    next(error);
  }
};
export const createProfile = async (req, res) => {
  const { user_id, education, experience_level, preferred_domain } = req.body;
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([{ user_id, education, experience_level, preferred_domain }], { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ success: true, profile: data });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await supabase.from('user_skills')
      .delete()
      .eq('user_id', userId);

    await supabase.from('progress_logs')
      .delete()
      .eq('user_id', userId);


    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);

    if (error) throw error;

    res.json({
      success: true,
      message: "User deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};
