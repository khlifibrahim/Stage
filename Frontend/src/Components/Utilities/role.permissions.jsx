export const ROLES = {
    DIRECTEUR: 1,
    CHEFSERVICE: 3,
    CADRE: 2,
    SECRETAIRE: 4
};

export const ROLE_NAMES = {
    [ROLES.DIRECTEUR]: 'Directeur',
    [ROLES.CHEFSERVICE]: 'Chef de Service',
    [ROLES.CADRE]: 'Cadre',
    [ROLES.SECRETAIRE]: 'Secrétaire'
};
export const ROLE_TO_ID = {
    DIRECTEUR: ROLES.DIRECTEUR,
    CHEFSERVICE: ROLES.CHEFSERVICE,
    CADRE: ROLES.CADRE,
    SECRETAIRE: ROLES.SECRETAIRE
  };

// Define permissions for each role, grouped by feature/module
export const ROLE_PERMISSIONS = {
    [ROLES.DIRECTEUR]: {
        dashboard: {
            canViewDashboard: true,
        },
        orderMission: {
            canCreateMissionOrders: true,
            canEditMissionOrders: true,
            canDeleteMissionOrders: true,
        },
        userProfile: {
            canViewUserProfiles: true,
            canEditUserProfiles: true,
        }
    },
    [ROLES.CHEFSERVICE]: {
        dashboard: {
            canViewDashboard: true,
        },
        orderMission: {
            canCreateMissionOrders: true,
            canEditMissionOrders: true,
            canDeleteMissionOrders: true,
        },
        userProfile: {
            canViewUserProfiles: true,
            canEditUserProfiles: true,
        }
    },
    [ROLES.CADRE]: {
        dashboard: {
            canViewDashboard: true,
        },
        orderMission: {
            canCreateMissionOrders: false,
            canEditMissionOrders: false,
            canDeleteMissionOrders: false,
        },
        userProfile: {
            canViewUserProfiles: true,
            canEditUserProfiles: false,
        }
    },
    [ROLES.SECRETAIRE]: {
        dashboard: {
            canViewDashboard: false,
        },
        orderMission: {
            canCreateMissionOrders: true,
            canEditMissionOrders: true,
            canDeleteMissionOrders: true,
        },
        userProfile: {
            canViewUserProfiles: true,
            canEditUserProfiles: true,
        }
    }
};



export const hasPermission = (role, feature, permission) => {
    return ROLE_PERMISSIONS[role]?.[feature]?.[permission] || false;
};