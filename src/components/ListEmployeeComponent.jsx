import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class ListEmployeeComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            employees: []
        }

        this.addEmployee = this.addEmployee.bind(this);
        //this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then(res =>{
            this.setState({employees: res.data});
        });
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res =>{
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }

    editEmployee(id){
        this.props.history.push(`/update-employees/${id}`);
    }

    addEmployee(){
        this.props.history.push('/add-employees');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <button className="btn btn-primary"onClick={this.addEmployee}> Add Employee</button>
                <div className="row">
                    <table className = "table table-straped table-bordered">

                        <thead>
                            <tr>
                                <th> Employee First Name</th>
                                <th> Employee Last Name</th>
                                <th> Employee Email Id</th>
                                <th> Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key = {employee.id}>
                                        <td> {employee.firstName}</td>
                                        <td> {employee.lastName}</td>
                                        <td> {employee.emailId}</td>
                                        <td>
                                            <button onClick= { () => this.editEmployee(employee.id) } className="btn btn-info">Update</button>
                                            <button onClick= { () => this.deleteEmployee(employee.id) } className="btn btn-danger" style={{marginLeft: '10px'}}>Delete</button>
                                        </td>
                                    </tr> 
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;