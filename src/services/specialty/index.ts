export const getSpecialty = async () => {
  const response = await fetch(`http://localhost:3000/specialty`);
  return response.json();
};
