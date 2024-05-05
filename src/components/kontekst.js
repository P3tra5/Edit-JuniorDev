import { createContext, useState } from 'react';

const AdminContext = createContext("off")

/*const AdminContext = createContext({
  admin: "off",
  setAdmin: () => {} // Placeholder function
});*/

export default AdminContext;
