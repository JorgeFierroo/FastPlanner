import { Router, Request, Response } from "express";

const router = Router();

// POST /auth/login - Iniciar sesión
router.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email y contraseña son requeridos"
        });
    }

    const user = {
        id: 1,
        name: "Usuario Demo",
        email: email,
        role: "COLLABORATOR"
    };

    const token = "fake-jwt-token-" + Date.now();

    res.json({
        message: "Login exitoso",
        user,
        token
    });
});

// POST /auth/register - Registrarse
router.post("/register", (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Nombre, email y contraseña son requeridos"
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        role: "COLLABORATOR"
    };

    const token = "fake-jwt-token-" + Date.now();

    res.status(201).json({
        message: "Usuario creado exitosamente",
        user: newUser,
        token
    });
});

// POST /auth/forgot-password - Recuperar contraseña
router.post("/forgot-password", (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: "Email es requerido"
        });
    }

    res.json({
        message: "Email de recuperación enviado",
        email: email
    });
});

export default router;