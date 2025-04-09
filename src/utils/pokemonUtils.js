export const formatId = (id) => {
  return String(id).padStart(3, "0");
};

export const formatName = (Name) => {
  return Name.replace(/-/g, " ");
};
