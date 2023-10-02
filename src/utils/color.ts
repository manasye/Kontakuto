export const generateColorFromInitials = (initials: string = "") => {
  const colors = [
    "#FFC0CB",
    "#FFA07A",
    "#FFD700",
    "#98FB98",
    "#87CEEB",
    "#FFB6C1",
    "#FFDAB9",
    "#FFA500",
    "#FF69B4",
    "#B0E0E6",
    "#98FB98",
    "#FF6347",
    "#20B2AA",
    "#9370DB",
    "#FF4500",
    "#F0E68C",
    "#F08080",
    "#FFA07A",
  ];
  const charSum = initials?.charCodeAt(0) + initials?.charCodeAt(1);
  const colorIndex = charSum % colors.length;
  return colors[colorIndex];
};
