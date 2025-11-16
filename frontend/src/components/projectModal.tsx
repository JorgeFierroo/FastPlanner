import React, { useState, useRef, useEffect } from "react";
import Button from "./ui/Button";
import { SquarePen, Check, X } from "lucide-react";
import { apiFetch } from "../services/api";
import { useNavigate } from "react-router-dom"

type ProjectInfo = {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
};

type ProjectModalProps = {
    isOpen: boolean;
    newProject: boolean;
    projectInfo?: ProjectInfo;
    onClose: () => void;
};


const ProjectModal = ({ isOpen, projectInfo, onClose, newProject }: ProjectModalProps) => {
    const navigate = useNavigate();
    function toISO(dateStr: string) {
        const date = new Date(dateStr);
        return date.toISOString();
    }

    async function CreateProject(projectData: Omit<ProjectInfo, "id">) {
        try {
            const response = await apiFetch("/projects", {
                method: "POST",
                body: JSON.stringify(projectData),
            });
            console.log("Project created:", response);
            onClose();
            navigate(0); // Refrescar la página para mostrar el nuevo proyecto
        } catch (error) {
            console.error("Error creating project:", error);
        }
    }

    const [editingFields, setEditingFields] = useState({
        name: false,
        description: false,
        startDate: false,
        endDate: false,
    });

    const [projectData, setProjectData] = useState<ProjectInfo>(
        projectInfo || {
            id: 0,
            name: "Nuevo Proyecto",
            description: "Sin descripción",
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date().toISOString().split("T")[0],
        }
    );

    const [isProjectEdited, setIsProjectEdited] = useState(false);

    useEffect(() => {
        if (projectInfo) {
            setProjectData(projectInfo);
            setIsProjectEdited(false);
        }
    }, [projectInfo]);

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    const toggleEditing = (field: keyof typeof editingFields) =>
        setEditingFields(prev => ({ ...prev, [field]: !prev[field] }));

    const saveField = (field: keyof typeof editingFields) => {
        let newValue = "";
        switch (field) {
            case "name":
                newValue = nameRef.current?.value || "";
                break;
            case "description":
                newValue = descriptionRef.current?.value || "";
                break;
            case "startDate":
                newValue = startDateRef.current?.value || "";
                break;
            case "endDate":
                newValue = endDateRef.current?.value || "";
                break;
        }
        setProjectData(prev => ({ ...prev, [field]: newValue }));
        setIsProjectEdited(true);
        toggleEditing(field);
    };

    const cancelEdit = (field: keyof typeof editingFields) => toggleEditing(field);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-3/5">
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                        {editingFields.name ? (
                            <div className="flex-1 flex items-center gap-2">
                                <input
                                    ref={nameRef}
                                    type="text"
                                    defaultValue={projectData.name}
                                    className="flex-1 border border-gray-300 rounded-md p-2"
                                    autoFocus
                                />
                                <Check
                                    className="cursor-pointer hover:text-green-600 text-green-500"
                                    size={20}
                                    onClick={() => saveField("name")}
                                />
                                <X
                                    className="cursor-pointer hover:text-red-600 text-red-500"
                                    size={20}
                                    onClick={() => cancelEdit("name")}
                                />
                            </div>
                        ) : (
                            <span className="flex-1">{projectData.name}</span>
                        )}
                        {!editingFields.name && (
                            <SquarePen
                                className="ml-2 cursor-pointer hover:text-purple-600"
                                size={20}
                                onClick={() => toggleEditing("name")}
                            />
                        )}
                    </h2>
                    <div className="mb-4">
                        <label className="block font-semibold flex items-center">
                            Descripción:
                            {!editingFields.description && (
                                <SquarePen
                                    className="ml-2 cursor-pointer hover:text-purple-600"
                                    size={16}
                                    onClick={() => toggleEditing("description")}
                                />
                            )}
                        </label>
                        {editingFields.description ? (
                            <div className="mt-1">
                                <textarea
                                    ref={descriptionRef}
                                    defaultValue={projectData.description}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    autoFocus
                                    rows={3}
                                />
                                <div className="flex gap-2 mt-2">
                                    <Check
                                        className="cursor-pointer hover:text-green-600 text-green-500"
                                        size={20}
                                        onClick={() => saveField("description")}
                                    />
                                    <X
                                        className="cursor-pointer hover:text-red-600 text-red-500"
                                        size={20}
                                        onClick={() => cancelEdit("description")}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="mt-1 p-2 bg-gray-50 rounded-md border">
                                {projectData.description || "Sin descripción"}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold flex items-center">
                            Fecha de inicio:
                            {!editingFields.startDate && (
                                <SquarePen
                                    className="ml-2 cursor-pointer hover:text-purple-600"
                                    size={16}
                                    onClick={() => toggleEditing("startDate")}
                                />
                            )}
                        </label>
                        {editingFields.startDate ? (
                            <div className="mt-1">
                                <input
                                    ref={startDateRef}
                                    type="date"
                                    defaultValue={projectData.startDate}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    autoFocus
                                />
                                <div className="flex gap-2 mt-2">
                                    <Check
                                        className="cursor-pointer hover:text-green-600 text-green-500"
                                        size={20}
                                        onClick={() => saveField("startDate")}
                                    />
                                    <X
                                        className="cursor-pointer hover:text-red-600 text-red-500"
                                        size={20}
                                        onClick={() => cancelEdit("startDate")}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="mt-1 p-2 bg-gray-50 rounded-md border">
                                {projectData.startDate}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold flex items-center">
                            Fecha de fin:
                            {!editingFields.endDate && (
                                <SquarePen
                                    className="ml-2 cursor-pointer hover:text-purple-600"
                                    size={16}
                                    onClick={() => toggleEditing("endDate")}
                                />
                            )}
                        </label>
                        {editingFields.endDate ? (
                            <div className="mt-1">
                                <input
                                    ref={endDateRef}
                                    type="date"
                                    defaultValue={projectData.endDate}
                                    className="w-full border border-gray-300 rounded-md p-2"
                                    autoFocus
                                />
                                <div className="flex gap-2 mt-2">
                                    <Check
                                        className="cursor-pointer hover:text-green-600 text-green-500"
                                        size={20}
                                        onClick={() => saveField("endDate")}
                                    />
                                    <X
                                        className="cursor-pointer hover:text-red-600 text-red-500"
                                        size={20}
                                        onClick={() => cancelEdit("endDate")}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="mt-1 p-2 bg-gray-50 rounded-md border">
                                {projectData.endDate}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-4 text-right">
                    <Button
                        variant="success"
                        disabled={!newProject && !isProjectEdited}
                        className="mr-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        onClick={newProject ? () => CreateProject({
                            name: projectData.name,
                            description: projectData.description,
                            startDate: toISO(projectData.startDate),
                            endDate: toISO(projectData.endDate),
                        }) : undefined}
                    >
                        {newProject ? "Crear Proyecto" : "Guardar Cambios"}
                    </Button>
                        <Button onClick={onClose}>Cerrar</Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
