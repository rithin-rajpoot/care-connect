export const validateHospitalDetails = (hospitalDetails) => {
    const { hospitalName, registrationId, hospitalType, hospitalEmail, hospitalPhno,hospitalAddress } = hospitalDetails;
    
    const errors = [];
    
    if (!hospitalName?.trim()) errors.push("Hospital name is required");
    if (!registrationId?.trim()) errors.push("Registration ID is required");
    if (!hospitalType?.trim()) errors.push("Hospital type is required");
    if (!hospitalEmail?.trim()) errors.push("Hospital email is required");
    if (!hospitalPhno?.trim()) errors.push("Hospital phone number is required");
    if (!hospitalAddress?.trim()) errors.push("Hospital address is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (hospitalEmail && !emailRegex.test(hospitalEmail)) {
        errors.push("Invalid hospital email format");
    }
    
    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (hospitalPhno && !phoneRegex.test(hospitalPhno)) {
        errors.push("Invalid phone number format");
    }
    
    return errors;
};