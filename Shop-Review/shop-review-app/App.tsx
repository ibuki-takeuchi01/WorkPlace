import { AppNavigator } from './src/navigation/AppNavigator';
import React, { useEffect, useState } from 'react';
import { UserContext } from './src/contexts/userContext';
import { User } from './src/types/user';

export default function App() {
  const [user = null, setUser] = useState<User | null>();
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </UserContext.Provider>
  )
}

