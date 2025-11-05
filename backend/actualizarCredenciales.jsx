import React, { useState } from "react";

export default function EditProfile({ user }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/updateProfile", {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    if (result.success) {
      alert("Perfil actualizado");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Correo</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Actualizar</button>
    </form>
  );
}
