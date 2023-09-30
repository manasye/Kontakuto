export const generateColorFromInitials = (initials: string) => {
    const colors = ['#87CEEB', '#FFD700', '#90EE90', '#FFA07A', '#ADD8E6'];
    const charSum = initials.charCodeAt(0) + initials.charCodeAt(1);
    const colorIndex = charSum % colors.length;
    return colors[colorIndex];
};
