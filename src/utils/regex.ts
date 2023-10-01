export const phoneNumberCheck = (value: string) => {
    const regexPattern = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g;
    return regexPattern.test(value);
};
