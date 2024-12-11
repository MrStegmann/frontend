
const nextRotationGroup = prev => {
    const p = prev;
    const [ first, ...rest ] = p;
    const villain = rest.filter(c => c.type === "villain");
    return [...rest.filter(c => c.type !== "villain"), first, villain];
};

export { nextRotationGroup }