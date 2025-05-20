export const validateAdminDetails = (adminDetails) => {
    const { adminName, adminEmail, adminPassword } = adminDetails;
    
    const errors = [];
    
    if (!adminName?.trim()) errors.push("Admin name is required");
    if (!adminEmail?.trim()) errors.push("Admin email is required");
    if (!adminPassword?.trim()) errors.push("Admin password is required");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (adminEmail && !emailRegex.test(adminEmail)) {
        errors.push("Invalid admin email format");
    }
    
    // Password validation
    if (adminPassword && adminPassword.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }
    
    return errors;
};