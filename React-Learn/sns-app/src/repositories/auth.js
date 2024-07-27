import { supabase } from "../lib/supabase"

export const autRepository = {
  async signup(name, email, password) {
    const { data, error } = await supabase.auth.signup({
      email,
      password,
      options: { data: { name } },
    });
    if (error != null) throw new Error(error.message);
    return { ...data.user, userName: data.user.user_metadata.name };
  },
};