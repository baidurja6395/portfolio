export const EndPoint = {

    // Auth endpoints
    POST_LOGIN: 'lesssecure/auth/login',
    RESET_PASSWORD: 'lesssecure/auth/resetpassword',

    // User endpoints
    GET_BASIC_INFO: 'secure/user/basic/info',
    GET_USER_DETAILS: 'secure/user/details',
    UPDATE_PASSWORD: 'secure/user/changePassword',
    UPDATE_PROFILE_DETAILS: 'secure/user/update',

    // Inventory endpoints
    GET_ITEMS: 'secure/inventory/items',
    GET_STOCKS: 'secure/inventory/stocks',
    GET_STOCK_FOR_TANK: 'secure/inventory/item/dropdown',
    GET_VENDORS: 'secure/inventory/vendors',
    GET_BRANDS: 'secure/inventory/brands',
    POST_INVENTORY_ITEMS: 'secure/inventory/create/item',
    DELETE_INVENTORY_ITEMS: 'secure/inventory/toggle/status',

    // Tank endpoints
    REGISTER_TANK: 'secure/tank/create',
    POST_TANK_ITEMS: 'secure/tank/items',
    GET_TANKS: 'secure/tank/tanklist',
    POST_PARAMS: 'secure/tank/param/create',
    GET_PARAMS: 'secure/tank/params',
    DELETE_TANK: 'secure/tank/delete',
    ADD_FISH: 'secure/tank/add/fish',
    // Attachments endpoints
    POST_ATTACHMENTS: 'secure/attachment/upload',
    GET_ATTACHMENTS: 'secure/attachment/all',


    //Farm management URL
    CREATE_FARM: 'secure/farm/create',
    GET_FARM_INFO: 'secure/farm/info',
    GET_FARM_FISHES: 'secure/farm/fish/list'
}

