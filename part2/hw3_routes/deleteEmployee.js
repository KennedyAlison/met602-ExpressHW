const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {
    
    // Get the id of the employee from the req data
    let id = req.params.id;
        
    // Identify the employee by the id
    let employee = await Employee.findById(id);

    // If the employee does not exist, render a 404 error 
    if (!employee) {
      res.render('404');
    } else {
      // // Render the deleteEmployee view
      res.render('deleteEmployeeView', 
        {title:"Delete Employee?", 
        data: {id: employee.id,
              firstName: employee.firstName,
              lastName: employee.lastName}
      });
    }
        
  };

  