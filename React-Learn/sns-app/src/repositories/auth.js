import { supabase } from "../lib/supabase"

export const authRepository = {
  async signup(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error != null) throw new Error(error.message);
    return { ...data.user, userName: data.user.user_metadata.name };
  },
  async signin(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);
      return {
        ...data.user,
        userName: data.user_metadata.name,
      };
    } catch (err) {
      console.error('Login failed:', err.message);
      throw err;
    }
  },
};