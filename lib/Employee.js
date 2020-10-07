// Define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    // Returns employee's name
    getName() {
        return this.name;
    }

    // Returns employee's id number
    getId() {
        return this.id;
    }

    // Returns employee's email
    getEmail() {
        return this.email;
    }

    // Returns employee's role on the team. Default will be employee if not overwriteen by other class.
    getRole() {
        return "Employee";
    }
}


module.exports = Employee;