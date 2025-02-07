export const ROLES = {
    DIRECTEUR: 1,
    CHEFSERVICE: 3,
    CADRE: 2,
    SECRÉTAIRE: 4
};

export const ROLE_NAMES = {
    [ROLES.DIRECTEUR]: 'Directeur',
    [ROLES.CHEFSERVICE]: 'Chef de Service',
    [ROLES.CADRE]: 'Cadre',
    [ROLES.SECRÉTAIRE]: 'Secrétaire'
};
export const ROLE_TO_ID = {
    DIRECTEUR: ROLES.DIRECTEUR,
    CHEFSERVICE: ROLES.CHEFSERVICE,
    CADRE: ROLES.CADRE,
    SECRÉTAIRE: ROLES.SECRÉTAIRE
  };

export const ROLE_PRIMARY_ROUTE = {
    [ROLES.DIRECTEUR]: '/dashboard',
    [ROLES.CHEFSERVICE]: '/dashboard',
    [ROLES.CADRE]: '/dashboard/orderMissions/listMissionOrders',
    [ROLES.SECRÉTAIRE]: '/dashboard/orderMissions/listMissionOrders'
};

export const ROLE_PERMISSIONS = {
    [ROLES.DIRECTEUR]: {
        dashboard: ["canViewDashboard"],
        
        listMission: ["canViewMissionOrders"],

        addOrderMission: [
            "canCreateMissionOrders",
            "canEditMissionOrders",
            "canDeleteMissionOrders"
        ],

        userProfile: [
            "canViewUserProfiles",
            "canEditUserProfiles"
        ],
    },
    [ROLES.CHEFSERVICE]: {
        dashboard: ["canViewDashboard"],
        listMission: ["canViewMissionOrders"],
        addOrderMission: [
            "canCreateMissionOrders",
            "canEditMissionOrders",
            "canDeleteMissionOrders"
        ],
        userProfile: [
            "canViewUserProfiles",
            "canEditUserProfiles"
        ]
    },
    [ROLES.CADRE]: {
        dashboard: ["canViewDashboard"],
        listMission: [
            "canViewMissionOrders",
        ],
        addOrderMission: [],
        userProfile:[
            "canViewUserProfiles",
            "canEditUserProfiles",
        ],
        
    },
    [ROLES.SECRÉTAIRE]: {
        dashboard: [],
        listMission: [
            "canViewMissionOrders",
        ],
        addOrderMission: [
            "canCreateMissionOrders",
            "canEditMissionOrders",
            "canDeleteMissionOrders",
        ],
        userProfile: [
            "canViewUserProfiles",
            "canEditUserProfiles",
        ]
    }
}

export const SIDEBAR_MENU = {
    "DIRECTEUR": [
        { "Dashboard": [] },
        { "Missions": ["List Mission", "Nouv. Mission"] },
        { "Cadre": ["List Cadres"] },
        { "Entreprise": ["List Entreprises", "Nouv. Entreprise"] },
        { "Voitures": ["List Voitures", "Nouv. Voitures"] },
    ],
    "CHEFSERVICE": [
        { "Dashboard": [] },
        { "Missions": ["List Mission", "Nouv. Mission"] },
        { "Cadre": ["List Cadres"] },
        { "Entreprise": ["List Entreprises", "Nouv. Entreprise"] },
        { "Voitures": ["List Voitures", "Nouv. Voitures"] },
    ],
    "CADRE": [
        { "Dashboard": [] },
        { "Missions": ["List Mission"] },
        { "Cadre": ["List Cadres"] },
        { "Entreprise": ["List Entreprises", "Nouv. Entreprise"] },
        { "Voitures": ["List Voitures", "Nouv. Voitures"] }, // Added to match other roles
    ],
    "SECRÉTAIRE": [
        { "Dashboard": [] },
        { "Missions": ["List Mission", "Nouv. Mission"] },
    ]
};



export const hasPermission = (roleName, feature, permission) => {
    const roleId = ROLE_TO_ID[roleName];
    const featurePermissions = ROLE_PERMISSIONS[roleId]?.[feature] || [];
    const hasAccess = featurePermissions.includes(permission);
    return hasAccess;
};