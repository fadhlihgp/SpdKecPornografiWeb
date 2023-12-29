const dashboardBaseRole = (roleId) => {
    switch (roleId) {
        case "1":
            return "/dashboard/superadmin";
        case "2":
            return "/dashboard/admin";
        case "3":
            return "/dashboard/user";
        default:
            return "/";
    }
}
export default dashboardBaseRole;