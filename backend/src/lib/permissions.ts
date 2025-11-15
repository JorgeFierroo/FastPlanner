import { ProjectRoleType } from "@prisma/client";

export type Role = ProjectRoleType | string;

export enum Permission {
  VIEW_TASKS = "view_tasks",
  EDIT_TASKS = "edit_tasks",
  ATTACH_FILES = "attach_files",
  VIEW_STATS = "view_stats",
  VIEW_CHANGE_HISTORY = "view_change_history",
}

// Mapa de permisos por rol de proyecto
export const PERMISSIONS_BY_ROLE: Record<Role, Permission[]> = {
  admin: [
    Permission.VIEW_TASKS,
    Permission.EDIT_TASKS,
    Permission.ATTACH_FILES,
    Permission.VIEW_STATS,
    Permission.VIEW_CHANGE_HISTORY,
  ],
  developer: [
    Permission.VIEW_TASKS,
    Permission.EDIT_TASKS,
    Permission.ATTACH_FILES,
    Permission.VIEW_STATS,
    Permission.VIEW_CHANGE_HISTORY,
  ],
  // El nuevo rol 'colaborador' hereda permisos básicos y agrega varios más
  colaborador: [
    Permission.VIEW_TASKS,
    Permission.EDIT_TASKS,
    Permission.ATTACH_FILES, // puede adjuntar archivos mientras edita
    Permission.VIEW_STATS,
    Permission.VIEW_CHANGE_HISTORY,
  ],
  // Rol 'editor': puede ver y editar tareas, adjuntar archivos y ver historial, pero no ver estadísticas
  editor: [
    Permission.VIEW_TASKS,
    Permission.EDIT_TASKS,
    Permission.ATTACH_FILES,
    Permission.VIEW_CHANGE_HISTORY,
  ],
  // Invitado/guest: puede ver tareas pero no editarlas ni ver estadísticas
  guest: [
    Permission.VIEW_TASKS,
  ],
};

export function getPermissionsForRole(role: Role): Permission[] {
  return (PERMISSIONS_BY_ROLE as any)[role] || [];
}

export function roleHasPermission(role: Role, permission: Permission | string) {
  const perms = getPermissionsForRole(role);
  return perms.includes(permission as Permission);
}

export default {
  Permission,
  PERMISSIONS_BY_ROLE,
  getPermissionsForRole,
  roleHasPermission,
};
