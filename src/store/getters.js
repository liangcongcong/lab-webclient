const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  cachedViews: state => state.tagsView.cachedViews,
  visitedViews: state => state.tagsView.visitedViews,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes,
  roles: state => state.user.roles
}
export default getters
