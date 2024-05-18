import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use named import

const TestJwtDecode = () => {
  useEffect(() => {
    console.log(jwtDecode); // Log the jwtDecode function to verify
  }, []);

  return <div>Check console for jwt-decode exports</div>;
};

export default TestJwtDecode;
