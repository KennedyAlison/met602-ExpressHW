const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {

    // Get the id of the employee from the req data
    let id = req.body.id;
        
    // Identify the employee by the id
    let employee = await Employee.findById(id);

    // If the employee does not exist, render a 404 error 
    if (!employee) {
      res.render('404');
    } else {
      // change the employee's properties with new values 
      employee.firstName = req.body.fname;
      employee.lastName = req.body.lname;

      // Save the new values to the database 
      await employee.save();

      // Redirect to employee view
      res.redirect('/employees');
    }
 };
