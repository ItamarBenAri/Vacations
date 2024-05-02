class FormValidation {

    public static firstNameValidation = {
        required: "First name is required",
        minLength: {
            value: 2,
            message: "First name must be at least 2 characters long"
        },
        maxLength: {
            value: 50,
            message: "First name must be up to 50 characters long"
        }
    }

    public static lastNameValidation = {
        required: "Last name is required",
        minLength: {
            value: 2,
            message: "Last name must be at least 2 characters long"
        },
        maxLength: {
            value: 50,
            message: "Last name must be up to 50 characters long"
        }
    }

    public static emailValidation = {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
        },
        minLength: {
            value: 5,
            message: "Email must be at least 2 characters long"
        },
        maxLength: {
            value: 100,
            message: "Email must be up to 100 characters long"
        }
    }

    public static passwordValidation = {
        required: "Password is required",
        minLength: {
            value: 4,
            message: "Password must be at least 4 characters long"
        },
        maxLength: {
            value: 250,
            message: "Password must be up to 250 characters long"
        }
    }

    public static destinationValidation = {
        required: "Destination is required",
        minLength: {
            value: 2,
            message: "Destination must be at least 2 characters long"
        },
        maxLength: {
            value: 50,
            message: "Destination must be up to 50 characters long"
        }
    }

    public static descriptionValidation = {
        required: "Description is required",
        minLength: {
            value: 2,
            message: "Description must be at least 2 characters long"
        },
        maxLength: {
            value: 2000,
            message: "Description must be up to 2,000 characters long"
        }
    }

    public static dateValidation = {
        required: "Date is required"
    }

    public static priceValidation = {
        required: "Price is required",
        min: {
            value: 0,
            message: "Price can't be negative"
        },
        max: {
            value: 10000,
            message: "Price can't exceed 10,000"
        }
    }
}

export default FormValidation;
