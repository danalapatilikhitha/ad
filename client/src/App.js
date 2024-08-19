import React, { useState, useEffect } from "react";
import VehicleList from "./components/VehicleList";
import AddVehicle from "./components/AddVehicle";
import axios from "axios";
import "./App.css";

const App = () => {
    const [vehicles, setVehicles] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/cars")
            .then((response) => setVehicles(response.data))
            .catch((error) => console.error("Error fetching vehicles:", error));
    }, []);

    const handleAddVehicle = (newVehicle) => {
        console.log("Adding new vehicle:", newVehicle);
        setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
    };

    const handleContactOwner = (email) => {
        alert(`Contacting the owner of the vehicle at ${email}`);
    };

    const handleDeleteVehicle = (vehicleId) => {
        console.log(`Deleting vehicle with ID: ${vehicleId}`);
        axios
            .delete(`http://localhost:3001/api/cars/${vehicleId}`)
            .then(() => {
                setVehicles((prevVehicles) =>
                    prevVehicles.filter((vehicle) => vehicle._id !== vehicleId)
                );
            })
            .catch((error) => console.error("Error deleting vehicle:", error));
    };

    const handleUpdateVehicle = async (updatedVehicle) => {
        try {
            const response = await axios.put(
                `http://localhost:3001/api/cars/${updatedVehicle._id}`,
                updatedVehicle
            );
            console.log("Vehicle updated successfully:", response.data);
            setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) =>
                    vehicle._id === updatedVehicle._id ? response.data : vehicle
                )
            );
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };

    return (
        <div className="main-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Z_eDt4CehABV6bfkWWOW3bDjiC_6WVrWUQ&s" alt="Logo" style={{ width: "50px", height: "50px", marginLeft: "50px",marginRight:"10px" }} />
    </a>
    <h1 style={{ flexGrow: 1, textAlign: "center", margin: 0 }}>Havaki Vault</h1>
</div>


            
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? "Close" : "Add New Vehicle"}
            </button>
            <div>
                {showForm && <AddVehicle onAddVehicle={handleAddVehicle} />}
                <VehicleList
                    vehicles={vehicles}
                    onDeleteVehicle={handleDeleteVehicle}
                    onUpdateVehicle={handleUpdateVehicle}
                    onContactOwner={handleContactOwner}
                />
            </div>
        </div>
    );
};

export default App;
