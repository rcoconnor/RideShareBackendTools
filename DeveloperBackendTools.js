import React, { Component  } from "react"; 

const axios = require('axios'); 

/** represents tools meant to help aid in development */ 
class DeveloperBackendTools extends Component {
    /** represents tools meant to help aid in development*/ 
    constructor(props) {
        super(props); 
        this.state = { value: "", newDriverName: "", driverToFind: ""}; 
        
        this.handleDriverSearchChange = this.handleDriverSearchChange.bind(this);  
        this.handleNewDriverChange = this.handleNewDriverChange.bind(this); 
        this.deleteRequestQueue = this.deleteRequestQueue.bind(this); 
        this.requestWaitingQueue = this.requestWaitingQueue.bind(this); 
        this.addNewDriver = this.addNewDriver.bind(this); 
        this.getDrivers = this.getDrivers.bind(this); 
        this.handlePickup = this.handlePickup.bind(this);     
        this.handleDropOff = this.handleDropOff.bind(this); 
        this.getRidersAssignedToDriver = this.getRidersAssignedToDriver.bind(this);  
    }
    
    /** drop off the rider named test driver assigned to the rider test rider
     * Use this to specicifically drop off the rider called in */
    async handleDropOff() {
        var url = this.props.backend + "/request/dropoff"; 
        axios.post(url, {driverName: "test driver", riderName: "test rider"}).then(function(response) {
            console.log(response); 
        });  
    }

    /** will pickup the rider 
     * note: you must have the driver named "test  driver" and rider named
     * "test rider" for this to work */
    async handlePickup() {
        var url = this.props.backend + "/request/scoop"; 
        axios.post(url, {driverName: "test driver", riderName: "test rider"}).then(function(response) {
            console.log(response); 
        });  
    }

    
    /** prints the list of riders on the backend to the console */ 
    async requestWaitingQueue() {
        var url = this.props.backend + "/request/list"; 
        console.log("requesting queue at url: " + url); 
        const response = await axios.get(url); 
        console.log("response: \n" + JSON.stringify(response.data));  
    }

    /** deletes the riders waiting for ride 
     * calles a http delete request to the backend, which will delete all
     * drivers and the riders assigned to those drivers */ 
    async deleteRequestQueue() {
        console.log("deleting request queue"); 
        var url = this.props.backend + "/request";  
        const response = await axios.delete(url);  
        console.log('response: \n' + JSON.stringify(response.data)); 
    }
   
    /** calleed when the user enters a name into the add new driver text box */ 
    handleNewDriverChange(event) {
        this.setState({newDriverName:event.target.value});  
    }
    
    /** called when the user enters a name into the driver search box */
    handleDriverSearchChange(event) {
        this.setState({driverToFind:event.target.value}); 
    }

    /** called when the user wants to add a new driver to the backend 
     * calls a http post request on the backend to store the driver specified
     * by newDriverName */
    async addNewDriver() {
        var url = this.props.backend + "/request/addDriver"; 
        console.log("adding new driver to " + url); 
        axios.post(url, {name: this.state.newDriverName}).then(function(response) {
            console.log(response); 
        }); 
    }
    
    /** sends a http get request to the backend to return the list of drivers */
    async getDrivers() {
        console.log("getting the list of drivers!");  
        var url = this.props.backend + "/request/drivers"; 
        axios.get(url).then(function(response) {
            console.log(JSON.stringify(response.data, null, '\t')); 
        }); 
    }



    /** Gets the riders assigned to the driver is res.body.driver */
    async getRidersAssignedToDriver() {
        console.log("getRidersAssignedToDriver called"); 
        var url = this.props.backend + "/request/ridersFromDriver"; 
        console.log("attempting to connect to: " + url); 
        axios.get(url, { name: this.state.driverToFind }).then(function(response) {
            console.log(JSON.stringify(response.data, null, '\t')); 
        });   
    }

    /** controls the layout of the tools */ 
    render() {
        return (
            <div>
            <header className = "Dev-tools">  
                <button onClick={this.requestWaitingQueue}>View the queue</button>
                <button onClick={this.deleteRequestQueue}>Delete The queue</button> 
                <button onClick={this.getDrivers}>View Drivers</button> 
                <button onClick={this.handlePickup}>Pickup Rider</button> 
                <button onClick={this.handleDropOff}>Drop off Rider </button> 
            </header>
            <header className="add-driver-tool">
                <label>
                    Name: 
                    <input type="text" value={this.state.newDriverName} onChange={this.handleNewDriverChange} /> 
                </label> 
                <button onClick={this.addNewDriver}>Add Driver</button>
                <label>
                    Drivers name:
                    <input type="text" value={this.state.driverToFind} onChange={this.handleDriverSearchChange} />
                </label>
                <button onClick={this.getRidersAssignedToDriver}>Get Riders Assigned to Driver </button>
            </header>
            </div> 
        ); 
    }

}


export default DeveloperBackendTools; 

